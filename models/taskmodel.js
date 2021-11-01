const mongoose = require('mongoose');

const taskSchema = mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  dueDate: Date,
  teacher: {
    type: mongoose.Schema.ObjectId,
    ref: 'User',
  },
  exercise: {
    type: String,
    enum: ['gapped', 'translation', 'transcription', 'translationToTl'],
    required: true,
  },
  sentences: [
    {
      type: mongoose.Schema.ObjectId,
      ref: 'Sentence',
    },
  ],
  class: {
    type: mongoose.Schema.ObjectId,
    ref: 'Class',
  },
});

taskSchema.pre('save', function (next) {
  if (!this.isModified('password') || this.isNew) return next();

  this.passwordChangedAt = Date.now() - 1000;
  next();
});

const Task = mongoose.model('Task', taskSchema, 'tasks');

module.exports = Task;
