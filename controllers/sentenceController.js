const Sentence = require('../models/sentencemodel');
const factory = require('./handlerFactory');

//Unfinished

exports.getAllSentences = factory.getAll(Sentence);
exports.createSentence = factory.createOne(Sentence);
exports.getSentence = factory.getOne(Sentence);
exports.updateSentence = factory.updateOne(Sentence);
exports.deleteSentence = factory.deleteOne(Sentence);

/***********************************************
 * RETURNS SENTENCES BASED ON PREFERENCES IN REQUEST BODY -
 * THE ROUTE IS get-custom-sentences
 */
exports.sentenceSorter = async (req, res, next) => {
  try {
    const existsTrue = { $exists: true };
    let level = existsTrue,
      vivaRef = existsTrue,
      tense = existsTrue,
      grammar = existsTrue;

    if (req.body.level) {
      level = JSON.parse(req.body.level);
    }

    if (req.body.vivaRef) {
      vivaRef = JSON.parse(req.body.vivaRef);
    }

    if (req.body.tense) {
      tense = req.body.tense;
    }

    if (req.body.grammar) {
      grammar = req.body.grammar;
    }

    const sentences = await Sentence.aggregate([
      {
        $match: {
          level,
          vivaRef,
          tense,
          grammar,
        },
      },
    ]);
    res.status(201).json({
      status: 'success',
      data: sentences,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
