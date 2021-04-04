const Task = require('../models/taskmodel');
const Class = require('../models/classmodel');
const StudentTask = require('../models/studenttaskmodel');
const User = require('../models/usermodel');
const catchAsync = require('../utils/catchAsync');
const factory = require('./handlerFactory');
const AppError = require('../utils/appError');
const studentTaskController = require('../controllers/studentTaskController');

exports.getAllTasks = factory.getAll(Task);

exports.createTaskAndStudentTasks = catchAsync(async (req, res, next) => {
  // if (req.user.role === 'teacher') {
  //   req.body.teacher = req.user.id;
  // }

  const doc = await Task.create(req.body);

  //Add task to the class
  Class.findByIdAndUpdate(
    { _id: req.body.class },
    { $push: { tasks: doc.id } },
    (err, user) => {
      if (err) {
        console.log(err);
      }
    }
  );
  //Find students in the class
  const taskClass = await Class.findById(req.body.class);
  //For each student, create a studentTask, and push that studenttask to the user tasks
  try {
    taskClass.students.forEach(async (el) => {
      const task = await StudentTask.create({
        user: el,
        task: doc,
      });
      console.log(el);
      User.findByIdAndUpdate(el, { $push: { tasks: task.id } }, (err, user) => {
        if (err) {
          console.log(err);
        }
      });
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

exports.deleteTaskStudentTasksAndObjectIdReferences = catchAsync(
  async (req, res, next) => {
    const taskDoc = await Task.findByIdAndDelete(req.params.id);

    if (!taskDoc) {
      return next(new AppError('No Task found with that ID', 404));
    }

    const studentTaskList = await StudentTask.find({ task: req.params.id });

    //This is an attempt to force the deletion to wait until the studenttasks have been found
    if (studentTaskList) {
      const studentTasksDoc = await StudentTask.deleteMany({
        task: req.params.id,
      });

      if (!studentTasksDoc) {
        return next(new AppError('No studentTasks could be found', 404));
      }
    }

    //Loops through studentTaskList, finding the relevant student to each studentTask, and then pulling the reference to the task
    studentTaskList.forEach((e) => {
      User.findByIdAndUpdate(
        { _id: e.user },
        { $pull: { tasks: req.params.id } },
        (err, user) => {
          if (err) {
            return next(
              new AppError(
                'No Object ID references could be pulled from User documents',
                404
              )
            );
          }
        }
      );
    });

    res.status(204).json({
      status: 'success',
      data: null,
    });
  }
);

// exports.teacherSetTask = catchAsync(async (req, res, next) => {
//   //1) Get sentences
//   req.body.taskParams.sentences = await Sentence.find(req.body.query);
//   //2) Create new task
//   const newTask = new Task(req.body);
//   console.log(newTask);
//   //3) Push task to all students of class
// });
