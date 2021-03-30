const express = require('express');
const studentTaskController = require('../controllers/studentTaskController');
const authController = require('../controllers/authController');

////// ROUTER
const router = express.Router({ mergeParams: true });

router.route('/:id').delete(studentTaskController.deleteStudentTaskAndChild);

router
  .route('/delete-student-child/:id')
  .delete(studentTaskController.deleteUserTaskChild);

// router.route('/teacher-set').post(taskController.teacherSetTask);

module.exports = router;
