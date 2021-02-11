class APIFeatures {
  constructor(query, queryString) {
    this.query = query;
    this.queryString = queryString;
  }

  filter() {
    // eslint-disable-next-line node/no-unsupported-features/es-syntax
    const queryObj = { ...this.queryString }; // This is done because if you were to delete something from queryObj then it would also be deleted from the request. So you destructure it, and then put it back in an object. Not sure why, as queryObj is a const not a let.
    const excludedFields = ['page', 'sort', 'limit', 'fields'];
    excludedFields.forEach((el) => delete queryObj[el]);

    // ADVANCED QUERY
    let queryStr = JSON.stringify(queryObj);
    queryStr = queryStr.replace(/\b(gte|gt|lte|lt)\b/g, (match) => `$${match}`); //This is a regular expression - searching for those terms in order to preplace them.
    //The \b is to find an exact match, and the g is to make it do multiple matches.
    this.query = this.query.find(JSON.parse(queryStr));

    return this; // You do this so it still has access to the other objects once it has been called
  }

  sort() {
    if (this.queryString.sort) {
      const sortBy = this.queryString.sort.split(',').join(' '); //That split method could be useful for splitting words in the listening game
      this.query = this.query.sort(sortBy); //The sort takes a string with a space between the two fields if you want two levels of sorting
    } else {
      this.query = this.query.sort('vivaRef'); //Default
    }
    return this;
  }

  limitFields() {
    if (this.queryString.fields) {
      const fields = this.queryString.fields.split(',').join(' ');
      this.query = this.query.select(fields); //This also expects a string separated by spaces
    } else {
      this.query = this.query.select('-__v'); //The minus means that the underscore v field is not.
    }

    return this;
  }

  paginate() {
    const page = this.queryString.page * 1 || 1;
    const limit = this.queryString.limit * 1 || 100; //The double line is setting the default value to 1/100
    const skip = (page - 1) * limit;

    this.query = this.query.skip(skip).limit(limit); //The skip skips a number of results, hence why you need the skip formula when you request a page

    return this;
  }
}

module.exports = APIFeatures;
