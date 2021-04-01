const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.displayTasks);
router.get('/train/:id', authController.isLoggedIn, viewsController.doExercise);
router.get('/login', authController.isLoggedIn, viewsController.getLoginForm);
router.get(
  '/createsentences',
  authController.protect,
  viewsController.getCreateSentenceForm
);
router.get(
  '/settasks',
  authController.protect,
  viewsController.getSetTasksForm
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

router.get('/me', authController.protect, viewsController.getAccount);

module.exports = router;
