const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.displayTasks);
router.get('/train/:id', authController.isLoggedIn, viewsController.doExercise);
router.get('/revise', authController.isLoggedIn, viewsController.doRevise);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get(
  '/create-sentence',
  authController.protect,
  viewsController.getCreateSentenceForm
);

router.get(
  '/create-class',
  authController.protect,
  viewsController.getCreateClassForm
);

router.get(
  '/choose-create-task',
  authController.protect,
  viewsController.getChooseCreateTasks
);

router.get(
  '/create-task-select',
  authController.protect,
  viewsController.getCreateTasksSelectForm
);

router.get(
  '/create-task-random',
  authController.protect,
  viewsController.getCreateTasksRandomForm
);

router.get(
  '/manage-classes',
  authController.protect,
  viewsController.manageMyClasses
);
router.get(
  '/manage-classes/:class',
  authController.protect,
  viewsController.getClass
);

//This isn't yet implemented or thought through
router.get(
  '/manage-tasks',
  authController.protect,
  viewsController.manageMyTasks
);
router.get(
  '/manage-tasks/:task',
  authController.protect,
  viewsController.getTask
);

//SEE INDIVIDUAL STUDENT
router.get(
  '/manage-student/:student',
  authController.protect,
  viewsController.getStudent
);

router.get('/me', authController.protect, viewsController.getAccount);

router.get('/privacy', authController.isLoggedIn, viewsController.privacy);

module.exports = router;
