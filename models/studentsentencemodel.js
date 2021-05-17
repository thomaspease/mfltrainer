const mongoose = require('mongoose');

const studentSentenceSchema = mongoose.Schema({
  sentence: {
    type: mongoose.Schema.ObjectId,
    unique: false,
    required: true,
    ref: "Sentence",
  },
  student: {
    type: mongoose.Schema.ObjectId,
    unique: false,
    required: true,
  },
  exercise: {
    type: String,
    enum: ['gapped', 'translation', 'transcription'],
    required: true,
  },
  correctAttempts: Number,
  incorrectAttempts: Number,
  firstLearnedOn: {
    type: Date,
    default: Date.now(),
  },
  lastTestedOn: {
    type: Date,
    default: Date.now(),
  },
  retestOn: {
    type: Date,
    required: true,
  },
  retestDays: {
    type: Number,
    required: true,
  }
});

studentSentenceSchema.index({sentence:1, student:1, exercise: 1}, {unique:true})

const StudentSentence = mongoose.model(
  'StudentSentence',
  studentSentenceSchema,
  'studentSentences'
);

module.exports = StudentSentence;
