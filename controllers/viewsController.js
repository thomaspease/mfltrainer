const User = require('../models/usermodel');
const Sentence = require('../models/sentencemodel');
const Class = require('../models/classmodel');
const catchAsync = require('../utils/catchAsync');
//const AppError = require('../utils/appError');

exports.getExercises = catchAsync(async (req, res, next) => {
  // 1) Get tour data from collection
  const sentences = await Sentence.find();

  // 2) Build template
  // 3) Render that template using tour data from 1)
  res.status(200).render('exercises', {
    title: 'Exercises',
    sentences,
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getCreateSentenceForm = (req, res) => {
  res.status(200).render('createsentences', {
    title: 'Create sentences',
  });
};

exports.getSetTasksForm = catchAsync(async (req, res, next) => {
  res.status(200).render('settasks', {
    title: 'Create tasks',
  });
});

exports.getMyClasses = catchAsync(async (req, res, next) => {
  res.status(200).render('myclasses', {
    title: 'My classes',
  });
});

exports.getClass = catchAsync(async (req, res, next) => {
  //Find class
  const classData = await Class.findById(req.params.class);
  //Find students
  const Students = await User.find({ class: '601706693dd4d815c3c8acbe' });
  console.log(req.params);

  res.status(200).render('classoverview', {
    title: 'My classes',
  });
});

exports.getAccount = (req, res) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
};
