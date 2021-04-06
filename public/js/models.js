import { AlertView, DataParserView } from './views.js';
import axios from 'axios';

class ModelApiError extends Error {}

// parent class for models. includes some utility methods, and such
//
// if we wanted to get fancy, we might consider picking up the mongoose model definitions, and making use of that somehow.
// but, that seems like it might take more effort than it's worth, at least until we start needing client-side validation
class Model {
  constructor(data) {
    this.data = data;
  }

  // can throw, catch in the Controller layer
  static async sendApiRequest(url, data) {
    try {
      const res = await axios({
        method: 'POST',
        url,
        data,
      });
      if (res.data.status == 'success') {
        return res;
      }

      // TODO question for Tom: what should we pass as the error message here?
      throw new ModelApiError("API failure");
    } catch (err) {
      throw new ModelApiError(err.response.data.message);
    }
  }

  // returns an array of instantiated objects, based on JSON embedded in a specific DOM element
  static getLocal(name) {
    // this is *maybe* not as theoretically clean to have a Model call into a View, but since we're storing global data in certain DOM elements, it works well in practice

    var data = DataParserView.get(name);
    if (!(data instanceof Array)) {
      data = [data];
    }
    return data.map((single) => new this(single));
  }
}

export class AuthModel extends Model {
  static async login(email, password) {
    return this.sendApiRequest(
      'api/v1/users/login',
      { email, password }
    );
  }
}

export class CreateSentenceModel extends Model {
  // can throw, catch in the Controller layer
  static async create(sentence, translation, level, vivaRef, tense, grammar) {
    const data = {
      sentence,
      translation,
      level,
      vivaRef,
      grammar,
      tense,
    };

    return this.sendApiRequest(
      '/api/v1/sentences',
      data,
    );
  }
}

// TODO maybe move some of the data from the controller into this?
export class StudentResultsModel extends Model {
  static async sendResults(correctCount, wrongCount, studentSentences) {
    const payload = {
      correctCount: this.correctCount,
      wrongCount: this.wrongCount,
      studentSentences: this.finishedSentences,
    };

    return this.sendApiRequest(
      'TODO-PLACEHOLDER',
      payload
    );
  }
}

export class SentenceModel extends Model {
  // type is 'gap' or 'translation'
  subclassAs(type) {
    switch (type) {
      case 'gap':
        return new GappedSentenceModel(this.data);
      case 'translation':
        return new TranslationSentenceModel(this.data);
    }
  }
  get prompt() {
    return this.data.sentence;
  }

  get answer() {
    return this.data.translation;
  }
}

class GappedSentenceModel extends SentenceModel {
  constructor(data) {
    super(data);

    const words = this.data.sentence.trim().split(/\s+/g);
    const gapIndex = Math.floor(Math.random() * words.length);

    // TODO handle punctuation
    const gapWord = words[gapIndex];
    words[gapIndex] = '___';

    this.gapWord = gapWord;
    this.gappedPrompt = words.join(' ');
  }

  get prompt() {
    return this.gappedPrompt;
  }

  get answer() {
    return this.gapWord;
  }
}

class TranslationSentenceModel extends SentenceModel {}
