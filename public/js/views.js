import { diffWords } from 'diff';

import { sentencetableTemplate } from './templates/sentencetable';

import WaveformPlaylist from 'waveform-playlist';

import audioEncoder from 'audio-encoder';
import fileSaver from 'file-saver';

import axios from 'axios';

class View {
  constructor(baseElement) {
    this.root = baseElement;
    this.elements = {};
    this.elementGroups = {};
    this.listeners = {};
  }

  hideElement(name) {
    this.elements[name].style.display = 'none';
  }

  showElement(name) {
    this.elements[name].style.display = '';
  }

  defineElementGroup(groupName, elementNameArray) {
    this.elementGroups[groupName] = elementNameArray;
  }
  showGroup(groupName) {
    this.elementGroups[groupName].forEach((elementName) =>
      this.showElement(elementName)
    );
  }
  hideGroup(groupName) {
    this.elementGroups[groupName].forEach((elementName) =>
      this.hideElement(elementName)
    );
  }

  get exists() {
    return !!this.root;
  }

  on(event, callback) {
    if (!this.listeners[event]) {
      this.listeners[event] = [];
    }

    this.listeners[event].push(callback);
  }

  trigger(event, data) {
    const listeners = this.listeners[event];
    if (listeners) {
      listeners.forEach((callback) => callback(data));
    }
  }

  eventOnRoot(event, callback) {
    this.root.addEventListener(event, (e) => {
      callback();
    });
  }
}

// FORMS

class FormView extends View {
  onFormData(callback) {
    this.root.addEventListener('submit', (e) => {
      e.preventDefault();

      callback(this.getFormData());
    });
  }

  getFormData() {
    const inputs = Array.from(this.root.querySelectorAll('input'));
    const data = {};

    inputs.forEach((el) => {
      // TODO suggestion from Heather: switch this to always use `name`. I'll have to check with Tom first, though (because it breaks existing code)
      const name = el.name ? el.name : el.id;

      // TODO design question: should we handle situations where there's multiple inputs with the same name? (turn it into an array? ignore them?)
      data[name] = el.value;
    });

    return data;
  }

  clearFormData() {
    const inputs = Array.from(this.root.querySelectorAll('input'));
    inputs.forEach((el) => {
      el.value = '';
    });
  }
}

// GENERIC DOM MANIP

export class LogoutView extends View {}

export class AlertView extends View {
  static hide() {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  }

  // type is 'success' or 'error'
  // returns a promise (that resolves when the alert is hidden by timeout)
  static show(type, msg) {
    this.hide();
    const markup = `<div class="alert alert--${type}">${msg}</div>`;
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        this.hide();
        resolve();
      }, 3000);
    });
  }
}

window.onerror = (err) => AlertView.show('error', err);

export class DataParserView extends View {
  static get(input_name) {
    return JSON.parse(
      document.querySelector(`.js-value[name="${input_name}"]`).value
    );
  }
}

// AUTH VIEWS -----------

export class LoginFormView extends FormView {}

export class SignupFormView extends FormView {}

// CREATE SENTENCE VIEWS --------

export class CreateSentenceFormView extends FormView {}

export class AudioEditorView extends View {
  constructor(element) {
    super(element);

    // gnarly, awkward workaround for the fact that WaveformPlaylist uses eval for something that could have been a member access on window
    // but, we can technically replace `eval` with a function that invokes member access on window, so... that kind of works?
    window.eval = (str) => window[str];

    this.elements.play = this.root.querySelector('.play-button')
    this.elements.save = this.root.querySelector('.save-button')
    this.elements.record = this.root.querySelector('.record-button')

    this.elements.play.addEventListener('click', () => {
      this.ee.emit('play');
    })

    this.elements.save.addEventListener('click', () => {
      this.ee.emit('startaudiorendering', 'buffer');
    })

    this.isRecording = false;

    this.elements.record.addEventListener('click', () => {
      if (this.isRecording) {
        this.isRecording = false;
        this.ee.emit('stop');
        this.elements.record.innerText = 'record';
      } else {
        this.ee.emit('clear');
        this.ee.emit('record');
        this.isRecording = true;
        this.elements.record.innerText = 'stop';
      }
    })

    this.elements.main_block = this.root.querySelector('.editor-container');
    this.hideElement('main_block');

    // this juggling with 'init' might-or-might-not be needed, depending on browser security quirks?
    this.elements.init = this.root.querySelector('.init');
    this.elements.init.addEventListener('click', this.setupEditor.bind(this));
  }

