const express = require('express');
const viewsController = require('../controllers/viewsController');
const authController = require('../controllers/authController');

const router = express.Router();

router.get('/', authController.isLoggedIn, viewsController.displayTasks);
router.get('/train/:id', authController.isLoggedIn, viewsController.doExercise);
router.get('/login', viewsController.getLoginForm);
router.get('/signup', viewsController.getSignupForm);
router.get(
  '/create-sentence',
  authController.protect,
  viewsController.getCreateSentenceForm
);
// temp
router.get("/get-s3-signed-url", authController.protect, (req, res) => {
  const aws = require('aws-sdk');
  aws.config.region = 'eu-west-2';

  const S3_BUCKET = 'mfltrainer-assets';

  {
    const s3 = new aws.S3();

    const filename = 'upload-test';
    const filetype = 'application/json';

    const s3Params = {
      Bucket: S3_BUCKET,
      Key: filename,
      Expires: 60,
      ContentType: filetype,
      ACL: 'public-read',
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if (err) {
        console.error(err);
        return res.end();
      }

      const returnData = {
        signedUrl: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${filename}`
      };

      res.json(returnData);
    })
  }
})
// above: temp
router.get(
  '/create-task',
  authController.protect,
  viewsController.getSetTasksForm
);

router.get(
  '/create-task-random',
  authController.protect,
  viewsController.getSetTasksRandomForm
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
