const Sentence = require('../models/sentencemodel');
const factory = require('./handlerFactory');

const aws = require('aws-sdk');
aws.config.region = 'eu-west-2';
const S3_BUCKET = 'mfltrainer-assets';

//Unfinished

exports.getAllSentences = factory.getAll(Sentence);
exports.createSentence = factory.createOne(Sentence);
exports.getSentence = factory.getOne(Sentence);
exports.updateSentence = factory.updateOne(Sentence);
exports.deleteSentence = factory.deleteOne(Sentence);

/***********************************************
 * RETURNS SENTENCES BASED ON PREFERENCES IN REQUEST BODY -
 * THE ROUTE IS get-custom-sentences
 */
exports.sentenceSorter = async (req, res, next) => {
  try {
    const existsTrue = { $exists: true };
    let vivaRef = existsTrue,
      tense = existsTrue,
      grammar = existsTrue;

    if (req.body.vivaRef) {
      vivaRef = JSON.parse(req.body.vivaRef);
    }

    if (req.body.tense) {
      tense = req.body.tense;
    }

    if (req.body.grammar) {
      grammar = req.body.grammar;
    }

    const sentences = await Sentence.aggregate([
      {
        $match: {
          vivaRef,
          tense,
          grammar,
        },
      },
    ]);
    res.status(201).json({
      status: 'success',
      data: sentences,
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

/***********************************************
 * gets a signed URL for upload to S3
 * does NOT follow our typical API response pattern
 */
exports.getS3UploadUrl = async (req, res) => {
  const s3 = new aws.S3();

  // TODO use a per-file filename
  const filename = generateGUID();
  const filetype = 'audio/mpeg';

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
      return res.status(400).end();
    }

    const returnData = {
      signedUrl: data,
      // the final URL is also available with the AWS region in the domain name (seems to be aliased)
      url: `https://${S3_BUCKET}.s3.eu-west-2.amazonaws.com/${filename}`,
      filename,
    };

    res.json(returnData);
  });
};

//GENERATE GUID
function S4() {
  return (((1 + Math.random()) * 0x10000) | 0).toString(16).substring(1);
}

generateGUID = () => (S4() + S4() + S4()).toLowerCase();