  setupEditor() {
    this.hideElement('init');
    this.showElement('main_block');
    this.playlist = WaveformPlaylist({
      container: this.root.querySelector('.audio-editor'),
      state: 'select',
    })
    this.ee = this.playlist.getEventEmitter();

    navigator.mediaDevices.getUserMedia({audio:true}).then(stream => this.playlist.initRecorder(stream))

    this.playlist.load([
    ]).then(() => {
      this.ee.emit('zoomin')
      this.ee.emit('zoomin')
    })
    this.ee.on('select', (start, end, track) => {
      this.start = start;
      this.end = end;
    })

    this.ee.on('audiorenderingfinished', (type, data) => {
      try {
        const start = Math.floor(this.start * data.sampleRate) || 0;
        const length = (this.end ? Math.floor(this.end * data.sampleRate) : data.length) - start;
        const chan = data.getChannelData(0).slice(start);
        const sampleRate = data.sampleRate;
        const seconds = this.end - this.start;
        const buf = new AudioBuffer({length, sampleRate});

        buf.copyToChannel(chan, 0);

        const bitrate = 96;
        audioEncoder(buf, bitrate, null, async (blob) => {
          this.trigger('save_file', blob)
        });
      } catch (err) {
        AlertView.show('error', err);
      }
    })
  }
}

// CREATE TASK VIEWS --------

class CreateTaskView extends View {
  getValues(selector) {
    const nonToggleInputs = Array.from(
      this.root.querySelectorAll(`${selector}`)
    );
    const data = {};

    nonToggleInputs.forEach((el) => {
      const name = el.name;
      if (el.value) {
        data[name] = el.value;
      }
    });

    return data;
  }
}

export class CreateTaskRandomView extends CreateTaskView {
  constructor(element) {
    super(element);

    //Get inputs (.elements name must match their corresponding switch's name)
    this.elements.vivaRefLow = this.root.querySelector('.vivaref-low');
    this.elements.vivaRefHigh = this.root.querySelector('.vivaref-high');
    this.elements.levelLow = this.root.querySelector('.level-low');
    this.elements.levelHigh = this.root.querySelector('.level-high');

    this.elements.switches = {};
    this.elements.switches.vivaRefLow = this.root
      .querySelector('.check-vivaref-low')
      .getElementsByTagName('input');
    this.elements.switches.vivaRefHigh = this.root
      .querySelector('.check-vivaref-high')
      .getElementsByTagName('input');
    this.elements.switches.levelLow = this.root
      .querySelector('.check-level-low')
      .getElementsByTagName('input');
    this.elements.switches.levelHigh = this.root
      .querySelector('.check-level-high')
      .getElementsByTagName('input');

    const switches = Array.from(
      this.root.querySelectorAll('input[type=checkbox]')
    );

    //Prep DOM
    switches.forEach((e) => this.showHide(e));

    //Add event listener for change
    switches.forEach((e) => {
      e.addEventListener('change', (e) => this.showHide(e.srcElement));
    });
  }

  //Function to return form data on submit

  onCreateTaskRandomValues(callback) {
    this.root.addEventListener('submit', (e) => {
      e.preventDefault();
      const vivaRefRes = this.getUpperLower(
        this.elements.switches.vivaRefLow[0],
        this.elements.switches.vivaRefHigh[0],
        'vivaRef'
      );
      const levelRes = this.getUpperLower(
        this.elements.switches.levelLow[0],
        this.elements.switches.levelHigh[0],
        'level'
      );
      const nonToggleValues = this.getValues('.sentence-details');
      const paramsObject = { ...vivaRefRes, ...levelRes, ...nonToggleValues };
      const params = new URLSearchParams(paramsObject);

      const searchParams = decodeURIComponent(params.toString());
      const taskDetails = this.getValues('.task-details');

      callback(searchParams, taskDetails);
    });
  }

  getUpperLower(checkOne, checkTwo, searchParam) {
    const lowerValue = this.elements[checkOne.name].value;
    const higherValue = this.elements[checkTwo.name].value;

    if (checkTwo.checked) {
      const res = `{"${searchParam}[gte]": ${lowerValue},
		  "${searchParam}[lte]": ${higherValue}}`;
      return JSON.parse(res);
    } else if (checkOne.checked) {
      const res = JSON.parse(`{"${searchParam}" : ${lowerValue}}`);
      return res;
    } else {
      return null;
    }
  }

