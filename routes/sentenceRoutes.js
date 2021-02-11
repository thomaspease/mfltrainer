const express = require('express');
const sentenceController = require('../controllers/sentenceController');
//const authController = require('../controllers/authController');

const router = express.Router();

router.route('/get-custom-sentences').get(sentenceController.sentenceSorter);

router
  .route('/')
  .get(sentenceController.getAllSentences)
  .post(sentenceController.createSentence);

router
  .route('/:id')
  .get(sentenceController.getSentence)
  .patch(sentenceController.updateSentence)
  .delete(sentenceController.deleteSentence);

module.exports = router;
