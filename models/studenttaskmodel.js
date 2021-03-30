const mongoose = require('mongoose');

const studentTaskSchema = mongoose.Schema({
  task: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Task',
    },
  ],
  student: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Student',
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  percentComplete: Number,
  rightAnswers: Number,
  wrongAnswers: Number,
});

const StudentTask = mongoose.model(
  'StudentTask',
  studentTaskSchema,
  'studenttasks'
);

module.exports = StudentTask;
