require("core-js/modules/es.array.for-each.js");
require("core-js/modules/es.array.from.js");
require("core-js/modules/es.string.iterator.js");
require("core-js/modules/web.dom-collections.for-each.js");
require("core-js/modules/es.array.concat.js");
require("core-js/modules/es.array.filter.js");
require("core-js/modules/es.array.find.js");
require("core-js/modules/es.array.map.js");
require("core-js/modules/es.array.splice.js");
require("core-js/modules/es.date.now.js");
require("core-js/modules/es.date.to-string.js");
require("core-js/modules/es.function.bind.js");
require("core-js/modules/es.function.name.js");
require("core-js/modules/es.object.to-string.js");
require("core-js/modules/es.promise.js");
require("core-js/modules/web.timers.js");
require("regenerator-runtime/runtime.js");
require("core-js/modules/es.array.fill.js");
require("core-js/modules/es.array.includes.js");
require("core-js/modules/es.array.iterator.js");
require("core-js/modules/es.array.join.js");
require("core-js/modules/es.array.slice.js");
require("core-js/modules/es.object.define-property.js");
require("core-js/modules/es.regexp.exec.js");
require("core-js/modules/es.regexp.to-string.js");
require("core-js/modules/es.string.includes.js");
require("core-js/modules/es.string.replace.js");
require("core-js/modules/es.string.starts-with.js");
require("core-js/modules/es.string.trim.js");
require("core-js/modules/web.dom-collections.iterator.js");
require("core-js/modules/web.url.js");
var $fd6lr$waveformplaylist = require("waveform-playlist");
var $fd6lr$audioencoder = require("audio-encoder");
var $fd6lr$filesaver = require("file-saver");
var $fd6lr$axios = require("axios");
require("core-js/modules/es.regexp.constructor.js");
require("core-js/modules/es.string.split.js");
var $fd6lr$diff = require("diff");
require("core-js/modules/es.symbol.js");
require("core-js/modules/es.symbol.description.js");
require("core-js/modules/es.symbol.iterator.js");
require("core-js/modules/es.array.index-of.js");
require("core-js/modules/es.array.is-array.js");
require("core-js/modules/es.date.to-json.js");
require("core-js/modules/web.url.to-json.js");
require("core-js/modules/es.object.get-prototype-of.js");
require("core-js/modules/es.object.set-prototype-of.js");

var $parcel$global =
typeof globalThis !== 'undefined'
  ? globalThis
  : typeof self !== 'undefined'
  ? self
  : typeof window !== 'undefined'
  ? window
  : typeof global !== 'undefined'
  ? global
  : {};
var $parcel$modules = {};
var $parcel$inits = {};

var parcelRequire = $parcel$global["parcelRequire4ed8"];
if (parcelRequire == null) {
  parcelRequire = function(id) {
    if (id in $parcel$modules) {
      return $parcel$modules[id].exports;
    }
    if (id in $parcel$inits) {
      var init = $parcel$inits[id];
      delete $parcel$inits[id];
      var module = {id: id, exports: {}};
      $parcel$modules[id] = module;
      init.call(module.exports, module, module.exports);
      return module.exports;
    }
    var err = new Error("Cannot find module '" + id + "'");
    err.code = 'MODULE_NOT_FOUND';
    throw err;
  };

  parcelRequire.register = function register(id, init) {
    $parcel$inits[id] = init;
  };

  $parcel$global["parcelRequire4ed8"] = parcelRequire;
}
"use strict";
function $0f0f5101ba87ec54$var$_typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $0f0f5101ba87ec54$var$_typeof = function _typeof(obj1) {
        return typeof obj1;
    };
    else $0f0f5101ba87ec54$var$_typeof = function _typeof1(obj1) {
        return obj1 && typeof Symbol === "function" && obj1.constructor === Symbol && obj1 !== Symbol.prototype ? "symbol" : typeof obj1;
    };
    return $0f0f5101ba87ec54$var$_typeof(obj);
}




parcelRequire.register("16ESw", function(module, exports) {
"use strict";
function $0ce60f95bb1e0854$var$_typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $0ce60f95bb1e0854$var$_typeof = function _typeof(obj1) {
        return typeof obj1;
    };
    else $0ce60f95bb1e0854$var$_typeof = function _typeof1(obj1) {
        return obj1 && typeof Symbol === "function" && obj1.constructor === Symbol && obj1 !== Symbol.prototype ? "symbol" : typeof obj1;
    };
    return $0ce60f95bb1e0854$var$_typeof(obj);
}














Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.DeleteController = module.exports.CreateTaskChooseSentenceController = module.exports.ReviseController = module.exports.TrainController = module.exports.CreateTaskRandomController = module.exports.AudioEditorController = module.exports.CreateSentenceController = module.exports.TagInputController = module.exports.SignupController = module.exports.LogoutController = module.exports.LoginController = void 0;


var $2R31P = parcelRequire("2R31P");

var $dy1TU = parcelRequire("dy1TU");
function $0ce60f95bb1e0854$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $0ce60f95bb1e0854$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) $0ce60f95bb1e0854$var$ownKeys(Object(source), true).forEach(function(key) {
            $0ce60f95bb1e0854$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $0ce60f95bb1e0854$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $0ce60f95bb1e0854$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $0ce60f95bb1e0854$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $0ce60f95bb1e0854$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $0ce60f95bb1e0854$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $0ce60f95bb1e0854$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $0ce60f95bb1e0854$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $0ce60f95bb1e0854$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $0ce60f95bb1e0854$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $0ce60f95bb1e0854$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}
function $0ce60f95bb1e0854$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) $0ce60f95bb1e0854$var$_setPrototypeOf(subClass, superClass);
}
function $0ce60f95bb1e0854$var$_setPrototypeOf(o, p) {
    $0ce60f95bb1e0854$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o1, p1) {
        o1.__proto__ = p1;
        return o1;
    };
    return $0ce60f95bb1e0854$var$_setPrototypeOf(o, p);
}
function $0ce60f95bb1e0854$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $0ce60f95bb1e0854$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = $0ce60f95bb1e0854$var$_getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $0ce60f95bb1e0854$var$_getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $0ce60f95bb1e0854$var$_possibleConstructorReturn(this, result);
    };
}
function $0ce60f95bb1e0854$var$_possibleConstructorReturn(self, call) {
    if (call && ($0ce60f95bb1e0854$var$_typeof(call) === "object" || typeof call === "function")) return call;
    return $0ce60f95bb1e0854$var$_assertThisInitialized(self);
}
function $0ce60f95bb1e0854$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $0ce60f95bb1e0854$var$_isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function $0ce60f95bb1e0854$var$_getPrototypeOf(o) {
    $0ce60f95bb1e0854$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o1) {
        return o1.__proto__ || Object.getPrototypeOf(o1);
    };
    return $0ce60f95bb1e0854$var$_getPrototypeOf(o);
}
function $0ce60f95bb1e0854$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
// parent class for controllers. Not much needs to be in here, I don't think, so leave it empty.
var $0ce60f95bb1e0854$var$Controller = function Controller(viewBaseElement) {
    $0ce60f95bb1e0854$var$_classCallCheck(this, Controller);
    var viewClass = this.getViewClass();
    this.view = new viewClass(viewBaseElement);
    this.children = {
    };
};
var $0ce60f95bb1e0854$var$LoginController = /*#__PURE__*/ function(_Controller) {
    $0ce60f95bb1e0854$var$_inherits(LoginController, _Controller);
    var _super = $0ce60f95bb1e0854$var$_createSuper(LoginController);
    function LoginController() {
        var _this;
        $0ce60f95bb1e0854$var$_classCallCheck(this, LoginController);
        for(var _len = arguments.length, args = new Array(_len), _key = 0; _key < _len; _key++)args[_key] = arguments[_key];
        _this = _super.call.apply(_super, [
            this
        ].concat(args));
        _this.view.onFormData(/*#__PURE__*/ function() {
            var _ref2 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee(_ref) {
                var email, password;
                return regeneratorRuntime.wrap(function _callee$(_context) {
                    while(true)switch(_context.prev = _context.next){
                        case 0:
                            email = _ref.email, password = _ref.password;
                            _context.prev = 1;
                            _context.next = 4;
                            return $dy1TU.AuthModel.login(email, password);
                        case 4:
                            $2R31P.AlertView.show('success', 'Logged in successfully!');
                            window.setTimeout(function() {
                                location.assign('/');
                            }, 1500);
                            _context.next = 11;
                            break;
                        case 8:
                            _context.prev = 8;
                            _context.t0 = _context["catch"](1);
                            $2R31P.AlertView.show('error', _context.t0.message);
                        case 11:
                        case "end":
                            return _context.stop();
                    }
                }, _callee, null, [
                    [
                        1,
                        8
                    ]
                ]);
            }));
            return function(_x) {
                return _ref2.apply(this, arguments);
            };
        }());
        return _this;
    }
    $0ce60f95bb1e0854$var$_createClass(LoginController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.LoginFormView;
            }
        }
    ]);
    return LoginController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.LoginController = $0ce60f95bb1e0854$var$LoginController;
var $0ce60f95bb1e0854$var$LogoutController = /*#__PURE__*/ function(_Controller2) {
    $0ce60f95bb1e0854$var$_inherits(LogoutController, _Controller2);
    var _super2 = $0ce60f95bb1e0854$var$_createSuper(LogoutController);
    function LogoutController() {
        var _this2;
        $0ce60f95bb1e0854$var$_classCallCheck(this, LogoutController);
        for(var _len2 = arguments.length, args = new Array(_len2), _key2 = 0; _key2 < _len2; _key2++)args[_key2] = arguments[_key2];
        _this2 = _super2.call.apply(_super2, [
            this
        ].concat(args));
        _this2.view.eventOnRoot('click', /*#__PURE__*/ $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
            return regeneratorRuntime.wrap(function _callee2$(_context2) {
                while(true)switch(_context2.prev = _context2.next){
                    case 0:
                        _context2.prev = 0;
                        _context2.next = 3;
                        return $dy1TU.AuthModel.logout();
                    case 3:
                        $2R31P.AlertView.show('success', 'Logged out!');
                        window.setTimeout(function() {
                            location.assign('/login');
                        }, 1500);
                        _context2.next = 10;
                        break;
                    case 7:
                        _context2.prev = 7;
                        _context2.t0 = _context2["catch"](0);
                        $2R31P.AlertView.show('error', _context2.t0.message);
                    case 10:
                    case "end":
                        return _context2.stop();
                }
            }, _callee2, null, [
                [
                    0,
                    7
                ]
            ]);
        })));
        return _this2;
    }
    $0ce60f95bb1e0854$var$_createClass(LogoutController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.LogoutView;
            }
        }
    ]);
    return LogoutController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.LogoutController = $0ce60f95bb1e0854$var$LogoutController;
var $0ce60f95bb1e0854$var$SignupController = /*#__PURE__*/ function(_Controller3) {
    $0ce60f95bb1e0854$var$_inherits(SignupController, _Controller3);
    var _super3 = $0ce60f95bb1e0854$var$_createSuper(SignupController);
    function SignupController() {
        var _this3;
        $0ce60f95bb1e0854$var$_classCallCheck(this, SignupController);
        for(var _len3 = arguments.length, args = new Array(_len3), _key3 = 0; _key3 < _len3; _key3++)args[_key3] = arguments[_key3];
        _this3 = _super3.call.apply(_super3, [
            this
        ].concat(args));
        _this3.view.onFormData(/*#__PURE__*/ function() {
            var _ref5 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee3(_ref4) {
                var name, email, password, passwordConfirm, classCode;
                return regeneratorRuntime.wrap(function _callee3$(_context3) {
                    while(true)switch(_context3.prev = _context3.next){
                        case 0:
                            name = _ref4.name, email = _ref4.email, password = _ref4.password, passwordConfirm = _ref4.passwordConfirm, classCode = _ref4.classCode;
                            _context3.prev = 1;
                            _context3.next = 4;
                            return $dy1TU.AuthModel.signup(name, email, password, passwordConfirm, classCode);
                        case 4:
                            $2R31P.AlertView.show('success', 'Signed up successfully!');
                            window.setTimeout(function() {
                                location.assign('/');
                            }, 1500);
                            _context3.next = 11;
                            break;
                        case 8:
                            _context3.prev = 8;
                            _context3.t0 = _context3["catch"](1);
                            $2R31P.AlertView.show('error', _context3.t0.message);
                        case 11:
                        case "end":
                            return _context3.stop();
                    }
                }, _callee3, null, [
                    [
                        1,
                        8
                    ]
                ]);
            }));
            return function(_x2) {
                return _ref5.apply(this, arguments);
            };
        }());
        return _this3;
    }
    $0ce60f95bb1e0854$var$_createClass(SignupController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.SignupFormView;
            }
        }
    ]);
    return SignupController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.SignupController = $0ce60f95bb1e0854$var$SignupController;
var $0ce60f95bb1e0854$var$TagInputController = /*#__PURE__*/ function(_Controller4) {
    $0ce60f95bb1e0854$var$_inherits(TagInputController, _Controller4);
    var _super4 = $0ce60f95bb1e0854$var$_createSuper(TagInputController);
    function TagInputController() {
        $0ce60f95bb1e0854$var$_classCallCheck(this, TagInputController);
        return _super4.apply(this, arguments);
    }
    $0ce60f95bb1e0854$var$_createClass(TagInputController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.TagInputView;
            }
        }
    ]);
    return TagInputController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.TagInputController = $0ce60f95bb1e0854$var$TagInputController;
var $0ce60f95bb1e0854$var$CreateSentenceController = /*#__PURE__*/ function(_Controller5) {
    $0ce60f95bb1e0854$var$_inherits(CreateSentenceController, _Controller5);
    var _super5 = $0ce60f95bb1e0854$var$_createSuper(CreateSentenceController);
    function CreateSentenceController() {
        var _this4;
        $0ce60f95bb1e0854$var$_classCallCheck(this, CreateSentenceController);
        for(var _len4 = arguments.length, args = new Array(_len4), _key4 = 0; _key4 < _len4; _key4++)args[_key4] = arguments[_key4];
        _this4 = _super5.call.apply(_super5, [
            this
        ].concat(args));
        _this4.view.onFormData(/*#__PURE__*/ function() {
            var _ref7 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee4(_ref6) {
                var sentence, translation, level, vivaRef, tense, grammar, _yield$_this4$childre, audioUrl, res;
                return regeneratorRuntime.wrap(function _callee4$(_context4) {
                    while(true)switch(_context4.prev = _context4.next){
                        case 0:
                            sentence = _ref6.sentence, translation = _ref6.translation, level = _ref6.level, vivaRef = _ref6.vivaRef, tense = _ref6.tense, grammar = _ref6.grammar;
                            _context4.prev = 1;
                            _context4.next = 4;
                            return _this4.children.audioEditor.save();
                        case 4:
                            _yield$_this4$childre = _context4.sent;
                            audioUrl = _yield$_this4$childre.audioUrl;
                            _context4.next = 8;
                            return $dy1TU.CreateSentenceModel.create(sentence, translation, level, vivaRef, tense, grammar, audioUrl);
                        case 8:
                            res = _context4.sent;
                            _this4.view.clearFormData({
                                keep: [
                                    'vivaRef',
                                    'tense',
                                    'grammar'
                                ]
                            });
                            _this4.children.audioEditor.clear();
                            if (res) $2R31P.AlertView.show('success', 'Sentence created');
                            _context4.next = 17;
                            break;
                        case 14:
                            _context4.prev = 14;
                            _context4.t0 = _context4["catch"](1);
                            $2R31P.AlertView.show('error', _context4.t0.message);
                        case 17:
                        case "end":
                            return _context4.stop();
                    }
                }, _callee4, null, [
                    [
                        1,
                        14
                    ]
                ]);
            }));
            return function(_x3) {
                return _ref7.apply(this, arguments);
            };
        }());
        return _this4;
    }
    $0ce60f95bb1e0854$var$_createClass(CreateSentenceController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.CreateSentenceFormView;
            }
        }
    ]);
    return CreateSentenceController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.CreateSentenceController = $0ce60f95bb1e0854$var$CreateSentenceController;
