const express = require('express');
const taskController = require('../controllers/taskController');
const authController = require('../controllers/authController');

////// ROUTER
const router = express.Router({ mergeParams: true });

router
  .route('/')
  .get(taskController.getAllTasks)
  .post(taskController.createTaskAndStudentTasks);

router
  .route('/:id')
  .delete(taskController.deleteTaskStudentTasksAndObjectIdReferences);

// router.route('/teacher-set').post(taskController.teacherSetTask);

module.exports = router;
