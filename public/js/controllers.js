import {
  LoginFormView,
  TrainingView,
  CreateSentenceFormView,
  AlertView,
} from './views.js';
import {
  AuthModel,
  SentenceModel,
  CreateSentenceModel,
  StudentResultsModel,
} from './models.js';

// parent class for controllers. Not much needs to be in here, I don't think, so leave it empty.
class Controller {
  constructor(viewBaseElement) {
    const viewClass = this.getViewClass();
    this.view = new viewClass(viewBaseElement);
  }
}

export class LoginController extends Controller {
  getViewClass() {
    return LoginFormView;
  }

  constructor(...args) {
    super(...args);

    this.view.onFormData(async ({ email, password }) => {
      try {
        await AuthModel.login(email, password);

        AlertView.show('success', 'Logged in successfully!');
        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      } catch(err) {
        AlertView.show('error', err.message);
      }
    });
  }
}

export class CreateSentenceController extends Controller {
  getViewClass() {
    return CreateSentenceFormView;
  }

  constructor(...args) {
    super(...args);

    this.view.onFormData(
      async ({ sentence, translation, level, vivaRef, tense, grammar }) => {
        try {
          const res = await CreateSentenceModel.create(
            sentence,
            translation,
            level,
            vivaRef,
            tense,
            grammar
          );
          this.view.clearFormData();
          AlertView.show('success', 'Sentence created');
        } catch(err) {
          AlertView.show('error', err.message);
        }
      }
    );
  }
}

export class TrainController extends Controller {
  getViewClass() {
    return TrainingView;
  }

  constructor(...args) {
    super(...args);

    this.sentences = SentenceModel.getLocal('sentences').map((sent) =>
      sent.subclassAs('translation')
    );
    this.finishedSentences = [];

    this.initialCount = this.sentences.length;

    this.rightCount = 0;
    this.wrongCount = 0;

    this.view.on('answer', this.doAnswer.bind(this));
    this.view.on('next', this.doNextSentence.bind(this));

    this.doNextSentence();
  }

  doAnswer({ student_answer, isCorrect }) {
    const desiredReaskLength = 3;

    const sentenceObject = this.sentences.shift();
    this.finishedSentences.push({
      sentence: sentenceObject.data,
      student_answer,
      isCorrect,
    });

    if (isCorrect) {
      this.rightCount++;
    } else {
      this.wrongCount++;

      const insertionIndex = Math.min(
        this.sentences.length,
        desiredReaskLength
      );
      this.sentences.splice(insertionIndex, 0, sentenceObject);
    }

    console.log(this.sentences);
    console.log(this.finishedSentences);
  }

  doNextSentence() {
    if (!this.sentences[0]) {
      this.view.finish();
      // empty 'then' just so we trigger the async function
      this.sendResultsToServer().then((_) => _);
      return;
    }

    const sentence = this.sentences[0];

    this.view.prompt = sentence.prompt;
    this.view.answer = sentence.answer;
  }

  async sendResultsToServer() {
    try {
      StudentResultsModel.send(this.correctCount, this.wrongCount, this.finishedSentences)
      // do we need to show feedback or anything?
    } catch(err) {
      AlertView.show('error', err.message);
    }
  }
}
