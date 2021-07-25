const express = require('express');
const studentTaskController = require('../controllers/studentTaskController');
const studentSentenceController = require('../controllers/studentSentenceController');
const authController = require('../controllers/authController');

////// ROUTER
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(studentTaskController.getAllStudentTasks)
  .post(studentTaskController.createStudentTask);

router
  .route('/:id')
  .get(studentTaskController.getStudentTask)
  .patch(studentTaskController.updateStudentTask)
  .delete(studentTaskController.deleteStudentTask);

router
  .route('/save-results/:id')
  .patch(
    studentSentenceController.createStudentSentencesDuringTraining,
    studentTaskController.updateStudentTask
  );

// router.route('/teacher-set').post(taskController.teacherSetTask);

module.exports = router;
