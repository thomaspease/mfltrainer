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
  .patch(studentTaskController.updateStudentTask);

router
  .route('/:id')
  .delete(studentTaskController.deleteStudentTaskAndObjectIdRef);

router
  .route('/save-results/:id')
  .patch(
    studentSentenceController.createStudentSentencesDuringTraining,
    studentTaskController.updateStudentTask
  );

router
  .route('/delete-reference-in-user-doc/:id')
  .delete(studentTaskController.deleteObjectIdRef);

// router.route('/teacher-set').post(taskController.teacherSetTask);

module.exports = router;
