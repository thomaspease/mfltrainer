// modules are defined as an array
// [ module function, map of requires ]
//
// map of requires is short require name -> numeric require
//
// anything defined in a previous bundle is accessed via the
// orig method which is the require for previous bundles
parcelRequire = (function (modules, cache, entry, globalName) {
  // Save the require from previous bundle to this closure if any
  var previousRequire = typeof parcelRequire === 'function' && parcelRequire;
  var nodeRequire = typeof require === 'function' && require;

  function newRequire(name, jumped) {
    if (!cache[name]) {
      if (!modules[name]) {
        // if we cannot find the module within our internal map or
        // cache jump to the current global require ie. the last bundle
        // that was added to the page.
        var currentRequire = typeof parcelRequire === 'function' && parcelRequire;
        if (!jumped && currentRequire) {
          return currentRequire(name, true);
        }

        // If there are other bundles on this page the require from the
        // previous one is saved to 'previousRequire'. Repeat this as
        // many times as there are bundles until the module is found or
        // we exhaust the require chain.
        if (previousRequire) {
          return previousRequire(name, true);
        }

        // Try the node require function if it exists.
        if (nodeRequire && typeof name === 'string') {
          return nodeRequire(name);
        }

        var err = new Error('Cannot find module \'' + name + '\'');
        err.code = 'MODULE_NOT_FOUND';
        throw err;
      }

      localRequire.resolve = resolve;
      localRequire.cache = {};

      var module = cache[name] = new newRequire.Module(name);

      modules[name][0].call(module.exports, localRequire, module, module.exports, this);
    }

    return cache[name].exports;

    function localRequire(x){
      return newRequire(localRequire.resolve(x));
    }

    function resolve(x){
      return modules[name][1][x] || x;
    }
  }

  function Module(moduleName) {
    this.id = moduleName;
    this.bundle = newRequire;
    this.exports = {};
  }

  newRequire.isParcelRequire = true;
  newRequire.Module = Module;
  newRequire.modules = modules;
  newRequire.cache = cache;
  newRequire.parent = previousRequire;
  newRequire.register = function (id, exports) {
    modules[id] = [function (require, module) {
      module.exports = exports;
    }, {}];
  };

  var error;
  for (var i = 0; i < entry.length; i++) {
    try {
      newRequire(entry[i]);
    } catch (e) {
      // Save first error but execute all entries
      if (!error) {
        error = e;
      }
    }
  }

  if (entry.length) {
    // Expose entry point to Node, AMD or browser globals
    // Based on https://github.com/ForbesLindesay/umd/blob/master/template.js
    var mainExports = newRequire(entry[entry.length - 1]);

    // CommonJS
    if (typeof exports === "object" && typeof module !== "undefined") {
      module.exports = mainExports;

    // RequireJS
    } else if (typeof define === "function" && define.amd) {
     define(function () {
       return mainExports;
     });

    // <script>
    } else if (globalName) {
      this[globalName] = mainExports;
    }
  }

  // Override the current require with this new one
  parcelRequire = newRequire;

  if (error) {
    // throw error from earlier, _after updating parcelRequire_
    throw error;
  }

  return newRequire;
})({"views.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrainingView = exports.DataParserView = exports.AlertView = exports.LoginFormView = void 0;

class View {
  constructor(baseElementSelector) {
    this.root = document.querySelector(baseElementSelector);
    this.elements = {};
    this.listeners = {};
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
      listeners.forEach(callback => callback(data));
    }
  }

} // FORMS


class FormView extends View {
  overrideSubmit(callback) {
    this.root.addEventListener('submit', e => {
      e.preventDefault();
      callback(this.getFormData());
    });
  }

  getFormData() {
    const inputs = Array.from(this.root.querySelectorAll('input'));
    const data = {};
    inputs.forEach(el => {
      // TODO suggestion from Heather: switch this to always use `name`. I'll have to check with Tom first, though (because it breaks existing code)
      const name = el.name ? el.name : el.id; // TODO design question: should we handle situations where there's multiple inputs with the same name? (turn it into an array? ignore them?)

      data[name] = el.value;
    });
    return data;
  }

}

class LoginFormView extends FormView {
  constructor() {
    super('.form--login');
  }

} // GENERIC DOM MANIP


exports.LoginFormView = LoginFormView;

class AlertView extends View {
  static hide() {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  } // type is 'success' or 'error'


  static show(type, msg) {
    this.hide();
    const markup = "<div class=\"alert alert--".concat(type, "\">").concat(msg, "</div>");
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    window.setTimeout(() => {
      this.hide();
    }, 3000);
  }

}

exports.AlertView = AlertView;

window.onerror = err => AlertView.show('error', err);

class DataParserView extends View {
  static get(input_name) {
    return JSON.parse(document.querySelector(".js-value[name=\"".concat(input_name, "\"]")).value);
  }

} // SPECIFIC PAGES


exports.DataParserView = DataParserView;

class TrainingView extends FormView {
  constructor() {
    super('form.card');
    this.elements.prompt = this.root.querySelector('.card-title');
    this.elements.input = this.root.querySelector('[name=student_answer]');
    this.elements.answer_feedback = this.root.querySelector('.answer-feedback');
    this.overrideSubmit((_ref) => {
      let {
        student_answer
      } = _ref;

      function normalize(str) {
        return str.toLowerCase().trim().replace(/\s+/g, ' ');
      } // TODO DESIGN QUESTION: where should isCorrect be calculated? what code owns that logic?


      const isCorrect = normalize(student_answer) == normalize(this.answer);
      this.elements.answer_feedback.innerText = this.answer;
      this.elements.input.disabled = 'disabled';

      try {
        this.trigger('answer', {
          student_answer,
          isCorrect
        });
      } catch (err) {
        alert(err);
      } finally {
        setTimeout(() => {
          this.elements.input.disabled = undefined;
          this.elements.input.value = '';
          this.trigger('next');
        }, 1000);
      }
    });
  }

  finish() {
    this.prompt = 'done';
    this.elements.input.disabled = 'disabled';
  }

  get prompt() {
    return this.elements.prompt.innerText;
  }

  set prompt(value) {
    return this.elements.prompt.innerText = value;
  }

}

exports.TrainingView = TrainingView;
},{}],"models.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SentenceModel = exports.AuthModel = void 0;

