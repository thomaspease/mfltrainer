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

// sentenceSchema.pre('save', async function (next) {
//   // Only run function if pw has actually been modified
//   if (!this.isNew) return next();

//   const hello = this.grammar.map((e) => e.split(',').map((e) => e.trim()));
//   console.log(hello);
//   this.grammar = hello;
// });

const Sentence = mongoose.model('Sentence', sentenceSchema, 'sentences');

module.exports = Sentence;