var $0ce60f95bb1e0854$var$AudioEditorController = /*#__PURE__*/ function(_Controller6) {
    $0ce60f95bb1e0854$var$_inherits(AudioEditorController, _Controller6);
    var _super6 = $0ce60f95bb1e0854$var$_createSuper(AudioEditorController);
    function AudioEditorController() {
        var _this5;
        $0ce60f95bb1e0854$var$_classCallCheck(this, AudioEditorController);
        for(var _len5 = arguments.length, args = new Array(_len5), _key5 = 0; _key5 < _len5; _key5++)args[_key5] = arguments[_key5];
        _this5 = _super6.call.apply(_super6, [
            this
        ].concat(args)); // using this to knit together some event-based and promise-based lines of code
        _this5._saveRequests = [];
        _this5.view.on('save_file', /*#__PURE__*/ function() {
            var _ref8 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee5(blob) {
                var _yield$SentenceModel$, url;
                return regeneratorRuntime.wrap(function _callee5$(_context5) {
                    while(true)switch(_context5.prev = _context5.next){
                        case 0:
                            _context5.next = 2;
                            return $dy1TU.SentenceModel.uploadAudioFile(blob);
                        case 2:
                            _yield$SentenceModel$ = _context5.sent;
                            url = _yield$SentenceModel$.url;
                            // knitting together event-based and promise-based code
                            _this5._saveRequests.forEach(function(saveRequest) {
                                return saveRequest({
                                    audioUrl: url
                                });
                            });
                            _this5._saveRequests = [];
                            $2R31P.AlertView.show('success', 'File uploaded successfully.');
                        case 7:
                        case "end":
                            return _context5.stop();
                    }
                }, _callee5);
            }));
            return function(_x4) {
                return _ref8.apply(this, arguments);
            };
        }());
        return _this5;
    }
    $0ce60f95bb1e0854$var$_createClass(AudioEditorController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.AudioEditorView;
            }
        },
        {
            key: "save",
            value: function() {
                var _save = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                    var _this6 = this;
                    var prom;
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while(true)switch(_context6.prev = _context6.next){
                            case 0:
                                this.view.save();
                                prom = new Promise(function(resolve, reject) {
                                    _this6._saveRequests.push(resolve);
                                });
                                return _context6.abrupt("return", prom);
                            case 3:
                            case "end":
                                return _context6.stop();
                        }
                    }, _callee6, this);
                }));
                function save() {
                    return _save.apply(this, arguments);
                }
                return save;
            }()
        },
        {
            key: "clear",
            value: function clear() {
                this.view.clear();
            }
        }
    ]);
    return AudioEditorController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.AudioEditorController = $0ce60f95bb1e0854$var$AudioEditorController;
var $0ce60f95bb1e0854$var$CreateTaskRandomController = /*#__PURE__*/ function(_Controller7) {
    $0ce60f95bb1e0854$var$_inherits(CreateTaskRandomController, _Controller7);
    var _super7 = $0ce60f95bb1e0854$var$_createSuper(CreateTaskRandomController);
    function CreateTaskRandomController() {
        var _this7;
        $0ce60f95bb1e0854$var$_classCallCheck(this, CreateTaskRandomController);
        for(var _len6 = arguments.length, args = new Array(_len6), _key6 = 0; _key6 < _len6; _key6++)args[_key6] = arguments[_key6];
        _this7 = _super7.call.apply(_super7, [
            this
        ].concat(args));
        _this7.view.onCreateTaskRandomValues(/*#__PURE__*/ function() {
            var _ref9 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee7(searchParams, taskDetails) {
                var sentencesRes, createTask;
                return regeneratorRuntime.wrap(function _callee7$(_context7) {
                    while(true)switch(_context7.prev = _context7.next){
                        case 0:
                            _context7.prev = 0;
                            _context7.next = 3;
                            return $dy1TU.CreateTaskModel.sendApiRequest("/api/v1/sentences?".concat(searchParams), 'GET');
                        case 3:
                            sentencesRes = _context7.sent;
                            // Add sentence ID array and teacher to req.body for task creation
                            taskDetails.sentences = sentencesRes.data.data.map(function(e) {
                                return e._id;
                            });
                            taskDetails.teacher = $2R31P.DataParserView.get('user'); //Create task
                            _context7.next = 8;
                            return $dy1TU.CreateTaskModel.sendApiRequest('/api/v1/tasks', 'POST', taskDetails);
                        case 8:
                            createTask = _context7.sent;
                            if (createTask) $2R31P.AlertView.show('success', 'Task created');
                            _context7.next = 15;
                            break;
                        case 12:
                            _context7.prev = 12;
                            _context7.t0 = _context7["catch"](0);
                            $2R31P.AlertView.show('error', _context7.t0.message);
                        case 15:
                        case "end":
                            return _context7.stop();
                    }
                }, _callee7, null, [
                    [
                        0,
                        12
                    ]
                ]);
            }));
            return function(_x5, _x6) {
                return _ref9.apply(this, arguments);
            };
        }());
        return _this7;
    }
    $0ce60f95bb1e0854$var$_createClass(CreateTaskRandomController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.CreateTaskRandomView;
            }
        }
    ]);
    return CreateTaskRandomController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.CreateTaskRandomController = $0ce60f95bb1e0854$var$CreateTaskRandomController;
var $0ce60f95bb1e0854$var$TrainController = /*#__PURE__*/ function(_Controller8) {
    $0ce60f95bb1e0854$var$_inherits(TrainController, _Controller8);
    var _super8 = $0ce60f95bb1e0854$var$_createSuper(TrainController);
    function TrainController() {
        var _this8;
        $0ce60f95bb1e0854$var$_classCallCheck(this, TrainController);
        for(var _len7 = arguments.length, args = new Array(_len7), _key7 = 0; _key7 < _len7; _key7++)args[_key7] = arguments[_key7];
        _this8 = _super8.call.apply(_super8, [
            this
        ].concat(args));
        var exerciseType = $2R31P.DataParserView.get('exercise');
        _this8.sentences = $dy1TU.SentenceModel.getLocal('sentences').map(function(sent) {
            return sent.subclassAs(exerciseType);
        });
        _this8.finishedSentences = [];
        _this8.initialCount = _this8.sentences.length;
        _this8.rightCount = 0;
        _this8.wrongCount = 0;
        _this8.view.updateCounts(_this8.rightCount, _this8.initialCount);
        _this8.view.on('answer', _this8.doAnswer.bind($0ce60f95bb1e0854$var$_assertThisInitialized(_this8)));
        _this8.view.on('next', _this8.doNextSentence.bind($0ce60f95bb1e0854$var$_assertThisInitialized(_this8)));
        _this8.doNextSentence();
        return _this8;
    }
    $0ce60f95bb1e0854$var$_createClass(TrainController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.TrainingView;
            }
        },
        {
            key: "doAnswer",
            value: function doAnswer(_ref10) {
                var student_answer = _ref10.student_answer, isCorrect = _ref10.isCorrect;
                var desiredReaskLength = 3;
                var sentenceObject = this.sentences.shift();
                this.finishedSentences.push({
                    sentence: sentenceObject.data,
                    student_answer: student_answer,
                    isCorrect: isCorrect
                });
                if (isCorrect) {
                    $2R31P.AlertView.show('success', 'Correct Answer');
                    this.rightCount++;
                } else {
                    $2R31P.AlertView.show('error', 'Incorrect Answer');
                    this.wrongCount++;
                    var insertionIndex = Math.min(this.sentences.length, desiredReaskLength);
                    this.sentences.splice(insertionIndex, 0, sentenceObject);
                }
                this.view.updateCounts(this.rightCount, this.initialCount);
            }
        },
        {
            key: "doNextSentence",
            value: function doNextSentence() {
                if (!this.sentences[0]) {
                    this.view.finish(); // wait to show the AlertView until *after* the data has hit the server successfully
                    this.sendResultsToServer().then(function() {
                        return $2R31P.AlertView.show('success', 'Task Completed');
                    }).then(function() {
                        window.location = '/';
                    });
                    return;
                }
                var sentence = this.sentences[0];
                this.view.prompt = sentence.prompt;
                this.view.answer = sentence.answer;
                this.view.audioUrl = sentence.data.audioUrl;
                this.view.elements.audio.play();
            }
        },
        {
            key: "sendResultsToServer",
            value: function() {
                var _sendResultsToServer = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee8() {
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while(true)switch(_context8.prev = _context8.next){
                            case 0:
                                _context8.prev = 0;
                                _context8.next = 3;
                                return $dy1TU.StudentResultsModel.send(this.rightCount, this.wrongCount, $2R31P.DataParserView.get('studentTask'));
                            case 3:
                                _context8.next = 8;
                                break;
                            case 5:
                                _context8.prev = 5;
                                _context8.t0 = _context8["catch"](0);
                                $2R31P.AlertView.show('error', _context8.t0.message);
                            case 8:
                            case "end":
                                return _context8.stop();
                        }
                    }, _callee8, this, [
                        [
                            0,
                            5
                        ]
                    ]);
                }));
                function sendResultsToServer() {
                    return _sendResultsToServer.apply(this, arguments);
                }
                return sendResultsToServer;
            }()
        }
    ]);
    return TrainController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.TrainController = $0ce60f95bb1e0854$var$TrainController;
var $0ce60f95bb1e0854$var$ReviseController = /*#__PURE__*/ function(_Controller9) {
    $0ce60f95bb1e0854$var$_inherits(ReviseController, _Controller9);
    var _super9 = $0ce60f95bb1e0854$var$_createSuper(ReviseController);
    function ReviseController() {
        var _this9;
        $0ce60f95bb1e0854$var$_classCallCheck(this, ReviseController);
        for(var _len8 = arguments.length, args = new Array(_len8), _key8 = 0; _key8 < _len8; _key8++)args[_key8] = arguments[_key8];
        _this9 = _super9.call.apply(_super9, [
            this
        ].concat(args));
        var sentenceData = $2R31P.DataParserView.get('studentSentences');
        _this9.studentSentences = sentenceData.map(function(doc) {
            return new $dy1TU.StudentSentenceModel(doc);
        });
        _this9.initialCount = _this9.studentSentences.length;
        _this9.rightCount = 0;
        _this9.wrongCount = 0;
        _this9.view.updateCounts(_this9.rightCount, _this9.initialCount);
        _this9.view.on('answer', _this9.doAnswer.bind($0ce60f95bb1e0854$var$_assertThisInitialized(_this9)));
        _this9.view.on('next', _this9.doNextSentence.bind($0ce60f95bb1e0854$var$_assertThisInitialized(_this9)));
        _this9.doNextSentence();
        return _this9;
    }
    $0ce60f95bb1e0854$var$_createClass(ReviseController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.TrainingView;
            }
        },
        {
            key: "doAnswer",
            value: function doAnswer(_ref11) {
                var student_answer = _ref11.student_answer, isCorrect = _ref11.isCorrect;
                var desiredReaskLength = 3;
                var studentSentenceObject = this.studentSentences.shift();
                if (isCorrect) {
                    $2R31P.AlertView.show('success', 'Correct Answer');
                    this.rightCount++;
                } else {
                    $2R31P.AlertView.show('error', 'Incorrect Answer');
                    this.wrongCount++;
                }
                this.view.updateCounts(this.rightCount, this.initialCount);
                var toUpdate = {
                    lastTestedOn: Date.now()
                };
                if (isCorrect) {
                    toUpdate.correctAttempts = studentSentenceObject.data.correctAttempts + 1 || 1;
                    toUpdate.retestDays = studentSentenceObject.data.retestDays * 3;
                } else {
                    toUpdate.incorrectAttempts = studentSentenceObject.data.incorrectAttempts + 1 || 1;
                    toUpdate.retestDays = 1;
                }
                toUpdate.retestOn = toUpdate.lastTestedOn + toUpdate.retestDays * 86400000;
                studentSentenceObject.update(toUpdate);
            }
        },
        {
            key: "doNextSentence",
            value: function doNextSentence() {
                if (!this.studentSentences[0]) {
                    this.view.finish(); // TODO what next? (probably different from TrainController)
                    return;
                }
                var _this$studentSentence = this.studentSentences[0], sentence = _this$studentSentence.sentence, exercise = _this$studentSentence.exercise;
                this.view.prompt = sentence.prompt;
                this.view.answer = sentence.answer;
                this.view.audioUrl = sentence.data.audioUrl;
                this.view.updateLayoutForExercise(exercise);
            }
        }
    ]);
    return ReviseController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.ReviseController = $0ce60f95bb1e0854$var$ReviseController;
var $0ce60f95bb1e0854$var$CreateTaskChooseSentenceController = /*#__PURE__*/ function(_Controller10) {
    $0ce60f95bb1e0854$var$_inherits(CreateTaskChooseSentenceController, _Controller10);
    var _super10 = $0ce60f95bb1e0854$var$_createSuper(CreateTaskChooseSentenceController);
    function CreateTaskChooseSentenceController(viewBaseElement) {
        var _this10;
        $0ce60f95bb1e0854$var$_classCallCheck(this, CreateTaskChooseSentenceController);
        _this10 = _super10.call(this, viewBaseElement);
        _this10.page = 1;
        _this10.maxPage = 1;
        _this10.limit = 10;
        _this10.waitingForData = false;
        _this10.view.on('filter_update', /*#__PURE__*/ function() {
            var _ref12 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee9(filterData) {
                return regeneratorRuntime.wrap(function _callee9$(_context9) {
                    while(true)switch(_context9.prev = _context9.next){
                        case 0:
                            // always reset to the first page when updating the filter
                            _this10.page = 1;
                            _this10.refetchData(filterData);
                        case 2:
                        case "end":
                            return _context9.stop();
                    }
                }, _callee9);
            }));
            return function(_x7) {
                return _ref12.apply(this, arguments);
            };
        }());
        _this10.view.on('change_page', /*#__PURE__*/ function() {
            var _ref13 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee10(offset) {
                return regeneratorRuntime.wrap(function _callee10$(_context10) {
                    while(true)switch(_context10.prev = _context10.next){
                        case 0:
                            if (!(_this10.page <= 1 && offset < 0)) {
                                _context10.next = 2;
                                break;
                            }
                            return _context10.abrupt("return");
                        case 2:
                            if (!(offset > 0 && _this10.page >= _this10.maxPage)) {
                                _context10.next = 4;
                                break;
                            }
                            return _context10.abrupt("return");
                        case 4:
                            if (!_this10.waitingForData) {
                                _context10.next = 6;
                                break;
                            }
                            return _context10.abrupt("return");
                        case 6:
                            _this10.page += offset;
                            _this10.refetchData(_this10.view.getFilterState());
                        case 8:
                        case "end":
                            return _context10.stop();
                    }
                }, _callee10);
            }));
            return function(_x8) {
                return _ref13.apply(this, arguments);
            };
        }());
        _this10.view.on('select_page', /*#__PURE__*/ function() {
            var _ref14 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee11(page) {
                return regeneratorRuntime.wrap(function _callee11$(_context11) {
                    while(true)switch(_context11.prev = _context11.next){
                        case 0:
                            if (!_this10.waitingForData) {
                                _context11.next = 2;
                                break;
                            }
                            return _context11.abrupt("return");
                        case 2:
                            console.log(JSON.stringify(page));
                            _this10.page = page;
                            _this10.refetchData(_this10.view.getFilterState());
                        case 5:
                        case "end":
                            return _context11.stop();
                    }
                }, _callee11);
            }));
            return function(_x9) {
                return _ref14.apply(this, arguments);
            };
        }());
        _this10.sentencesToSave = [];
        _this10.view.on('add_sentence', function(_ref15) {
            var sentenceId = _ref15.sentenceId;
            _this10.sentencesToSave.push(_this10.sentences.find(function(sent) {
                return sent.data._id == sentenceId;
            }));
        });
        _this10.view.on('remove_sentence', function(_ref16) {
            var sentenceId = _ref16.sentenceId;
            _this10.sentencesToSave = _this10.sentencesToSave.filter(function(sent) {
                return sent.data._id != sentenceId;
            });
        });
        _this10.view.on('save', _this10.save.bind($0ce60f95bb1e0854$var$_assertThisInitialized(_this10)));
        _this10.sentences = [];
        $dy1TU.SentenceModel.loadFromServer({
            page: _this10.page,
            limit: _this10.limit
        }).then(function(data) {
            return _this10.updateSentences(data);
        })["catch"](function(err) {
            return $2R31P.AlertView.show('error', err);
        });
        return _this10;
    }
    $0ce60f95bb1e0854$var$_createClass(CreateTaskChooseSentenceController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.CreateTaskChooseSentenceView;
            }
        },
        {
            key: "refetchData",
            value: function() {
                var _refetchData = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee12(filterData) {
                    var searchParams, data;
                    return regeneratorRuntime.wrap(function _callee12$(_context12) {
                        while(true)switch(_context12.prev = _context12.next){
                            case 0:
                                searchParams = $0ce60f95bb1e0854$var$_objectSpread($0ce60f95bb1e0854$var$_objectSpread({
                                }, filterData), {
                                }, {
                                    page: this.page,
                                    limit: this.limit
                                });
                                this.waitingForData = true;
                                _context12.next = 4;
                                return $dy1TU.SentenceModel.loadFromServer(searchParams);
                            case 4:
                                data = _context12.sent;
                                this.waitingForData = false;
                                this.view.page = this.page;
                                this.updateSentences(data);
                            case 8:
                            case "end":
                                return _context12.stop();
                        }
                    }, _callee12, this);
                }));
                function refetchData(_x10) {
                    return _refetchData.apply(this, arguments);
                }
                return refetchData;
            }()
        },
        {
            key: "updateSentences",
            value: function updateSentences(_ref17) {
                var objects = _ref17.objects, maxPage = _ref17.maxPage;
                this.sentences = objects;
                this.maxPage = maxPage;
                this.view.maxPage = maxPage;
                this.view.updateDisplay(this.sentences, this.sentencesToSave);
            }
        },
        {
            key: "save",
            value: function() {
                var _save2 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee13() {
                    var sentences, taskDetails, createTask;
                    return regeneratorRuntime.wrap(function _callee13$(_context13) {
                        while(true)switch(_context13.prev = _context13.next){
                            case 0:
                                _context13.prev = 0;
                                sentences = this.sentencesToSave.map(function(e) {
                                    return e.data._id;
                                });
                                taskDetails = this.view.getValues('.task-details');
                                taskDetails.sentences = sentences;
                                taskDetails.teacher = $2R31P.DataParserView.get('user');
                                _context13.next = 7;
                                return $dy1TU.CreateTaskModel.sendApiRequest('/api/v1/tasks', 'POST', taskDetails);
                            case 7:
                                createTask = _context13.sent;
                                if (createTask) $2R31P.AlertView.show('success', 'Task created!');
                                _context13.next = 14;
                                break;
                            case 11:
                                _context13.prev = 11;
                                _context13.t0 = _context13["catch"](0);
                                $2R31P.AlertView.show('error', _context13.t0.message);
                            case 14:
                            case "end":
                                return _context13.stop();
                        }
                    }, _callee13, this, [
                        [
                            0,
                            11
                        ]
                    ]);
                }));
                function save() {
                    return _save2.apply(this, arguments);
                }
                return save;
            }()
        }
    ]);
    return CreateTaskChooseSentenceController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.CreateTaskChooseSentenceController = $0ce60f95bb1e0854$var$CreateTaskChooseSentenceController;
