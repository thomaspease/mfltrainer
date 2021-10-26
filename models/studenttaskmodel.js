const mongoose = require('mongoose');

const studentTaskSchema = mongoose.Schema({
  task: {
    type: mongoose.Schema.ObjectId,
    ref: 'Task',
  },
  user: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  completed: {
    type: Boolean,
    default: false,
  },
  percentCorrect: Number,
  rightCount: Number,
  wrongCount: Number,
});

//To round incoming percentCorrects
studentTaskSchema.pre('save', function (next) {
  if (!this.isModified('percentCorrect')) return next();

  this.percentCorrect = Math.round(this.percentCorrect);
  next();
});

const StudentTask = mongoose.model(
  'StudentTask',
  studentTaskSchema,
  'studenttasks'
);

module.exports = StudentTask;