  showHide(el) {
    if (el.checked) {
      this.showElement(el.name);
    } else {
      this.hideElement(el.name);
    }
  }
}

export class CreateTaskChooseSentenceView extends CreateTaskView {
  constructor(element) {
    super(element);

    this.elements.tableParent = this.root.querySelector(
      '.sentence-table-holder'
    );
    this.elements.saveButton = this.root.querySelector(
      'button.set-tasks-button-choose-sentences'
    );

    this.getFilterElements().forEach((el) => {
      el.addEventListener('change', this.updateFilters.bind(this));
    });

    this.elements.saveButton.addEventListener('click', () =>
      this.trigger('save', {})
    );

    this.elements.tableParent.addEventListener('change', (evt) => {
      if (evt.target.tagName == 'INPUT' && evt.target.type == 'checkbox') {
        const sentenceId = evt.target.dataset.sentence_id;
        if (sentenceId) {
          const triggerType = evt.target.checked
            ? 'add_sentence'
            : 'remove_sentence';
          this.trigger(triggerType, { sentenceId });
        }
      }
    });
  }

  getFilterElements() {
    return Array.from(this.root.querySelectorAll('.filter-selector'));
  }

  updateFilters() {
    const filterState = {};
    this.getFilterElements().filter((el) => el.value != '').forEach((el) => (filterState[el.name] = el.value));

    this.trigger('filter_update', filterState);
  }

  updateDisplay(sentences, toSave) {
    const fields = [
      'grammar',
      'vivaRef',
      'tense',
      'level',
      'sentence',
      'translation',
    ];
    const fieldClasses = {
      grammar: 'narrow',
      vivaRef: 'narrow',
      tense: 'narrow',
      level: 'narrow',
    };

    this.elements.tableParent.innerHTML = sentencetableTemplate({
      fields,
      sentences,
      saved: toSave,
      fieldClasses,
    });
  }
}

// TRAINING VIEW

export class TrainingView extends FormView {
  constructor(element) {
    super(element);

    // get our sub-elements
    this.elements.prompt = this.root.querySelector('.card-title');
    this.elements.input = this.root.querySelector('[name=student_answer]');
    this.elements.answer_feedback = this.root.querySelector('.answer-feedback');
    this.elements.answer_feedback_inner = this.root.querySelector(
      '.answer-feedback-inner'
    );
    this.elements.correct_answer = this.root.querySelector('.correct-answer');
    this.elements.correct_answer_inner = this.root.querySelector(
      '.correct-answer-inner'
    );
    this.elements.right_count = this.root.querySelector('.right-count');
    this.elements.total_count = this.root.querySelector('.total-count');
    this.elements.submit_button = this.root.querySelector(
      'button[type=submit]'
    );
    this.elements.next_button = this.root.querySelector(
      'button[type=button].btn-next'
    );

    this.elements.audio = this.root.querySelector('audio.sentence-audio');
    this.elements.playAudio = this.root.querySelector('.play-audio');

    // define some groups of elements
    this.defineElementGroup('feedback', ['answer_feedback', 'next_button']);
    this.defineElementGroup('dataEntry', ['input', 'submit_button']);

    // prep DOM
    this.hideGroup('feedback');
    this.clearAnswerText();

    // set up event listeners
    this.onFormData((data) => this.handleStudentAnswer(data));
    this.elements.next_button.addEventListener('click', () => {
      this.hideGroup('feedback');
      this.showGroup('dataEntry');

      this.clearAnswerText();

      this.elements.input.focus();

      this.trigger('next');
    });

    // global hotkeys (should be fine, though?)
    document.addEventListener('keydown', (evt) => {
      if (evt.key == '[') {
        evt.preventDefault();
        this.elements.audio.play();
      }
    });

    this.elements.playAudio.addEventListener('click', () => {
      this.elements.audio.play();
    });
  }

  updateCounts(right, total) {
    this.elements.right_count.innerText = right;
    this.elements.total_count.innerText = total;
  }

  clearAnswerText() {
    this.elements.input.value = '';
    this.elements.correct_answer_inner.innerText = '';
  }

