const User = require('../models/usermodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

//Function to loop through an object and return and array with just the filtered fields
const filterObj = (obj, ...allowedFields) => {
  const newObj = {};
  Object.keys(obj).forEach((el) => {
    if (allowedFields.includes(el)) newObj[el] = obj[el];
  });
  return newObj;
};

///HANDLERS////////////////////////////////\

exports.getAllUsers = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).json({
    status: 'success',
    results: users.length,
    data: {
      users,
    },
  });
});

exports.updateMe = catchAsync(async (req, res, next) => {
  //Create error if user POSTs password data
  if (req.body.password || req.body.passwordConfirm) {
    return next(
      new Apperror(
        'This route is not for password updates. Please use /updateMyPassword.',
        400
      )
    );
  }
  //2) Filter out unwanted fields that are not allowed to be changed
  const filteredBody = filterObj(req.body, 'name', 'email', 'sentences'); //You can add more arguments to filter different things

  //3) Update user document
  const updatedUser = await User.findByIdAndUpdate(req.user.id, filteredBody, {
    new: true,
    runValidators: true,
  });

  res.status(200).json({
    status: 'success',
    data: {
      user: updatedUser,
    },
  });
});

exports.deleteMe = catchAsync(async (req, res, next) => {
  await User.findByIdAndUpdate(req.user.id, { active: false }); //So we want to turn the active part of this users model to false

  res.status(204).json({
    sataus: 'success',
    data: null,
  });
});

exports.getSentenceSet = catchAsync(async (req, res, next) => {
  const populatedUser = await await User.findById(req.user.id).populate(
    'sentences'
  );

  res.status(200).json({
    status: 'success',
    data: populatedUser.sentences,
  });
});

exports.getUser = catchAsync(async (req, res, next) => {
  const user = await User.findById(req.params.id).populate('sentences');

  if (!user) {
    return next(new AppError('No user found with that ID', 404));
  }

  res.status(200).json({
    status: 'success',
    data: {
      user,
    },
  });
});

exports.deleteUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
};

exports.createUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
};

exports.updateUser = (req, res) => {
  res.status(500).json({
    status: 'error',
    message: 'this route is not yet defined!',
  });
};
