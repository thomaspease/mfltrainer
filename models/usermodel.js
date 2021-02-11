const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const crypto = require('crypto');

const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Please tell us your name'],
    },
    email: {
      type: String,
      required: [true, 'Please tell us your email'],
      unique: true,
      lowercase: true, //not validator, converts to lowercase
      validate: [validator.isEmail, 'Please provide valid email!!'],
    },
    photo: {
      type: String,
    },
    role: {
      type: String,
      enum: ['user', 'teacher', 'admin'], //Enum restricts the field to those values
      default: 'user',
    },
    password: {
      type: String,
      required: [true, 'Please tell us your password'],
      minlength: [6, 'Make sure that your password has at least 6 letters'],
      select: false,
    },
    passwordConfirm: {
      type: String,
      required: true,
      validate: {
        //THIS only works on .create or .save!!
        validator: function (el) {
          return el === this.password;
        },
        message: 'Passwords are not the same',
      },
    },
    passwordChangedAt: Date,
    passwordResetToken: String,
    passwordResetExpires: Date,
    active: {
      type: Boolean,
      default: true,
      select: false,
    },
    sentences: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Sentence',
      },
    ],
    class: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Class',
      },
    ],
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

userSchema.pre('save', async function (next) {
  // Only run function if pw has actually been modified
  if (!this.isModified('password')) return next();

  this.password = await bcrypt.hash(this.password, 12);

  //This means that the password confirm will not be persisten in the DB - it is a required field for input, but once input has been done, it doesn't have to be added to DB
  this.passwordConfirm = undefined;
});

//Query middleare which filters out inactive users
//This is called query middleware because it runs when you are making any query that starts with 'find'. We need to use a regular runction with these in order to have access to the 'this' of the things being passed through
userSchema.pre(/^find/, function (next) {
  //this  points to the current query
  this.find({ active: { $ne: false } });
  next();
});

//Middleware to set passwordChangedAt date
userSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

userSchema.methods.correctPassword = async function (
  candidatePassword,
  userPassword
) {
  return await bcrypt.compare(candidatePassword, userPassword);
};

userSchema.methods.changedPasswordAfter = function (JWTTimestamp) {
  if (this.passwordChangedAt) {
    const changedTimestamp = parseInt(
      this.passwordChangedAt.getTime() / 1000,
      10
    );

    return JWTTimestamp < changedTimestamp;
  }

  //False means not changed
  return false;
};

//When this is called it creates a random string which is sent to users email
//which then functions as a password to reset their normal password.
userSchema.methods.createPasswordResetToken = function () {
  const resetToken = crypto.randomBytes(32).toString('hex');

  //The random string/token needs to be encrypted when being put onto the DB,
  //so that if a hacker gets into DB, they cannot reset users' passwords
  this.passwordResetToken = crypto
    .createHash('sha256')
    .update(resetToken)
    .digest('hex');
  this.passwordResetExpires = Date.now() + 10 * 60 * 1000; //10 mins

  console.log({ resetToken }, this.passwordResetToken);

  return resetToken; //Returning unencrypted token
};

//This must come at the end, if you put elements of userschema after then they won't be passed into the model
const User = mongoose.model('User', userSchema);

module.exports = User;
