const express = require('express');
const userController = require('../controllers/userController');
const authController = require('../controllers/authController');

////// ROUTER
const router = express.Router();

//This doesn't quite fit with the REST philosophy, but there are some special exceptions
router.post('/signup', authController.signup);
router.post('/login', authController.login);
router.get('/logout', authController.logout);

//The colon is where a URL takes a parameter
router.post('/forgotpassword', authController.forgotPassword);
router.patch('/resetpassword/:token', authController.resetPassword);

router.patch(
  '/updateMyPassword',
  authController.protect,
  authController.updatePassword
);
router.patch('/updateMe', authController.protect, userController.updateMe);
router.delete('/deleteMe', authController.protect, userController.deleteMe);

router.get(
  '/getSentenceSet',
  authController.protect,
  userController.getSentenceSet
);

router
  .route('/')
  .get(userController.getAllUsers)
  .post(userController.createUser);

router
  .route('/:id')
  .get(userController.getUser)
  .patch(userController.updateUser)
  .delete(userController.deleteUser);

module.exports = router;
