const mongoose = require('mongoose');

const studentSentenceSchema = mongoose.Schema({
  sentenceId: {
    type: ObjectId,
    required: true,
  },
  studentId: {
    type: ObjectId,
    required: true,
  },
  correctAttempts: Number,
  incorrectAttempts: Number,
  firstLearnedOn: {
    type: Date,
    default: Date.now(),
  },
  sentence: {
    type: String,
    required: true,
    unique: true,
    trim: true,
  },
  translation: {
    type: String,
    required: [true, 'A sentence must have a translation'],
    unique: true,
    trim: true,
  },
  level: {
    type: Number,
    required: [true, 'A sentence must have a GCSE level'],
  },
  vivaRef: {
    type: Number,
    required: [true, 'A sentence must have a Viva reference'],
  },
  tense: {
    type: String,
  },
  grammar: Array,
  audio: String,
});

const StudentSentence = mongoose.model(
  'StudentSentence',
  studentSentenceSchema,
  'studentSentences'
);

module.exports = StudentSentence;
