const Task = require('../models/taskmodel');
const Class = require('../models/classmodel');
const StudentTask = require('../models/studenttaskmodel');
const factory = require('./handlerFactory');
const User = require('../models/usermodel');
const catchAsync = require('../utils/catchAsync');
const AppError = require('../utils/appError');

exports.getAllStudentTasks = factory.getAll(StudentTask);
exports.createStudentTask = factory.createOne(StudentTask);
exports.getStudentTask = factory.getOne(StudentTask);
exports.updateStudentTask = factory.updateOne(StudentTask);
exports.deleteStudentTask = factory.deleteOne(StudentTask);

///Unfinished
exports.getStudentTasksFromStudentId = catchAsync(async (Id) => {
  return await StudentTask.find({ student: Id });
});

exports.deleteObjectIdRef = catchAsync(async (req, res, next) => {
  const student = await StudentTask.findById(req.params.id);

  const doc = User.findByIdAndUpdate(
    { _id: student.student[0] },
    { $pull: { tasks: req.params.id } },
    (err, user) => {
      if (err) {
        console.log(err);
      }
    }
  );

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  res.status(204).json({
    status: 'success',
    data: null,
  });
});

exports.deleteStudentTaskAndObjectIdRef = catchAsync(async (req, res, next) => {
  const student = await StudentTask.findById(req.params.id);
  const doc = await StudentTask.findByIdAndDelete(req.params.id);

  if (!doc) {
    return next(new AppError('No document found with that ID', 404));
  }

  User.findByIdAndUpdate(
    { _id: student.student[0] },
    { $pull: { tasks: req.params.id } },
    (err, user) => {
      if (err) {
        console.log(err);
      }
    }
  );

  res.status(204).json({
    status: 'success',
    data: null,
  });
});