var $0ce60f95bb1e0854$var$DeleteController = /*#__PURE__*/ function(_Controller11) {
    $0ce60f95bb1e0854$var$_inherits(DeleteController, _Controller11);
    var _super11 = $0ce60f95bb1e0854$var$_createSuper(DeleteController);
    function DeleteController() {
        var _this11;
        $0ce60f95bb1e0854$var$_classCallCheck(this, DeleteController);
        for(var _len9 = arguments.length, args = new Array(_len9), _key9 = 0; _key9 < _len9; _key9++)args[_key9] = arguments[_key9];
        _this11 = _super11.call.apply(_super11, [
            this
        ].concat(args));
        _this11.view.on('delete', /*#__PURE__*/ function() {
            var _ref18 = $0ce60f95bb1e0854$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee14(id, row, collection) {
                var deleteTask;
                return regeneratorRuntime.wrap(function _callee14$(_context14) {
                    while(true)switch(_context14.prev = _context14.next){
                        case 0:
                            _context14.prev = 0;
                            _context14.next = 3;
                            return $dy1TU.DeleteModel.sendApiRequest("/api/v1/".concat(collection, "/").concat(id), 'DELETE');
                        case 3:
                            deleteTask = _context14.sent;
                            _this11.view.deleteRow(row);
                            _context14.next = 11;
                            break;
                        case 7:
                            _context14.prev = 7;
                            _context14.t0 = _context14["catch"](0);
                            _this11.view.root.classList.remove('selected');
                            $2R31P.AlertView.show('error', _context14.t0.message);
                        case 11:
                        case "end":
                            return _context14.stop();
                    }
                }, _callee14, null, [
                    [
                        0,
                        7
                    ]
                ]);
            }));
            return function(_x11, _x12, _x13) {
                return _ref18.apply(this, arguments);
            };
        }());
        return _this11;
    }
    $0ce60f95bb1e0854$var$_createClass(DeleteController, [
        {
            key: "getViewClass",
            value: function getViewClass() {
                return $2R31P.DeleteView;
            }
        }
    ]);
    return DeleteController;
}($0ce60f95bb1e0854$var$Controller);
module.exports.DeleteController = $0ce60f95bb1e0854$var$DeleteController;

});
parcelRequire.register("2R31P", function(module, exports) {
"use strict";
function $2142e16afbe61e15$var$_typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $2142e16afbe61e15$var$_typeof = function _typeof(obj1) {
        return typeof obj1;
    };
    else $2142e16afbe61e15$var$_typeof = function _typeof1(obj1) {
        return obj1 && typeof Symbol === "function" && obj1.constructor === Symbol && obj1 !== Symbol.prototype ? "symbol" : typeof obj1;
    };
    return $2142e16afbe61e15$var$_typeof(obj);
}



























Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.DeleteView = module.exports.TrainingView = module.exports.CreateTaskChooseSentenceView = module.exports.CreateTaskRandomView = module.exports.AudioEditorView = module.exports.CreateSentenceFormView = module.exports.TagInputView = module.exports.SignupFormView = module.exports.LoginFormView = module.exports.DataParserView = module.exports.AlertView = module.exports.LogoutView = void 0;


var $8WajT = parcelRequire("8WajT");

var $50CWN = parcelRequire("50CWN");

var $15ZYJ = parcelRequire("15ZYJ");

var $asgYb = parcelRequire("asgYb");

var $2142e16afbe61e15$var$_waveformPlaylist = $2142e16afbe61e15$var$_interopRequireDefault($fd6lr$waveformplaylist);

var $2142e16afbe61e15$var$_audioEncoder = $2142e16afbe61e15$var$_interopRequireDefault($fd6lr$audioencoder);

var $2142e16afbe61e15$var$_fileSaver = $2142e16afbe61e15$var$_interopRequireDefault($fd6lr$filesaver);

var $2142e16afbe61e15$var$_axios = $2142e16afbe61e15$var$_interopRequireDefault($fd6lr$axios);
function $2142e16afbe61e15$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $2142e16afbe61e15$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $2142e16afbe61e15$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) $2142e16afbe61e15$var$ownKeys(Object(source), true).forEach(function(key) {
            $2142e16afbe61e15$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $2142e16afbe61e15$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $2142e16afbe61e15$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $2142e16afbe61e15$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $2142e16afbe61e15$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $2142e16afbe61e15$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $2142e16afbe61e15$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $2142e16afbe61e15$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) $2142e16afbe61e15$var$_setPrototypeOf(subClass, superClass);
}
function $2142e16afbe61e15$var$_setPrototypeOf(o, p) {
    $2142e16afbe61e15$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o1, p1) {
        o1.__proto__ = p1;
        return o1;
    };
    return $2142e16afbe61e15$var$_setPrototypeOf(o, p);
}
function $2142e16afbe61e15$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $2142e16afbe61e15$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = $2142e16afbe61e15$var$_getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $2142e16afbe61e15$var$_getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $2142e16afbe61e15$var$_possibleConstructorReturn(this, result);
    };
}
function $2142e16afbe61e15$var$_possibleConstructorReturn(self, call) {
    if (call && ($2142e16afbe61e15$var$_typeof(call) === "object" || typeof call === "function")) return call;
    return $2142e16afbe61e15$var$_assertThisInitialized(self);
}
function $2142e16afbe61e15$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $2142e16afbe61e15$var$_isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function $2142e16afbe61e15$var$_getPrototypeOf(o) {
    $2142e16afbe61e15$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o1) {
        return o1.__proto__ || Object.getPrototypeOf(o1);
    };
    return $2142e16afbe61e15$var$_getPrototypeOf(o);
}
function $2142e16afbe61e15$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $2142e16afbe61e15$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $2142e16afbe61e15$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $2142e16afbe61e15$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $2142e16afbe61e15$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}
var $2142e16afbe61e15$var$View = /*#__PURE__*/ function() {
    function View(baseElement) {
        $2142e16afbe61e15$var$_classCallCheck(this, View);
        this.root = baseElement;
        this.elements = {
        };
        this.elementGroups = {
        };
        this.listeners = {
        };
    }
    $2142e16afbe61e15$var$_createClass(View, [
        {
            key: "hideElement",
            value: function hideElement(name) {
                this.elements[name].style.display = 'none';
            }
        },
        {
            key: "showElement",
            value: function showElement(name) {
                this.elements[name].style.display = '';
            }
        },
        {
            key: "defineElementGroup",
            value: function defineElementGroup(groupName, elementNameArray) {
                this.elementGroups[groupName] = elementNameArray;
            }
        },
        {
            key: "showGroup",
            value: function showGroup(groupName) {
                var _this = this;
                this.elementGroups[groupName].forEach(function(elementName) {
                    return _this.showElement(elementName);
                });
            }
        },
        {
            key: "hideGroup",
            value: function hideGroup(groupName) {
                var _this2 = this;
                this.elementGroups[groupName].forEach(function(elementName) {
                    return _this2.hideElement(elementName);
                });
            }
        },
        {
            key: "exists",
            get: function get() {
                return !!this.root;
            }
        },
        {
            key: "on",
            value: function on(event, callback) {
                if (!this.listeners[event]) this.listeners[event] = [];
                this.listeners[event].push(callback);
            }
        },
        {
            key: "trigger",
            value: function trigger(event) {
                for(var _len = arguments.length, data = new Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++)data[_key - 1] = arguments[_key];
                var listeners = this.listeners[event];
                if (listeners) listeners.forEach(function(callback) {
                    return callback.apply(void 0, data);
                });
            }
        },
        {
            key: "eventOnRoot",
            value: function eventOnRoot(event, callback) {
                this.root.addEventListener(event, function(e) {
                    callback();
                });
            }
        }
    ]);
    return View;
}(); // FORMS
var $2142e16afbe61e15$var$FormView = /*#__PURE__*/ function(_View) {
    $2142e16afbe61e15$var$_inherits(FormView, _View);
    var _super = $2142e16afbe61e15$var$_createSuper(FormView);
    function FormView() {
        $2142e16afbe61e15$var$_classCallCheck(this, FormView);
        return _super.apply(this, arguments);
    }
    $2142e16afbe61e15$var$_createClass(FormView, [
        {
            key: "onFormData",
            value: function onFormData(callback) {
                var _this3 = this;
                this.root.addEventListener('submit', function(e) {
                    e.preventDefault();
                    _this3.root.querySelectorAll('input[type=hidden][required]');
                    var missingHiddenFields = Array.from(_this3.root.querySelectorAll('input[type=hidden][required]')).filter(function(el) {
                        return !el.value;
                    });
                    if (missingHiddenFields.length > 0) {
                        $2142e16afbe61e15$var$AlertView.show('error', "The following additional fields are missing: ".concat(missingHiddenFields.map(function(el) {
                            return el.dataset.humanName || el.name;
                        }).join(', ')));
                        return;
                    }
                    callback(_this3.getFormData());
                });
            }
        },
        {
            key: "getFormData",
            value: function getFormData() {
                var inputs = Array.from(this.root.querySelectorAll('input'));
                var data = {
                };
                inputs.forEach(function(el) {
                    // TODO suggestion from Heather: switch this to always use `name`. I'll have to check with Tom first, though (because it breaks existing code)
                    var name = el.name ? el.name : el.id; // TODO design question: should we handle situations where there's multiple inputs with the same name? (turn it into an array? ignore them?)
                    data[name] = el.value;
                    if (el.dataset.parseAs) switch(el.dataset.parseAs){
                        case 'json':
                            data[name] = JSON.parse(data[name]);
                            break;
                    }
                });
                return data;
            }
        },
        {
            key: "clearFormData",
            value: function clearFormData() {
                var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {
                };
                var inputs = Array.from(this.root.querySelectorAll('input'));
                var keep = options.keep || [];
                inputs.forEach(function(el) {
                    if (!keep.includes(el.name)) el.value = '';
                });
            }
        }
    ]);
    return FormView;
}($2142e16afbe61e15$var$View); // GENERIC DOM MANIP
var $2142e16afbe61e15$var$LogoutView = /*#__PURE__*/ function(_View2) {
    $2142e16afbe61e15$var$_inherits(LogoutView, _View2);
    var _super2 = $2142e16afbe61e15$var$_createSuper(LogoutView);
    function LogoutView() {
        $2142e16afbe61e15$var$_classCallCheck(this, LogoutView);
        return _super2.apply(this, arguments);
    }
    return LogoutView;
}($2142e16afbe61e15$var$View);
module.exports.LogoutView = $2142e16afbe61e15$var$LogoutView;
var $2142e16afbe61e15$var$AlertView = /*#__PURE__*/ function(_View3) {
    $2142e16afbe61e15$var$_inherits(AlertView, _View3);
    var _super3 = $2142e16afbe61e15$var$_createSuper(AlertView);
    function AlertView() {
        $2142e16afbe61e15$var$_classCallCheck(this, AlertView);
        return _super3.apply(this, arguments);
    }
    $2142e16afbe61e15$var$_createClass(AlertView, null, [
        {
            key: "hide",
            value: function hide() {
                var el = document.querySelector('.alert');
                if (el) el.parentElement.removeChild(el);
            } // type is 'success' or 'error'
        },
        {
            key: "show",
            value: function show(type, msg) {
                var _this4 = this;
                this.hide();
                var markup = "<div class=\"alert alert--".concat(type, "\">").concat(msg, "</div>");
                document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
                return new Promise(function(resolve, reject) {
                    window.setTimeout(function() {
                        _this4.hide();
                        resolve();
                    }, 3000);
                });
            }
        }
    ]);
    return AlertView;
}($2142e16afbe61e15$var$View);
module.exports.AlertView = $2142e16afbe61e15$var$AlertView;
window.onerror = function(err) {
    return $2142e16afbe61e15$var$AlertView.show('error', err);
};
var $2142e16afbe61e15$var$DataParserView = /*#__PURE__*/ function(_View4) {
    $2142e16afbe61e15$var$_inherits(DataParserView, _View4);
    var _super4 = $2142e16afbe61e15$var$_createSuper(DataParserView);
    function DataParserView() {
        $2142e16afbe61e15$var$_classCallCheck(this, DataParserView);
        return _super4.apply(this, arguments);
    }
    $2142e16afbe61e15$var$_createClass(DataParserView, null, [
        {
            key: "get",
            value: function get(input_name) {
                return JSON.parse(document.querySelector(".js-value[name=\"".concat(input_name, "\"]")).value);
            }
        }
    ]);
    return DataParserView;
}($2142e16afbe61e15$var$View); // AUTH VIEWS -----------
module.exports.DataParserView = $2142e16afbe61e15$var$DataParserView;
var $2142e16afbe61e15$var$LoginFormView = /*#__PURE__*/ function(_FormView) {
    $2142e16afbe61e15$var$_inherits(LoginFormView, _FormView);
    var _super5 = $2142e16afbe61e15$var$_createSuper(LoginFormView);
    function LoginFormView() {
        $2142e16afbe61e15$var$_classCallCheck(this, LoginFormView);
        return _super5.apply(this, arguments);
    }
    return LoginFormView;
}($2142e16afbe61e15$var$FormView);
module.exports.LoginFormView = $2142e16afbe61e15$var$LoginFormView;
var $2142e16afbe61e15$var$SignupFormView = /*#__PURE__*/ function(_FormView2) {
    $2142e16afbe61e15$var$_inherits(SignupFormView, _FormView2);
    var _super6 = $2142e16afbe61e15$var$_createSuper(SignupFormView);
    function SignupFormView() {
        $2142e16afbe61e15$var$_classCallCheck(this, SignupFormView);
        return _super6.apply(this, arguments);
    }
    return SignupFormView;
}($2142e16afbe61e15$var$FormView); // CREATE SENTENCE VIEWS --------
module.exports.SignupFormView = $2142e16afbe61e15$var$SignupFormView;
var $2142e16afbe61e15$var$TagInputView = /*#__PURE__*/ function(_View5) {
    $2142e16afbe61e15$var$_inherits(TagInputView, _View5);
    var _super7 = $2142e16afbe61e15$var$_createSuper(TagInputView);
    function TagInputView(element) {
        var _this5;
        $2142e16afbe61e15$var$_classCallCheck(this, TagInputView);
        _this5 = _super7.call(this, element);
        _this5.elements.visibleInput = _this5.root.querySelector('.visible-input');
        _this5.elements.taglist = _this5.root.querySelector('input.taglist');
        _this5.elements.tagHolder = _this5.root.querySelector('.tag-holder');
        _this5.elements.tagMenu = _this5.root.querySelector('.tag-menu');
        _this5.tags = [];
        _this5.prediction = JSON.parse(_this5.root.querySelector('.tag-predictions').value).map(function(tag) {
            return {
                tag: tag,
                lowercase: tag.toLowerCase()
            };
        });
        _this5.currentPrediction = [];
        _this5.selectionIndex = 0;
        _this5.elements.tagMenu.addEventListener('click', function(evt) {
            if (evt.target.tagName == 'LI') _this5.selectTag(evt.target.innerText);
        });
        _this5.elements.visibleInput.addEventListener('keydown', function(evt) {
            _this5.handleKeydown(evt);
        });
        _this5.elements.tagHolder.addEventListener('click', function(evt) {
            console.log(evt);
            evt.preventDefault();
            if (evt.target.classList.contains('remove')) {
                var tagEl = evt.target.closest('.form__tag');
                _this5.removeTagByElement(tagEl);
            }
        }); // we need to add onclick to (most) child elements to make this work right, otherwise the text entry box could get focused erroneously
        _this5.root.addEventListener('click', function(evt) {
            _this5.elements.visibleInput.focus();
            evt.preventDefault();
        });
        return _this5;
    }
    $2142e16afbe61e15$var$_createClass(TagInputView, [
        {
            key: "handleKeydown",
            value: function handleKeydown(evt) {
                var _this6 = this;
                if (evt.key == 'Enter') {
                    evt.preventDefault();
                    this.selectTag();
                } else if (evt.key == 'ArrowDown') {
                    evt.preventDefault();
                    this.incrementSelectedPrediction();
                } else if (evt.key == 'ArrowUp') {
                    evt.preventDefault();
                    this.decrementSelectedPrediction();
                } else {
                    // this one *might* change the text, so we need it in the outer `else`
                    if (evt.key == 'Backspace') {
                        if (this.elements.visibleInput.innerText == '') {
                            evt.preventDefault();
                            var tags = document.querySelectorAll('.form__tag');
                            if (tags.length > 0) this.removeTagByElement(tags[tags.length - 1]);
                        }
                    } else // using a setTimeout to make sure that the rest of the event loop has time to process
                    // otherwise, we'd probably get the *old* text value when checking current text
                    setTimeout(function() {
                        _this6.updatePrediction();
                    }, 1);
                }
            }
        },
        {
            key: "removeTagByElement",
            value: function removeTagByElement(tagEl) {
                var tagStr = tagEl.innerText;
                tagEl.remove();
                this.tags = this.tags.filter(function(t) {
                    return t != tagStr;
                });
                this.elements.taglist.value = JSON.stringify(this.tags);
            }
        },
        {
            key: "incrementSelectedPrediction",
            value: function incrementSelectedPrediction() {
                if (this.selectionIndex >= this.currentPrediction.length) return;
                if (!this.isSelectingPrediction) {
                    this.isSelectingPrediction = true;
                    this.selectionIndex = 0;
                } else this.selectionIndex += 1;
                this.updateSelectedListItem();
            }
        },
        {
            key: "decrementSelectedPrediction",
            value: function decrementSelectedPrediction() {
                if (this.selectionIndex == 0) this.isSelectingPrediction = false;
                else this.selectionIndex -= 1;
                this.updateSelectedListItem();
            }
        },
        {
            key: "updateSelectedListItem",
            value: function updateSelectedListItem() {
                Array.from(this.elements.tagMenu.querySelectorAll('li.active')).forEach(function(el) {
                    return el.classList.remove('active');
                });
                if (this.isSelectingPrediction) // nth-child is 1-indexed
                this.elements.tagMenu.querySelector('li:nth-child(' + (this.selectionIndex + 1) + ')').classList.add('active');
            }
        },
        {
            key: "updatePrediction",
            value: function updatePrediction() {
                var text = this.elements.visibleInput.innerText.trim().toLowerCase();
                if (text) {
                    var predictedTags = this.prediction.filter(function(val) {
                        return val.lowercase.includes(text);
                    });
                    this.currentPrediction = predictedTags;
                    this.isSelectingPrediction = false;
                    this.selectionIndex = 0;
                    var bestTags = [];
                    var otherTags = [];
                    predictedTags.forEach(function(val) {
                        if (val.lowercase.startsWith(text)) bestTags.push(val.tag);
                        else otherTags.push(val.tag);
                    });
                    this.elements.tagMenu.innerHTML = $15ZYJ.menulistTemplate({
                        items: [].concat(bestTags, otherTags)
                    });
                    this.elements.tagMenu.style.display = 'block';
                } else this.elements.tagMenu.style.display = 'none';
            }
        },
        {
            key: "selectTag",
            value: function selectTag(tag) {
                if (!tag) {
                    if (this.isSelectingPrediction) tag = this.currentPrediction[this.selectionIndex].tag;
                    else tag = this.elements.visibleInput.innerText.trim();
                }
                this.tags.push(tag);
                this.elements.taglist.value = JSON.stringify(this.tags);
                var tmp = document.createElement('div');
                tmp.innerHTML = $asgYb.tagTemplate({
                    tag: tag
                });
                var tagLabel = tmp.firstChild;
                this.elements.tagHolder.append(tagLabel);
                this.elements.visibleInput.innerText = '';
                this.updatePrediction();
            }
        }
    ]);
    return TagInputView;
}($2142e16afbe61e15$var$View);
module.exports.TagInputView = $2142e16afbe61e15$var$TagInputView;
var $2142e16afbe61e15$var$CreateSentenceFormView = /*#__PURE__*/ function(_FormView3) {
    $2142e16afbe61e15$var$_inherits(CreateSentenceFormView, _FormView3);
    var _super8 = $2142e16afbe61e15$var$_createSuper(CreateSentenceFormView);
    function CreateSentenceFormView() {
        $2142e16afbe61e15$var$_classCallCheck(this, CreateSentenceFormView);
        return _super8.apply(this, arguments);
    }
    return CreateSentenceFormView;
}($2142e16afbe61e15$var$FormView);
module.exports.CreateSentenceFormView = $2142e16afbe61e15$var$CreateSentenceFormView;
var $2142e16afbe61e15$var$AudioEditorView = /*#__PURE__*/ function(_View6) {
    $2142e16afbe61e15$var$_inherits(AudioEditorView, _View6);
    var _super9 = $2142e16afbe61e15$var$_createSuper(AudioEditorView);
    function AudioEditorView(element) {
        var _this7;
        $2142e16afbe61e15$var$_classCallCheck(this, AudioEditorView);
        _this7 = _super9.call(this, element); // gnarly, awkward workaround for the fact that WaveformPlaylist uses eval for something that could have been a member access on window
        // but, we can technically replace `eval` with a function that invokes member access on window, so... that kind of works?
        window.eval = function(str) {
            return window[str];
        };
        _this7.elements.play = _this7.root.querySelector('.play-button');
        _this7.elements.save = _this7.root.querySelector('.save-button');
        _this7.elements.record = _this7.root.querySelector('.record-button');
        _this7.elements.play.addEventListener('click', function() {
            _this7.ee.emit('play');
        });
        _this7.isRecording = false;
        _this7.elements.record.addEventListener('click', function() {
            if (_this7.isRecording) {
                _this7.isRecording = false;
                _this7.ee.emit('stop');
                _this7.elements.record.innerText = 'record';
            } else {
                _this7.ee.emit('clear');
                _this7.isRecording = true;
                _this7.elements.record.innerText = 'stop'; // this MIGHT help with a reported issue with the audio re-playing? (TODO: test)
                setTimeout(function() {
                    _this7.ee.emit('record');
                }, 10);
            }
        });
        _this7.elements.main_block = _this7.root.querySelector('.editor-container');
        _this7.hideElement('main_block'); // this juggling with 'init' might-or-might-not be needed, depending on browser security quirks?
        _this7.elements.init = _this7.root.querySelector('.init');
        _this7.elements.init.addEventListener('click', _this7.setupEditor.bind($2142e16afbe61e15$var$_assertThisInitialized(_this7)));
        return _this7;
    }
    $2142e16afbe61e15$var$_createClass(AudioEditorView, [
        {
            key: "save",
            value: function save() {
                try {
                    this.ee.emit('startaudiorendering', 'buffer'); // if the recording hasn't been written out within 10 seconds, it's probably stalled / hung
                    this.recordingStalledTimer = setTimeout(function() {
                        throw new Error("Audio recording seems to be stalled");
                    }, 10000);
                } catch (e) {
                    throw new Error("Please take an audio recording, in order to submit sentences");
                }
            }
        },
        {
            key: "clear",
            value: function clear() {
                this.ee.emit('clear');
            }
        },
        {
            key: "setupEditor",
            value: function() {
                var _setupEditor = $2142e16afbe61e15$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee2() {
                    var _this8 = this;
                    var stream;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while(true)switch(_context2.prev = _context2.next){
                            case 0:
                                this.playlist = $2142e16afbe61e15$var$_waveformPlaylist["default"]({
                                    container: this.root.querySelector('.audio-editor'),
                                    state: 'select'
                                });
                                this.ee = this.playlist.getEventEmitter();
                                _context2.prev = 2;
                                _context2.next = 5;
                                return navigator.mediaDevices.getUserMedia({
                                    audio: true
                                });
                            case 5:
                                stream = _context2.sent;
                                this.playlist.initRecorder(stream);
                                _context2.next = 14;
                                break;
                            case 9:
                                _context2.prev = 9;
                                _context2.t0 = _context2["catch"](2);
                                console.error(_context2.t0);
                                $2142e16afbe61e15$var$AlertView.show('error', "Could not initialize the audio recording device. This may be a browser permissions issue - check whether microphone access is allowed."); // abort, but don't throw (since if we threw, it would spam the AlertView modal)
                                return _context2.abrupt("return");
                            case 14:
                                // only change DOM *after* we've successfully gotten audio recording initialized
                                this.hideElement('init');
                                this.showElement('main_block');
                                this.playlist.load([]).then(function() {
                                    _this8.ee.emit('zoomin');
                                    _this8.ee.emit('zoomin');
                                });
                                this.ee.on('select', function(start, end, track) {
                                    _this8.start = start;
                                    _this8.end = end;
                                });
                                this.ee.on('audiorenderingfinished', function(type, data) {
                                    if (_this8.recordingStalledTimer) clearTimeout(_this8.recordingStalledTimer);
                                    try {
                                        var start = Math.floor(_this8.start * data.sampleRate) || 0;
                                        var length = (_this8.end ? Math.floor(_this8.end * data.sampleRate) : data.length) - start;
                                        var chan = data.getChannelData(0).slice(start);
                                        var sampleRate = data.sampleRate;
                                        var seconds = _this8.end - _this8.start;
                                        var buf = new AudioBuffer({
                                            length: length,
                                            sampleRate: sampleRate
                                        });
                                        buf.copyToChannel(chan, 0);
                                        var bitrate = 96;
                                        $2142e16afbe61e15$var$_audioEncoder["default"](buf, bitrate, null, /*#__PURE__*/ function() {
                                            var _ref = $2142e16afbe61e15$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee(blob) {
                                                return regeneratorRuntime.wrap(function _callee$(_context) {
                                                    while(true)switch(_context.prev = _context.next){
                                                        case 0:
                                                            _this8.trigger('save_file', blob);
                                                        case 1:
                                                        case "end":
                                                            return _context.stop();
                                                    }
                                                }, _callee);
                                            }));
                                            return function(_x) {
                                                return _ref.apply(this, arguments);
                                            };
                                        }());
                                    } catch (err) {
                                        console.error(err);
                                        $2142e16afbe61e15$var$AlertView.show('error', err);
                                    }
                                });
                            case 19:
                            case "end":
                                return _context2.stop();
                        }
                    }, _callee2, this, [
                        [
                            2,
                            9
                        ]
                    ]);
                }));
                function setupEditor() {
                    return _setupEditor.apply(this, arguments);
                }
                return setupEditor;
            }()
        }
    ]);
    return AudioEditorView;
}($2142e16afbe61e15$var$View); // CREATE TASK VIEWS --------
module.exports.AudioEditorView = $2142e16afbe61e15$var$AudioEditorView;
var $2142e16afbe61e15$var$CreateTaskView = /*#__PURE__*/ function(_View7) {
    $2142e16afbe61e15$var$_inherits(CreateTaskView, _View7);
    var _super10 = $2142e16afbe61e15$var$_createSuper(CreateTaskView);
    function CreateTaskView() {
        $2142e16afbe61e15$var$_classCallCheck(this, CreateTaskView);
        return _super10.apply(this, arguments);
    }
    $2142e16afbe61e15$var$_createClass(CreateTaskView, [
        {
            key: "getValues",
            value: function getValues(selector) {
                var nonToggleInputs = Array.from(this.root.querySelectorAll("".concat(selector)));
                var data = {
                };
                nonToggleInputs.forEach(function(el) {
                    var name = el.name;
                    if (el.value) data[name] = el.value;
                });
                return data;
            }
        }
    ]);
    return CreateTaskView;
}($2142e16afbe61e15$var$View);
var $2142e16afbe61e15$var$CreateTaskRandomView = /*#__PURE__*/ function(_CreateTaskView) {
    $2142e16afbe61e15$var$_inherits(CreateTaskRandomView, _CreateTaskView);
    var _super11 = $2142e16afbe61e15$var$_createSuper(CreateTaskRandomView);
    function CreateTaskRandomView(element) {
        var _this9;
        $2142e16afbe61e15$var$_classCallCheck(this, CreateTaskRandomView);
        _this9 = _super11.call(this, element); //Get inputs (.elements name must match their corresponding switch's name)
        _this9.elements.vivaRefLow = _this9.root.querySelector('.vivaref-low');
        _this9.elements.vivaRefHigh = _this9.root.querySelector('.vivaref-high');
        _this9.elements.levelLow = _this9.root.querySelector('.level-low');
        _this9.elements.levelHigh = _this9.root.querySelector('.level-high');
        _this9.elements.switches = {
        };
        _this9.elements.switches.vivaRefLow = _this9.root.querySelector('.check-vivaref-low').getElementsByTagName('input');
        _this9.elements.switches.vivaRefHigh = _this9.root.querySelector('.check-vivaref-high').getElementsByTagName('input');
        _this9.elements.switches.levelLow = _this9.root.querySelector('.check-level-low').getElementsByTagName('input');
        _this9.elements.switches.levelHigh = _this9.root.querySelector('.check-level-high').getElementsByTagName('input');
        var switches = Array.from(_this9.root.querySelectorAll('input[type=checkbox]')); //Prep DOM
        switches.forEach(function(e) {
            return _this9.showHide(e);
        }); //Add event listener for change
        switches.forEach(function(e) {
            e.addEventListener('change', function(e1) {
                return _this9.showHide(e1.srcElement);
            });
        });
        return _this9;
    } //Function to return form data on submit
    $2142e16afbe61e15$var$_createClass(CreateTaskRandomView, [
        {
            key: "onCreateTaskRandomValues",
            value: function onCreateTaskRandomValues(callback) {
                var _this10 = this;
                this.root.addEventListener('submit', function(e) {
                    e.preventDefault();
                    var vivaRefRes = _this10.getUpperLower(_this10.elements.switches.vivaRefLow[0], _this10.elements.switches.vivaRefHigh[0], 'vivaRef');
                    var levelRes = _this10.getUpperLower(_this10.elements.switches.levelLow[0], _this10.elements.switches.levelHigh[0], 'level');
                    var nonToggleValues = _this10.getValues('.sentence-details');
                    var paramsObject = $2142e16afbe61e15$var$_objectSpread($2142e16afbe61e15$var$_objectSpread($2142e16afbe61e15$var$_objectSpread({
                    }, vivaRefRes), levelRes), nonToggleValues);
                    var params = new URLSearchParams(paramsObject);
                    var searchParams = decodeURIComponent(params.toString());
                    var taskDetails = _this10.getValues('.task-details');
                    callback(searchParams, taskDetails);
                });
            }
        },
        {
            key: "getUpperLower",
            value: function getUpperLower(checkOne, checkTwo, searchParam) {
                var lowerValue = this.elements[checkOne.name].value;
                var higherValue = this.elements[checkTwo.name].value;
                if (checkTwo.checked) {
                    var res = "{\"".concat(searchParam, "[gte]\": ").concat(lowerValue, ",\n\t\t  \"").concat(searchParam, "[lte]\": ").concat(higherValue, "}");
                    return JSON.parse(res);
                } else if (checkOne.checked) {
                    var _res = JSON.parse("{\"".concat(searchParam, "\" : ").concat(lowerValue, "}"));
                    return _res;
                } else return null;
            }
        },
        {
            key: "showHide",
            value: function showHide(el) {
                if (el.checked) this.showElement(el.name);
                else this.hideElement(el.name);
            }
        }
    ]);
    return CreateTaskRandomView;
}($2142e16afbe61e15$var$CreateTaskView);
module.exports.CreateTaskRandomView = $2142e16afbe61e15$var$CreateTaskRandomView;
var $2142e16afbe61e15$var$CreateTaskChooseSentenceView = /*#__PURE__*/ function(_CreateTaskView2) {
    $2142e16afbe61e15$var$_inherits(CreateTaskChooseSentenceView, _CreateTaskView2);
    var _super12 = $2142e16afbe61e15$var$_createSuper(CreateTaskChooseSentenceView);
    function CreateTaskChooseSentenceView(element) {
        var _this11;
        $2142e16afbe61e15$var$_classCallCheck(this, CreateTaskChooseSentenceView);
        _this11 = _super12.call(this, element);
        _this11.elements.tableParent = _this11.root.querySelector('.sentence-table-holder');
        _this11.elements.saveButton = _this11.root.querySelector('button.set-tasks-button-choose-sentences');
        _this11.elements.previousPage = _this11.root.querySelector('.previous-page');
        _this11.elements.nextPage = _this11.root.querySelector('.next-page');
        _this11.elements.pageNum = _this11.root.querySelector('.page-num');
        _this11.elements.maxPageNum = _this11.root.querySelector('.max-page-num');
        _this11.getFilterElements().forEach(function(el) {
            el.addEventListener('change', _this11.updateFilters.bind($2142e16afbe61e15$var$_assertThisInitialized(_this11)));
        });
        _this11.elements.saveButton.addEventListener('click', function() {
            return _this11.trigger('save', {
            });
        });
        _this11.elements.pageNum.addEventListener('change', function() {
            _this11.trigger('select_page', _this11.page - 0);
        });
        _this11.elements.previousPage.addEventListener('click', function(evt) {
            evt.preventDefault();
            _this11.trigger('change_page', -1);
        });
        _this11.elements.nextPage.addEventListener('click', function(evt) {
            evt.preventDefault();
            _this11.trigger('change_page', 1);
        });
        _this11.elements.tableParent.addEventListener('change', function(evt) {
            if (evt.target.tagName == 'INPUT' && evt.target.type == 'checkbox') {
                var sentenceId = evt.target.dataset.sentence_id;
                if (sentenceId) {
                    var triggerType = evt.target.checked ? 'add_sentence' : 'remove_sentence';
                    _this11.trigger(triggerType, {
                        sentenceId: sentenceId
                    });
                }
            }
        });
        return _this11;
    }
    $2142e16afbe61e15$var$_createClass(CreateTaskChooseSentenceView, [
        {
            key: "getFilterElements",
            value: function getFilterElements() {
                return Array.from(this.root.querySelectorAll('.filter-selector'));
            }
        },
        {
            key: "updateFilters",
            value: function updateFilters() {
                this.trigger('filter_update', this.getFilterState());
            }
        },
        {
            key: "getFilterState",
            value: function getFilterState() {
                var filterState = {
                };
                this.getFilterElements().filter(function(el) {
                    return el.value != '';
                }).forEach(function(el) {
                    return filterState[el.name] = el.value;
                });
                return filterState;
            }
        },
        {
            key: "updateDisplay",
            value: function updateDisplay(sentences, toSave) {
                var fields = [
                    'grammar',
                    'vivaRef',
                    'tense',
                    'level',
                    'sentence',
                    'translation'
                ];
                var fieldClasses = {
                    grammar: 'narrow',
                    vivaRef: 'narrow',
                    tense: 'narrow',
                    level: 'narrow'
                };
                var savedIds = toSave.map(function(sent) {
                    return sent.data._id;
                });
                this.elements.tableParent.innerHTML = $50CWN.sentencetableTemplate({
                    fields: fields,
                    sentences: sentences,
                    saved: toSave,
                    savedIds: savedIds,
                    fieldClasses: fieldClasses
                });
            }
        },
        {
            key: "page",
            get: function get() {
                return this.elements.pageNum.value;
            },
            set: function set(value) {
                this._page = value;
                this.elements.pageNum.value = this._page;
                return this._page;
            }
        },
        {
            key: "maxPage",
            get: function get() {
                return this._maxPage;
            },
            set: function set(value) {
                var _this12 = this;
                this._maxPage = value;
                this.elements.maxPageNum.innerText = this._maxPage;
                var optionHTML = Array(this._maxPage).fill('').map(function(_, i) {
                    var index = i + 1;
                    return "<option value=".concat(index, " ").concat(index == _this12.page ? 'selected' : '', ">").concat(index, "</option>");
                }).join('');
                this.elements.pageNum.innerHTML = optionHTML;
                return this._maxPage;
            }
        }
    ]);
    return CreateTaskChooseSentenceView;
}($2142e16afbe61e15$var$CreateTaskView); // TRAINING + REVISION VIEW
module.exports.CreateTaskChooseSentenceView = $2142e16afbe61e15$var$CreateTaskChooseSentenceView;
var $2142e16afbe61e15$var$TrainingView = /*#__PURE__*/ function(_FormView4) {
    $2142e16afbe61e15$var$_inherits(TrainingView, _FormView4);
    var _super13 = $2142e16afbe61e15$var$_createSuper(TrainingView);
    function TrainingView(element) {
        var _this13;
        $2142e16afbe61e15$var$_classCallCheck(this, TrainingView);
        _this13 = _super13.call(this, element); // get our sub-elements
        _this13.elements.prompt = _this13.root.querySelector('.card-title');
        _this13.elements.input = _this13.root.querySelector('[name=student_answer]');
        _this13.elements.answer_feedback = _this13.root.querySelector('.answer-feedback');
        _this13.elements.answer_feedback_inner = _this13.root.querySelector('.answer-feedback-inner');
        _this13.elements.correct_answer = _this13.root.querySelector('.correct-answer');
        _this13.elements.correct_answer_inner = _this13.root.querySelector('.correct-answer-inner');
        _this13.elements.right_count = _this13.root.querySelector('.right-count');
        _this13.elements.total_count = _this13.root.querySelector('.total-count');
        _this13.elements.submit_button = _this13.root.querySelector('button[type=submit]');
        _this13.elements.next_button = _this13.root.querySelector('button[type=button].btn-next');
        _this13.elements.audio = _this13.root.querySelector('audio.sentence-audio');
        _this13.elements.playAudio = _this13.root.querySelector('.play-audio');
        _this13.elements.accentbuttons = Array.from(_this13.root.querySelectorAll('.btn-accent')); // define some groups of elements
        _this13.defineElementGroup('feedback', [
            'answer_feedback',
            'next_button'
        ]);
        _this13.defineElementGroup('dataEntry', [
            'input',
            'submit_button'
        ]); // prep DOM
        _this13.hideGroup('feedback');
        _this13.clearAnswerText(); // set up event listeners
        _this13.onFormData(function(data) {
            return _this13.handleStudentAnswer(data);
        });
        _this13.elements.next_button.addEventListener('click', function() {
            _this13.hideGroup('feedback');
            _this13.showGroup('dataEntry');
            _this13.clearAnswerText();
            _this13.elements.input.focus();
            _this13.trigger('next');
        }); //Accent buttons
        _this13.elements.accentbuttons.forEach(function(button) {
            return button.addEventListener('click', function(evt) {
                evt.preventDefault();
                _this13.elements.input.value += evt.srcElement.name;
                _this13.elements.input.focus();
            });
        }); // global hotkeys (should be fine, though?)
        document.addEventListener('keydown', function(evt) {
            if (evt.key == '[') {
                evt.preventDefault();
                _this13.elements.audio.play();
            }
        });
        _this13.elements.playAudio.addEventListener('click', function() {
            _this13.elements.audio.play();
        });
        return _this13;
    }
    $2142e16afbe61e15$var$_createClass(TrainingView, [
        {
            key: "updateLayoutForExercise",
            value: function updateLayoutForExercise(exercise) {
                if (exercise == 'transcription') {
                    this.elements.prompt.style.gridArea = 'audio';
                    this.elements.audio.style.gridArea = 'prompt';
                } else {
                    this.elements.prompt.style.gridArea = 'prompt';
                    this.elements.audio.style.gridArea = 'audio';
                }
            }
        },
        {
            key: "updateCounts",
            value: function updateCounts(right, total) {
                this.elements.right_count.innerText = right;
                this.elements.total_count.innerText = total;
            }
        },
        {
            key: "clearAnswerText",
            value: function clearAnswerText() {
                this.elements.input.value = '';
                this.elements.correct_answer_inner.innerText = '';
            }
        },
        {
            key: "handleStudentAnswer",
            value: function handleStudentAnswer(_ref2) {
                var student_answer = _ref2.student_answer;
                // CALCULATE VARIOUS DATA (maybe could live outside of the View layer?)
                function stripNonLetterNumber(str) {
                    // normalize to ONLY letters and numbers (cross-language), lowercase
                    // this'll require fairly modern JS, incidentally
                    return str.replace(/(?:(?![0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])[\s\S])/gi, '').toLowerCase();
                } // returns a pair of diffs with slightly different text (because we want to show different text in two places)
                var diffs = $8WajT.runDiff(this.answer, student_answer); // the answer is correct if there are no differences, OR if the only differences are punctuation/etc.
                var differencesOnly = diffs.student.filter(function(diff) {
                    return diff.added || diff.removed;
                }).map(function(diff) {
                    return $2142e16afbe61e15$var$_objectSpread($2142e16afbe61e15$var$_objectSpread({
                    }, diff), {
                    }, {
                        value: stripNonLetterNumber(diff.value)
                    });
                }).filter(function(diff) {
                    return diff.value;
                });
                var isCorrect = differencesOnly.length == 0; // DISPLAY CALCULATED DATA
                // NOTE from Heather to Tom:
                //   this method call looks a little over-fancy. feel free to refactor into something easier to read. hopefully I've added enough comments to make it understandable?
                this.setAsHighlightedSpan('answer_feedback_inner', diffs.student.filter(function(diff) {
                    return !diff.removed;
                }), function(diff) {
                    return diff.added ? 'highlight-wrong' : 'highlight-right';
                });
                this.setAsHighlightedSpan('correct_answer_inner', diffs.original.filter(function(diff) {
                    return !diff.added;
                }), function(diff) {
                    return diff.removed ? 'highlight-wrong' : 'highlight-right';
                });
                this.hideGroup('dataEntry');
                this.showGroup('feedback');
                this.elements.next_button.focus();
                this.trigger('answer', {
                    student_answer: student_answer,
                    isCorrect: isCorrect
                });
            } // this method replaces the content of an element with a set of highlighted/styled spans, such as you might want if you're presenting diff output.
        },
        {
            key: "setAsHighlightedSpan",
            value: function setAsHighlightedSpan(elementName, array, classNameCallback) {
                var baseEl = this.elements[elementName]; // keep track of the index so that we can do a .innerText later (thus bypassing issues with HTML injection / XSS)
                var spans = array.map(function(entry, index) {
                    var elClass = classNameCallback(entry); // using some index-juggling in order to avoid having to worry about HTML injection
                    return "<span class=\"".concat(elClass, "\">").concat(index, "</span>");
                });
                baseEl.innerHTML = spans.join(''); // now we can safely assign user-defined text, via `.innerText` (which doesn't get parsed as HTML)
                Array.from(baseEl.querySelectorAll('span')).forEach(function(span) {
                    span.innerText = array[span.innerText].value;
                });
            }
        },
        {
            key: "finish",
            value: function finish() {
                this.prompt = 'done';
                this.hideGroup('dataEntry');
                this.hideGroup('feedback');
            }
        },
        {
            key: "prompt",
            get: function get() {
                return this.elements.prompt.innerText;
            },
            set: function set(value) {
                return this.elements.prompt.innerText = value;
            }
        },
        {
            key: "audioUrl",
            get: function get() {
                return this.elements.audio.src;
            },
            set: function set(value) {
                return this.elements.audio.src = value;
            }
        }
    ]);
    return TrainingView;
}($2142e16afbe61e15$var$FormView); //DELETE
module.exports.TrainingView = $2142e16afbe61e15$var$TrainingView;
var $2142e16afbe61e15$var$DeleteView = /*#__PURE__*/ function(_View8) {
    $2142e16afbe61e15$var$_inherits(DeleteView, _View8);
    var _super14 = $2142e16afbe61e15$var$_createSuper(DeleteView);
    function DeleteView(element) {
        var _this14;
        $2142e16afbe61e15$var$_classCallCheck(this, DeleteView);
        _this14 = _super14.call(this, element);
        var deleteBox = '<span class="deleteBox"><p>Are you sure you want to delete?</p><span class="button cancel">Cancel</span><span class="button confirm">Yes</span></span>';
        _this14.root.insertAdjacentHTML('beforeend', deleteBox);
        _this14.root.addEventListener('click', function(evt) {
            // use a different set of event-handling for anything marked as a button
            if (evt.target.classList.contains('button')) {
                if (evt.target.classList.contains('cancel')) _this14.root.classList.remove('selected');
                else if (evt.target.classList.contains('confirm')) {
                    // deletion logic goes in this branch.
                    var row = evt.target;
                    while(row.tagName != 'TR')row = row.parentNode;
                    _this14.trigger('delete', row.getAttribute('name'), row, row.getAttribute('collection'));
                }
                return false;
            } // not a button, so show the deleteBox (if not already shown)
            _this14.root.classList.add('selected');
            return false;
        });
        return _this14;
    }
    $2142e16afbe61e15$var$_createClass(DeleteView, [
        {
            key: "deleteRow",
            value: function deleteRow(row) {
                row.classList.add('deleted');
                setTimeout(function() {
                    row.remove();
                }, 500);
            }
        }
    ]);
    return DeleteView;
}($2142e16afbe61e15$var$View);
module.exports.DeleteView = $2142e16afbe61e15$var$DeleteView;

});
parcelRequire.register("8WajT", function(module, exports) {
"use strict";











Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.runDiff = $681bbed1a5ff13ee$var$runDiff;

function $681bbed1a5ff13ee$var$ownKeys(object, enumerableOnly) {
    var keys = Object.keys(object);
    if (Object.getOwnPropertySymbols) {
        var symbols = Object.getOwnPropertySymbols(object);
        if (enumerableOnly) symbols = symbols.filter(function(sym) {
            return Object.getOwnPropertyDescriptor(object, sym).enumerable;
        });
        keys.push.apply(keys, symbols);
    }
    return keys;
}
function $681bbed1a5ff13ee$var$_objectSpread(target) {
    for(var i = 1; i < arguments.length; i++){
        var source = arguments[i] != null ? arguments[i] : {
        };
        if (i % 2) $681bbed1a5ff13ee$var$ownKeys(Object(source), true).forEach(function(key) {
            $681bbed1a5ff13ee$var$_defineProperty(target, key, source[key]);
        });
        else if (Object.getOwnPropertyDescriptors) Object.defineProperties(target, Object.getOwnPropertyDescriptors(source));
        else $681bbed1a5ff13ee$var$ownKeys(Object(source)).forEach(function(key) {
            Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key));
        });
    }
    return target;
}
function $681bbed1a5ff13ee$var$_defineProperty(obj, key, value) {
    if (key in obj) Object.defineProperty(obj, key, {
        value: value,
        enumerable: true,
        configurable: true,
        writable: true
    });
    else obj[key] = value;
    return obj;
}
function $681bbed1a5ff13ee$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $681bbed1a5ff13ee$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $681bbed1a5ff13ee$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $681bbed1a5ff13ee$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $681bbed1a5ff13ee$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}
// using this for a crude locally-unique identifier
var $681bbed1a5ff13ee$var$SYNONYM_COUNT = 0;
var $681bbed1a5ff13ee$var$Synonym = /*#__PURE__*/ function() {
    function Synonym() {
        $681bbed1a5ff13ee$var$_classCallCheck(this, Synonym);
        for(var _len = arguments.length, words = new Array(_len), _key = 0; _key < _len; _key++)words[_key] = arguments[_key];
        this.words = words;
        this.id = $681bbed1a5ff13ee$var$SYNONYM_COUNT++;
    }
    $681bbed1a5ff13ee$var$_createClass(Synonym, [
        {
            key: "normalize",
            value: function normalize(string) {
                var _this = this;
                this.words.forEach(function(word) {
                    // CAVEAT: if the word contains any regex metacharacters, then it might not work as intended
                    // if that's a problem, you'd need to escape it (either escape it in the list of synonyms, OR add escaping code here, but not both)
                    string = string.replace(new RegExp("\\b".concat(word, "\\b"), 'gi'), function(orig) {
                        return "".concat(_this.identString()).concat($681bbed1a5ff13ee$var$encode(orig), "##");
                    });
                });
                return string;
            }
        },
        {
            key: "canonWord",
            value: function canonWord() {
                return this.words[0];
            }
        },
        {
            key: "identString",
            value: function identString() {
                return "##SYNONYM_".concat(this.id, "##");
            }
        }
    ]);
    return Synonym;
}(); // ADD NEW SYNONYMS HERE
var $681bbed1a5ff13ee$var$synonyms = [
    new $681bbed1a5ff13ee$var$Synonym("isn't", 'is not'),
    new $681bbed1a5ff13ee$var$Synonym("it's", 'it is'),
    new $681bbed1a5ff13ee$var$Synonym("wasn't", 'was not'),
    new $681bbed1a5ff13ee$var$Synonym("didn't", 'did not'),
    new $681bbed1a5ff13ee$var$Synonym('on weekends', 'on the weekend'),
    new $681bbed1a5ff13ee$var$Synonym('vacation', 'holidays'),
    new $681bbed1a5ff13ee$var$Synonym('lots', 'a lot of'),
    new $681bbed1a5ff13ee$var$Synonym('relax', 'rest')
]; // using an encoding which consists only of numbers and punctuation, in order to avoid the risk of an accidental double-replacement
function $681bbed1a5ff13ee$var$encode(str) {
    return str.split('').map(function(c) {
        return c.charCodeAt(0);
    }).join(',');
}
function $681bbed1a5ff13ee$var$decode(str) {
    return str.split(',').map(function(num) {
        return String.fromCharCode(num - 0);
    }).join('');
}
function $681bbed1a5ff13ee$var$runDiff(correct_answer, student_answer) {
    $681bbed1a5ff13ee$var$synonyms.forEach(function(syn) {
        correct_answer = syn.normalize(correct_answer);
        student_answer = syn.normalize(student_answer);
    });
    var correct_answer_subs = [];
    var student_answer_subs = [];
    correct_answer = correct_answer.replace(/(##SYNONYM_\d+##)([^#]+)##/g, function(_, match1, match2) {
        correct_answer_subs.push($681bbed1a5ff13ee$var$decode(match2));
        return match1;
    });
    student_answer = student_answer.replace(/(##SYNONYM_\d+##)([^#]+)##/g, function(_, match1, match2) {
        student_answer_subs.push($681bbed1a5ff13ee$var$decode(match2));
        return match1;
    }); //console.log(correct_answer, correct_answer_subs);
    console.log(student_answer, student_answer_subs);
    var diffs = $fd6lr$diff.diffWords(correct_answer, student_answer, {
        ignoreCase: true
    }); // we want to return both versions (synonym-aware), SO, let's do a shallow clone on these diffs
    var student = diffs.map(function(diff) {
        return $681bbed1a5ff13ee$var$_objectSpread({
        }, diff);
    });
    var original = diffs.map(function(diff) {
        return $681bbed1a5ff13ee$var$_objectSpread({
        }, diff);
    });
    student.forEach(function(diff) {
        diff.value = diff.value.replace(/##SYNONYM_\d+##/g, function() {
            return student_answer_subs.shift();
        });
    });
    original.forEach(function(diff) {
        diff.value = diff.value.replace(/##SYNONYM_\d+##/g, function() {
            return correct_answer_subs.shift();
        });
    });
    return {
        student: student,
        original: original
    };
}
window.runDiff = $681bbed1a5ff13ee$var$runDiff;
window.synonyms = $681bbed1a5ff13ee$var$synonyms;

});

