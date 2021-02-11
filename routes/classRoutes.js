const express = require('express');
const classController = require('../controllers/classController');
//const authController = require('../controllers/authController');
const taskRouter = require('./taskRoutes');

const router = express.Router({ mergeParams: true });

router.use('/:classId/tasks', taskRouter);

router
  .route('/')
  .get(classController.getAllClasses)
  .post(classController.createClass);

router
  .route('/:id')
  .get(classController.getClass)
  .patch(classController.updateClass)
  .delete(classController.deleteClass);

module.exports = router;
