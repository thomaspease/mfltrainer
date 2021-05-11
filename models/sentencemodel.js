const mongoose = require('mongoose');

const sentenceSchema = mongoose.Schema({
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
  audioUrl: String,
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Sentence = mongoose.model('Sentence', sentenceSchema, 'sentences');

module.exports = Sentence;