parcelRequire.register("50CWN", function(module, exports) {
"use strict";



















Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.sentencetableTemplate = $3a5b29fc139c4f20$var$sentencetableTemplate;
function $3a5b29fc139c4f20$var$_typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $3a5b29fc139c4f20$var$_typeof = function _typeof(obj1) {
        return typeof obj1;
    };
    else $3a5b29fc139c4f20$var$_typeof = function _typeof1(obj1) {
        return obj1 && typeof Symbol === "function" && obj1.constructor === Symbol && obj1 !== Symbol.prototype ? "symbol" : typeof obj1;
    };
    return $3a5b29fc139c4f20$var$_typeof(obj);
}
function $3a5b29fc139c4f20$var$pug_attr(t, e, n, r) {
    if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
    if (!0 === e) return " " + (r ? t : t + '="' + t + '"');
    var f = $3a5b29fc139c4f20$var$_typeof(e);
    return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = $3a5b29fc139c4f20$var$pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}
function $3a5b29fc139c4f20$var$pug_classes(s, r) {
    return Array.isArray(s) ? $3a5b29fc139c4f20$var$pug_classes_array(s, r) : s && "object" == $3a5b29fc139c4f20$var$_typeof(s) ? $3a5b29fc139c4f20$var$pug_classes_object(s) : s || "";
}
function $3a5b29fc139c4f20$var$pug_classes_array(r, a) {
    for(var s, e = "", u = "", c = Array.isArray(a), g = 0; g < r.length; g++)(s = $3a5b29fc139c4f20$var$pug_classes(r[g])) && (c && a[g] && (s = $3a5b29fc139c4f20$var$pug_escape(s)), e = e + u + s, u = " ");
    return e;
}
function $3a5b29fc139c4f20$var$pug_classes_object(r) {
    var a = "", n = "";
    for(var o in r)o && r[o] && $3a5b29fc139c4f20$var$pug_has_own_property.call(r, o) && (a = a + n + o, n = " ");
    return a;
}
function $3a5b29fc139c4f20$var$pug_escape(e) {
    var a = "" + e, t = $3a5b29fc139c4f20$var$pug_match_html.exec(a);
    if (!t) return e;
    var r, c, n, s = "";
    for(r = t.index, c = 0; r < a.length; r++){
        switch(a.charCodeAt(r)){
            case 34:
                n = "&quot;";
                break;
            case 38:
                n = "&amp;";
                break;
            case 60:
                n = "&lt;";
                break;
            case 62:
                n = "&gt;";
                break;
            default:
                continue;
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
    }
    return c !== r ? s + a.substring(c, r) : s;
}
var $3a5b29fc139c4f20$var$pug_has_own_property = Object.prototype.hasOwnProperty;
var $3a5b29fc139c4f20$var$pug_match_html = /["&<>]/;
function $3a5b29fc139c4f20$var$pug_rethrow(n, e, r, t) {
    if (!(n instanceof Error)) throw n;
    if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;
    try {
        t = t || $parcel$global["require"]("fs").readFileSync(e, "utf8");
    } catch (e1) {
        $3a5b29fc139c4f20$var$pug_rethrow(n, null, r);
    }
    var i = 3, a = t.split("\n"), o = Math.max(r - i, 0), h = Math.min(a.length, r + i), i = a.slice(o, h).map(function(n1, e1) {
        var t1 = e1 + o + 1;
        return (t1 == r ? "  > " : "    ") + t1 + "| " + n1;
    }).join("\n");
    throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}
function $3a5b29fc139c4f20$var$sentencetableTemplate(locals) {
    var pug_html = "", pug_mixins = {
    }, _pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
        var pug_debug_sources = {
            "frontend-views//sentencetable.pug": "mixin row(sentence, options)\n    tr(class=(options.disabled ? 'disabled' : ''))\n        td\n            if options.saved\n                input(type=\"checkbox\" checked data-sentence_id=sentence.data._id)\n            else\n                if !options.disabled\n                    input(type=\"checkbox\" data-sentence_id=sentence.data._id)\n                else\n                    input(type=\"checkbox\" disabled)\n        each field in fields\n            td\n                =sentence.data[field]\n  \n\ntable.sentence-table\n    colgroup\n        col.selected-toggle.narrow\n        each field in fields\n            col(class=(fieldClasses[field] || ''))\n    tbody\n        tr\n            th\n                -// empty\n            each field in fields\n                th\n                    =field\n        each sentence in saved\n            +row(sentence, {saved: true})\n        each sentence in sentences\n            +row(sentence, {disabled: savedIds.includes(sentence.data._id)})\n"
        };
        var locals_for_with = locals || {
        };
        (function(fieldClasses, fields, saved, savedIds, sentences) {
            pug_debug_line = 1;
            pug_debug_filename = "frontend-views//sentencetable.pug";
            pug_mixins["row"] = _pug_interp = function pug_interp(sentence, options) {
                var block = this && this.block, attributes = this && this.attributes || {
                };
                pug_debug_line = 2;
                pug_debug_filename = "frontend-views//sentencetable.pug";
                pug_html = pug_html + "<tr" + $3a5b29fc139c4f20$var$pug_attr("class", $3a5b29fc139c4f20$var$pug_classes([
                    options.disabled ? 'disabled' : ''
                ], [
                    true
                ]), false, false) + ">";
                pug_debug_line = 3;
                pug_debug_filename = "frontend-views//sentencetable.pug";
                pug_html = pug_html + "<td>";
                pug_debug_line = 4;
                pug_debug_filename = "frontend-views//sentencetable.pug";
                if (options.saved) {
                    pug_debug_line = 5;
                    pug_debug_filename = "frontend-views//sentencetable.pug";
                    pug_html = pug_html + "<input" + (" type=\"checkbox\"" + $3a5b29fc139c4f20$var$pug_attr("checked", true, true, false) + $3a5b29fc139c4f20$var$pug_attr("data-sentence_id", sentence.data._id, true, false)) + "/>";
                } else {
                    pug_debug_line = 7;
                    pug_debug_filename = "frontend-views//sentencetable.pug";
                    if (!options.disabled) {
                        pug_debug_line = 8;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_html = pug_html + "<input" + (" type=\"checkbox\"" + $3a5b29fc139c4f20$var$pug_attr("data-sentence_id", sentence.data._id, true, false)) + "/>";
                    } else {
                        pug_debug_line = 10;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_html = pug_html + "<input" + (" type=\"checkbox\"" + $3a5b29fc139c4f20$var$pug_attr("disabled", true, true, false)) + "/>";
                    }
                }
                pug_html = pug_html + "</td>";
                pug_debug_line = 11;
                pug_debug_filename = "frontend-views//sentencetable.pug"; // iterate fields
                (function() {
                    var $$obj = fields;
                    if ('number' == typeof $$obj.length) for(var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++){
                        var field = $$obj[pug_index0];
                        pug_debug_line = 12;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_html = pug_html + "<td>";
                        pug_debug_line = 13;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_html = pug_html + $3a5b29fc139c4f20$var$pug_escape(null == (_pug_interp = sentence.data[field]) ? "" : _pug_interp) + "</td>";
                    }
                    else {
                        var $$l = 0;
                        for(var pug_index0 in $$obj){
                            $$l++;
                            var field = $$obj[pug_index0];
                            pug_debug_line = 12;
                            pug_debug_filename = "frontend-views//sentencetable.pug";
                            pug_html = pug_html + "<td>";
                            pug_debug_line = 13;
                            pug_debug_filename = "frontend-views//sentencetable.pug";
                            pug_html = pug_html + $3a5b29fc139c4f20$var$pug_escape(null == (_pug_interp = sentence.data[field]) ? "" : _pug_interp) + "</td>";
                        }
                    }
                }).call(this);
                pug_html = pug_html + "</tr>";
            };
            pug_debug_line = 16;
            pug_debug_filename = "frontend-views//sentencetable.pug";
            pug_html = pug_html + "<table class=\"sentence-table\">";
            pug_debug_line = 17;
            pug_debug_filename = "frontend-views//sentencetable.pug";
            pug_html = pug_html + "<colgroup>";
            pug_debug_line = 18;
            pug_debug_filename = "frontend-views//sentencetable.pug";
            pug_html = pug_html + "<col class=\"selected-toggle narrow\"/>";
            pug_debug_line = 19;
            pug_debug_filename = "frontend-views//sentencetable.pug"; // iterate fields
            (function() {
                var $$obj = fields;
                if ('number' == typeof $$obj.length) for(var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++){
                    var field = $$obj[pug_index1];
                    pug_debug_line = 20;
                    pug_debug_filename = "frontend-views//sentencetable.pug";
                    pug_html = pug_html + "<col" + $3a5b29fc139c4f20$var$pug_attr("class", $3a5b29fc139c4f20$var$pug_classes([
                        fieldClasses[field] || ''
                    ], [
                        true
                    ]), false, false) + "/>";
                }
                else {
                    var $$l = 0;
                    for(var pug_index1 in $$obj){
                        $$l++;
                        var field = $$obj[pug_index1];
                        pug_debug_line = 20;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_html = pug_html + "<col" + $3a5b29fc139c4f20$var$pug_attr("class", $3a5b29fc139c4f20$var$pug_classes([
                            fieldClasses[field] || ''
                        ], [
                            true
                        ]), false, false) + "/>";
                    }
                }
            }).call(this);
            pug_html = pug_html + "</colgroup>";
            pug_debug_line = 21;
            pug_debug_filename = "frontend-views//sentencetable.pug";
            pug_html = pug_html + "<tbody>";
            pug_debug_line = 22;
            pug_debug_filename = "frontend-views//sentencetable.pug";
            pug_html = pug_html + "<tr>";
            pug_debug_line = 23;
            pug_debug_filename = "frontend-views//sentencetable.pug";
            pug_html = pug_html + "<th>";
            pug_debug_line = 24;
            pug_debug_filename = "frontend-views//sentencetable.pug"; // empty
            pug_html = pug_html + "</th>";
            pug_debug_line = 25;
            pug_debug_filename = "frontend-views//sentencetable.pug"; // iterate fields
            (function() {
                var $$obj = fields;
                if ('number' == typeof $$obj.length) for(var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++){
                    var field = $$obj[pug_index2];
                    pug_debug_line = 26;
                    pug_debug_filename = "frontend-views//sentencetable.pug";
                    pug_html = pug_html + "<th>";
                    pug_debug_line = 27;
                    pug_debug_filename = "frontend-views//sentencetable.pug";
                    pug_html = pug_html + $3a5b29fc139c4f20$var$pug_escape(null == (_pug_interp = field) ? "" : _pug_interp) + "</th>";
                }
                else {
                    var $$l = 0;
                    for(var pug_index2 in $$obj){
                        $$l++;
                        var field = $$obj[pug_index2];
                        pug_debug_line = 26;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_html = pug_html + "<th>";
                        pug_debug_line = 27;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_html = pug_html + $3a5b29fc139c4f20$var$pug_escape(null == (_pug_interp = field) ? "" : _pug_interp) + "</th>";
                    }
                }
            }).call(this);
            pug_html = pug_html + "</tr>";
            pug_debug_line = 28;
            pug_debug_filename = "frontend-views//sentencetable.pug"; // iterate saved
            (function() {
                var $$obj = saved;
                if ('number' == typeof $$obj.length) for(var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++){
                    var sentence = $$obj[pug_index3];
                    pug_debug_line = 29;
                    pug_debug_filename = "frontend-views//sentencetable.pug";
                    pug_mixins["row"](sentence, {
                        saved: true
                    });
                }
                else {
                    var $$l = 0;
                    for(var pug_index3 in $$obj){
                        $$l++;
                        var sentence = $$obj[pug_index3];
                        pug_debug_line = 29;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_mixins["row"](sentence, {
                            saved: true
                        });
                    }
                }
            }).call(this);
            pug_debug_line = 30;
            pug_debug_filename = "frontend-views//sentencetable.pug"; // iterate sentences
            (function() {
                var $$obj = sentences;
                if ('number' == typeof $$obj.length) for(var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++){
                    var sentence = $$obj[pug_index4];
                    pug_debug_line = 31;
                    pug_debug_filename = "frontend-views//sentencetable.pug";
                    pug_mixins["row"](sentence, {
                        disabled: savedIds.includes(sentence.data._id)
                    });
                }
                else {
                    var $$l = 0;
                    for(var pug_index4 in $$obj){
                        $$l++;
                        var sentence = $$obj[pug_index4];
                        pug_debug_line = 31;
                        pug_debug_filename = "frontend-views//sentencetable.pug";
                        pug_mixins["row"](sentence, {
                            disabled: savedIds.includes(sentence.data._id)
                        });
                    }
                }
            }).call(this);
            pug_html = pug_html + "</tbody></table>";
        }).call(this, "fieldClasses" in locals_for_with ? locals_for_with.fieldClasses : typeof fieldClasses !== "undefined" ? fieldClasses : undefined, "fields" in locals_for_with ? locals_for_with.fields : typeof fields !== "undefined" ? fields : undefined, "saved" in locals_for_with ? locals_for_with.saved : typeof saved !== "undefined" ? saved : undefined, "savedIds" in locals_for_with ? locals_for_with.savedIds : typeof savedIds !== "undefined" ? savedIds : undefined, "sentences" in locals_for_with ? locals_for_with.sentences : typeof sentences !== "undefined" ? sentences : undefined);
    } catch (err) {
        $3a5b29fc139c4f20$var$pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    return pug_html;
}

});

parcelRequire.register("15ZYJ", function(module, exports) {
"use strict";





Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.menulistTemplate = $0cc655ba03459e63$var$menulistTemplate;
function $0cc655ba03459e63$var$pug_escape(e) {
    var a = "" + e, t = $0cc655ba03459e63$var$pug_match_html.exec(a);
    if (!t) return e;
    var r, c, n, s = "";
    for(r = t.index, c = 0; r < a.length; r++){
        switch(a.charCodeAt(r)){
            case 34:
                n = "&quot;";
                break;
            case 38:
                n = "&amp;";
                break;
            case 60:
                n = "&lt;";
                break;
            case 62:
                n = "&gt;";
                break;
            default:
                continue;
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
    }
    return c !== r ? s + a.substring(c, r) : s;
}
var $0cc655ba03459e63$var$pug_match_html = /["&<>]/;
function $0cc655ba03459e63$var$pug_rethrow(n, e, r, t) {
    if (!(n instanceof Error)) throw n;
    if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;
    try {
        t = t || $parcel$global["require"]("fs").readFileSync(e, "utf8");
    } catch (e1) {
        $0cc655ba03459e63$var$pug_rethrow(n, null, r);
    }
    var i = 3, a = t.split("\n"), o = Math.max(r - i, 0), h = Math.min(a.length, r + i), i = a.slice(o, h).map(function(n1, e1) {
        var t1 = e1 + o + 1;
        return (t1 == r ? "  > " : "    ") + t1 + "| " + n1;
    }).join("\n");
    throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}
function $0cc655ba03459e63$var$menulistTemplate(locals) {
    var pug_html = "", pug_mixins = {
    }, pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
        var pug_debug_sources = {
            "frontend-views//menulist.pug": "ul\n    each item in items\n        li= item\n"
        };
        var locals_for_with = locals || {
        };
        (function(items) {
            pug_debug_line = 1;
            pug_debug_filename = "frontend-views//menulist.pug";
            pug_html = pug_html + "<ul>";
            pug_debug_line = 2;
            pug_debug_filename = "frontend-views//menulist.pug"; // iterate items
            (function() {
                var $$obj = items;
                if ('number' == typeof $$obj.length) for(var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++){
                    var item = $$obj[pug_index0];
                    pug_debug_line = 3;
                    pug_debug_filename = "frontend-views//menulist.pug";
                    pug_html = pug_html + "<li>";
                    pug_debug_line = 3;
                    pug_debug_filename = "frontend-views//menulist.pug";
                    pug_html = pug_html + $0cc655ba03459e63$var$pug_escape(null == (pug_interp = item) ? "" : pug_interp) + "</li>";
                }
                else {
                    var $$l = 0;
                    for(var pug_index0 in $$obj){
                        $$l++;
                        var item = $$obj[pug_index0];
                        pug_debug_line = 3;
                        pug_debug_filename = "frontend-views//menulist.pug";
                        pug_html = pug_html + "<li>";
                        pug_debug_line = 3;
                        pug_debug_filename = "frontend-views//menulist.pug";
                        pug_html = pug_html + $0cc655ba03459e63$var$pug_escape(null == (pug_interp = item) ? "" : pug_interp) + "</li>";
                    }
                }
            }).call(this);
            pug_html = pug_html + "</ul>";
        }).call(this, "items" in locals_for_with ? locals_for_with.items : typeof items !== "undefined" ? items : undefined);
    } catch (err) {
        $0cc655ba03459e63$var$pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    return pug_html;
}

});

parcelRequire.register("asgYb", function(module, exports) {
"use strict";





Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.tagTemplate = $79c9aec1d8c8bc3a$var$tagTemplate;
function $79c9aec1d8c8bc3a$var$pug_escape(e) {
    var a = "" + e, t = $79c9aec1d8c8bc3a$var$pug_match_html.exec(a);
    if (!t) return e;
    var r, c, n, s = "";
    for(r = t.index, c = 0; r < a.length; r++){
        switch(a.charCodeAt(r)){
            case 34:
                n = "&quot;";
                break;
            case 38:
                n = "&amp;";
                break;
            case 60:
                n = "&lt;";
                break;
            case 62:
                n = "&gt;";
                break;
            default:
                continue;
        }
        c !== r && (s += a.substring(c, r)), c = r + 1, s += n;
    }
    return c !== r ? s + a.substring(c, r) : s;
}
var $79c9aec1d8c8bc3a$var$pug_match_html = /["&<>]/;
function $79c9aec1d8c8bc3a$var$pug_rethrow(n, e, r, t) {
    if (!(n instanceof Error)) throw n;
    if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;
    try {
        t = t || $parcel$global["require"]("fs").readFileSync(e, "utf8");
    } catch (e1) {
        $79c9aec1d8c8bc3a$var$pug_rethrow(n, null, r);
    }
    var i = 3, a = t.split("\n"), o = Math.max(r - i, 0), h = Math.min(a.length, r + i), i = a.slice(o, h).map(function(n1, e1) {
        var t1 = e1 + o + 1;
        return (t1 == r ? "  > " : "    ") + t1 + "| " + n1;
    }).join("\n");
    throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}
function $79c9aec1d8c8bc3a$var$tagTemplate(locals) {
    var pug_html = "", pug_mixins = {
    }, pug_interp;
    var pug_debug_filename, pug_debug_line;
    try {
        var pug_debug_sources = {
            "frontend-views//tag.pug": "span.form__tag\n    =tag\n    span.remove\n"
        };
        var locals_for_with = locals || {
        };
        (function(tag) {
            pug_debug_line = 1;
            pug_debug_filename = "frontend-views//tag.pug";
            pug_html = pug_html + "<span class=\"form__tag\">";
            pug_debug_line = 2;
            pug_debug_filename = "frontend-views//tag.pug";
            pug_html = pug_html + $79c9aec1d8c8bc3a$var$pug_escape(null == (pug_interp = tag) ? "" : pug_interp);
            pug_debug_line = 3;
            pug_debug_filename = "frontend-views//tag.pug";
            pug_html = pug_html + "<span class=\"remove\"></span></span>";
        }).call(this, "tag" in locals_for_with ? locals_for_with.tag : typeof tag !== "undefined" ? tag : undefined);
    } catch (err) {
        $79c9aec1d8c8bc3a$var$pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
    }
    return pug_html;
}

});


parcelRequire.register("dy1TU", function(module, exports) {
"use strict";
function $9dcfecd00654c248$var$_typeof(obj) {
    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") $9dcfecd00654c248$var$_typeof = function _typeof(obj1) {
        return typeof obj1;
    };
    else $9dcfecd00654c248$var$_typeof = function _typeof1(obj1) {
        return obj1 && typeof Symbol === "function" && obj1.constructor === Symbol && obj1 !== Symbol.prototype ? "symbol" : typeof obj1;
    };
    return $9dcfecd00654c248$var$_typeof(obj);
}

















Object.defineProperty(module.exports, "__esModule", {
    value: true
});
module.exports.DeleteModel = module.exports.SentenceModel = module.exports.StudentSentenceModel = module.exports.StudentResultsModel = module.exports.CreateSentenceModel = module.exports.CreateTaskModel = module.exports.AuthModel = void 0;


var $2R31P = parcelRequire("2R31P");

var $9dcfecd00654c248$var$_axios = $9dcfecd00654c248$var$_interopRequireDefault($fd6lr$axios);
function $9dcfecd00654c248$var$_interopRequireDefault(obj) {
    return obj && obj.__esModule ? obj : {
        "default": obj
    };
}
function $9dcfecd00654c248$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, key, arg) {
    try {
        var info = gen[key](arg);
        var value = info.value;
    } catch (error) {
        reject(error);
        return;
    }
    if (info.done) resolve(value);
    else Promise.resolve(value).then(_next, _throw);
}
function $9dcfecd00654c248$var$_asyncToGenerator(fn) {
    return function() {
        var self = this, args = arguments;
        return new Promise(function(resolve, reject) {
            var gen = fn.apply(self, args);
            function _next(value) {
                $9dcfecd00654c248$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "next", value);
            }
            function _throw(err) {
                $9dcfecd00654c248$var$asyncGeneratorStep(gen, resolve, reject, _next, _throw, "throw", err);
            }
            _next(undefined);
        });
    };
}
function $9dcfecd00654c248$var$_defineProperties(target, props) {
    for(var i = 0; i < props.length; i++){
        var descriptor = props[i];
        descriptor.enumerable = descriptor.enumerable || false;
        descriptor.configurable = true;
        if ("value" in descriptor) descriptor.writable = true;
        Object.defineProperty(target, descriptor.key, descriptor);
    }
}
function $9dcfecd00654c248$var$_createClass(Constructor, protoProps, staticProps) {
    if (protoProps) $9dcfecd00654c248$var$_defineProperties(Constructor.prototype, protoProps);
    if (staticProps) $9dcfecd00654c248$var$_defineProperties(Constructor, staticProps);
    return Constructor;
}
function $9dcfecd00654c248$var$_classCallCheck(instance, Constructor) {
    if (!(instance instanceof Constructor)) throw new TypeError("Cannot call a class as a function");
}
function $9dcfecd00654c248$var$_inherits(subClass, superClass) {
    if (typeof superClass !== "function" && superClass !== null) throw new TypeError("Super expression must either be null or a function");
    subClass.prototype = Object.create(superClass && superClass.prototype, {
        constructor: {
            value: subClass,
            writable: true,
            configurable: true
        }
    });
    if (superClass) $9dcfecd00654c248$var$_setPrototypeOf(subClass, superClass);
}
function $9dcfecd00654c248$var$_createSuper(Derived) {
    var hasNativeReflectConstruct = $9dcfecd00654c248$var$_isNativeReflectConstruct();
    return function _createSuperInternal() {
        var Super = $9dcfecd00654c248$var$_getPrototypeOf(Derived), result;
        if (hasNativeReflectConstruct) {
            var NewTarget = $9dcfecd00654c248$var$_getPrototypeOf(this).constructor;
            result = Reflect.construct(Super, arguments, NewTarget);
        } else result = Super.apply(this, arguments);
        return $9dcfecd00654c248$var$_possibleConstructorReturn(this, result);
    };
}
function $9dcfecd00654c248$var$_possibleConstructorReturn(self, call) {
    if (call && ($9dcfecd00654c248$var$_typeof(call) === "object" || typeof call === "function")) return call;
    return $9dcfecd00654c248$var$_assertThisInitialized(self);
}
function $9dcfecd00654c248$var$_assertThisInitialized(self) {
    if (self === void 0) throw new ReferenceError("this hasn't been initialised - super() hasn't been called");
    return self;
}
function $9dcfecd00654c248$var$_wrapNativeSuper(Class) {
    var _cache = typeof Map === "function" ? new Map() : undefined;
    $9dcfecd00654c248$var$_wrapNativeSuper = function _wrapNativeSuper(Class1) {
        if (Class1 === null || !$9dcfecd00654c248$var$_isNativeFunction(Class1)) return Class1;
        if (typeof Class1 !== "function") throw new TypeError("Super expression must either be null or a function");
        if (typeof _cache !== "undefined") {
            if (_cache.has(Class1)) return _cache.get(Class1);
            _cache.set(Class1, Wrapper);
        }
        function Wrapper() {
            return $9dcfecd00654c248$var$_construct(Class1, arguments, $9dcfecd00654c248$var$_getPrototypeOf(this).constructor);
        }
        Wrapper.prototype = Object.create(Class1.prototype, {
            constructor: {
                value: Wrapper,
                enumerable: false,
                writable: true,
                configurable: true
            }
        });
        return $9dcfecd00654c248$var$_setPrototypeOf(Wrapper, Class1);
    };
    return $9dcfecd00654c248$var$_wrapNativeSuper(Class);
}
function $9dcfecd00654c248$var$_construct(Parent, args, Class) {
    if ($9dcfecd00654c248$var$_isNativeReflectConstruct()) $9dcfecd00654c248$var$_construct = Reflect.construct;
    else $9dcfecd00654c248$var$_construct = function _construct(Parent1, args1, Class1) {
        var a = [
            null
        ];
        a.push.apply(a, args1);
        var Constructor = Function.bind.apply(Parent1, a);
        var instance = new Constructor();
        if (Class1) $9dcfecd00654c248$var$_setPrototypeOf(instance, Class1.prototype);
        return instance;
    };
    return $9dcfecd00654c248$var$_construct.apply(null, arguments);
}
function $9dcfecd00654c248$var$_isNativeReflectConstruct() {
    if (typeof Reflect === "undefined" || !Reflect.construct) return false;
    if (Reflect.construct.sham) return false;
    if (typeof Proxy === "function") return true;
    try {
        Date.prototype.toString.call(Reflect.construct(Date, [], function() {
        }));
        return true;
    } catch (e) {
        return false;
    }
}
function $9dcfecd00654c248$var$_isNativeFunction(fn) {
    return Function.toString.call(fn).indexOf("[native code]") !== -1;
}
function $9dcfecd00654c248$var$_setPrototypeOf(o, p) {
    $9dcfecd00654c248$var$_setPrototypeOf = Object.setPrototypeOf || function _setPrototypeOf(o1, p1) {
        o1.__proto__ = p1;
        return o1;
    };
    return $9dcfecd00654c248$var$_setPrototypeOf(o, p);
}
function $9dcfecd00654c248$var$_getPrototypeOf(o) {
    $9dcfecd00654c248$var$_getPrototypeOf = Object.setPrototypeOf ? Object.getPrototypeOf : function _getPrototypeOf(o1) {
        return o1.__proto__ || Object.getPrototypeOf(o1);
    };
    return $9dcfecd00654c248$var$_getPrototypeOf(o);
}
var $9dcfecd00654c248$var$ModelApiError = /*#__PURE__*/ function(_Error) {
    $9dcfecd00654c248$var$_inherits(ModelApiError, _Error);
    var _super = $9dcfecd00654c248$var$_createSuper(ModelApiError);
    function ModelApiError() {
        $9dcfecd00654c248$var$_classCallCheck(this, ModelApiError);
        return _super.apply(this, arguments);
    }
    return ModelApiError;
}(/*#__PURE__*/ $9dcfecd00654c248$var$_wrapNativeSuper(Error)); // parent class for models. includes some utility methods, and such
//
// if we wanted to get fancy, we might consider picking up the mongoose model definitions, and making use of that somehow.
// but, that seems like it might take more effort than it's worth, at least until we start needing client-side validation
var $9dcfecd00654c248$var$Model = /*#__PURE__*/ function() {
    function Model(data) {
        $9dcfecd00654c248$var$_classCallCheck(this, Model);
        this.data = data;
    }
    $9dcfecd00654c248$var$_createClass(Model, [
        {
            key: "update",
            value: function() {
                var _update = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee(newData) {
                    var key;
                    return regeneratorRuntime.wrap(function _callee$(_context) {
                        while(true)switch(_context.prev = _context.next){
                            case 0:
                                for(key in newData)this.data[key] = newData[key];
                                this.constructor.sendApiRequest("".concat(this.constructor.apiUrl(), "/").concat(this.data._id), 'PATCH', newData);
                            case 2:
                            case "end":
                                return _context.stop();
                        }
                    }, _callee, this);
                }));
                function update(_x) {
                    return _update.apply(this, arguments);
                }
                return update;
            }() // can throw, catch in the Controller layer
        }
    ], [
        {
            key: "sendApiRequest",
            value: function() {
                var _sendApiRequest = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee2(url, method, data) {
                    var res;
                    return regeneratorRuntime.wrap(function _callee2$(_context2) {
                        while(true)switch(_context2.prev = _context2.next){
                            case 0:
                                _context2.prev = 0;
                                _context2.next = 3;
                                return $9dcfecd00654c248$var$_axios["default"]({
                                    method: method,
                                    url: url,
                                    data: data
                                });
                            case 3:
                                res = _context2.sent;
                                if (!(res.status == 204)) {
                                    _context2.next = 6;
                                    break;
                                }
                                return _context2.abrupt("return", res);
                            case 6:
                                if (!(res.data.status == 'success')) {
                                    _context2.next = 8;
                                    break;
                                }
                                return _context2.abrupt("return", res);
                            case 8:
                                _context2.next = 13;
                                break;
                            case 10:
                                _context2.prev = 10;
                                _context2.t0 = _context2["catch"](0);
                                throw new $9dcfecd00654c248$var$ModelApiError(_context2.t0.response.data.message);
                            case 13:
                            case "end":
                                return _context2.stop();
                        }
                    }, _callee2, null, [
                        [
                            0,
                            10
                        ]
                    ]);
                }));
                function sendApiRequest(_x2, _x3, _x4) {
                    return _sendApiRequest.apply(this, arguments);
                }
                return sendApiRequest;
            }() // expects searchParams to be a plain object (i.e., not a URLSearchParams)
        },
        {
            key: "loadFromServer",
            value: function() {
                var _loadFromServer = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee3(searchParams) {
                    var _this = this;
                    var response, objects, maxPage;
                    return regeneratorRuntime.wrap(function _callee3$(_context3) {
                        while(true)switch(_context3.prev = _context3.next){
                            case 0:
                                _context3.next = 2;
                                return this.sendApiRequest(this.apiUrl() + '?' + new URLSearchParams(searchParams).toString(), 'GET');
                            case 2:
                                response = _context3.sent;
                                objects = response.data.data.map(function(row) {
                                    return new _this(row);
                                });
                                maxPage = response.data.maxPage;
                                return _context3.abrupt("return", {
                                    objects: objects,
                                    maxPage: maxPage
                                });
                            case 6:
                            case "end":
                                return _context3.stop();
                        }
                    }, _callee3, this);
                }));
                function loadFromServer(_x5) {
                    return _loadFromServer.apply(this, arguments);
                }
                return loadFromServer;
            }()
        },
        {
            key: "fetchAll",
            value: function() {
                var _fetchAll = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee4() {
                    return regeneratorRuntime.wrap(function _callee4$(_context4) {
                        while(true)switch(_context4.prev = _context4.next){
                            case 0:
                                _context4.next = 2;
                                return this.loadFromServer(new URLSearchParams({
                                }));
                            case 2:
                                return _context4.abrupt("return", _context4.sent.objects);
                            case 3:
                            case "end":
                                return _context4.stop();
                        }
                    }, _callee4, this);
                }));
                function fetchAll() {
                    return _fetchAll.apply(this, arguments);
                }
                return fetchAll;
            }() // default API URL and database name (i.e., table), which will work for *most* classes
        },
        {
            key: "apiUrl",
            value: function apiUrl() {
                return "/api/v1/".concat(this.dbName());
            }
        },
        {
            key: "dbName",
            value: function dbName() {
                return this.name.toLowerCase().replace(/model$/, 's');
            } // returns an array of instantiated objects, based on JSON embedded in a specific DOM element
        },
        {
            key: "getLocal",
            value: function getLocal(name) {
                var _this2 = this;
                // this is *maybe* not as theoretically clean to have a Model call into a View, but since we're storing global data in certain DOM elements, it works well in practice
                var data = $2R31P.DataParserView.get(name);
                if (!(data instanceof Array)) data = [
                    data
                ];
                return data.map(function(single) {
                    return new _this2(single);
                });
            }
        }
    ]);
    return Model;
}();
var $9dcfecd00654c248$var$AuthModel = /*#__PURE__*/ function(_Model) {
    $9dcfecd00654c248$var$_inherits(AuthModel, _Model);
    var _super2 = $9dcfecd00654c248$var$_createSuper(AuthModel);
    function AuthModel() {
        $9dcfecd00654c248$var$_classCallCheck(this, AuthModel);
        return _super2.apply(this, arguments);
    }
    $9dcfecd00654c248$var$_createClass(AuthModel, null, [
        {
            key: "login",
            value: function() {
                var _login = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee5(email, password) {
                    return regeneratorRuntime.wrap(function _callee5$(_context5) {
                        while(true)switch(_context5.prev = _context5.next){
                            case 0:
                                return _context5.abrupt("return", this.sendApiRequest('api/v1/users/login', 'POST', {
                                    email: email,
                                    password: password
                                }));
                            case 1:
                            case "end":
                                return _context5.stop();
                        }
                    }, _callee5, this);
                }));
                function login(_x6, _x7) {
                    return _login.apply(this, arguments);
                }
                return login;
            }()
        },
        {
            key: "logout",
            value: function() {
                var _logout = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee6() {
                    return regeneratorRuntime.wrap(function _callee6$(_context6) {
                        while(true)switch(_context6.prev = _context6.next){
                            case 0:
                                return _context6.abrupt("return", this.sendApiRequest('/api/v1/users/logout', 'GET'));
                            case 1:
                            case "end":
                                return _context6.stop();
                        }
                    }, _callee6, this);
                }));
                function logout() {
                    return _logout.apply(this, arguments);
                }
                return logout;
            }()
        },
        {
            key: "signup",
            value: function() {
                var _signup = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee7(name, email, password, passwordConfirm, classCode) {
                    return regeneratorRuntime.wrap(function _callee7$(_context7) {
                        while(true)switch(_context7.prev = _context7.next){
                            case 0:
                                return _context7.abrupt("return", this.sendApiRequest('/api/v1/users/signup', 'POST', {
                                    name: name,
                                    email: email,
                                    password: password,
                                    passwordConfirm: passwordConfirm,
                                    classCode: classCode
                                }));
                            case 1:
                            case "end":
                                return _context7.stop();
                        }
                    }, _callee7, this);
                }));
                function signup(_x8, _x9, _x10, _x11, _x12) {
                    return _signup.apply(this, arguments);
                }
                return signup;
            }()
        }
    ]);
    return AuthModel;
}($9dcfecd00654c248$var$Model);
module.exports.AuthModel = $9dcfecd00654c248$var$AuthModel;
var $9dcfecd00654c248$var$CreateTaskModel = /*#__PURE__*/ function(_Model2) {
    $9dcfecd00654c248$var$_inherits(CreateTaskModel, _Model2);
    var _super3 = $9dcfecd00654c248$var$_createSuper(CreateTaskModel);
    function CreateTaskModel() {
        $9dcfecd00654c248$var$_classCallCheck(this, CreateTaskModel);
        return _super3.apply(this, arguments);
    }
    return CreateTaskModel;
}($9dcfecd00654c248$var$Model);
module.exports.CreateTaskModel = $9dcfecd00654c248$var$CreateTaskModel;
var $9dcfecd00654c248$var$CreateSentenceModel = /*#__PURE__*/ function(_Model3) {
    $9dcfecd00654c248$var$_inherits(CreateSentenceModel, _Model3);
    var _super4 = $9dcfecd00654c248$var$_createSuper(CreateSentenceModel);
    function CreateSentenceModel() {
        $9dcfecd00654c248$var$_classCallCheck(this, CreateSentenceModel);
        return _super4.apply(this, arguments);
    }
    $9dcfecd00654c248$var$_createClass(CreateSentenceModel, null, [
        {
            key: "create",
            value: function() {
                var _create = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee8(sentence, translation, level, vivaRef, tense, grammar, audioUrl) {
                    var data;
                    return regeneratorRuntime.wrap(function _callee8$(_context8) {
                        while(true)switch(_context8.prev = _context8.next){
                            case 0:
                                data = {
                                    sentence: sentence,
                                    translation: translation,
                                    level: level,
                                    vivaRef: vivaRef,
                                    grammar: grammar,
                                    tense: tense,
                                    audioUrl: audioUrl
                                };
                                return _context8.abrupt("return", this.sendApiRequest('/api/v1/sentences', 'POST', data));
                            case 2:
                            case "end":
                                return _context8.stop();
                        }
                    }, _callee8, this);
                }));
                function create(_x13, _x14, _x15, _x16, _x17, _x18, _x19) {
                    return _create.apply(this, arguments);
                }
                return create;
            }()
        }
    ]);
    return CreateSentenceModel;
}($9dcfecd00654c248$var$Model); // TODO maybe move some of the data from the controller into this?
module.exports.CreateSentenceModel = $9dcfecd00654c248$var$CreateSentenceModel;
var $9dcfecd00654c248$var$StudentResultsModel = /*#__PURE__*/ function(_Model4) {
    $9dcfecd00654c248$var$_inherits(StudentResultsModel, _Model4);
    var _super5 = $9dcfecd00654c248$var$_createSuper(StudentResultsModel);
    function StudentResultsModel() {
        $9dcfecd00654c248$var$_classCallCheck(this, StudentResultsModel);
        return _super5.apply(this, arguments);
    }
    $9dcfecd00654c248$var$_createClass(StudentResultsModel, null, [
        {
            key: "send",
            value: function() {
                var _send = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee9(rightCount, wrongCount, taskURL) {
                    var payload;
                    return regeneratorRuntime.wrap(function _callee9$(_context9) {
                        while(true)switch(_context9.prev = _context9.next){
                            case 0:
                                payload = {
                                    rightCount: rightCount,
                                    wrongCount: wrongCount,
                                    percentCorrect: rightCount / (rightCount + wrongCount) * 100,
                                    completed: true
                                };
                                return _context9.abrupt("return", this.sendApiRequest("/api/v1/studenttasks/save-results/".concat(taskURL), 'PATCH', payload));
                            case 2:
                            case "end":
                                return _context9.stop();
                        }
                    }, _callee9, this);
                }));
                function send(_x20, _x21, _x22) {
                    return _send.apply(this, arguments);
                }
                return send;
            }()
        }
    ]);
    return StudentResultsModel;
}($9dcfecd00654c248$var$Model);
module.exports.StudentResultsModel = $9dcfecd00654c248$var$StudentResultsModel;
var $9dcfecd00654c248$var$StudentSentenceModel = /*#__PURE__*/ function(_Model5) {
    $9dcfecd00654c248$var$_inherits(StudentSentenceModel, _Model5);
    var _super6 = $9dcfecd00654c248$var$_createSuper(StudentSentenceModel);
    function StudentSentenceModel(data) {
        var _this3;
        $9dcfecd00654c248$var$_classCallCheck(this, StudentSentenceModel);
        _this3 = _super6.call(this, data);
        if (_this3.data.sentence) _this3.data.sentence = new $9dcfecd00654c248$var$SentenceModel(_this3.data.sentence).subclassAs(_this3.data.exercise);
        return _this3;
    }
    $9dcfecd00654c248$var$_createClass(StudentSentenceModel, [
        {
            key: "sentence",
            get: function get() {
                return this.data.sentence;
            }
        },
        {
            key: "exercise",
            get: function get() {
                return this.data.exercise;
            }
        }
    ]);
    return StudentSentenceModel;
}($9dcfecd00654c248$var$Model);
module.exports.StudentSentenceModel = $9dcfecd00654c248$var$StudentSentenceModel;
var $9dcfecd00654c248$var$SentenceModel = /*#__PURE__*/ function(_Model6) {
    $9dcfecd00654c248$var$_inherits(SentenceModel, _Model6);
    var _super7 = $9dcfecd00654c248$var$_createSuper(SentenceModel);
    function SentenceModel() {
        $9dcfecd00654c248$var$_classCallCheck(this, SentenceModel);
        return _super7.apply(this, arguments);
    }
    $9dcfecd00654c248$var$_createClass(SentenceModel, [
        {
            key: "subclassAs",
            value: function subclassAs(type) {
                switch(type){
                    case 'gapped':
                        return new $9dcfecd00654c248$var$GappedSentenceModel(this.data);
                    case 'translation':
                        return new $9dcfecd00654c248$var$TranslationSentenceModel(this.data);
                    case 'transcription':
                        return new $9dcfecd00654c248$var$TranscriptionSentenceModel(this.data);
                }
            }
        },
        {
            key: "prompt",
            get: function get() {
                return this.data.sentence;
            }
        },
        {
            key: "answer",
            get: function get() {
                return this.data.translation;
            }
        },
        {
            key: "audioUrl",
            get: function get() {
                return this.data.audio;
            }
        }
    ], [
        {
            key: "uploadAudioFile",
            value: function() {
                var _uploadAudioFile = $9dcfecd00654c248$var$_asyncToGenerator(/*#__PURE__*/ regeneratorRuntime.mark(function _callee10(blob) {
                    var authedResponse, _authedResponse$data, signedUrl, url, filename, uploadResponse;
                    return regeneratorRuntime.wrap(function _callee10$(_context10) {
                        while(true)switch(_context10.prev = _context10.next){
                            case 0:
                                _context10.next = 2;
                                return $9dcfecd00654c248$var$_axios["default"]({
                                    method: 'GET',
                                    url: '/api/v1/sentences/audio-upload-url'
                                });
                            case 2:
                                authedResponse = _context10.sent;
                                _authedResponse$data = authedResponse.data, signedUrl = _authedResponse$data.signedUrl, url = _authedResponse$data.url, filename = _authedResponse$data.filename;
                                console.log(authedResponse); // this shouldn't go thorugh sendApiRequest, because it's rather different than a typical request (and not even on the same domain)
                                _context10.next = 7;
                                return $9dcfecd00654c248$var$_axios["default"]({
                                    method: 'PUT',
                                    url: signedUrl,
                                    data: blob,
                                    headers: {
                                        'Content-Type': 'audio/mpeg'
                                    }
                                });
                            case 7:
                                uploadResponse = _context10.sent;
                                return _context10.abrupt("return", {
                                    url: url,
                                    filename: filename
                                });
                            case 9:
                            case "end":
                                return _context10.stop();
                        }
                    }, _callee10);
                }));
                function uploadAudioFile(_x23) {
                    return _uploadAudioFile.apply(this, arguments);
                }
                return uploadAudioFile;
            }()
        }
    ]);
    return SentenceModel;
}($9dcfecd00654c248$var$Model);
module.exports.SentenceModel = $9dcfecd00654c248$var$SentenceModel;
var $9dcfecd00654c248$var$GappedSentenceModel = /*#__PURE__*/ function(_SentenceModel) {
    $9dcfecd00654c248$var$_inherits(GappedSentenceModel, _SentenceModel);
    var _super8 = $9dcfecd00654c248$var$_createSuper(GappedSentenceModel);
    function GappedSentenceModel(data) {
        var _this4;
        $9dcfecd00654c248$var$_classCallCheck(this, GappedSentenceModel);
        _this4 = _super8.call(this, data);
        var words = _this4.data.sentence.trim().split(/\s+/g);
        var gapIndex = Math.floor(Math.random() * words.length); // TODO handle punctuation
        var gapWord = words[gapIndex];
        words[gapIndex] = '___';
        _this4.gapWord = gapWord;
        _this4.gappedPrompt = words.join(' ');
        return _this4;
    }
    $9dcfecd00654c248$var$_createClass(GappedSentenceModel, [
        {
            key: "prompt",
            get: function get() {
                return this.gappedPrompt;
            }
        },
        {
            key: "answer",
            get: function get() {
                return this.gapWord;
            }
        }
    ]);
    return GappedSentenceModel;
}($9dcfecd00654c248$var$SentenceModel);
var $9dcfecd00654c248$var$TranslationSentenceModel = /*#__PURE__*/ function(_SentenceModel2) {
    $9dcfecd00654c248$var$_inherits(TranslationSentenceModel, _SentenceModel2);
    var _super9 = $9dcfecd00654c248$var$_createSuper(TranslationSentenceModel);
    function TranslationSentenceModel() {
        $9dcfecd00654c248$var$_classCallCheck(this, TranslationSentenceModel);
        return _super9.apply(this, arguments);
    }
    return TranslationSentenceModel;
}($9dcfecd00654c248$var$SentenceModel);
var $9dcfecd00654c248$var$TranscriptionSentenceModel = /*#__PURE__*/ function(_SentenceModel3) {
    $9dcfecd00654c248$var$_inherits(TranscriptionSentenceModel, _SentenceModel3);
    var _super10 = $9dcfecd00654c248$var$_createSuper(TranscriptionSentenceModel);
    function TranscriptionSentenceModel() {
        $9dcfecd00654c248$var$_classCallCheck(this, TranscriptionSentenceModel);
        return _super10.apply(this, arguments);
    }
    $9dcfecd00654c248$var$_createClass(TranscriptionSentenceModel, [
        {
            key: "prompt",
            get: function get() {
                return null;
            }
        },
        {
            key: "answer",
            get: function get() {
                return this.data.sentence;
            }
        }
    ]);
    return TranscriptionSentenceModel;
}($9dcfecd00654c248$var$SentenceModel);
var $9dcfecd00654c248$var$DeleteModel = /*#__PURE__*/ function(_Model7) {
    $9dcfecd00654c248$var$_inherits(DeleteModel, _Model7);
    var _super11 = $9dcfecd00654c248$var$_createSuper(DeleteModel);
    function DeleteModel() {
        $9dcfecd00654c248$var$_classCallCheck(this, DeleteModel);
        return _super11.apply(this, arguments);
    }
    return DeleteModel;
}($9dcfecd00654c248$var$Model);
module.exports.DeleteModel = $9dcfecd00654c248$var$DeleteModel;

});