  handleStudentAnswer({ student_answer }) {
    // CALCULATE VARIOUS DATA (maybe could live outside of the View layer?)

    function normalize(str) {
      // normalize to ONLY letters and numbers (cross-language), lowercase
      // this'll require fairly modern JS, incidentally
      return str.replace(/[^\p{Letter}\p{Number}]/giu, '').toLowerCase();
    }

    // TODO DESIGN QUESTION: where should isCorrect be calculated? what code owns that logic?
    const isCorrect = normalize(student_answer) == normalize(this.answer);

    const diffs = diffWords(this.answer, student_answer, { ignoreCase: true });

    // DISPLAY CALCULATED DATA
    {
      // NOTE from Heather to Tom:
      //   this method call looks a little over-fancy. feel free to refactor into something easier to read. hopefully I've added enough comments to make it understandable?
      this.setAsHighlightedSpan(
        // element name
        'answer_feedback_inner',
        // pass only the diff entries that we want to display
        diffs.filter((diff) => !diff.removed),
        // CSS class name callback
        (diff) => (diff.added ? 'highlight-wrong' : 'highlight-right')
      );

      this.setAsHighlightedSpan(
        'correct_answer_inner',
        diffs.filter((diff) => !diff.added),
        (diff) => (diff.removed ? 'highlight-wrong' : 'highlight-right')
      );
    }

    // SET UP DOM STATE
    {
      this.hideGroup('dataEntry');
      this.showGroup('feedback');

      this.elements.next_button.focus();

      this.trigger('answer', { student_answer, isCorrect });
    }
  }

  // this method replaces the content of an element with a set of highlighted/styled spans, such as you might want if you're presenting diff output.
  // also, this could live in one of the parent classes, if it ends up being useful elsewhere.
  //
  // `elementName` is the string name of some element that this view tracks
  // `array` is expected to be an array of items with at least a `value` property
  // `classNameCallback` is a callback that spits out the CSS classes, space-separated, that go with each entry of the array
  setAsHighlightedSpan(elementName, array, classNameCallback) {
    const baseEl = this.elements[elementName];

    // keep track of the index so that we can do a .innerText later (thus bypassing issues with HTML injection / XSS)
    const spans = array.map((entry, index) => {
      const elClass = classNameCallback(entry);
      // using some index-juggling in order to avoid having to worry about HTML injection
      return `<span class="${elClass}">${index}</span>`;
    });

    baseEl.innerHTML = spans.join('');

    // now we can safely assign user-defined text, via `.innerText` (which doesn't get parsed as HTML)
    Array.from(baseEl.querySelectorAll('span')).forEach((span) => {
      span.innerText = array[span.innerText].value;
    });
  }

  finish() {
    this.prompt = 'done';
    this.hideGroup('dataEntry');
    this.hideGroup('feedback');
  }

  get prompt() {
    return this.elements.prompt.innerText;
  }

  set prompt(value) {
    return (this.elements.prompt.innerText = value);
  }

  get audioUrl() {
    return this.elements.audio.src;
  }

  set audioUrl(value) {
    return (this.elements.audio.src = value);
  }
}

//DELETE

export class DeleteView extends View {
  constructor(element) {
    super(element);

    var deleteBox =
      '<span class="deleteBox"><p>Are you sure you want to delete?</p><span class="button cancel">Cancel</span><span class="button confirm">Yes</span></span>';

    this.root.insertAdjacentHTML('beforeend', deleteBox);

    this.root.addEventListener('click', (evt) => {
      // use a different set of event-handling for anything marked as a button
      if (evt.target.classList.contains('button')) {
        if (evt.target.classList.contains('cancel')) {
          this.root.classList.remove('selected');
        } else if (evt.target.classList.contains('confirm')) {
          // deletion logic goes in this branch.

          var row = evt.target;
          while (row.tagName != 'TR') {
            row = row.parentNode;
          }

          deleteRow(row);
        }
        return false;
      }

      // not a button, so show the deleteBox (if not already shown)
      this.root.classList.add('selected');
      return false;
    });

  }

  deleteRow(row) {
    row.classList.add('loading');

    // TODO replace fakeAjax with an actual API call
    const fakeAjax = new Promise((resolve, reject) => {
      setTimeout(resolve, 500);
    })

    fakeAjax.then(() => {
      row.classList.add('deleted');
      setTimeout(() => {
        row.remove();
      }, 500);
    })
  }
}
