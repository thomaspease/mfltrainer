const Task = require('../models/taskmodel');
const Sentence = require('../models/sentencemodel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');

exports.getAllTasks = factory.getAll(Task);

exports.createTask = catchAsync(async (req, res, next) => {
  if (req.user.role === 'teacher') {
    req.body.teacher = req.user.id;
  }
  const doc = await Task.create(req.body);

  res.status(201).json({
    status: 'success',
    data: {
      data: doc,
    },
  });
});
// exports.teacherSetTask = catchAsync(async (req, res, next) => {
//   //1) Get sentences
//   req.body.taskParams.sentences = await Sentence.find(req.body.query);
//   //2) Create new task
//   const newTask = new Task(req.body);
//   console.log(newTask);
//   //3) Push task to all students of class
// });