var $0f0f5101ba87ec54$var$controllers = $0f0f5101ba87ec54$var$_interopRequireWildcard((parcelRequire("16ESw")));
function $0f0f5101ba87ec54$var$_getRequireWildcardCache() {
    if (typeof WeakMap !== "function") return null;
    var cache = new WeakMap();
    $0f0f5101ba87ec54$var$_getRequireWildcardCache = function _getRequireWildcardCache() {
        return cache;
    };
    return cache;
}
function $0f0f5101ba87ec54$var$_interopRequireWildcard(obj) {
    if (obj && obj.__esModule) return obj;
    if (obj === null || $0f0f5101ba87ec54$var$_typeof(obj) !== "object" && typeof obj !== "function") return {
        "default": obj
    };
    var cache = $0f0f5101ba87ec54$var$_getRequireWildcardCache();
    if (cache && cache.has(obj)) return cache.get(obj);
    var newObj = {
    };
    var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor;
    for(var key in obj)if (Object.prototype.hasOwnProperty.call(obj, key)) {
        var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null;
        if (desc && (desc.get || desc.set)) Object.defineProperty(newObj, key, desc);
        else newObj[key] = obj[key];
    }
    newObj["default"] = obj;
    if (cache) cache.set(obj, newObj);
    return newObj;
}
(function() {
    // load controllers dynamically based on what the server-generated HTML requests
    Array.from(document.querySelectorAll('[data-controller]')).forEach(function(domElement) {
        var controllerClass = $0f0f5101ba87ec54$var$controllers[domElement.dataset['controller']];
        var controller = new controllerClass(domElement);
        domElement.controller = controller;
        if (domElement.dataset.exposeControllerAs) {
            var name = domElement.dataset.exposeControllerAs;
            var containing = domElement.parentNode.closest("[data-controller][data-accept-child=\"".concat(name, "\"]"));
            if (containing) containing.controller.children[name] = controller;
        }
    });
})();


//# sourceMappingURL=bundle.js.map
