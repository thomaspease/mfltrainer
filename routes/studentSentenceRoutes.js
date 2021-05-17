const express = require('express');
const studentSentenceController = require('../controllers/studentSentenceController');
const authController = require('../controllers/authController');

////// ROUTER
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(studentSentenceController.getAllStudentSentences)
  //.post(studentSentenceController.createStudentSentence);

router
  .route('/:id')
  .get(studentSentenceController.getStudentSentence)

module.exports = router;