var _views = require("./views.js");

// parent class for models. includes some utility methods, and such
// 
// if we wanted to get fancy, we might consider picking up the mongoose model definitions, and making use of that somehow.
// but, that seems like it might take more effort than it's worth, at least until we start needing client-side validation
class Model {
  constructor(data) {
    this.data = data;
  } // returns an array of instantiated objects, based on JSON embedded in a specific DOM element


  static getLocal(name) {
    // this is *maybe* not as theoretically clean to have a Model call into a View, but since we're storing global data in certain DOM elements, it works well in practice
    var data = _views.DataParserView.get(name);

    if (!(data instanceof Array)) {
      data = [data];
    }

    return data.map(single => new this(single));
  }

}

class AuthModel extends Model {
  static async login(email, password) {
    try {
      const res = await fetch('api/v1/users/login', {
        method: "POST",
        body: JSON.stringify({
          email,
          password
        }),
        headers: {
          "Content-Type": "application/json"
        }
      });

      if (res.status == 200) {
        _views.AlertView.show('success', 'Logged in successfully!');

        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      }
    } catch (err) {
      // TODO double-check the Fetch equivalent to Axios's `err.response.data.message`
      _views.AlertView.show('error', err.response.data.message);
    }
  }

}

exports.AuthModel = AuthModel;

class SentenceModel extends Model {}

exports.SentenceModel = SentenceModel;
},{"./views.js":"views.js"}],"controllers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrainController = exports.LoginController = void 0;

var _views = require("./views.js");

var _models = require("./models.js");

// parent class for controllers. Not much needs to be in here, I don't think, so leave it empty.
class Controller {}

class LoginController extends Controller {
  constructor() {
    super();
    const loginForm = new _views.LoginFormView(); // DELEGATION
    //Login

    if (loginForm.exists) {
      console.log('hello from index.js');
      loginForm.overrideSubmit((_ref) => {
        let {
          email,
          password
        } = _ref;

        _models.AuthModel.login(email, password);
      });
    }
  }

}

exports.LoginController = LoginController;

class TrainController extends Controller {
  constructor() {
    super();
    const desiredReaskLength = 3;

    const sentences = _models.SentenceModel.getLocal('sentences');

    const finishedSentences = [];
    const trainTask = new _views.TrainingView();
    console.log(sentences);
    const initialCount = sentences.length;
    var rightCount = 0;
    var wrongCount = 0; // TODO DESIGN QUESTION:
    //  should we calculate isCorrect inside the view? That would break separation of concerns, but would involve a smaller amount of back-and-forth data calls
    //  but, on the flip side, the controller needing to know exactly what to update in the view is *also* a bit of a conceptual leak...

    trainTask.on('answer', (_ref2) => {
      let {
        student_answer,
        isCorrect
      } = _ref2;
      const sentenceObject = sentences.shift();
      finishedSentences.push({
        sentenceObject,
        isCorrect
      });

      if (isCorrect) {
        rightCount++;
      } else {
        wrongCount++;
        const insertionIndex = Math.min(sentences.length, desiredReaskLength);
        sentences.splice(insertionIndex, 0, sentenceObject);
      }
    });
    trainTask.on('next', doNextSentence);

    function doNextSentence() {
      if (!sentences[0]) {
        trainTask.finish();
        return;
      }

      const sentenceData = sentences[0].data;
      trainTask.prompt = sentenceData.sentence;
      trainTask.answer = sentenceData.translation;
    }

    doNextSentence();
  }

}

exports.TrainController = TrainController;
},{"./views.js":"views.js","./models.js":"models.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _controllers = require("./controllers.js");

// TODO decide if this file needs to be any fancier?
const loginController = new _controllers.LoginController();
const trainController = new _controllers.TrainController();
},{"./controllers.js":"controllers.js"}]},{},["app.js"], null)
//# sourceMappingURL=/js/bundle.js.map