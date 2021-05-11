const mongoose = require('mongoose');

const studentTaskSchema = mongoose.Schema({
  task: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Task',
    },
  ],
  user: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'User',
    },
  ],
  completed: {
    type: Boolean,
    default: false,
  },
  percentCorrect: Number,
  rightCount: Number,
  wrongCount: Number,
});

const StudentTask = mongoose.model(
  'StudentTask',
  studentTaskSchema,
  'studenttasks'
);

module.exports = StudentTask;
