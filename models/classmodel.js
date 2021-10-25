const mongoose = require('mongoose');
const randomWords = require('random-words');

const classSchema = mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true,
    },
    year: {
      type: Number,
      required: [true, 'A class must have a year!'],
    },
    band: {
      type: String,
      required: [true, 'A class must have a band!'],
    },
    set: {
      type: String,
      required: [true, 'A class must have a set!'],
    },
    teacher: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'Teacher',
      },
    ],
    students: [
      {
        type: mongoose.Schema.ObjectId,
        ref: 'User',
      },
    ],
    classCode: String,
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  }
);

classSchema.pre('save', async function (next) {
  // Only run function if pw has actually been modified
  if (this.classCode) return next();

  this.classCode = randomWords({ exactly: 2, join: '' });
});

const Class = mongoose.model('Class', classSchema, 'classes');

module.exports = Class;
