const User = require('../models/usermodel');
const StudentTask = require('../models/studenttaskmodel');
const StudentSentence = require('../models/studentsentencemodel');
const Task = require('../models/taskmodel');
const Class = require('../models/classmodel');
const Sentence = require('../models/sentencemodel');
const catchAsync = require('../utils/catchAsync');
//const AppError = require('../utils/appError');

exports.displayTasks = catchAsync(async (req, res, next) => {
  //At the moment tasks coming from isLoggedin and being stored in locals.studentTasks\

  res.status(200).render('student/studenttasks', {
    title: 'Tasks',
  });
});

exports.doExercise = catchAsync(async (req, res, next) => {
  // 1) Get task from studentTask ID in URL
  const studentTask = await StudentTask.findById(req.params.id).populate(
    'task'
  );

  // Request the task so sentences can be populated
  const task = await Task.findById(studentTask.task[0].id).populate(
    'sentences'
  );

  //Render template and pass in sentences
  res.status(200).render('student/train', {
    title: 'Train',
    frontendVariables: {
      sentences: task.sentences,
      exercise: task.exercise,
      studentTask: req.params.id,
    },
    controller: 'TrainController',
  });
});

exports.doRevise = catchAsync(async (req, res, next) => {
  const student = res.locals.user;

  const studentSentences = await StudentSentence.find({ student: student.id })
    .populate('sentence')
    .limit(10)
    .exec();

  res.status(200).render('student/train', {
    title: 'Revise',
    frontendVariables: {
      studentSentences,
    },
    controller: 'ReviseController',
  });
});

exports.getLoginForm = (req, res) => {
  res.status(200).render('login', {
    title: 'Log into your account',
  });
};

exports.getSignupForm = (req, res) => {
  res.status(200).render('signup', {
    title: 'Sign up for an account',
  });
};

exports.getCreateSentenceForm = catchAsync(async (req, res) => {
  // if we end up putting more queries in here, put them in a Promise.all for parallelism (see getSetTasksForm)
  await Sentence.distinct('grammar').then(
    (values) => (res.locals.grammar = values)
  );

  res.status(200).render('teacher/create/createsentences', {
    title: 'Create sentences',
  });
});

exports.getSetTasksForm = catchAsync(async (req, res, next) => {
  const fieldValues = {};

  // doing an `await Promise.all` so that we can get each DB query in-flight at the same time (less chance of bottlenecking), rather than having to stagger them
  await Promise.all([
    Sentence.distinct('grammar').then(
      (values) => (fieldValues.grammar = values)
    ),
    Sentence.distinct('vivaRef').then(
      (values) => (fieldValues.vivaRef = values)
    ),
    Sentence.distinct('tense').then((values) => (fieldValues.tense = values)),
  ]);

  res.status(200).render('teacher/create/settasks', {
    title: 'Create tasks',
    fieldValues,
  });
});

exports.getSetTasksRandomForm = catchAsync(async (req, res, next) => {
  res.status(200).render('teacher/create/settasksrandom', {
    title: 'Create tasks',
  });
});

//TEACHER CLASS MANAGEMENT
exports.manageMyClasses = catchAsync(async (req, res, next) => {
  res.status(200).render('teacher/overviews/classesoverview', {
    title: 'My classes',
  });
});

exports.getClass = catchAsync(async (req, res, next) => {
  //Find class
  const classData = await Class.findById(req.params.class).populate('tasks');

  const students = await User.find({ class: req.params.class, role: 'user' });

  res.status(200).render('teacher/manage-individual/manageclass', {
    title: classData.name,
    classData,
    students,
  });
});

//TEACHER TASK MANAGEMENT
exports.manageMyTasks = catchAsync(async (req, res, next) => {
  const tasks = await Task.find({ teacher: res.locals.user._id }).populate(
    'class'
  );

  res.status(200).render('teacher/overviews/tasksoverview', {
    title: 'My tasks',
    tasks,
  });
});

exports.getTask = catchAsync(async (req, res, next) => {
  //Find class
  const task = await Task.findById(req.params.task);

  //Find studentTasks
  const studentTasks = await StudentTask.find({
    task: req.params.task,
  }).populate('user');

  res.status(200).render('teacher/manage-individual/managetask', {
    title: task.name,
    task,
    studentTasks,
  });
});

//TEACHER STUDENT MANAGEMENT
exports.getStudent = catchAsync(async (req, res, next) => {
  //Find class
  const classData = await Class.findById(req.params.class).populate('tasks');

  const students = await User.find({ class: req.params.class, role: 'user' });

  res.status(200).render('teacher/manage-individual/managestudent', {
    title: classData.name,
    classData,
    students,
  });
});

exports.getAccount = catchAsync(async (req, res, next) => {
  res.status(200).render('account', {
    title: 'Your account',
  });
});

exports.privacy = catchAsync(async (req, res, next) => {
  res.status(200).render('privacy', {
    title: 'Privacy policy',
  });
});
