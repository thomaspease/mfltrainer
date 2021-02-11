const Class = require('../models/classmodel');
const factory = require('./handlerFactory');

//Unfinished

exports.getAllClasses = factory.getAll(Class);
exports.createClass = factory.createOne(Class);
exports.getClass = factory.getOne(Class);
exports.updateClass = factory.updateOne(Class);
exports.deleteClass = factory.deleteOne(Class);
