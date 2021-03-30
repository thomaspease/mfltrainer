const Task = require('../models/taskmodel');
const Class = require('../models/classmodel');
const StudentTask = require('../models/studenttaskmodel');
const User = require('../models/usermodel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const { create } = require('../models/sentencemodel');
const AppError = require('../utils/appError');

exports.getAllTasks = factory.getAll(Task);

exports.createTaskAndStudentTasks = catchAsync(async (req, res, next) => {
  // if (req.user.role === 'teacher') {
  //   req.body.teacher = req.user.id;
  // }

  const doc = await Task.create(req.body);

  //Find students in the class
  const taskClass = await Class.findById(req.body.class);
  //For each student, create a studentTask, and push that studenttask to the user tasks
  try {
    taskClass.students.forEach(async (el) => {
      const task = await StudentTask.create({
        student: el,
        task: doc,
      });
      console.log(task.id);
      User.findByIdAndUpdate(
        { _id: el },
        { $push: { tasks: task.id } },
        (err, user) => {
          if (err) {
            console.log(err);
          }
        }
      );
    });
  } catch (err) {
    new AppError('Could not assign task to students');
  }

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
