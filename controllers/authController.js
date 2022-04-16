const crypto = require('crypto');
const { promisify } = require('util');
const jwt = require('jsonwebtoken');
const User = require('../models/usermodel');
const Task = require('../models/taskmodel');
const Class = require('../models/classmodel');
const StudentTask = require('../models/studenttaskmodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');
const sendEmail = require('../utils/email');

const signToken = (id) =>
  jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_EXPIRES_IN,
  });

const createSendToken = (user, statusCode, res) => {
  const token = signToken(user._id);

  const cookieOptions = {
    expires: new Date(
      Date.now() + process.env.JWT_COOKIE_EXPIRES_IN * 24 * 60 * 60 * 1000
    ),
    httpOnly: true, //token cannot be accessed or modified in browser
  };
  if (process.env.NODE_ENV === 'production') cookieOptions.secure = true; //This will mean cookie can only be sent over encrypted HTTPS connections - only in produciton

  res.cookie('jwt', token, cookieOptions);

  user.password = undefined; //Removed encrypted password from output when making new user

  res.status(statusCode).json({
    status: 'success',
    token,
    data: {
      user,
    },
  });
};

exports.signup = catchAsync(async (req, res, next) => {
  const classData = await Class.find({
    classCode: req.body.classCode,
  });

  const newUser = await User.create({
    name: req.body.name
      .toLowerCase()
      .split(' ')
      .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
      .join(' '), //Capitalizes first letters of name
    email: req.body.email,
    password: req.body.password,
    passwordConfirm: req.body.passwordConfirm,
    class: classData[0]._id,
  });

  //Find tasks due in future for class being assigned to, and create studenttasks for newuser
  const futureTasks = await Task.find({
    class: classData[0]._id,
    dueDate: { $gte: Date.now() },
  });

  futureTasks.forEach(async (el) => {
    await StudentTask.create({
      user: newUser._id,
      task: el._id,
    });
  });

  createSendToken(newUser, 201, res);
});

exports.login = catchAsync(async (req, res, next) => {
  const { email, password } = req.body;

  //1. Check if email and password provided
  if (!email || !password) {
    next(new AppError('Please provide an email and password', 400));
  }

  //2. Check if email && password are correct
  const user = await User.findOne({ email }).select('+password');
  // That is the same as saying {email: email } (which is a filter req)
  //You need to have a '+' before the field which you are selecting, if it is a field which is not usually selected

  if (!user || !(await user.correctPassword(password, user.password))) {
    return next(new AppError('Incorrect email or password', 401));
  }

  //3 If all okay, send token to client
  createSendToken(user, 200, res);
});

exports.logout = (req, res) => {
  res.cookie('jwt', 'null', {
    expires: new Date(Date.now() - 10 * 1000),
    httpOnly: true,
  });
  res.status(200).json({ status: 'success' });
};

exports.protect = catchAsync(async (req, res, next) => {
  let token; //block scoped
  // 1) Getting token and checking if it's there
  if (
    req.headers.authorization &&
    req.headers.authorization.startsWith('Bearer')
  ) {
    token = req.headers.authorization.split(' ')[1]; //The one is because you only want to rerutn the second element of the array that comes from the split
  } else if (req.cookies.jwt) {
    token = req.cookies.jwt;
  }

  if (!token) {
    return next(
      new AppError('You are not logged in! Please log in to get access.', 401)
    );
  }
  // 2) Verification of token
  const decoded = await promisify(jwt.verify)(token, process.env.JWT_SECRET);

  // 3) Check if user still exists
  const currentUser = await User.findById(decoded.id)
    .populate('class')
    .populate('tasks');
  if (!currentUser) {
    return next(
      new AppError('The user belonging to this token no longer exists', 401)
    );
  }
  // 4) Check if user changed password after JWT issued
  if (currentUser.changedPasswordAfter(decoded.iat)) {
    return next(
      new AppError('User recently changed password! Please log in again.', 401)
    );
  }

  //GRANT ACCESS TO PROTECTED ROUTE
  req.user = currentUser;
  res.locals.user = currentUser;

  //Add classdata to user
  const classData = await Class.find({ teacher: req.user.id });
  req.user.classes = classData;
  res.locals.user.classes = classData;

  next();
});

