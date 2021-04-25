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
  static async sendApiRequest(url, method, data) {
    try {
      const res = await axios({
        method,
        url,
        data,
      });
      if (res.data.status == 'success') {
        return res;
      }

      // TODO question for Tom: what should we pass as the error message here?
      throw new ModelApiError('API failure');
    } catch (err) {
      throw new ModelApiError(err.response.data.message);
    }
  }

  // expects searchParams to be of type URLSearchParams
  static async loadFromServer(searchParams) {
    const response = await this.sendApiRequest(
      this.apiUrl() + '?' + searchParams.toString(),
      'GET',
    );

    const objects = response.data.data.map((row) => new this(row));
    return objects;
  }

  static async fetchAll() {
    return await this.loadFromServer(new URLSearchParams({}));
  }

  // default API URL and database name (i.e., table), which will work for *most* classes
  static apiUrl() {
    return `/api/v1/${this.dbName()}`;
  }
  static dbName() {
    return this.name.toLowerCase().replace(/model$/, 's');
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
    return this.sendApiRequest('api/v1/users/login', 'POST', {
      email,
      password,
    });
  }

  static async logout() {
    return this.sendApiRequest('/api/v1/users/logout', 'GET');
  }

  static async signup(name, email, password, passwordConfirm, classCode) {
    return this.sendApiRequest('/api/v1/users/signup', 'POST', {
      name,
      email,
      password,
      passwordConfirm,
      classCode,
    });
  }
}

export class CreateTaskModel extends Model {}

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

    return this.sendApiRequest('/api/v1/sentences', 'POST', data);
  }
}

// TODO maybe move some of the data from the controller into this?
export class StudentResultsModel extends Model {
  static async send(correctCount, wrongCount, taskURL) {
    const payload = {
      correctCount: this.correctCount,
      wrongCount: this.wrongCount,
      percentCorrect:
        (this.correctCount / (this.correctCount + this.wrongCount)) * 100,
      completed: true,
    };

    console.log(correctCount);
    console.log(this.correctCount);

    // return this.sendApiRequest(
    //   `/api/v1/studenttasks/${taskURL}`,
    //   'PATCH',
    //   payload
    // );
  }
}

export class SentenceModel extends Model {
  // type is 'gapped' or 'translation'
  subclassAs(type) {
    switch (type) {
      case 'gapped':
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

  get audioUrl() {
    return this.data.audio;
  }

  static async uploadAudioFile(blob) {
    // this could maybe use sendApiRequest instead? although the response IS in a different format than normal...
    const authedResponse = await axios({
      method: 'GET',
      url: '/api/v1/sentences/audio-upload-url',
    });

    const {signedUrl} = authedResponse.data;

    // this shouldn't go thorugh sendApiRequest, because it's rather different than a typical request (and not even on the same domain)
    const uploadResponse = await axios({
      method: 'PUT',
      url: signedUrl,
      data: blob,
      headers: {
        'Content-Type': 'audio/mpeg'
      },
    });
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
