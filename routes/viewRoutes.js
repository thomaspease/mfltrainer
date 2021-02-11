const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.getOverview);
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

router.get('/my-classes', authController.protect, viewsController.getMyClasses);
router.get(
  '/my-classes/:class',
  authController.protect,
  viewsController.getClass
);

router.get('/me', authController.protect, viewsController.getAccount);

module.exports = router;
