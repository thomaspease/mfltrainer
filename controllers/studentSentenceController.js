const StudentSentence = require('../models/studentsentencemodel');
const factory = require('./handlerFactory');
const catchAsync = require('../utils/catchAsync');

const StudentTask = require('../models/studenttaskmodel');
const Task = require('../models/taskmodel');

exports.getAllStudentSentences = factory.getAll(StudentSentence);
exports.getStudentSentence = factory.getOne(StudentSentence);

// designed to be called by the StudentTasks routes! before (some, not all) 'PATCH' routes
exports.createStudentSentencesDuringTraining = catchAsync(async (req, res, next) => {
  const studentTask = await StudentTask.findById(req.params.id);
  const task = await Task.findById(studentTask.task[0]); // TODO: should this really be an *array*?

  const student = studentTask.user[0]; // TODO is this really supposed to be an array...?
  const exercise = task.exercise;

  // using a toString because we want to call `includes`, which doesn't give the right result for ObjectId but does work for strings
  const sentenceIds = task.sentences.map((oid) => oid.toString());

  const alreadyInserted = (await StudentSentence.find({student, exercise, sentence:{$in: sentenceIds}}).exec()).map((doc) => doc.sentence.toString());

  const retestDays = 1;
  const retestOn = Date.now() + (retestDays * 24 * 60 * 60 * 1000);

  const newDocs = sentenceIds.filter((id) => !alreadyInserted.includes(id)).map((id) => {
    return {
      sentence: id,
      student,
      retestDays,
      retestOn,
      exercise,
    }
  });

  const inserts = await StudentSentence.insertMany(newDocs);

  next();
});




exports.updateOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
      runValidators: true,
    });

    if (!doc) {
      return next(new AppError('No document found with that ID', 404));
    }

    res.status(200).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });

exports.createOne = (Model) =>
  catchAsync(async (req, res, next) => {
    const doc = await Model.create(req.body);

    res.status(201).json({
      status: 'success',
      data: {
        data: doc,
      },
    });
  });
