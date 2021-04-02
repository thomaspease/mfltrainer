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
  }

  get exists() {
    return !!this.root;
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
      this.hideAlert();
    }, 3000);
  }

}

exports.AlertView = AlertView;

class DataParserView extends View {
  static get(input_name) {
    return JSON.parse(document.querySelector(".js-value[name=\"".concat(input_name, "\"]")).value);
  }

} // SPECIFIC PAGES


exports.DataParserView = DataParserView;

class TrainingView extends View {
  constructor() {
    super('.card__exercise');
    this.elements.prompt = this.root.querySelector('.card-title');
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

    const sentences = _models.SentenceModel.getLocal('sentences');

    const trainTask = new _views.TrainingView();
    console.log(sentences);
    trainTask.prompt = sentences[0].data.sentence;
  }

}

exports.TrainController = TrainController;
},{"./views.js":"views.js","./models.js":"models.js"}],"app.js":[function(require,module,exports) {
"use strict";

var _controllers = require("./controllers.js");

// TODO decide if this file needs to be any fancier?
alert('test');
const loginController = new _controllers.LoginController();
const trainController = new _controllers.TrainController();
},{"./controllers.js":"controllers.js"}],"../../../../.nvm/versions/node/v14.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
var global = arguments[3];
var OVERLAY_ID = '__parcel__error__overlay__';
var OldModule = module.bundle.Module;

function Module(moduleName) {
  OldModule.call(this, moduleName);
  this.hot = {
    data: module.bundle.hotData,
    _acceptCallbacks: [],
    _disposeCallbacks: [],
    accept: function (fn) {
      this._acceptCallbacks.push(fn || function () {});
    },
    dispose: function (fn) {
      this._disposeCallbacks.push(fn);
    }
  };
  module.bundle.hotData = null;
}

module.bundle.Module = Module;
var checkedAssets, assetsToAccept;
var parent = module.bundle.parent;

if ((!parent || !parent.isParcelRequire) && typeof WebSocket !== 'undefined') {
  var hostname = "" || location.hostname;
  var protocol = location.protocol === 'https:' ? 'wss' : 'ws';
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "45795" + '/');

  ws.onmessage = function (event) {
    checkedAssets = {};
    assetsToAccept = [];
    var data = JSON.parse(event.data);

    if (data.type === 'update') {
      var handled = false;
      data.assets.forEach(function (asset) {
        if (!asset.isNew) {
          var didAccept = hmrAcceptCheck(global.parcelRequire, asset.id);

          if (didAccept) {
            handled = true;
          }
        }
      }); // Enable HMR for CSS by default.

      handled = handled || data.assets.every(function (asset) {
        return asset.type === 'css' && asset.generated.js;
      });

      if (handled) {
        console.clear();
        data.assets.forEach(function (asset) {
          hmrApply(global.parcelRequire, asset);
        });
        assetsToAccept.forEach(function (v) {
          hmrAcceptRun(v[0], v[1]);
        });
      } else if (location.reload) {
        // `location` global exists in a web worker context but lacks `.reload()` function.
        location.reload();
      }
    }

    if (data.type === 'reload') {
      ws.close();

      ws.onclose = function () {
        location.reload();
      };
    }

    if (data.type === 'error-resolved') {
      console.log('[parcel] ✨ Error resolved');
      removeErrorOverlay();
    }

    if (data.type === 'error') {
      console.error('[parcel] 🚨  ' + data.error.message + '\n' + data.error.stack);
      removeErrorOverlay();
      var overlay = createErrorOverlay(data);
      document.body.appendChild(overlay);
    }
  };
}

function removeErrorOverlay() {
  var overlay = document.getElementById(OVERLAY_ID);

  if (overlay) {
    overlay.remove();
  }
}

function createErrorOverlay(data) {
  var overlay = document.createElement('div');
  overlay.id = OVERLAY_ID; // html encode message and stack trace

  var message = document.createElement('div');
  var stackTrace = document.createElement('pre');
  message.innerText = data.error.message;
  stackTrace.innerText = data.error.stack;
  overlay.innerHTML = '<div style="background: black; font-size: 16px; color: white; position: fixed; height: 100%; width: 100%; top: 0px; left: 0px; padding: 30px; opacity: 0.85; font-family: Menlo, Consolas, monospace; z-index: 9999;">' + '<span style="background: red; padding: 2px 4px; border-radius: 2px;">ERROR</span>' + '<span style="top: 2px; margin-left: 5px; position: relative;">🚨</span>' + '<div style="font-size: 18px; font-weight: bold; margin-top: 20px;">' + message.innerHTML + '</div>' + '<pre>' + stackTrace.innerHTML + '</pre>' + '</div>';
  return overlay;
}

function getParents(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return [];
  }

  var parents = [];
  var k, d, dep;

  for (k in modules) {
    for (d in modules[k][1]) {
      dep = modules[k][1][d];

      if (dep === id || Array.isArray(dep) && dep[dep.length - 1] === id) {
        parents.push(k);
      }
    }
  }

  if (bundle.parent) {
    parents = parents.concat(getParents(bundle.parent, id));
  }

  return parents;
}

function hmrApply(bundle, asset) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (modules[asset.id] || !bundle.parent) {
    var fn = new Function('require', 'module', 'exports', asset.generated.js);
    asset.isNew = !modules[asset.id];
    modules[asset.id] = [fn, asset.deps];
  } else if (bundle.parent) {
    hmrApply(bundle.parent, asset);
  }
}

function hmrAcceptCheck(bundle, id) {
  var modules = bundle.modules;

  if (!modules) {
    return;
  }

  if (!modules[id] && bundle.parent) {
    return hmrAcceptCheck(bundle.parent, id);
  }

  if (checkedAssets[id]) {
    return;
  }

  checkedAssets[id] = true;
  var cached = bundle.cache[id];
  assetsToAccept.push([bundle, id]);

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    return true;
  }

  return getParents(global.parcelRequire, id).some(function (id) {
    return hmrAcceptCheck(global.parcelRequire, id);
  });
}

function hmrAcceptRun(bundle, id) {
  var cached = bundle.cache[id];
  bundle.hotData = {};

  if (cached) {
    cached.hot.data = bundle.hotData;
  }

  if (cached && cached.hot && cached.hot._disposeCallbacks.length) {
    cached.hot._disposeCallbacks.forEach(function (cb) {
      cb(bundle.hotData);
    });
  }

  delete bundle.cache[id];
  bundle(id);
  cached = bundle.cache[id];

  if (cached && cached.hot && cached.hot._acceptCallbacks.length) {
    cached.hot._acceptCallbacks.forEach(function (cb) {
      cb();
    });

    return true;
  }
}
},{}]},{},["../../../../.nvm/versions/node/v14.16.0/lib/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","app.js"], null)
//# sourceMappingURL=/bundle.js.map