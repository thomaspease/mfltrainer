const express = require('express');
const studentTaskController = require('../controllers/studentTaskController');
const authController = require('../controllers/authController');

////// ROUTER
const router = express.Router({ mergeParams: true });

router
  .route('/:id')
  .delete(studentTaskController.deleteStudentTaskAndObjectIdRef);

router
  .route('/delete-reference-in-user-doc/:id')
  .delete(studentTaskController.deleteObjectIdRef);

// router.route('/teacher-set').post(taskController.teacherSetTask);

module.exports = router;