// Only for rendered pages, no errors!
exports.isLoggedIn = catchAsync(async (req, res, next) => {
  if (req.cookies.jwt) {
    //Verifies token
    const decoded = await promisify(jwt.verify)(
      req.cookies.jwt,
      process.env.JWT_SECRET
    );

    // 2) Check if user still exists
    const currentUser = await User.findById(decoded.id)
      .populate('class')
      .populate('tasks');
    if (!currentUser) {
      return next();
    }
    // 3) Check if user changed password after JWT issued
    if (currentUser.changedPasswordAfter(decoded.iat)) {
      return next();
    }

    //THERE IS A LOGGED IN USER
    req.user = currentUser;
    res.locals.user = currentUser;

    //Populate with student tasks
    const studentTasks = await StudentTask.find({
      user: decoded.id,
    }).populate('task');
    res.locals.studentTasks = studentTasks;

    return next();
  }
  if (!req.cookies.jwt) {
    res.redirect('/login');
    return next();
  }
  next();
});

exports.restrictTo = (...roles) => {
  return (req, res, next) => {
    if (!roles.includes(req.user.role)) {
      return next(
        new AppError('You do not have permission to perform this action', 403)
      );
    }

    next();
  };
};

exports.forgotPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on posted email
  const user = await User.findOne({ email: req.body.email });
  if (!user) {
    return next(new AppError('There is no user with that email address', 404));
  }

  //2 Generate the random reset token
  const resetToken = user.createPasswordResetToken();

  await user.save({ validateBeforeSave: false }); //Because the createResetToken modifies the user' document, but doesn't actually save it
  //If you didn't have validatebeforesave then it would ask for password confirm field from the model

  //3 Send it to users email
  const resetURL = `${req.protocol}://${req.get(
    'host'
  )}/api/v1/users/resetPassword/${resetToken}`;
  const message = `Forgot your password? Submit a PATCH request with your new password and passwordConfirm to: ${resetURL}.\n If you didn't forget your password, please get in touch with us.`;

  try {
    await sendEmail({
      email: user.email,
      subject: 'Your password reset token. Only valid for 10 mins',
      message,
    });

    res.status(200).json({
      status: 'success',
      message: 'Token sent to email',
    });
    //If there is an error then reset tokens must be reset to undefined
  } catch (err) {
    user.passwordResetToken = undefined;
    user.passwordResetExpires = undefined;
    await user.save({ validateBeforeSave: false });

    return next(err);
  }
});

exports.resetPassword = catchAsync(async (req, res, next) => {
  //1) Get user based on the token
  const hashedToken = crypto
    .createHash('sha256')
    .update(req.params.token)
    .digest('hex');

  const user = await User.findOne({
    passwordResetToken: hashedToken,
    passwordResetExpires: { $gt: Date.now() },
  });
  //2) If token has not expired, and there is a user, set the new password
  if (!user) {
    return next(new AppError('Token is invalid or has expired, 400'));
  }
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  user.passwordResetToken = undefined;
  user.passwordResetExpires = undefined;
  await user.save(); //The reason we are saving here is because we want to run the validators, and the save middleware

  //3) Updated changedPasswordAt property for the user (part of middleware in User model)
  //4) Log the user in, send JWT
  createSendToken(user, 201, res);
});

exports.updatePassword = catchAsync(async (req, res, next) => {
  //1) Get the user from collection (who should already be logged in, so req.user is already available, becuase it has already been through authController.protect)
  const user = await User.findById(req.user.id).select('+password');
  //2) Check if POSTed password is correct
  if (!(await user.correctPassword(req.body.passwordCurrent, user.password))) {
    return next(new AppError('Your current password is wrong', 401));
  }
  //3) If so, update password
  user.password = req.body.password;
  user.passwordConfirm = req.body.passwordConfirm;
  await user.save();

  //4) Log user in, send JWT
  createSendToken(user, 200, res);
});
