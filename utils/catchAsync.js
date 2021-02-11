//Here you need to return an anonymous function, which express can call, rather than just calling it straight away, which is what would happen if you passed the function straight into it

const catchAsync = (fn) => {
  return (req, res, next) => {
    fn(req, res, next).catch(next);
  };
};

module.exports = catchAsync;
