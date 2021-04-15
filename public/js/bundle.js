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
})({"../../node_modules/diff/dist/diff.js":[function(require,module,exports) {
var define;
var global = arguments[3];
(function (global, factory) {
  typeof exports === 'object' && typeof module !== 'undefined' ? factory(exports) : typeof define === 'function' && define.amd ? define(['exports'], factory) : (global = global || self, factory(global.Diff = {}));
})(this, function (exports) {
  'use strict';

  function Diff() {}

  Diff.prototype = {
    diff: function diff(oldString, newString) {
      var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};
      var callback = options.callback;

      if (typeof options === 'function') {
        callback = options;
        options = {};
      }

      this.options = options;
      var self = this;

      function done(value) {
        if (callback) {
          setTimeout(function () {
            callback(undefined, value);
          }, 0);
          return true;
        } else {
          return value;
        }
      } // Allow subclasses to massage the input prior to running


      oldString = this.castInput(oldString);
      newString = this.castInput(newString);
      oldString = this.removeEmpty(this.tokenize(oldString));
      newString = this.removeEmpty(this.tokenize(newString));
      var newLen = newString.length,
          oldLen = oldString.length;
      var editLength = 1;
      var maxEditLength = newLen + oldLen;
      var bestPath = [{
        newPos: -1,
        components: []
      }]; // Seed editLength = 0, i.e. the content starts with the same values

      var oldPos = this.extractCommon(bestPath[0], newString, oldString, 0);

      if (bestPath[0].newPos + 1 >= newLen && oldPos + 1 >= oldLen) {
        // Identity per the equality and tokenizer
        return done([{
          value: this.join(newString),
          count: newString.length
        }]);
      } // Main worker method. checks all permutations of a given edit length for acceptance.


      function execEditLength() {
        for (var diagonalPath = -1 * editLength; diagonalPath <= editLength; diagonalPath += 2) {
          var basePath = void 0;

          var addPath = bestPath[diagonalPath - 1],
              removePath = bestPath[diagonalPath + 1],
              _oldPos = (removePath ? removePath.newPos : 0) - diagonalPath;

          if (addPath) {
            // No one else is going to attempt to use this value, clear it
            bestPath[diagonalPath - 1] = undefined;
          }

          var canAdd = addPath && addPath.newPos + 1 < newLen,
              canRemove = removePath && 0 <= _oldPos && _oldPos < oldLen;

          if (!canAdd && !canRemove) {
            // If this path is a terminal then prune
            bestPath[diagonalPath] = undefined;
            continue;
          } // Select the diagonal that we want to branch from. We select the prior
          // path whose position in the new string is the farthest from the origin
          // and does not pass the bounds of the diff graph


          if (!canAdd || canRemove && addPath.newPos < removePath.newPos) {
            basePath = clonePath(removePath);
            self.pushComponent(basePath.components, undefined, true);
          } else {
            basePath = addPath; // No need to clone, we've pulled it from the list

            basePath.newPos++;
            self.pushComponent(basePath.components, true, undefined);
          }

          _oldPos = self.extractCommon(basePath, newString, oldString, diagonalPath); // If we have hit the end of both strings, then we are done

          if (basePath.newPos + 1 >= newLen && _oldPos + 1 >= oldLen) {
            return done(buildValues(self, basePath.components, newString, oldString, self.useLongestToken));
          } else {
            // Otherwise track this path as a potential candidate and continue.
            bestPath[diagonalPath] = basePath;
          }
        }

        editLength++;
      } // Performs the length of edit iteration. Is a bit fugly as this has to support the
      // sync and async mode which is never fun. Loops over execEditLength until a value
      // is produced.


      if (callback) {
        (function exec() {
          setTimeout(function () {
            // This should not happen, but we want to be safe.

            /* istanbul ignore next */
            if (editLength > maxEditLength) {
              return callback();
            }

            if (!execEditLength()) {
              exec();
            }
          }, 0);
        })();
      } else {
        while (editLength <= maxEditLength) {
          var ret = execEditLength();

          if (ret) {
            return ret;
          }
        }
      }
    },
    pushComponent: function pushComponent(components, added, removed) {
      var last = components[components.length - 1];

      if (last && last.added === added && last.removed === removed) {
        // We need to clone here as the component clone operation is just
        // as shallow array clone
        components[components.length - 1] = {
          count: last.count + 1,
          added: added,
          removed: removed
        };
      } else {
        components.push({
          count: 1,
          added: added,
          removed: removed
        });
      }
    },
    extractCommon: function extractCommon(basePath, newString, oldString, diagonalPath) {
      var newLen = newString.length,
          oldLen = oldString.length,
          newPos = basePath.newPos,
          oldPos = newPos - diagonalPath,
          commonCount = 0;

      while (newPos + 1 < newLen && oldPos + 1 < oldLen && this.equals(newString[newPos + 1], oldString[oldPos + 1])) {
        newPos++;
        oldPos++;
        commonCount++;
      }

      if (commonCount) {
        basePath.components.push({
          count: commonCount
        });
      }

      basePath.newPos = newPos;
      return oldPos;
    },
    equals: function equals(left, right) {
      if (this.options.comparator) {
        return this.options.comparator(left, right);
      } else {
        return left === right || this.options.ignoreCase && left.toLowerCase() === right.toLowerCase();
      }
    },
    removeEmpty: function removeEmpty(array) {
      var ret = [];

      for (var i = 0; i < array.length; i++) {
        if (array[i]) {
          ret.push(array[i]);
        }
      }

      return ret;
    },
    castInput: function castInput(value) {
      return value;
    },
    tokenize: function tokenize(value) {
      return value.split('');
    },
    join: function join(chars) {
      return chars.join('');
    }
  };

  function buildValues(diff, components, newString, oldString, useLongestToken) {
    var componentPos = 0,
        componentLen = components.length,
        newPos = 0,
        oldPos = 0;

    for (; componentPos < componentLen; componentPos++) {
      var component = components[componentPos];

      if (!component.removed) {
        if (!component.added && useLongestToken) {
          var value = newString.slice(newPos, newPos + component.count);
          value = value.map(function (value, i) {
            var oldValue = oldString[oldPos + i];
            return oldValue.length > value.length ? oldValue : value;
          });
          component.value = diff.join(value);
        } else {
          component.value = diff.join(newString.slice(newPos, newPos + component.count));
        }

        newPos += component.count; // Common case

        if (!component.added) {
          oldPos += component.count;
        }
      } else {
        component.value = diff.join(oldString.slice(oldPos, oldPos + component.count));
        oldPos += component.count; // Reverse add and remove so removes are output first to match common convention
        // The diffing algorithm is tied to add then remove output and this is the simplest
        // route to get the desired output with minimal overhead.

        if (componentPos && components[componentPos - 1].added) {
          var tmp = components[componentPos - 1];
          components[componentPos - 1] = components[componentPos];
          components[componentPos] = tmp;
        }
      }
    } // Special case handle for when one terminal is ignored (i.e. whitespace).
    // For this case we merge the terminal into the prior string and drop the change.
    // This is only available for string mode.


    var lastComponent = components[componentLen - 1];

    if (componentLen > 1 && typeof lastComponent.value === 'string' && (lastComponent.added || lastComponent.removed) && diff.equals('', lastComponent.value)) {
      components[componentLen - 2].value += lastComponent.value;
      components.pop();
    }

    return components;
  }

  function clonePath(path) {
    return {
      newPos: path.newPos,
      components: path.components.slice(0)
    };
  }

  var characterDiff = new Diff();

  function diffChars(oldStr, newStr, options) {
    return characterDiff.diff(oldStr, newStr, options);
  }

  function generateOptions(options, defaults) {
    if (typeof options === 'function') {
      defaults.callback = options;
    } else if (options) {
      for (var name in options) {
        /* istanbul ignore else */
        if (options.hasOwnProperty(name)) {
          defaults[name] = options[name];
        }
      }
    }

    return defaults;
  } //
  // Ranges and exceptions:
  // Latin-1 Supplement, 0080–00FF
  //  - U+00D7  × Multiplication sign
  //  - U+00F7  ÷ Division sign
  // Latin Extended-A, 0100–017F
  // Latin Extended-B, 0180–024F
  // IPA Extensions, 0250–02AF
  // Spacing Modifier Letters, 02B0–02FF
  //  - U+02C7  ˇ &#711;  Caron
  //  - U+02D8  ˘ &#728;  Breve
  //  - U+02D9  ˙ &#729;  Dot Above
  //  - U+02DA  ˚ &#730;  Ring Above
  //  - U+02DB  ˛ &#731;  Ogonek
  //  - U+02DC  ˜ &#732;  Small Tilde
  //  - U+02DD  ˝ &#733;  Double Acute Accent
  // Latin Extended Additional, 1E00–1EFF


  var extendedWordChars = /^[A-Za-z\xC0-\u02C6\u02C8-\u02D7\u02DE-\u02FF\u1E00-\u1EFF]+$/;
  var reWhitespace = /\S/;
  var wordDiff = new Diff();

  wordDiff.equals = function (left, right) {
    if (this.options.ignoreCase) {
      left = left.toLowerCase();
      right = right.toLowerCase();
    }

    return left === right || this.options.ignoreWhitespace && !reWhitespace.test(left) && !reWhitespace.test(right);
  };

  wordDiff.tokenize = function (value) {
    // All whitespace symbols except newline group into one token, each newline - in separate token
    var tokens = value.split(/([^\S\r\n]+|[()[\]{}'"\r\n]|\b)/); // Join the boundary splits that we do not consider to be boundaries. This is primarily the extended Latin character set.

    for (var i = 0; i < tokens.length - 1; i++) {
      // If we have an empty string in the next field and we have only word chars before and after, merge
      if (!tokens[i + 1] && tokens[i + 2] && extendedWordChars.test(tokens[i]) && extendedWordChars.test(tokens[i + 2])) {
        tokens[i] += tokens[i + 2];
        tokens.splice(i + 1, 2);
        i--;
      }
    }

    return tokens;
  };

  function diffWords(oldStr, newStr, options) {
    options = generateOptions(options, {
      ignoreWhitespace: true
    });
    return wordDiff.diff(oldStr, newStr, options);
  }

  function diffWordsWithSpace(oldStr, newStr, options) {
    return wordDiff.diff(oldStr, newStr, options);
  }

  var lineDiff = new Diff();

  lineDiff.tokenize = function (value) {
    var retLines = [],
        linesAndNewlines = value.split(/(\n|\r\n)/); // Ignore the final empty token that occurs if the string ends with a new line

    if (!linesAndNewlines[linesAndNewlines.length - 1]) {
      linesAndNewlines.pop();
    } // Merge the content and line separators into single tokens


    for (var i = 0; i < linesAndNewlines.length; i++) {
      var line = linesAndNewlines[i];

      if (i % 2 && !this.options.newlineIsToken) {
        retLines[retLines.length - 1] += line;
      } else {
        if (this.options.ignoreWhitespace) {
          line = line.trim();
        }

        retLines.push(line);
      }
    }

    return retLines;
  };

  function diffLines(oldStr, newStr, callback) {
    return lineDiff.diff(oldStr, newStr, callback);
  }

  function diffTrimmedLines(oldStr, newStr, callback) {
    var options = generateOptions(callback, {
      ignoreWhitespace: true
    });
    return lineDiff.diff(oldStr, newStr, options);
  }

  var sentenceDiff = new Diff();

  sentenceDiff.tokenize = function (value) {
    return value.split(/(\S.+?[.!?])(?=\s+|$)/);
  };

  function diffSentences(oldStr, newStr, callback) {
    return sentenceDiff.diff(oldStr, newStr, callback);
  }

  var cssDiff = new Diff();

  cssDiff.tokenize = function (value) {
    return value.split(/([{}:;,]|\s+)/);
  };

  function diffCss(oldStr, newStr, callback) {
    return cssDiff.diff(oldStr, newStr, callback);
  }

  function _typeof(obj) {
    "@babel/helpers - typeof";

    if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") {
      _typeof = function (obj) {
        return typeof obj;
      };
    } else {
      _typeof = function (obj) {
        return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj;
      };
    }

    return _typeof(obj);
  }

  function _toConsumableArray(arr) {
    return _arrayWithoutHoles(arr) || _iterableToArray(arr) || _unsupportedIterableToArray(arr) || _nonIterableSpread();
  }

  function _arrayWithoutHoles(arr) {
    if (Array.isArray(arr)) return _arrayLikeToArray(arr);
  }

  function _iterableToArray(iter) {
    if (typeof Symbol !== "undefined" && Symbol.iterator in Object(iter)) return Array.from(iter);
  }

  function _unsupportedIterableToArray(o, minLen) {
    if (!o) return;
    if (typeof o === "string") return _arrayLikeToArray(o, minLen);
    var n = Object.prototype.toString.call(o).slice(8, -1);
    if (n === "Object" && o.constructor) n = o.constructor.name;
    if (n === "Map" || n === "Set") return Array.from(o);
    if (n === "Arguments" || /^(?:Ui|I)nt(?:8|16|32)(?:Clamped)?Array$/.test(n)) return _arrayLikeToArray(o, minLen);
  }

  function _arrayLikeToArray(arr, len) {
    if (len == null || len > arr.length) len = arr.length;

    for (var i = 0, arr2 = new Array(len); i < len; i++) arr2[i] = arr[i];

    return arr2;
  }

  function _nonIterableSpread() {
    throw new TypeError("Invalid attempt to spread non-iterable instance.\nIn order to be iterable, non-array objects must have a [Symbol.iterator]() method.");
  }

  var objectPrototypeToString = Object.prototype.toString;
  var jsonDiff = new Diff(); // Discriminate between two lines of pretty-printed, serialized JSON where one of them has a
  // dangling comma and the other doesn't. Turns out including the dangling comma yields the nicest output:

  jsonDiff.useLongestToken = true;
  jsonDiff.tokenize = lineDiff.tokenize;

  jsonDiff.castInput = function (value) {
    var _this$options = this.options,
        undefinedReplacement = _this$options.undefinedReplacement,
        _this$options$stringi = _this$options.stringifyReplacer,
        stringifyReplacer = _this$options$stringi === void 0 ? function (k, v) {
      return typeof v === 'undefined' ? undefinedReplacement : v;
    } : _this$options$stringi;
    return typeof value === 'string' ? value : JSON.stringify(canonicalize(value, null, null, stringifyReplacer), stringifyReplacer, '  ');
  };

  jsonDiff.equals = function (left, right) {
    return Diff.prototype.equals.call(jsonDiff, left.replace(/,([\r\n])/g, '$1'), right.replace(/,([\r\n])/g, '$1'));
  };

  function diffJson(oldObj, newObj, options) {
    return jsonDiff.diff(oldObj, newObj, options);
  } // This function handles the presence of circular references by bailing out when encountering an
  // object that is already on the "stack" of items being processed. Accepts an optional replacer


  function canonicalize(obj, stack, replacementStack, replacer, key) {
    stack = stack || [];
    replacementStack = replacementStack || [];

    if (replacer) {
      obj = replacer(key, obj);
    }

    var i;

    for (i = 0; i < stack.length; i += 1) {
      if (stack[i] === obj) {
        return replacementStack[i];
      }
    }

    var canonicalizedObj;

    if ('[object Array]' === objectPrototypeToString.call(obj)) {
      stack.push(obj);
      canonicalizedObj = new Array(obj.length);
      replacementStack.push(canonicalizedObj);

      for (i = 0; i < obj.length; i += 1) {
        canonicalizedObj[i] = canonicalize(obj[i], stack, replacementStack, replacer, key);
      }

      stack.pop();
      replacementStack.pop();
      return canonicalizedObj;
    }

    if (obj && obj.toJSON) {
      obj = obj.toJSON();
    }

    if (_typeof(obj) === 'object' && obj !== null) {
      stack.push(obj);
      canonicalizedObj = {};
      replacementStack.push(canonicalizedObj);

      var sortedKeys = [],
          _key;

      for (_key in obj) {
        /* istanbul ignore else */
        if (obj.hasOwnProperty(_key)) {
          sortedKeys.push(_key);
        }
      }

      sortedKeys.sort();

      for (i = 0; i < sortedKeys.length; i += 1) {
        _key = sortedKeys[i];
        canonicalizedObj[_key] = canonicalize(obj[_key], stack, replacementStack, replacer, _key);
      }

      stack.pop();
      replacementStack.pop();
    } else {
      canonicalizedObj = obj;
    }

    return canonicalizedObj;
  }

  var arrayDiff = new Diff();

  arrayDiff.tokenize = function (value) {
    return value.slice();
  };

  arrayDiff.join = arrayDiff.removeEmpty = function (value) {
    return value;
  };

  function diffArrays(oldArr, newArr, callback) {
    return arrayDiff.diff(oldArr, newArr, callback);
  }

  function parsePatch(uniDiff) {
    var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};
    var diffstr = uniDiff.split(/\r\n|[\n\v\f\r\x85]/),
        delimiters = uniDiff.match(/\r\n|[\n\v\f\r\x85]/g) || [],
        list = [],
        i = 0;

    function parseIndex() {
      var index = {};
      list.push(index); // Parse diff metadata

      while (i < diffstr.length) {
        var line = diffstr[i]; // File header found, end parsing diff metadata

        if (/^(\-\-\-|\+\+\+|@@)\s/.test(line)) {
          break;
        } // Diff index


        var header = /^(?:Index:|diff(?: -r \w+)+)\s+(.+?)\s*$/.exec(line);

        if (header) {
          index.index = header[1];
        }

        i++;
      } // Parse file headers if they are defined. Unified diff requires them, but
      // there's no technical issues to have an isolated hunk without file header


      parseFileHeader(index);
      parseFileHeader(index); // Parse hunks

      index.hunks = [];

      while (i < diffstr.length) {
        var _line = diffstr[i];

        if (/^(Index:|diff|\-\-\-|\+\+\+)\s/.test(_line)) {
          break;
        } else if (/^@@/.test(_line)) {
          index.hunks.push(parseHunk());
        } else if (_line && options.strict) {
          // Ignore unexpected content unless in strict mode
          throw new Error('Unknown line ' + (i + 1) + ' ' + JSON.stringify(_line));
        } else {
          i++;
        }
      }
    } // Parses the --- and +++ headers, if none are found, no lines
    // are consumed.


    function parseFileHeader(index) {
      var fileHeader = /^(---|\+\+\+)\s+(.*)$/.exec(diffstr[i]);

      if (fileHeader) {
        var keyPrefix = fileHeader[1] === '---' ? 'old' : 'new';
        var data = fileHeader[2].split('\t', 2);
        var fileName = data[0].replace(/\\\\/g, '\\');

        if (/^".*"$/.test(fileName)) {
          fileName = fileName.substr(1, fileName.length - 2);
        }

        index[keyPrefix + 'FileName'] = fileName;
        index[keyPrefix + 'Header'] = (data[1] || '').trim();
        i++;
      }
    } // Parses a hunk
    // This assumes that we are at the start of a hunk.


    function parseHunk() {
      var chunkHeaderIndex = i,
          chunkHeaderLine = diffstr[i++],
          chunkHeader = chunkHeaderLine.split(/@@ -(\d+)(?:,(\d+))? \+(\d+)(?:,(\d+))? @@/);
      var hunk = {
        oldStart: +chunkHeader[1],
        oldLines: typeof chunkHeader[2] === 'undefined' ? 1 : +chunkHeader[2],
        newStart: +chunkHeader[3],
        newLines: typeof chunkHeader[4] === 'undefined' ? 1 : +chunkHeader[4],
        lines: [],
        linedelimiters: []
      }; // Unified Diff Format quirk: If the chunk size is 0,
      // the first number is one lower than one would expect.
      // https://www.artima.com/weblogs/viewpost.jsp?thread=164293

      if (hunk.oldLines === 0) {
        hunk.oldStart += 1;
      }

      if (hunk.newLines === 0) {
        hunk.newStart += 1;
      }

      var addCount = 0,
          removeCount = 0;

      for (; i < diffstr.length; i++) {
        // Lines starting with '---' could be mistaken for the "remove line" operation
        // But they could be the header for the next file. Therefore prune such cases out.
        if (diffstr[i].indexOf('--- ') === 0 && i + 2 < diffstr.length && diffstr[i + 1].indexOf('+++ ') === 0 && diffstr[i + 2].indexOf('@@') === 0) {
          break;
        }

        var operation = diffstr[i].length == 0 && i != diffstr.length - 1 ? ' ' : diffstr[i][0];

        if (operation === '+' || operation === '-' || operation === ' ' || operation === '\\') {
          hunk.lines.push(diffstr[i]);
          hunk.linedelimiters.push(delimiters[i] || '\n');

          if (operation === '+') {
            addCount++;
          } else if (operation === '-') {
            removeCount++;
          } else if (operation === ' ') {
            addCount++;
            removeCount++;
          }
        } else {
          break;
        }
      } // Handle the empty block count case


      if (!addCount && hunk.newLines === 1) {
        hunk.newLines = 0;
      }

      if (!removeCount && hunk.oldLines === 1) {
        hunk.oldLines = 0;
      } // Perform optional sanity checking


      if (options.strict) {
        if (addCount !== hunk.newLines) {
          throw new Error('Added line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
        }

        if (removeCount !== hunk.oldLines) {
          throw new Error('Removed line count did not match for hunk at line ' + (chunkHeaderIndex + 1));
        }
      }

      return hunk;
    }

    while (i < diffstr.length) {
      parseIndex();
    }

    return list;
  } // Iterator that traverses in the range of [min, max], stepping
  // by distance from a given start position. I.e. for [0, 4], with
  // start of 2, this will iterate 2, 3, 1, 4, 0.


  function distanceIterator(start, minLine, maxLine) {
    var wantForward = true,
        backwardExhausted = false,
        forwardExhausted = false,
        localOffset = 1;
    return function iterator() {
      if (wantForward && !forwardExhausted) {
        if (backwardExhausted) {
          localOffset++;
        } else {
          wantForward = false;
        } // Check if trying to fit beyond text length, and if not, check it fits
        // after offset location (or desired location on first iteration)


        if (start + localOffset <= maxLine) {
          return localOffset;
        }

        forwardExhausted = true;
      }

      if (!backwardExhausted) {
        if (!forwardExhausted) {
          wantForward = true;
        } // Check if trying to fit before text beginning, and if not, check it fits
        // before offset location


        if (minLine <= start - localOffset) {
          return -localOffset++;
        }

        backwardExhausted = true;
        return iterator();
      } // We tried to fit hunk before text beginning and beyond text length, then
      // hunk can't fit on the text. Return undefined

    };
  }

  function applyPatch(source, uniDiff) {
    var options = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : {};

    if (typeof uniDiff === 'string') {
      uniDiff = parsePatch(uniDiff);
    }

    if (Array.isArray(uniDiff)) {
      if (uniDiff.length > 1) {
        throw new Error('applyPatch only works with a single input.');
      }

      uniDiff = uniDiff[0];
    } // Apply the diff to the input


    var lines = source.split(/\r\n|[\n\v\f\r\x85]/),
        delimiters = source.match(/\r\n|[\n\v\f\r\x85]/g) || [],
        hunks = uniDiff.hunks,
        compareLine = options.compareLine || function (lineNumber, line, operation, patchContent) {
      return line === patchContent;
    },
        errorCount = 0,
        fuzzFactor = options.fuzzFactor || 0,
        minLine = 0,
        offset = 0,
        removeEOFNL,
        addEOFNL;
    /**
     * Checks if the hunk exactly fits on the provided location
     */


    function hunkFits(hunk, toPos) {
      for (var j = 0; j < hunk.lines.length; j++) {
        var line = hunk.lines[j],
            operation = line.length > 0 ? line[0] : ' ',
            content = line.length > 0 ? line.substr(1) : line;

        if (operation === ' ' || operation === '-') {
          // Context sanity check
          if (!compareLine(toPos + 1, lines[toPos], operation, content)) {
            errorCount++;

            if (errorCount > fuzzFactor) {
              return false;
            }
          }

          toPos++;
        }
      }

      return true;
    } // Search best fit offsets for each hunk based on the previous ones


    for (var i = 0; i < hunks.length; i++) {
      var hunk = hunks[i],
          maxLine = lines.length - hunk.oldLines,
          localOffset = 0,
          toPos = offset + hunk.oldStart - 1;
      var iterator = distanceIterator(toPos, minLine, maxLine);

      for (; localOffset !== undefined; localOffset = iterator()) {
        if (hunkFits(hunk, toPos + localOffset)) {
          hunk.offset = offset += localOffset;
          break;
        }
      }

      if (localOffset === undefined) {
        return false;
      } // Set lower text limit to end of the current hunk, so next ones don't try
      // to fit over already patched text


      minLine = hunk.offset + hunk.oldStart + hunk.oldLines;
    } // Apply patch hunks


    var diffOffset = 0;

    for (var _i = 0; _i < hunks.length; _i++) {
      var _hunk = hunks[_i],
          _toPos = _hunk.oldStart + _hunk.offset + diffOffset - 1;

      diffOffset += _hunk.newLines - _hunk.oldLines;

      for (var j = 0; j < _hunk.lines.length; j++) {
        var line = _hunk.lines[j],
            operation = line.length > 0 ? line[0] : ' ',
            content = line.length > 0 ? line.substr(1) : line,
            delimiter = _hunk.linedelimiters[j];

        if (operation === ' ') {
          _toPos++;
        } else if (operation === '-') {
          lines.splice(_toPos, 1);
          delimiters.splice(_toPos, 1);
          /* istanbul ignore else */
        } else if (operation === '+') {
          lines.splice(_toPos, 0, content);
          delimiters.splice(_toPos, 0, delimiter);
          _toPos++;
        } else if (operation === '\\') {
          var previousOperation = _hunk.lines[j - 1] ? _hunk.lines[j - 1][0] : null;

          if (previousOperation === '+') {
            removeEOFNL = true;
          } else if (previousOperation === '-') {
            addEOFNL = true;
          }
        }
      }
    } // Handle EOFNL insertion/removal


    if (removeEOFNL) {
      while (!lines[lines.length - 1]) {
        lines.pop();
        delimiters.pop();
      }
    } else if (addEOFNL) {
      lines.push('');
      delimiters.push('\n');
    }

    for (var _k = 0; _k < lines.length - 1; _k++) {
      lines[_k] = lines[_k] + delimiters[_k];
    }

    return lines.join('');
  } // Wrapper that supports multiple file patches via callbacks.


  function applyPatches(uniDiff, options) {
    if (typeof uniDiff === 'string') {
      uniDiff = parsePatch(uniDiff);
    }

    var currentIndex = 0;

    function processIndex() {
      var index = uniDiff[currentIndex++];

      if (!index) {
        return options.complete();
      }

      options.loadFile(index, function (err, data) {
        if (err) {
          return options.complete(err);
        }

        var updatedContent = applyPatch(data, index, options);
        options.patched(index, updatedContent, function (err) {
          if (err) {
            return options.complete(err);
          }

          processIndex();
        });
      });
    }

    processIndex();
  }

  function structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    if (!options) {
      options = {};
    }

    if (typeof options.context === 'undefined') {
      options.context = 4;
    }

    var diff = diffLines(oldStr, newStr, options);
    diff.push({
      value: '',
      lines: []
    }); // Append an empty value to make cleanup easier

    function contextLines(lines) {
      return lines.map(function (entry) {
        return ' ' + entry;
      });
    }

    var hunks = [];
    var oldRangeStart = 0,
        newRangeStart = 0,
        curRange = [],
        oldLine = 1,
        newLine = 1;

    var _loop = function _loop(i) {
      var current = diff[i],
          lines = current.lines || current.value.replace(/\n$/, '').split('\n');
      current.lines = lines;

      if (current.added || current.removed) {
        var _curRange; // If we have previous context, start with that


        if (!oldRangeStart) {
          var prev = diff[i - 1];
          oldRangeStart = oldLine;
          newRangeStart = newLine;

          if (prev) {
            curRange = options.context > 0 ? contextLines(prev.lines.slice(-options.context)) : [];
            oldRangeStart -= curRange.length;
            newRangeStart -= curRange.length;
          }
        } // Output our changes


        (_curRange = curRange).push.apply(_curRange, _toConsumableArray(lines.map(function (entry) {
          return (current.added ? '+' : '-') + entry;
        }))); // Track the updated file position


        if (current.added) {
          newLine += lines.length;
        } else {
          oldLine += lines.length;
        }
      } else {
        // Identical context lines. Track line changes
        if (oldRangeStart) {
          // Close out any changes that have been output (or join overlapping)
          if (lines.length <= options.context * 2 && i < diff.length - 2) {
            var _curRange2; // Overlapping


            (_curRange2 = curRange).push.apply(_curRange2, _toConsumableArray(contextLines(lines)));
          } else {
            var _curRange3; // end the range and output


            var contextSize = Math.min(lines.length, options.context);

            (_curRange3 = curRange).push.apply(_curRange3, _toConsumableArray(contextLines(lines.slice(0, contextSize))));

            var hunk = {
              oldStart: oldRangeStart,
              oldLines: oldLine - oldRangeStart + contextSize,
              newStart: newRangeStart,
              newLines: newLine - newRangeStart + contextSize,
              lines: curRange
            };

            if (i >= diff.length - 2 && lines.length <= options.context) {
              // EOF is inside this hunk
              var oldEOFNewline = /\n$/.test(oldStr);
              var newEOFNewline = /\n$/.test(newStr);
              var noNlBeforeAdds = lines.length == 0 && curRange.length > hunk.oldLines;

              if (!oldEOFNewline && noNlBeforeAdds && oldStr.length > 0) {
                // special case: old has no eol and no trailing context; no-nl can end up before adds
                // however, if the old file is empty, do not output the no-nl line
                curRange.splice(hunk.oldLines, 0, '\\ No newline at end of file');
              }

              if (!oldEOFNewline && !noNlBeforeAdds || !newEOFNewline) {
                curRange.push('\\ No newline at end of file');
              }
            }

            hunks.push(hunk);
            oldRangeStart = 0;
            newRangeStart = 0;
            curRange = [];
          }
        }

        oldLine += lines.length;
        newLine += lines.length;
      }
    };

    for (var i = 0; i < diff.length; i++) {
      _loop(i);
    }

    return {
      oldFileName: oldFileName,
      newFileName: newFileName,
      oldHeader: oldHeader,
      newHeader: newHeader,
      hunks: hunks
    };
  }

  function formatPatch(diff) {
    var ret = [];

    if (diff.oldFileName == diff.newFileName) {
      ret.push('Index: ' + diff.oldFileName);
    }

    ret.push('===================================================================');
    ret.push('--- ' + diff.oldFileName + (typeof diff.oldHeader === 'undefined' ? '' : '\t' + diff.oldHeader));
    ret.push('+++ ' + diff.newFileName + (typeof diff.newHeader === 'undefined' ? '' : '\t' + diff.newHeader));

    for (var i = 0; i < diff.hunks.length; i++) {
      var hunk = diff.hunks[i]; // Unified Diff Format quirk: If the chunk size is 0,
      // the first number is one lower than one would expect.
      // https://www.artima.com/weblogs/viewpost.jsp?thread=164293

      if (hunk.oldLines === 0) {
        hunk.oldStart -= 1;
      }

      if (hunk.newLines === 0) {
        hunk.newStart -= 1;
      }

      ret.push('@@ -' + hunk.oldStart + ',' + hunk.oldLines + ' +' + hunk.newStart + ',' + hunk.newLines + ' @@');
      ret.push.apply(ret, hunk.lines);
    }

    return ret.join('\n') + '\n';
  }

  function createTwoFilesPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options) {
    return formatPatch(structuredPatch(oldFileName, newFileName, oldStr, newStr, oldHeader, newHeader, options));
  }

  function createPatch(fileName, oldStr, newStr, oldHeader, newHeader, options) {
    return createTwoFilesPatch(fileName, fileName, oldStr, newStr, oldHeader, newHeader, options);
  }

  function arrayEqual(a, b) {
    if (a.length !== b.length) {
      return false;
    }

    return arrayStartsWith(a, b);
  }

  function arrayStartsWith(array, start) {
    if (start.length > array.length) {
      return false;
    }

    for (var i = 0; i < start.length; i++) {
      if (start[i] !== array[i]) {
        return false;
      }
    }

    return true;
  }

  function calcLineCount(hunk) {
    var _calcOldNewLineCount = calcOldNewLineCount(hunk.lines),
        oldLines = _calcOldNewLineCount.oldLines,
        newLines = _calcOldNewLineCount.newLines;

    if (oldLines !== undefined) {
      hunk.oldLines = oldLines;
    } else {
      delete hunk.oldLines;
    }

    if (newLines !== undefined) {
      hunk.newLines = newLines;
    } else {
      delete hunk.newLines;
    }
  }

  function merge(mine, theirs, base) {
    mine = loadPatch(mine, base);
    theirs = loadPatch(theirs, base);
    var ret = {}; // For index we just let it pass through as it doesn't have any necessary meaning.
    // Leaving sanity checks on this to the API consumer that may know more about the
    // meaning in their own context.

    if (mine.index || theirs.index) {
      ret.index = mine.index || theirs.index;
    }

    if (mine.newFileName || theirs.newFileName) {
      if (!fileNameChanged(mine)) {
        // No header or no change in ours, use theirs (and ours if theirs does not exist)
        ret.oldFileName = theirs.oldFileName || mine.oldFileName;
        ret.newFileName = theirs.newFileName || mine.newFileName;
        ret.oldHeader = theirs.oldHeader || mine.oldHeader;
        ret.newHeader = theirs.newHeader || mine.newHeader;
      } else if (!fileNameChanged(theirs)) {
        // No header or no change in theirs, use ours
        ret.oldFileName = mine.oldFileName;
        ret.newFileName = mine.newFileName;
        ret.oldHeader = mine.oldHeader;
        ret.newHeader = mine.newHeader;
      } else {
        // Both changed... figure it out
        ret.oldFileName = selectField(ret, mine.oldFileName, theirs.oldFileName);
        ret.newFileName = selectField(ret, mine.newFileName, theirs.newFileName);
        ret.oldHeader = selectField(ret, mine.oldHeader, theirs.oldHeader);
        ret.newHeader = selectField(ret, mine.newHeader, theirs.newHeader);
      }
    }

    ret.hunks = [];
    var mineIndex = 0,
        theirsIndex = 0,
        mineOffset = 0,
        theirsOffset = 0;

    while (mineIndex < mine.hunks.length || theirsIndex < theirs.hunks.length) {
      var mineCurrent = mine.hunks[mineIndex] || {
        oldStart: Infinity
      },
          theirsCurrent = theirs.hunks[theirsIndex] || {
        oldStart: Infinity
      };

      if (hunkBefore(mineCurrent, theirsCurrent)) {
        // This patch does not overlap with any of the others, yay.
        ret.hunks.push(cloneHunk(mineCurrent, mineOffset));
        mineIndex++;
        theirsOffset += mineCurrent.newLines - mineCurrent.oldLines;
      } else if (hunkBefore(theirsCurrent, mineCurrent)) {
        // This patch does not overlap with any of the others, yay.
        ret.hunks.push(cloneHunk(theirsCurrent, theirsOffset));
        theirsIndex++;
        mineOffset += theirsCurrent.newLines - theirsCurrent.oldLines;
      } else {
        // Overlap, merge as best we can
        var mergedHunk = {
          oldStart: Math.min(mineCurrent.oldStart, theirsCurrent.oldStart),
          oldLines: 0,
          newStart: Math.min(mineCurrent.newStart + mineOffset, theirsCurrent.oldStart + theirsOffset),
          newLines: 0,
          lines: []
        };
        mergeLines(mergedHunk, mineCurrent.oldStart, mineCurrent.lines, theirsCurrent.oldStart, theirsCurrent.lines);
        theirsIndex++;
        mineIndex++;
        ret.hunks.push(mergedHunk);
      }
    }

    return ret;
  }

  function loadPatch(param, base) {
    if (typeof param === 'string') {
      if (/^@@/m.test(param) || /^Index:/m.test(param)) {
        return parsePatch(param)[0];
      }

      if (!base) {
        throw new Error('Must provide a base reference or pass in a patch');
      }

      return structuredPatch(undefined, undefined, base, param);
    }

    return param;
  }

  function fileNameChanged(patch) {
    return patch.newFileName && patch.newFileName !== patch.oldFileName;
  }

  function selectField(index, mine, theirs) {
    if (mine === theirs) {
      return mine;
    } else {
      index.conflict = true;
      return {
        mine: mine,
        theirs: theirs
      };
    }
  }

  function hunkBefore(test, check) {
    return test.oldStart < check.oldStart && test.oldStart + test.oldLines < check.oldStart;
  }

  function cloneHunk(hunk, offset) {
    return {
      oldStart: hunk.oldStart,
      oldLines: hunk.oldLines,
      newStart: hunk.newStart + offset,
      newLines: hunk.newLines,
      lines: hunk.lines
    };
  }

  function mergeLines(hunk, mineOffset, mineLines, theirOffset, theirLines) {
    // This will generally result in a conflicted hunk, but there are cases where the context
    // is the only overlap where we can successfully merge the content here.
    var mine = {
      offset: mineOffset,
      lines: mineLines,
      index: 0
    },
        their = {
      offset: theirOffset,
      lines: theirLines,
      index: 0
    }; // Handle any leading content

    insertLeading(hunk, mine, their);
    insertLeading(hunk, their, mine); // Now in the overlap content. Scan through and select the best changes from each.

    while (mine.index < mine.lines.length && their.index < their.lines.length) {
      var mineCurrent = mine.lines[mine.index],
          theirCurrent = their.lines[their.index];

      if ((mineCurrent[0] === '-' || mineCurrent[0] === '+') && (theirCurrent[0] === '-' || theirCurrent[0] === '+')) {
        // Both modified ...
        mutualChange(hunk, mine, their);
      } else if (mineCurrent[0] === '+' && theirCurrent[0] === ' ') {
        var _hunk$lines; // Mine inserted


        (_hunk$lines = hunk.lines).push.apply(_hunk$lines, _toConsumableArray(collectChange(mine)));
      } else if (theirCurrent[0] === '+' && mineCurrent[0] === ' ') {
        var _hunk$lines2; // Theirs inserted


        (_hunk$lines2 = hunk.lines).push.apply(_hunk$lines2, _toConsumableArray(collectChange(their)));
      } else if (mineCurrent[0] === '-' && theirCurrent[0] === ' ') {
        // Mine removed or edited
        removal(hunk, mine, their);
      } else if (theirCurrent[0] === '-' && mineCurrent[0] === ' ') {
        // Their removed or edited
        removal(hunk, their, mine, true);
      } else if (mineCurrent === theirCurrent) {
        // Context identity
        hunk.lines.push(mineCurrent);
        mine.index++;
        their.index++;
      } else {
        // Context mismatch
        conflict(hunk, collectChange(mine), collectChange(their));
      }
    } // Now push anything that may be remaining


    insertTrailing(hunk, mine);
    insertTrailing(hunk, their);
    calcLineCount(hunk);
  }

  function mutualChange(hunk, mine, their) {
    var myChanges = collectChange(mine),
        theirChanges = collectChange(their);

    if (allRemoves(myChanges) && allRemoves(theirChanges)) {
      // Special case for remove changes that are supersets of one another
      if (arrayStartsWith(myChanges, theirChanges) && skipRemoveSuperset(their, myChanges, myChanges.length - theirChanges.length)) {
        var _hunk$lines3;

        (_hunk$lines3 = hunk.lines).push.apply(_hunk$lines3, _toConsumableArray(myChanges));

        return;
      } else if (arrayStartsWith(theirChanges, myChanges) && skipRemoveSuperset(mine, theirChanges, theirChanges.length - myChanges.length)) {
        var _hunk$lines4;

        (_hunk$lines4 = hunk.lines).push.apply(_hunk$lines4, _toConsumableArray(theirChanges));

        return;
      }
    } else if (arrayEqual(myChanges, theirChanges)) {
      var _hunk$lines5;

      (_hunk$lines5 = hunk.lines).push.apply(_hunk$lines5, _toConsumableArray(myChanges));

      return;
    }

    conflict(hunk, myChanges, theirChanges);
  }

  function removal(hunk, mine, their, swap) {
    var myChanges = collectChange(mine),
        theirChanges = collectContext(their, myChanges);

    if (theirChanges.merged) {
      var _hunk$lines6;

      (_hunk$lines6 = hunk.lines).push.apply(_hunk$lines6, _toConsumableArray(theirChanges.merged));
    } else {
      conflict(hunk, swap ? theirChanges : myChanges, swap ? myChanges : theirChanges);
    }
  }

  function conflict(hunk, mine, their) {
    hunk.conflict = true;
    hunk.lines.push({
      conflict: true,
      mine: mine,
      theirs: their
    });
  }

  function insertLeading(hunk, insert, their) {
    while (insert.offset < their.offset && insert.index < insert.lines.length) {
      var line = insert.lines[insert.index++];
      hunk.lines.push(line);
      insert.offset++;
    }
  }

  function insertTrailing(hunk, insert) {
    while (insert.index < insert.lines.length) {
      var line = insert.lines[insert.index++];
      hunk.lines.push(line);
    }
  }

  function collectChange(state) {
    var ret = [],
        operation = state.lines[state.index][0];

    while (state.index < state.lines.length) {
      var line = state.lines[state.index]; // Group additions that are immediately after subtractions and treat them as one "atomic" modify change.

      if (operation === '-' && line[0] === '+') {
        operation = '+';
      }

      if (operation === line[0]) {
        ret.push(line);
        state.index++;
      } else {
        break;
      }
    }

    return ret;
  }

  function collectContext(state, matchChanges) {
    var changes = [],
        merged = [],
        matchIndex = 0,
        contextChanges = false,
        conflicted = false;

    while (matchIndex < matchChanges.length && state.index < state.lines.length) {
      var change = state.lines[state.index],
          match = matchChanges[matchIndex]; // Once we've hit our add, then we are done

      if (match[0] === '+') {
        break;
      }

      contextChanges = contextChanges || change[0] !== ' ';
      merged.push(match);
      matchIndex++; // Consume any additions in the other block as a conflict to attempt
      // to pull in the remaining context after this

      if (change[0] === '+') {
        conflicted = true;

        while (change[0] === '+') {
          changes.push(change);
          change = state.lines[++state.index];
        }
      }

      if (match.substr(1) === change.substr(1)) {
        changes.push(change);
        state.index++;
      } else {
        conflicted = true;
      }
    }

    if ((matchChanges[matchIndex] || '')[0] === '+' && contextChanges) {
      conflicted = true;
    }

    if (conflicted) {
      return changes;
    }

    while (matchIndex < matchChanges.length) {
      merged.push(matchChanges[matchIndex++]);
    }

    return {
      merged: merged,
      changes: changes
    };
  }

  function allRemoves(changes) {
    return changes.reduce(function (prev, change) {
      return prev && change[0] === '-';
    }, true);
  }

  function skipRemoveSuperset(state, removeChanges, delta) {
    for (var i = 0; i < delta; i++) {
      var changeContent = removeChanges[removeChanges.length - delta + i].substr(1);

      if (state.lines[state.index + i] !== ' ' + changeContent) {
        return false;
      }
    }

    state.index += delta;
    return true;
  }

  function calcOldNewLineCount(lines) {
    var oldLines = 0;
    var newLines = 0;
    lines.forEach(function (line) {
      if (typeof line !== 'string') {
        var myCount = calcOldNewLineCount(line.mine);
        var theirCount = calcOldNewLineCount(line.theirs);

        if (oldLines !== undefined) {
          if (myCount.oldLines === theirCount.oldLines) {
            oldLines += myCount.oldLines;
          } else {
            oldLines = undefined;
          }
        }

        if (newLines !== undefined) {
          if (myCount.newLines === theirCount.newLines) {
            newLines += myCount.newLines;
          } else {
            newLines = undefined;
          }
        }
      } else {
        if (newLines !== undefined && (line[0] === '+' || line[0] === ' ')) {
          newLines++;
        }

        if (oldLines !== undefined && (line[0] === '-' || line[0] === ' ')) {
          oldLines++;
        }
      }
    });
    return {
      oldLines: oldLines,
      newLines: newLines
    };
  } // See: http://code.google.com/p/google-diff-match-patch/wiki/API


  function convertChangesToDMP(changes) {
    var ret = [],
        change,
        operation;

    for (var i = 0; i < changes.length; i++) {
      change = changes[i];

      if (change.added) {
        operation = 1;
      } else if (change.removed) {
        operation = -1;
      } else {
        operation = 0;
      }

      ret.push([operation, change.value]);
    }

    return ret;
  }

  function convertChangesToXML(changes) {
    var ret = [];

    for (var i = 0; i < changes.length; i++) {
      var change = changes[i];

      if (change.added) {
        ret.push('<ins>');
      } else if (change.removed) {
        ret.push('<del>');
      }

      ret.push(escapeHTML(change.value));

      if (change.added) {
        ret.push('</ins>');
      } else if (change.removed) {
        ret.push('</del>');
      }
    }

    return ret.join('');
  }

  function escapeHTML(s) {
    var n = s;
    n = n.replace(/&/g, '&amp;');
    n = n.replace(/</g, '&lt;');
    n = n.replace(/>/g, '&gt;');
    n = n.replace(/"/g, '&quot;');
    return n;
  }

  exports.Diff = Diff;
  exports.applyPatch = applyPatch;
  exports.applyPatches = applyPatches;
  exports.canonicalize = canonicalize;
  exports.convertChangesToDMP = convertChangesToDMP;
  exports.convertChangesToXML = convertChangesToXML;
  exports.createPatch = createPatch;
  exports.createTwoFilesPatch = createTwoFilesPatch;
  exports.diffArrays = diffArrays;
  exports.diffChars = diffChars;
  exports.diffCss = diffCss;
  exports.diffJson = diffJson;
  exports.diffLines = diffLines;
  exports.diffSentences = diffSentences;
  exports.diffTrimmedLines = diffTrimmedLines;
  exports.diffWords = diffWords;
  exports.diffWordsWithSpace = diffWordsWithSpace;
  exports.merge = merge;
  exports.parsePatch = parsePatch;
  exports.structuredPatch = structuredPatch;
  Object.defineProperty(exports, '__esModule', {
    value: true
  });
});
},{}],"templates/sentencetable.js":[function(require,module,exports) {
var global = arguments[3];
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.sentencetableTemplate = sentencetableTemplate;

function pug_attr(t, e, n, r) {
  if (!1 === e || null == e || !e && ("class" === t || "style" === t)) return "";
  if (!0 === e) return " " + (r ? t : t + '="' + t + '"');
  var f = typeof e;
  return "object" !== f && "function" !== f || "function" != typeof e.toJSON || (e = e.toJSON()), "string" == typeof e || (e = JSON.stringify(e), n || -1 === e.indexOf('"')) ? (n && (e = pug_escape(e)), " " + t + '="' + e + '"') : " " + t + "='" + e.replace(/'/g, "&#39;") + "'";
}

function pug_classes(s, r) {
  return Array.isArray(s) ? pug_classes_array(s, r) : s && "object" == typeof s ? pug_classes_object(s) : s || "";
}

function pug_classes_array(r, a) {
  for (var s, e = "", u = "", c = Array.isArray(a), g = 0; g < r.length; g++) (s = pug_classes(r[g])) && (c && a[g] && (s = pug_escape(s)), e = e + u + s, u = " ");

  return e;
}

function pug_classes_object(r) {
  var a = "",
      n = "";

  for (var o in r) o && r[o] && pug_has_own_property.call(r, o) && (a = a + n + o, n = " ");

  return a;
}

function pug_escape(e) {
  var a = "" + e,
      t = pug_match_html.exec(a);
  if (!t) return e;
  var r,
      c,
      n,
      s = "";

  for (r = t.index, c = 0; r < a.length; r++) {
    switch (a.charCodeAt(r)) {
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

var pug_has_own_property = Object.prototype.hasOwnProperty;
var pug_match_html = /["&<>]/;

function pug_rethrow(n, e, r, t) {
  if (!(n instanceof Error)) throw n;
  if (!("undefined" == typeof window && e || t)) throw n.message += " on line " + r, n;

  try {
    t = t || global["require"]("fs").readFileSync(e, "utf8");
  } catch (e) {
    pug_rethrow(n, null, r);
  }

  var i = 3,
      a = t.split("\n"),
      o = Math.max(r - i, 0),
      h = Math.min(a.length, r + i),
      i = a.slice(o, h).map(function (n, e) {
    var t = e + o + 1;
    return (t == r ? "  > " : "    ") + t + "| " + n;
  }).join("\n");
  throw n.path = e, n.message = (e || "Pug") + ":" + r + "\n" + i + "\n\n" + n.message, n;
}

function sentencetableTemplate(locals) {
  var pug_html = "",
      pug_mixins = {},
      pug_interp;
  var pug_debug_filename, pug_debug_line;

  try {
    var pug_debug_sources = {
      "frontend-views\u002F\u002Fsentencetable.pug": "table.sentence-table\n    colgroup\n        col.selected-toggle.narrow\n        each field in fields\n            col(class=(fieldClasses[field] || ''))\n    tbody\n        tr\n            th\n                -\u002F\u002F empty\n            each field in fields\n                th\n                    =field\n        each sentence in sentences\n            tr\n                td\n                    input(type=\"checkbox\" checked=\"\" data-sentence_id=sentence.data._id)\n                each field in fields\n                    td\n                        =sentence.data[field]\n                \n"
    };
    ;
    var locals_for_with = locals || {};
    (function (fieldClasses, fields, sentences) {
      ;
      pug_debug_line = 1;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
      pug_html = pug_html + "\u003Ctable class=\"sentence-table\"\u003E";
      ;
      pug_debug_line = 2;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
      pug_html = pug_html + "\u003Ccolgroup\u003E";
      ;
      pug_debug_line = 3;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
      pug_html = pug_html + "\u003Ccol class=\"selected-toggle narrow\"\u002F\u003E";
      ;
      pug_debug_line = 4;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug"; // iterate fields

      ;
      (function () {
        var $$obj = fields;

        if ('number' == typeof $$obj.length) {
          for (var pug_index0 = 0, $$l = $$obj.length; pug_index0 < $$l; pug_index0++) {
            var field = $$obj[pug_index0];
            ;
            pug_debug_line = 5;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Ccol" + pug_attr("class", pug_classes([fieldClasses[field] || ''], [true]), false, false) + "\u002F\u003E";
          }
        } else {
          var $$l = 0;

          for (var pug_index0 in $$obj) {
            $$l++;
            var field = $$obj[pug_index0];
            ;
            pug_debug_line = 5;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Ccol" + pug_attr("class", pug_classes([fieldClasses[field] || ''], [true]), false, false) + "\u002F\u003E";
          }
        }
      }).call(this);
      pug_html = pug_html + "\u003C\u002Fcolgroup\u003E";
      ;
      pug_debug_line = 6;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
      pug_html = pug_html + "\u003Ctbody\u003E";
      ;
      pug_debug_line = 7;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
      pug_html = pug_html + "\u003Ctr\u003E";
      ;
      pug_debug_line = 8;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
      pug_html = pug_html + "\u003Cth\u003E";
      ;
      pug_debug_line = 9;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug"; // empty

      pug_html = pug_html + "\u003C\u002Fth\u003E";
      ;
      pug_debug_line = 10;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug"; // iterate fields

      ;
      (function () {
        var $$obj = fields;

        if ('number' == typeof $$obj.length) {
          for (var pug_index1 = 0, $$l = $$obj.length; pug_index1 < $$l; pug_index1++) {
            var field = $$obj[pug_index1];
            ;
            pug_debug_line = 11;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Cth\u003E";
            ;
            pug_debug_line = 12;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + pug_escape(null == (pug_interp = field) ? "" : pug_interp) + "\u003C\u002Fth\u003E";
          }
        } else {
          var $$l = 0;

          for (var pug_index1 in $$obj) {
            $$l++;
            var field = $$obj[pug_index1];
            ;
            pug_debug_line = 11;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Cth\u003E";
            ;
            pug_debug_line = 12;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + pug_escape(null == (pug_interp = field) ? "" : pug_interp) + "\u003C\u002Fth\u003E";
          }
        }
      }).call(this);
      pug_html = pug_html + "\u003C\u002Ftr\u003E";
      ;
      pug_debug_line = 13;
      pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug"; // iterate sentences

      ;
      (function () {
        var $$obj = sentences;

        if ('number' == typeof $$obj.length) {
          for (var pug_index2 = 0, $$l = $$obj.length; pug_index2 < $$l; pug_index2++) {
            var sentence = $$obj[pug_index2];
            ;
            pug_debug_line = 14;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Ctr\u003E";
            ;
            pug_debug_line = 15;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Ctd\u003E";
            ;
            pug_debug_line = 16;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Cinput" + (" type=\"checkbox\" checked=\"\"" + pug_attr("data-sentence_id", sentence.data._id, true, false)) + "\u002F\u003E\u003C\u002Ftd\u003E";
            ;
            pug_debug_line = 17;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug"; // iterate fields

            ;
            (function () {
              var $$obj = fields;

              if ('number' == typeof $$obj.length) {
                for (var pug_index3 = 0, $$l = $$obj.length; pug_index3 < $$l; pug_index3++) {
                  var field = $$obj[pug_index3];
                  ;
                  pug_debug_line = 18;
                  pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
                  pug_html = pug_html + "\u003Ctd\u003E";
                  ;
                  pug_debug_line = 19;
                  pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
                  pug_html = pug_html + pug_escape(null == (pug_interp = sentence.data[field]) ? "" : pug_interp) + "\u003C\u002Ftd\u003E";
                }
              } else {
                var $$l = 0;

                for (var pug_index3 in $$obj) {
                  $$l++;
                  var field = $$obj[pug_index3];
                  ;
                  pug_debug_line = 18;
                  pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
                  pug_html = pug_html + "\u003Ctd\u003E";
                  ;
                  pug_debug_line = 19;
                  pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
                  pug_html = pug_html + pug_escape(null == (pug_interp = sentence.data[field]) ? "" : pug_interp) + "\u003C\u002Ftd\u003E";
                }
              }
            }).call(this);
            pug_html = pug_html + "\u003C\u002Ftr\u003E";
          }
        } else {
          var $$l = 0;

          for (var pug_index2 in $$obj) {
            $$l++;
            var sentence = $$obj[pug_index2];
            ;
            pug_debug_line = 14;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Ctr\u003E";
            ;
            pug_debug_line = 15;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Ctd\u003E";
            ;
            pug_debug_line = 16;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
            pug_html = pug_html + "\u003Cinput" + (" type=\"checkbox\" checked=\"\"" + pug_attr("data-sentence_id", sentence.data._id, true, false)) + "\u002F\u003E\u003C\u002Ftd\u003E";
            ;
            pug_debug_line = 17;
            pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug"; // iterate fields

            ;
            (function () {
              var $$obj = fields;

              if ('number' == typeof $$obj.length) {
                for (var pug_index4 = 0, $$l = $$obj.length; pug_index4 < $$l; pug_index4++) {
                  var field = $$obj[pug_index4];
                  ;
                  pug_debug_line = 18;
                  pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
                  pug_html = pug_html + "\u003Ctd\u003E";
                  ;
                  pug_debug_line = 19;
                  pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
                  pug_html = pug_html + pug_escape(null == (pug_interp = sentence.data[field]) ? "" : pug_interp) + "\u003C\u002Ftd\u003E";
                }
              } else {
                var $$l = 0;

                for (var pug_index4 in $$obj) {
                  $$l++;
                  var field = $$obj[pug_index4];
                  ;
                  pug_debug_line = 18;
                  pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
                  pug_html = pug_html + "\u003Ctd\u003E";
                  ;
                  pug_debug_line = 19;
                  pug_debug_filename = "frontend-views\u002F\u002Fsentencetable.pug";
                  pug_html = pug_html + pug_escape(null == (pug_interp = sentence.data[field]) ? "" : pug_interp) + "\u003C\u002Ftd\u003E";
                }
              }
            }).call(this);
            pug_html = pug_html + "\u003C\u002Ftr\u003E";
          }
        }
      }).call(this);
      pug_html = pug_html + "\u003C\u002Ftbody\u003E\u003C\u002Ftable\u003E";
    }).call(this, "fieldClasses" in locals_for_with ? locals_for_with.fieldClasses : typeof fieldClasses !== "undefined" ? fieldClasses : undefined, "fields" in locals_for_with ? locals_for_with.fields : typeof fields !== "undefined" ? fields : undefined, "sentences" in locals_for_with ? locals_for_with.sentences : typeof sentences !== "undefined" ? sentences : undefined);
  } catch (err) {
    pug_rethrow(err, pug_debug_filename, pug_debug_line, pug_debug_sources[pug_debug_filename]);
  }

  ;
  return pug_html;
}
},{}],"../../node_modules/lodash.assign/index.js":[function(require,module,exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object),
    nativeMax = Math.max;

/** Detect if properties shadowing those on `Object.prototype` are non-enumerable. */
var nonEnumShadows = !propertyIsEnumerable.call({ 'valueOf': 1 }, 'valueOf');

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Assigns own enumerable string keyed properties of source objects to the
 * destination object. Source objects are applied from left to right.
 * Subsequent sources overwrite property assignments of previous sources.
 *
 * **Note:** This method mutates `object` and is loosely based on
 * [`Object.assign`](https://mdn.io/Object/assign).
 *
 * @static
 * @memberOf _
 * @since 0.10.0
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.assignIn
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 * }
 *
 * function Bar() {
 *   this.c = 3;
 * }
 *
 * Foo.prototype.b = 2;
 * Bar.prototype.d = 4;
 *
 * _.assign({ 'a': 0 }, new Foo, new Bar);
 * // => { 'a': 1, 'c': 3 }
 */
var assign = createAssigner(function(object, source) {
  if (nonEnumShadows || isPrototype(source) || isArrayLike(source)) {
    copyObject(source, keys(source), object);
    return;
  }
  for (var key in source) {
    if (hasOwnProperty.call(source, key)) {
      assignValue(object, key, source[key]);
    }
  }
});

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

module.exports = assign;

},{}],"../../../../.nvm/versions/node/v14.16.0/lib/node_modules/parcel-bundler/src/builtins/_empty.js":[function(require,module,exports) {

},{}],"../../node_modules/global/document.js":[function(require,module,exports) {
var global = arguments[3];
var topLevel = typeof global !== 'undefined' ? global :
    typeof window !== 'undefined' ? window : {}
var minDoc = require('min-document');

var doccy;

if (typeof document !== 'undefined') {
    doccy = document;
} else {
    doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'];

    if (!doccy) {
        doccy = topLevel['__GLOBAL_DOCUMENT_CACHE@4'] = minDoc;
    }
}

module.exports = doccy;

},{"min-document":"../../../../.nvm/versions/node/v14.16.0/lib/node_modules/parcel-bundler/src/builtins/_empty.js"}],"../../node_modules/is-object/index.js":[function(require,module,exports) {
'use strict';

module.exports = function isObject(x) {
	return typeof x === 'object' && x !== null;
};

},{}],"../../node_modules/virtual-dom/vnode/is-vhook.js":[function(require,module,exports) {
module.exports = isHook

function isHook(hook) {
    return hook &&
      (typeof hook.hook === "function" && !hook.hasOwnProperty("hook") ||
       typeof hook.unhook === "function" && !hook.hasOwnProperty("unhook"))
}

},{}],"../../node_modules/virtual-dom/vdom/apply-properties.js":[function(require,module,exports) {
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook.js")

module.exports = applyProperties

function applyProperties(node, props, previous) {
    for (var propName in props) {
        var propValue = props[propName]

        if (propValue === undefined) {
            removeProperty(node, propName, propValue, previous);
        } else if (isHook(propValue)) {
            removeProperty(node, propName, propValue, previous)
            if (propValue.hook) {
                propValue.hook(node,
                    propName,
                    previous ? previous[propName] : undefined)
            }
        } else {
            if (isObject(propValue)) {
                patchObject(node, props, previous, propName, propValue);
            } else {
                node[propName] = propValue
            }
        }
    }
}

function removeProperty(node, propName, propValue, previous) {
    if (previous) {
        var previousValue = previous[propName]

        if (!isHook(previousValue)) {
            if (propName === "attributes") {
                for (var attrName in previousValue) {
                    node.removeAttribute(attrName)
                }
            } else if (propName === "style") {
                for (var i in previousValue) {
                    node.style[i] = ""
                }
            } else if (typeof previousValue === "string") {
                node[propName] = ""
            } else {
                node[propName] = null
            }
        } else if (previousValue.unhook) {
            previousValue.unhook(node, propName, propValue)
        }
    }
}

function patchObject(node, props, previous, propName, propValue) {
    var previousValue = previous ? previous[propName] : undefined

    // Set attributes
    if (propName === "attributes") {
        for (var attrName in propValue) {
            var attrValue = propValue[attrName]

            if (attrValue === undefined) {
                node.removeAttribute(attrName)
            } else {
                node.setAttribute(attrName, attrValue)
            }
        }

        return
    }

    if(previousValue && isObject(previousValue) &&
        getPrototype(previousValue) !== getPrototype(propValue)) {
        node[propName] = propValue
        return
    }

    if (!isObject(node[propName])) {
        node[propName] = {}
    }

    var replacer = propName === "style" ? "" : undefined

    for (var k in propValue) {
        var value = propValue[k]
        node[propName][k] = (value === undefined) ? replacer : value
    }
}

function getPrototype(value) {
    if (Object.getPrototypeOf) {
        return Object.getPrototypeOf(value)
    } else if (value.__proto__) {
        return value.__proto__
    } else if (value.constructor) {
        return value.constructor.prototype
    }
}

},{"is-object":"../../node_modules/is-object/index.js","../vnode/is-vhook.js":"../../node_modules/virtual-dom/vnode/is-vhook.js"}],"../../node_modules/virtual-dom/vnode/version.js":[function(require,module,exports) {
module.exports = "2"

},{}],"../../node_modules/virtual-dom/vnode/is-vnode.js":[function(require,module,exports) {
var version = require("./version")

module.exports = isVirtualNode

function isVirtualNode(x) {
    return x && x.type === "VirtualNode" && x.version === version
}

},{"./version":"../../node_modules/virtual-dom/vnode/version.js"}],"../../node_modules/virtual-dom/vnode/is-vtext.js":[function(require,module,exports) {
var version = require("./version")

module.exports = isVirtualText

function isVirtualText(x) {
    return x && x.type === "VirtualText" && x.version === version
}

},{"./version":"../../node_modules/virtual-dom/vnode/version.js"}],"../../node_modules/virtual-dom/vnode/is-widget.js":[function(require,module,exports) {
module.exports = isWidget

function isWidget(w) {
    return w && w.type === "Widget"
}

},{}],"../../node_modules/virtual-dom/vnode/is-thunk.js":[function(require,module,exports) {
module.exports = isThunk

function isThunk(t) {
    return t && t.type === "Thunk"
}

},{}],"../../node_modules/virtual-dom/vnode/handle-thunk.js":[function(require,module,exports) {
var isVNode = require("./is-vnode")
var isVText = require("./is-vtext")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")

module.exports = handleThunk

function handleThunk(a, b) {
    var renderedA = a
    var renderedB = b

    if (isThunk(b)) {
        renderedB = renderThunk(b, a)
    }

    if (isThunk(a)) {
        renderedA = renderThunk(a, null)
    }

    return {
        a: renderedA,
        b: renderedB
    }
}

function renderThunk(thunk, previous) {
    var renderedThunk = thunk.vnode

    if (!renderedThunk) {
        renderedThunk = thunk.vnode = thunk.render(previous)
    }

    if (!(isVNode(renderedThunk) ||
            isVText(renderedThunk) ||
            isWidget(renderedThunk))) {
        throw new Error("thunk did not return a valid node");
    }

    return renderedThunk
}

},{"./is-vnode":"../../node_modules/virtual-dom/vnode/is-vnode.js","./is-vtext":"../../node_modules/virtual-dom/vnode/is-vtext.js","./is-widget":"../../node_modules/virtual-dom/vnode/is-widget.js","./is-thunk":"../../node_modules/virtual-dom/vnode/is-thunk.js"}],"../../node_modules/virtual-dom/vdom/create-element.js":[function(require,module,exports) {
var document = require("global/document")

var applyProperties = require("./apply-properties")

var isVNode = require("../vnode/is-vnode.js")
var isVText = require("../vnode/is-vtext.js")
var isWidget = require("../vnode/is-widget.js")
var handleThunk = require("../vnode/handle-thunk.js")

module.exports = createElement

function createElement(vnode, opts) {
    var doc = opts ? opts.document || document : document
    var warn = opts ? opts.warn : null

    vnode = handleThunk(vnode).a

    if (isWidget(vnode)) {
        return vnode.init()
    } else if (isVText(vnode)) {
        return doc.createTextNode(vnode.text)
    } else if (!isVNode(vnode)) {
        if (warn) {
            warn("Item is not a valid virtual dom node", vnode)
        }
        return null
    }

    var node = (vnode.namespace === null) ?
        doc.createElement(vnode.tagName) :
        doc.createElementNS(vnode.namespace, vnode.tagName)

    var props = vnode.properties
    applyProperties(node, props)

    var children = vnode.children

    for (var i = 0; i < children.length; i++) {
        var childNode = createElement(children[i], opts)
        if (childNode) {
            node.appendChild(childNode)
        }
    }

    return node
}

},{"global/document":"../../node_modules/global/document.js","./apply-properties":"../../node_modules/virtual-dom/vdom/apply-properties.js","../vnode/is-vnode.js":"../../node_modules/virtual-dom/vnode/is-vnode.js","../vnode/is-vtext.js":"../../node_modules/virtual-dom/vnode/is-vtext.js","../vnode/is-widget.js":"../../node_modules/virtual-dom/vnode/is-widget.js","../vnode/handle-thunk.js":"../../node_modules/virtual-dom/vnode/handle-thunk.js"}],"../../node_modules/virtual-dom/create-element.js":[function(require,module,exports) {
var createElement = require("./vdom/create-element.js")

module.exports = createElement

},{"./vdom/create-element.js":"../../node_modules/virtual-dom/vdom/create-element.js"}],"../../node_modules/type/value/is.js":[function(require,module,exports) {
"use strict";

// ES3 safe
var _undefined = void 0;

module.exports = function (value) { return value !== _undefined && value !== null; };

},{}],"../../node_modules/type/object/is.js":[function(require,module,exports) {
"use strict";

var isValue = require("../value/is");

// prettier-ignore
var possibleTypes = { "object": true, "function": true, "undefined": true /* document.all */ };

module.exports = function (value) {
	if (!isValue(value)) return false;
	return hasOwnProperty.call(possibleTypes, typeof value);
};

},{"../value/is":"../../node_modules/type/value/is.js"}],"../../node_modules/type/prototype/is.js":[function(require,module,exports) {
"use strict";

var isObject = require("../object/is");

module.exports = function (value) {
	if (!isObject(value)) return false;
	try {
		if (!value.constructor) return false;
		return value.constructor.prototype === value;
	} catch (error) {
		return false;
	}
};

},{"../object/is":"../../node_modules/type/object/is.js"}],"../../node_modules/type/function/is.js":[function(require,module,exports) {
"use strict";

var isPrototype = require("../prototype/is");

module.exports = function (value) {
	if (typeof value !== "function") return false;

	if (!hasOwnProperty.call(value, "length")) return false;

	try {
		if (typeof value.length !== "number") return false;
		if (typeof value.call !== "function") return false;
		if (typeof value.apply !== "function") return false;
	} catch (error) {
		return false;
	}

	return !isPrototype(value);
};

},{"../prototype/is":"../../node_modules/type/prototype/is.js"}],"../../node_modules/type/plain-function/is.js":[function(require,module,exports) {
"use strict";

var isFunction = require("../function/is");

var classRe = /^\s*class[\s{/}]/, functionToString = Function.prototype.toString;

module.exports = function (value) {
	if (!isFunction(value)) return false;
	if (classRe.test(functionToString.call(value))) return false;
	return true;
};

},{"../function/is":"../../node_modules/type/function/is.js"}],"../../node_modules/es5-ext/object/assign/is-implemented.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
	var assign = Object.assign, obj;
	if (typeof assign !== "function") return false;
	obj = { foo: "raz" };
	assign(obj, { bar: "dwa" }, { trzy: "trzy" });
	return obj.foo + obj.bar + obj.trzy === "razdwatrzy";
};

},{}],"../../node_modules/es5-ext/object/keys/is-implemented.js":[function(require,module,exports) {
"use strict";

module.exports = function () {
	try {
		Object.keys("primitive");
		return true;
	} catch (e) {
		return false;
	}
};

},{}],"../../node_modules/es5-ext/function/noop.js":[function(require,module,exports) {
"use strict";

// eslint-disable-next-line no-empty-function
module.exports = function () {};

},{}],"../../node_modules/es5-ext/object/is-value.js":[function(require,module,exports) {
"use strict";

var _undefined = require("../function/noop")(); // Support ES3 engines

module.exports = function (val) { return val !== _undefined && val !== null; };

},{"../function/noop":"../../node_modules/es5-ext/function/noop.js"}],"../../node_modules/es5-ext/object/keys/shim.js":[function(require,module,exports) {
"use strict";

var isValue = require("../is-value");

var keys = Object.keys;

module.exports = function (object) { return keys(isValue(object) ? Object(object) : object); };

},{"../is-value":"../../node_modules/es5-ext/object/is-value.js"}],"../../node_modules/es5-ext/object/keys/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? Object.keys : require("./shim");

},{"./is-implemented":"../../node_modules/es5-ext/object/keys/is-implemented.js","./shim":"../../node_modules/es5-ext/object/keys/shim.js"}],"../../node_modules/es5-ext/object/valid-value.js":[function(require,module,exports) {
"use strict";

var isValue = require("./is-value");

module.exports = function (value) {
	if (!isValue(value)) throw new TypeError("Cannot use null or undefined");
	return value;
};

},{"./is-value":"../../node_modules/es5-ext/object/is-value.js"}],"../../node_modules/es5-ext/object/assign/shim.js":[function(require,module,exports) {
"use strict";

var keys  = require("../keys")
  , value = require("../valid-value")
  , max   = Math.max;

module.exports = function (dest, src/*, …srcn*/) {
	var error, i, length = max(arguments.length, 2), assign;
	dest = Object(value(dest));
	assign = function (key) {
		try {
			dest[key] = src[key];
		} catch (e) {
			if (!error) error = e;
		}
	};
	for (i = 1; i < length; ++i) {
		src = arguments[i];
		keys(src).forEach(assign);
	}
	if (error !== undefined) throw error;
	return dest;
};

},{"../keys":"../../node_modules/es5-ext/object/keys/index.js","../valid-value":"../../node_modules/es5-ext/object/valid-value.js"}],"../../node_modules/es5-ext/object/assign/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? Object.assign : require("./shim");

},{"./is-implemented":"../../node_modules/es5-ext/object/assign/is-implemented.js","./shim":"../../node_modules/es5-ext/object/assign/shim.js"}],"../../node_modules/es5-ext/object/normalize-options.js":[function(require,module,exports) {

"use strict";

var isValue = require("./is-value");

var forEach = Array.prototype.forEach, create = Object.create;

var process = function (src, obj) {
	var key;
	for (key in src) obj[key] = src[key];
};

// eslint-disable-next-line no-unused-vars
module.exports = function (opts1/*, …options*/) {
	var result = create(null);
	forEach.call(arguments, function (options) {
		if (!isValue(options)) return;
		process(Object(options), result);
	});
	return result;
};

},{"./is-value":"../../node_modules/es5-ext/object/is-value.js"}],"../../node_modules/es5-ext/string/#/contains/is-implemented.js":[function(require,module,exports) {
"use strict";

var str = "razdwatrzy";

module.exports = function () {
	if (typeof str.contains !== "function") return false;
	return str.contains("dwa") === true && str.contains("foo") === false;
};

},{}],"../../node_modules/es5-ext/string/#/contains/shim.js":[function(require,module,exports) {
"use strict";

var indexOf = String.prototype.indexOf;

module.exports = function (searchString/*, position*/) {
	return indexOf.call(this, searchString, arguments[1]) > -1;
};

},{}],"../../node_modules/es5-ext/string/#/contains/index.js":[function(require,module,exports) {
"use strict";

module.exports = require("./is-implemented")() ? String.prototype.contains : require("./shim");

},{"./is-implemented":"../../node_modules/es5-ext/string/#/contains/is-implemented.js","./shim":"../../node_modules/es5-ext/string/#/contains/shim.js"}],"../../node_modules/d/index.js":[function(require,module,exports) {
"use strict";

var isValue         = require("type/value/is")
  , isPlainFunction = require("type/plain-function/is")
  , assign          = require("es5-ext/object/assign")
  , normalizeOpts   = require("es5-ext/object/normalize-options")
  , contains        = require("es5-ext/string/#/contains");

var d = (module.exports = function (dscr, value/*, options*/) {
	var c, e, w, options, desc;
	if (arguments.length < 2 || typeof dscr !== "string") {
		options = value;
		value = dscr;
		dscr = null;
	} else {
		options = arguments[2];
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
		w = contains.call(dscr, "w");
	} else {
		c = w = true;
		e = false;
	}

	desc = { value: value, configurable: c, enumerable: e, writable: w };
	return !options ? desc : assign(normalizeOpts(options), desc);
});

d.gs = function (dscr, get, set/*, options*/) {
	var c, e, options, desc;
	if (typeof dscr !== "string") {
		options = set;
		set = get;
		get = dscr;
		dscr = null;
	} else {
		options = arguments[3];
	}
	if (!isValue(get)) {
		get = undefined;
	} else if (!isPlainFunction(get)) {
		options = get;
		get = set = undefined;
	} else if (!isValue(set)) {
		set = undefined;
	} else if (!isPlainFunction(set)) {
		options = set;
		set = undefined;
	}
	if (isValue(dscr)) {
		c = contains.call(dscr, "c");
		e = contains.call(dscr, "e");
	} else {
		c = true;
		e = false;
	}

	desc = { get: get, set: set, configurable: c, enumerable: e };
	return !options ? desc : assign(normalizeOpts(options), desc);
};

},{"type/value/is":"../../node_modules/type/value/is.js","type/plain-function/is":"../../node_modules/type/plain-function/is.js","es5-ext/object/assign":"../../node_modules/es5-ext/object/assign/index.js","es5-ext/object/normalize-options":"../../node_modules/es5-ext/object/normalize-options.js","es5-ext/string/#/contains":"../../node_modules/es5-ext/string/#/contains/index.js"}],"../../node_modules/es5-ext/object/valid-callable.js":[function(require,module,exports) {
"use strict";

module.exports = function (fn) {
	if (typeof fn !== "function") throw new TypeError(fn + " is not a function");
	return fn;
};

},{}],"../../node_modules/event-emitter/index.js":[function(require,module,exports) {
'use strict';

var d        = require('d')
  , callable = require('es5-ext/object/valid-callable')

  , apply = Function.prototype.apply, call = Function.prototype.call
  , create = Object.create, defineProperty = Object.defineProperty
  , defineProperties = Object.defineProperties
  , hasOwnProperty = Object.prototype.hasOwnProperty
  , descriptor = { configurable: true, enumerable: false, writable: true }

  , on, once, off, emit, methods, descriptors, base;

on = function (type, listener) {
	var data;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) {
		data = descriptor.value = create(null);
		defineProperty(this, '__ee__', descriptor);
		descriptor.value = null;
	} else {
		data = this.__ee__;
	}
	if (!data[type]) data[type] = listener;
	else if (typeof data[type] === 'object') data[type].push(listener);
	else data[type] = [data[type], listener];

	return this;
};

once = function (type, listener) {
	var once, self;

	callable(listener);
	self = this;
	on.call(this, type, once = function () {
		off.call(self, type, once);
		apply.call(listener, this, arguments);
	});

	once.__eeOnceListener__ = listener;
	return this;
};

off = function (type, listener) {
	var data, listeners, candidate, i;

	callable(listener);

	if (!hasOwnProperty.call(this, '__ee__')) return this;
	data = this.__ee__;
	if (!data[type]) return this;
	listeners = data[type];

	if (typeof listeners === 'object') {
		for (i = 0; (candidate = listeners[i]); ++i) {
			if ((candidate === listener) ||
					(candidate.__eeOnceListener__ === listener)) {
				if (listeners.length === 2) data[type] = listeners[i ? 0 : 1];
				else listeners.splice(i, 1);
			}
		}
	} else {
		if ((listeners === listener) ||
				(listeners.__eeOnceListener__ === listener)) {
			delete data[type];
		}
	}

	return this;
};

emit = function (type) {
	var i, l, listener, listeners, args;

	if (!hasOwnProperty.call(this, '__ee__')) return;
	listeners = this.__ee__[type];
	if (!listeners) return;

	if (typeof listeners === 'object') {
		l = arguments.length;
		args = new Array(l - 1);
		for (i = 1; i < l; ++i) args[i - 1] = arguments[i];

		listeners = listeners.slice();
		for (i = 0; (listener = listeners[i]); ++i) {
			apply.call(listener, this, args);
		}
	} else {
		switch (arguments.length) {
		case 1:
			call.call(listeners, this);
			break;
		case 2:
			call.call(listeners, this, arguments[1]);
			break;
		case 3:
			call.call(listeners, this, arguments[1], arguments[2]);
			break;
		default:
			l = arguments.length;
			args = new Array(l - 1);
			for (i = 1; i < l; ++i) {
				args[i - 1] = arguments[i];
			}
			apply.call(listeners, this, args);
		}
	}
};

methods = {
	on: on,
	once: once,
	off: off,
	emit: emit
};

descriptors = {
	on: d(on),
	once: d(once),
	off: d(off),
	emit: d(emit)
};

base = defineProperties({}, descriptors);

module.exports = exports = function (o) {
	return (o == null) ? create(base) : defineProperties(Object(o), descriptors);
};
exports.methods = methods;

},{"d":"../../node_modules/d/index.js","es5-ext/object/valid-callable":"../../node_modules/es5-ext/object/valid-callable.js"}],"../../node_modules/lodash.defaults/index.js":[function(require,module,exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * A faster alternative to `Function#apply`, this function invokes `func`
 * with the `this` binding of `thisArg` and the arguments of `args`.
 *
 * @private
 * @param {Function} func The function to invoke.
 * @param {*} thisArg The `this` binding of `func`.
 * @param {Array} args The arguments to invoke `func` with.
 * @returns {*} Returns the result of `func`.
 */
function apply(func, thisArg, args) {
  switch (args.length) {
    case 0: return func.call(thisArg);
    case 1: return func.call(thisArg, args[0]);
    case 2: return func.call(thisArg, args[0], args[1]);
    case 3: return func.call(thisArg, args[0], args[1], args[2]);
  }
  return func.apply(thisArg, args);
}

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeMax = Math.max;

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Used by `_.defaults` to customize its `_.assignIn` use.
 *
 * @private
 * @param {*} objValue The destination value.
 * @param {*} srcValue The source value.
 * @param {string} key The key of the property to assign.
 * @param {Object} object The parent object of `objValue`.
 * @returns {*} Returns the value to assign.
 */
function assignInDefaults(objValue, srcValue, key, object) {
  if (objValue === undefined ||
      (eq(objValue, objectProto[key]) && !hasOwnProperty.call(object, key))) {
    return srcValue;
  }
  return objValue;
}

/**
 * Assigns `value` to `key` of `object` if the existing value is not equivalent
 * using [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * for equality comparisons.
 *
 * @private
 * @param {Object} object The object to modify.
 * @param {string} key The key of the property to assign.
 * @param {*} value The value to assign.
 */
function assignValue(object, key, value) {
  var objValue = object[key];
  if (!(hasOwnProperty.call(object, key) && eq(objValue, value)) ||
      (value === undefined && !(key in object))) {
    object[key] = value;
  }
}

/**
 * The base implementation of `_.keysIn` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeysIn(object) {
  if (!isObject(object)) {
    return nativeKeysIn(object);
  }
  var isProto = isPrototype(object),
      result = [];

  for (var key in object) {
    if (!(key == 'constructor' && (isProto || !hasOwnProperty.call(object, key)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `_.rest` which doesn't validate or coerce arguments.
 *
 * @private
 * @param {Function} func The function to apply a rest parameter to.
 * @param {number} [start=func.length-1] The start position of the rest parameter.
 * @returns {Function} Returns the new function.
 */
function baseRest(func, start) {
  start = nativeMax(start === undefined ? (func.length - 1) : start, 0);
  return function() {
    var args = arguments,
        index = -1,
        length = nativeMax(args.length - start, 0),
        array = Array(length);

    while (++index < length) {
      array[index] = args[start + index];
    }
    index = -1;
    var otherArgs = Array(start + 1);
    while (++index < start) {
      otherArgs[index] = args[index];
    }
    otherArgs[start] = array;
    return apply(func, this, otherArgs);
  };
}

/**
 * Copies properties of `source` to `object`.
 *
 * @private
 * @param {Object} source The object to copy properties from.
 * @param {Array} props The property identifiers to copy.
 * @param {Object} [object={}] The object to copy properties to.
 * @param {Function} [customizer] The function to customize copied values.
 * @returns {Object} Returns `object`.
 */
function copyObject(source, props, object, customizer) {
  object || (object = {});

  var index = -1,
      length = props.length;

  while (++index < length) {
    var key = props[index];

    var newValue = customizer
      ? customizer(object[key], source[key], key, object, source)
      : undefined;

    assignValue(object, key, newValue === undefined ? source[key] : newValue);
  }
  return object;
}

/**
 * Creates a function like `_.assign`.
 *
 * @private
 * @param {Function} assigner The function to assign values.
 * @returns {Function} Returns the new assigner function.
 */
function createAssigner(assigner) {
  return baseRest(function(object, sources) {
    var index = -1,
        length = sources.length,
        customizer = length > 1 ? sources[length - 1] : undefined,
        guard = length > 2 ? sources[2] : undefined;

    customizer = (assigner.length > 3 && typeof customizer == 'function')
      ? (length--, customizer)
      : undefined;

    if (guard && isIterateeCall(sources[0], sources[1], guard)) {
      customizer = length < 3 ? undefined : customizer;
      length = 1;
    }
    object = Object(object);
    while (++index < length) {
      var source = sources[index];
      if (source) {
        assigner(object, source, index, customizer);
      }
    }
    return object;
  });
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if the given arguments are from an iteratee call.
 *
 * @private
 * @param {*} value The potential iteratee value argument.
 * @param {*} index The potential iteratee index or key argument.
 * @param {*} object The potential iteratee object argument.
 * @returns {boolean} Returns `true` if the arguments are from an iteratee call,
 *  else `false`.
 */
function isIterateeCall(value, index, object) {
  if (!isObject(object)) {
    return false;
  }
  var type = typeof index;
  if (type == 'number'
        ? (isArrayLike(object) && isIndex(index, object.length))
        : (type == 'string' && index in object)
      ) {
    return eq(object[index], value);
  }
  return false;
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * This function is like
 * [`Object.keys`](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * except that it includes inherited enumerable properties.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function nativeKeysIn(object) {
  var result = [];
  if (object != null) {
    for (var key in Object(object)) {
      result.push(key);
    }
  }
  return result;
}

/**
 * Performs a
 * [`SameValueZero`](http://ecma-international.org/ecma-262/7.0/#sec-samevaluezero)
 * comparison between two values to determine if they are equivalent.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to compare.
 * @param {*} other The other value to compare.
 * @returns {boolean} Returns `true` if the values are equivalent, else `false`.
 * @example
 *
 * var object = { 'a': 1 };
 * var other = { 'a': 1 };
 *
 * _.eq(object, object);
 * // => true
 *
 * _.eq(object, other);
 * // => false
 *
 * _.eq('a', 'a');
 * // => true
 *
 * _.eq('a', Object('a'));
 * // => false
 *
 * _.eq(NaN, NaN);
 * // => true
 */
function eq(value, other) {
  return value === other || (value !== value && other !== other);
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * This method is like `_.assignIn` except that it accepts `customizer`
 * which is invoked to produce the assigned values. If `customizer` returns
 * `undefined`, assignment is handled by the method instead. The `customizer`
 * is invoked with five arguments: (objValue, srcValue, key, object, source).
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @alias extendWith
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} sources The source objects.
 * @param {Function} [customizer] The function to customize assigned values.
 * @returns {Object} Returns `object`.
 * @see _.assignWith
 * @example
 *
 * function customizer(objValue, srcValue) {
 *   return _.isUndefined(objValue) ? srcValue : objValue;
 * }
 *
 * var defaults = _.partialRight(_.assignInWith, customizer);
 *
 * defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var assignInWith = createAssigner(function(object, source, srcIndex, customizer) {
  copyObject(source, keysIn(source), object, customizer);
});

/**
 * Assigns own and inherited enumerable string keyed properties of source
 * objects to the destination object for all destination properties that
 * resolve to `undefined`. Source objects are applied from left to right.
 * Once a property is set, additional values of the same property are ignored.
 *
 * **Note:** This method mutates `object`.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The destination object.
 * @param {...Object} [sources] The source objects.
 * @returns {Object} Returns `object`.
 * @see _.defaultsDeep
 * @example
 *
 * _.defaults({ 'a': 1 }, { 'b': 2 }, { 'a': 3 });
 * // => { 'a': 1, 'b': 2 }
 */
var defaults = baseRest(function(args) {
  args.push(undefined, assignInDefaults);
  return apply(assignInWith, undefined, args);
});

/**
 * Creates an array of the own and inherited enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects.
 *
 * @static
 * @memberOf _
 * @since 3.0.0
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keysIn(new Foo);
 * // => ['a', 'b', 'c'] (iteration order is not guaranteed)
 */
function keysIn(object) {
  return isArrayLike(object) ? arrayLikeKeys(object, true) : baseKeysIn(object);
}

module.exports = defaults;

},{}],"../../node_modules/x-is-array/index.js":[function(require,module,exports) {
var nativeIsArray = Array.isArray
var toString = Object.prototype.toString

module.exports = nativeIsArray || isArray

function isArray(obj) {
    return toString.call(obj) === "[object Array]"
}

},{}],"../../node_modules/virtual-dom/vnode/vnode.js":[function(require,module,exports) {
var version = require("./version")
var isVNode = require("./is-vnode")
var isWidget = require("./is-widget")
var isThunk = require("./is-thunk")
var isVHook = require("./is-vhook")

module.exports = VirtualNode

var noProperties = {}
var noChildren = []

function VirtualNode(tagName, properties, children, key, namespace) {
    this.tagName = tagName
    this.properties = properties || noProperties
    this.children = children || noChildren
    this.key = key != null ? String(key) : undefined
    this.namespace = (typeof namespace === "string") ? namespace : null

    var count = (children && children.length) || 0
    var descendants = 0
    var hasWidgets = false
    var hasThunks = false
    var descendantHooks = false
    var hooks

    for (var propName in properties) {
        if (properties.hasOwnProperty(propName)) {
            var property = properties[propName]
            if (isVHook(property) && property.unhook) {
                if (!hooks) {
                    hooks = {}
                }

                hooks[propName] = property
            }
        }
    }

    for (var i = 0; i < count; i++) {
        var child = children[i]
        if (isVNode(child)) {
            descendants += child.count || 0

            if (!hasWidgets && child.hasWidgets) {
                hasWidgets = true
            }

            if (!hasThunks && child.hasThunks) {
                hasThunks = true
            }

            if (!descendantHooks && (child.hooks || child.descendantHooks)) {
                descendantHooks = true
            }
        } else if (!hasWidgets && isWidget(child)) {
            if (typeof child.destroy === "function") {
                hasWidgets = true
            }
        } else if (!hasThunks && isThunk(child)) {
            hasThunks = true;
        }
    }

    this.count = count + descendants
    this.hasWidgets = hasWidgets
    this.hasThunks = hasThunks
    this.hooks = hooks
    this.descendantHooks = descendantHooks
}

VirtualNode.prototype.version = version
VirtualNode.prototype.type = "VirtualNode"

},{"./version":"../../node_modules/virtual-dom/vnode/version.js","./is-vnode":"../../node_modules/virtual-dom/vnode/is-vnode.js","./is-widget":"../../node_modules/virtual-dom/vnode/is-widget.js","./is-thunk":"../../node_modules/virtual-dom/vnode/is-thunk.js","./is-vhook":"../../node_modules/virtual-dom/vnode/is-vhook.js"}],"../../node_modules/virtual-dom/vnode/vtext.js":[function(require,module,exports) {
var version = require("./version")

module.exports = VirtualText

function VirtualText(text) {
    this.text = String(text)
}

VirtualText.prototype.version = version
VirtualText.prototype.type = "VirtualText"

},{"./version":"../../node_modules/virtual-dom/vnode/version.js"}],"../../node_modules/browser-split/index.js":[function(require,module,exports) {
/*!
 * Cross-Browser Split 1.1.1
 * Copyright 2007-2012 Steven Levithan <stevenlevithan.com>
 * Available under the MIT License
 * ECMAScript compliant, uniform cross-browser split method
 */

/**
 * Splits a string into an array of strings using a regex or string separator. Matches of the
 * separator are not included in the result array. However, if `separator` is a regex that contains
 * capturing groups, backreferences are spliced into the result each time `separator` is matched.
 * Fixes browser bugs compared to the native `String.prototype.split` and can be used reliably
 * cross-browser.
 * @param {String} str String to split.
 * @param {RegExp|String} separator Regex or string to use for separating the string.
 * @param {Number} [limit] Maximum number of items to include in the result array.
 * @returns {Array} Array of substrings.
 * @example
 *
 * // Basic use
 * split('a b c d', ' ');
 * // -> ['a', 'b', 'c', 'd']
 *
 * // With limit
 * split('a b c d', ' ', 2);
 * // -> ['a', 'b']
 *
 * // Backreferences in result array
 * split('..word1 word2..', /([a-z]+)(\d+)/i);
 * // -> ['..', 'word', '1', ' ', 'word', '2', '..']
 */
module.exports = (function split(undef) {

  var nativeSplit = String.prototype.split,
    compliantExecNpcg = /()??/.exec("")[1] === undef,
    // NPCG: nonparticipating capturing group
    self;

  self = function(str, separator, limit) {
    // If `separator` is not a regex, use `nativeSplit`
    if (Object.prototype.toString.call(separator) !== "[object RegExp]") {
      return nativeSplit.call(str, separator, limit);
    }
    var output = [],
      flags = (separator.ignoreCase ? "i" : "") + (separator.multiline ? "m" : "") + (separator.extended ? "x" : "") + // Proposed for ES6
      (separator.sticky ? "y" : ""),
      // Firefox 3+
      lastLastIndex = 0,
      // Make `global` and avoid `lastIndex` issues by working with a copy
      separator = new RegExp(separator.source, flags + "g"),
      separator2, match, lastIndex, lastLength;
    str += ""; // Type-convert
    if (!compliantExecNpcg) {
      // Doesn't need flags gy, but they don't hurt
      separator2 = new RegExp("^" + separator.source + "$(?!\\s)", flags);
    }
    /* Values for `limit`, per the spec:
     * If undefined: 4294967295 // Math.pow(2, 32) - 1
     * If 0, Infinity, or NaN: 0
     * If positive number: limit = Math.floor(limit); if (limit > 4294967295) limit -= 4294967296;
     * If negative number: 4294967296 - Math.floor(Math.abs(limit))
     * If other: Type-convert, then use the above rules
     */
    limit = limit === undef ? -1 >>> 0 : // Math.pow(2, 32) - 1
    limit >>> 0; // ToUint32(limit)
    while (match = separator.exec(str)) {
      // `separator.lastIndex` is not reliable cross-browser
      lastIndex = match.index + match[0].length;
      if (lastIndex > lastLastIndex) {
        output.push(str.slice(lastLastIndex, match.index));
        // Fix browsers whose `exec` methods don't consistently return `undefined` for
        // nonparticipating capturing groups
        if (!compliantExecNpcg && match.length > 1) {
          match[0].replace(separator2, function() {
            for (var i = 1; i < arguments.length - 2; i++) {
              if (arguments[i] === undef) {
                match[i] = undef;
              }
            }
          });
        }
        if (match.length > 1 && match.index < str.length) {
          Array.prototype.push.apply(output, match.slice(1));
        }
        lastLength = match[0].length;
        lastLastIndex = lastIndex;
        if (output.length >= limit) {
          break;
        }
      }
      if (separator.lastIndex === match.index) {
        separator.lastIndex++; // Avoid an infinite loop
      }
    }
    if (lastLastIndex === str.length) {
      if (lastLength || !separator.test("")) {
        output.push("");
      }
    } else {
      output.push(str.slice(lastLastIndex));
    }
    return output.length > limit ? output.slice(0, limit) : output;
  };

  return self;
})();

},{}],"../../node_modules/virtual-dom/virtual-hyperscript/parse-tag.js":[function(require,module,exports) {
'use strict';

var split = require('browser-split');

var classIdSplit = /([\.#]?[a-zA-Z0-9\u007F-\uFFFF_:-]+)/;
var notClassId = /^\.|#/;

module.exports = parseTag;

function parseTag(tag, props) {
    if (!tag) {
        return 'DIV';
    }

    var noId = !(props.hasOwnProperty('id'));

    var tagParts = split(tag, classIdSplit);
    var tagName = null;

    if (notClassId.test(tagParts[1])) {
        tagName = 'DIV';
    }

    var classes, part, type, i;

    for (i = 0; i < tagParts.length; i++) {
        part = tagParts[i];

        if (!part) {
            continue;
        }

        type = part.charAt(0);

        if (!tagName) {
            tagName = part;
        } else if (type === '.') {
            classes = classes || [];
            classes.push(part.substring(1, part.length));
        } else if (type === '#' && noId) {
            props.id = part.substring(1, part.length);
        }
    }

    if (classes) {
        if (props.className) {
            classes.push(props.className);
        }

        props.className = classes.join(' ');
    }

    return props.namespace ? tagName : tagName.toUpperCase();
}

},{"browser-split":"../../node_modules/browser-split/index.js"}],"../../node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js":[function(require,module,exports) {
'use strict';

module.exports = SoftSetHook;

function SoftSetHook(value) {
    if (!(this instanceof SoftSetHook)) {
        return new SoftSetHook(value);
    }

    this.value = value;
}

SoftSetHook.prototype.hook = function (node, propertyName) {
    if (node[propertyName] !== this.value) {
        node[propertyName] = this.value;
    }
};

},{}],"../../node_modules/individual/index.js":[function(require,module,exports) {
var global = arguments[3];
'use strict';

/*global window, global*/

var root = typeof window !== 'undefined' ?
    window : typeof global !== 'undefined' ?
    global : {};

module.exports = Individual;

function Individual(key, value) {
    if (key in root) {
        return root[key];
    }

    root[key] = value;

    return value;
}

},{}],"../../node_modules/individual/one-version.js":[function(require,module,exports) {
'use strict';

var Individual = require('./index.js');

module.exports = OneVersion;

function OneVersion(moduleName, version, defaultValue) {
    var key = '__INDIVIDUAL_ONE_VERSION_' + moduleName;
    var enforceKey = key + '_ENFORCE_SINGLETON';

    var versionValue = Individual(enforceKey, version);

    if (versionValue !== version) {
        throw new Error('Can only have one copy of ' +
            moduleName + '.\n' +
            'You already have version ' + versionValue +
            ' installed.\n' +
            'This means you cannot install version ' + version);
    }

    return Individual(key, defaultValue);
}

},{"./index.js":"../../node_modules/individual/index.js"}],"../../node_modules/ev-store/index.js":[function(require,module,exports) {
'use strict';

var OneVersionConstraint = require('individual/one-version');

var MY_VERSION = '7';
OneVersionConstraint('ev-store', MY_VERSION);

var hashKey = '__EV_STORE_KEY@' + MY_VERSION;

module.exports = EvStore;

function EvStore(elem) {
    var hash = elem[hashKey];

    if (!hash) {
        hash = elem[hashKey] = {};
    }

    return hash;
}

},{"individual/one-version":"../../node_modules/individual/one-version.js"}],"../../node_modules/virtual-dom/virtual-hyperscript/hooks/ev-hook.js":[function(require,module,exports) {
'use strict';

var EvStore = require('ev-store');

module.exports = EvHook;

function EvHook(value) {
    if (!(this instanceof EvHook)) {
        return new EvHook(value);
    }

    this.value = value;
}

EvHook.prototype.hook = function (node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = this.value;
};

EvHook.prototype.unhook = function(node, propertyName) {
    var es = EvStore(node);
    var propName = propertyName.substr(3);

    es[propName] = undefined;
};

},{"ev-store":"../../node_modules/ev-store/index.js"}],"../../node_modules/virtual-dom/virtual-hyperscript/index.js":[function(require,module,exports) {
'use strict';

var isArray = require('x-is-array');

var VNode = require('../vnode/vnode.js');
var VText = require('../vnode/vtext.js');
var isVNode = require('../vnode/is-vnode');
var isVText = require('../vnode/is-vtext');
var isWidget = require('../vnode/is-widget');
var isHook = require('../vnode/is-vhook');
var isVThunk = require('../vnode/is-thunk');

var parseTag = require('./parse-tag.js');
var softSetHook = require('./hooks/soft-set-hook.js');
var evHook = require('./hooks/ev-hook.js');

module.exports = h;

function h(tagName, properties, children) {
    var childNodes = [];
    var tag, props, key, namespace;

    if (!children && isChildren(properties)) {
        children = properties;
        props = {};
    }

    props = props || properties || {};
    tag = parseTag(tagName, props);

    // support keys
    if (props.hasOwnProperty('key')) {
        key = props.key;
        props.key = undefined;
    }

    // support namespace
    if (props.hasOwnProperty('namespace')) {
        namespace = props.namespace;
        props.namespace = undefined;
    }

    // fix cursor bug
    if (tag === 'INPUT' &&
        !namespace &&
        props.hasOwnProperty('value') &&
        props.value !== undefined &&
        !isHook(props.value)
    ) {
        props.value = softSetHook(props.value);
    }

    transformProperties(props);

    if (children !== undefined && children !== null) {
        addChild(children, childNodes, tag, props);
    }


    return new VNode(tag, props, childNodes, key, namespace);
}

function addChild(c, childNodes, tag, props) {
    if (typeof c === 'string') {
        childNodes.push(new VText(c));
    } else if (typeof c === 'number') {
        childNodes.push(new VText(String(c)));
    } else if (isChild(c)) {
        childNodes.push(c);
    } else if (isArray(c)) {
        for (var i = 0; i < c.length; i++) {
            addChild(c[i], childNodes, tag, props);
        }
    } else if (c === null || c === undefined) {
        return;
    } else {
        throw UnexpectedVirtualElement({
            foreignObject: c,
            parentVnode: {
                tagName: tag,
                properties: props
            }
        });
    }
}

function transformProperties(props) {
    for (var propName in props) {
        if (props.hasOwnProperty(propName)) {
            var value = props[propName];

            if (isHook(value)) {
                continue;
            }

            if (propName.substr(0, 3) === 'ev-') {
                // add ev-foo support
                props[propName] = evHook(value);
            }
        }
    }
}

function isChild(x) {
    return isVNode(x) || isVText(x) || isWidget(x) || isVThunk(x);
}

function isChildren(x) {
    return typeof x === 'string' || isArray(x) || isChild(x);
}

function UnexpectedVirtualElement(data) {
    var err = new Error();

    err.type = 'virtual-hyperscript.unexpected.virtual-element';
    err.message = 'Unexpected virtual child passed to h().\n' +
        'Expected a VNode / Vthunk / VWidget / string but:\n' +
        'got:\n' +
        errorString(data.foreignObject) +
        '.\n' +
        'The parent vnode is:\n' +
        errorString(data.parentVnode)
        '\n' +
        'Suggested fix: change your `h(..., [ ... ])` callsite.';
    err.foreignObject = data.foreignObject;
    err.parentVnode = data.parentVnode;

    return err;
}

function errorString(obj) {
    try {
        return JSON.stringify(obj, null, '    ');
    } catch (e) {
        return String(obj);
    }
}

},{"x-is-array":"../../node_modules/x-is-array/index.js","../vnode/vnode.js":"../../node_modules/virtual-dom/vnode/vnode.js","../vnode/vtext.js":"../../node_modules/virtual-dom/vnode/vtext.js","../vnode/is-vnode":"../../node_modules/virtual-dom/vnode/is-vnode.js","../vnode/is-vtext":"../../node_modules/virtual-dom/vnode/is-vtext.js","../vnode/is-widget":"../../node_modules/virtual-dom/vnode/is-widget.js","../vnode/is-vhook":"../../node_modules/virtual-dom/vnode/is-vhook.js","../vnode/is-thunk":"../../node_modules/virtual-dom/vnode/is-thunk.js","./parse-tag.js":"../../node_modules/virtual-dom/virtual-hyperscript/parse-tag.js","./hooks/soft-set-hook.js":"../../node_modules/virtual-dom/virtual-hyperscript/hooks/soft-set-hook.js","./hooks/ev-hook.js":"../../node_modules/virtual-dom/virtual-hyperscript/hooks/ev-hook.js"}],"../../node_modules/virtual-dom/h.js":[function(require,module,exports) {
var h = require("./virtual-hyperscript/index.js")

module.exports = h

},{"./virtual-hyperscript/index.js":"../../node_modules/virtual-dom/virtual-hyperscript/index.js"}],"../../node_modules/virtual-dom/vnode/vpatch.js":[function(require,module,exports) {
var version = require("./version")

VirtualPatch.NONE = 0
VirtualPatch.VTEXT = 1
VirtualPatch.VNODE = 2
VirtualPatch.WIDGET = 3
VirtualPatch.PROPS = 4
VirtualPatch.ORDER = 5
VirtualPatch.INSERT = 6
VirtualPatch.REMOVE = 7
VirtualPatch.THUNK = 8

module.exports = VirtualPatch

function VirtualPatch(type, vNode, patch) {
    this.type = Number(type)
    this.vNode = vNode
    this.patch = patch
}

VirtualPatch.prototype.version = version
VirtualPatch.prototype.type = "VirtualPatch"

},{"./version":"../../node_modules/virtual-dom/vnode/version.js"}],"../../node_modules/virtual-dom/vtree/diff-props.js":[function(require,module,exports) {
var isObject = require("is-object")
var isHook = require("../vnode/is-vhook")

module.exports = diffProps

function diffProps(a, b) {
    var diff

    for (var aKey in a) {
        if (!(aKey in b)) {
            diff = diff || {}
            diff[aKey] = undefined
        }

        var aValue = a[aKey]
        var bValue = b[aKey]

        if (aValue === bValue) {
            continue
        } else if (isObject(aValue) && isObject(bValue)) {
            if (getPrototype(bValue) !== getPrototype(aValue)) {
                diff = diff || {}
                diff[aKey] = bValue
            } else if (isHook(bValue)) {
                 diff = diff || {}
                 diff[aKey] = bValue
            } else {
                var objectDiff = diffProps(aValue, bValue)
                if (objectDiff) {
                    diff = diff || {}
                    diff[aKey] = objectDiff
                }
            }
        } else {
            diff = diff || {}
            diff[aKey] = bValue
        }
    }

    for (var bKey in b) {
        if (!(bKey in a)) {
            diff = diff || {}
            diff[bKey] = b[bKey]
        }
    }

    return diff
}

function getPrototype(value) {
  if (Object.getPrototypeOf) {
    return Object.getPrototypeOf(value)
  } else if (value.__proto__) {
    return value.__proto__
  } else if (value.constructor) {
    return value.constructor.prototype
  }
}

},{"is-object":"../../node_modules/is-object/index.js","../vnode/is-vhook":"../../node_modules/virtual-dom/vnode/is-vhook.js"}],"../../node_modules/virtual-dom/vtree/diff.js":[function(require,module,exports) {
var isArray = require("x-is-array")

var VPatch = require("../vnode/vpatch")
var isVNode = require("../vnode/is-vnode")
var isVText = require("../vnode/is-vtext")
var isWidget = require("../vnode/is-widget")
var isThunk = require("../vnode/is-thunk")
var handleThunk = require("../vnode/handle-thunk")

var diffProps = require("./diff-props")

module.exports = diff

function diff(a, b) {
    var patch = { a: a }
    walk(a, b, patch, 0)
    return patch
}

function walk(a, b, patch, index) {
    if (a === b) {
        return
    }

    var apply = patch[index]
    var applyClear = false

    if (isThunk(a) || isThunk(b)) {
        thunks(a, b, patch, index)
    } else if (b == null) {

        // If a is a widget we will add a remove patch for it
        // Otherwise any child widgets/hooks must be destroyed.
        // This prevents adding two remove patches for a widget.
        if (!isWidget(a)) {
            clearState(a, patch, index)
            apply = patch[index]
        }

        apply = appendPatch(apply, new VPatch(VPatch.REMOVE, a, b))
    } else if (isVNode(b)) {
        if (isVNode(a)) {
            if (a.tagName === b.tagName &&
                a.namespace === b.namespace &&
                a.key === b.key) {
                var propsPatch = diffProps(a.properties, b.properties)
                if (propsPatch) {
                    apply = appendPatch(apply,
                        new VPatch(VPatch.PROPS, a, propsPatch))
                }
                apply = diffChildren(a, b, patch, apply, index)
            } else {
                apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
                applyClear = true
            }
        } else {
            apply = appendPatch(apply, new VPatch(VPatch.VNODE, a, b))
            applyClear = true
        }
    } else if (isVText(b)) {
        if (!isVText(a)) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
            applyClear = true
        } else if (a.text !== b.text) {
            apply = appendPatch(apply, new VPatch(VPatch.VTEXT, a, b))
        }
    } else if (isWidget(b)) {
        if (!isWidget(a)) {
            applyClear = true
        }

        apply = appendPatch(apply, new VPatch(VPatch.WIDGET, a, b))
    }

    if (apply) {
        patch[index] = apply
    }

    if (applyClear) {
        clearState(a, patch, index)
    }
}

function diffChildren(a, b, patch, apply, index) {
    var aChildren = a.children
    var orderedSet = reorder(aChildren, b.children)
    var bChildren = orderedSet.children

    var aLen = aChildren.length
    var bLen = bChildren.length
    var len = aLen > bLen ? aLen : bLen

    for (var i = 0; i < len; i++) {
        var leftNode = aChildren[i]
        var rightNode = bChildren[i]
        index += 1

        if (!leftNode) {
            if (rightNode) {
                // Excess nodes in b need to be added
                apply = appendPatch(apply,
                    new VPatch(VPatch.INSERT, null, rightNode))
            }
        } else {
            walk(leftNode, rightNode, patch, index)
        }

        if (isVNode(leftNode) && leftNode.count) {
            index += leftNode.count
        }
    }

    if (orderedSet.moves) {
        // Reorder nodes last
        apply = appendPatch(apply, new VPatch(
            VPatch.ORDER,
            a,
            orderedSet.moves
        ))
    }

    return apply
}

function clearState(vNode, patch, index) {
    // TODO: Make this a single walk, not two
    unhook(vNode, patch, index)
    destroyWidgets(vNode, patch, index)
}

// Patch records for all destroyed widgets must be added because we need
// a DOM node reference for the destroy function
function destroyWidgets(vNode, patch, index) {
    if (isWidget(vNode)) {
        if (typeof vNode.destroy === "function") {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(VPatch.REMOVE, vNode, null)
            )
        }
    } else if (isVNode(vNode) && (vNode.hasWidgets || vNode.hasThunks)) {
        var children = vNode.children
        var len = children.length
        for (var i = 0; i < len; i++) {
            var child = children[i]
            index += 1

            destroyWidgets(child, patch, index)

            if (isVNode(child) && child.count) {
                index += child.count
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

// Create a sub-patch for thunks
function thunks(a, b, patch, index) {
    var nodes = handleThunk(a, b)
    var thunkPatch = diff(nodes.a, nodes.b)
    if (hasPatches(thunkPatch)) {
        patch[index] = new VPatch(VPatch.THUNK, null, thunkPatch)
    }
}

function hasPatches(patch) {
    for (var index in patch) {
        if (index !== "a") {
            return true
        }
    }

    return false
}

// Execute hooks when two nodes are identical
function unhook(vNode, patch, index) {
    if (isVNode(vNode)) {
        if (vNode.hooks) {
            patch[index] = appendPatch(
                patch[index],
                new VPatch(
                    VPatch.PROPS,
                    vNode,
                    undefinedKeys(vNode.hooks)
                )
            )
        }

        if (vNode.descendantHooks || vNode.hasThunks) {
            var children = vNode.children
            var len = children.length
            for (var i = 0; i < len; i++) {
                var child = children[i]
                index += 1

                unhook(child, patch, index)

                if (isVNode(child) && child.count) {
                    index += child.count
                }
            }
        }
    } else if (isThunk(vNode)) {
        thunks(vNode, null, patch, index)
    }
}

function undefinedKeys(obj) {
    var result = {}

    for (var key in obj) {
        result[key] = undefined
    }

    return result
}

// List diff, naive left to right reordering
function reorder(aChildren, bChildren) {
    // O(M) time, O(M) memory
    var bChildIndex = keyIndex(bChildren)
    var bKeys = bChildIndex.keys
    var bFree = bChildIndex.free

    if (bFree.length === bChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(N) time, O(N) memory
    var aChildIndex = keyIndex(aChildren)
    var aKeys = aChildIndex.keys
    var aFree = aChildIndex.free

    if (aFree.length === aChildren.length) {
        return {
            children: bChildren,
            moves: null
        }
    }

    // O(MAX(N, M)) memory
    var newChildren = []

    var freeIndex = 0
    var freeCount = bFree.length
    var deletedItems = 0

    // Iterate through a and match a node in b
    // O(N) time,
    for (var i = 0 ; i < aChildren.length; i++) {
        var aItem = aChildren[i]
        var itemIndex

        if (aItem.key) {
            if (bKeys.hasOwnProperty(aItem.key)) {
                // Match up the old keys
                itemIndex = bKeys[aItem.key]
                newChildren.push(bChildren[itemIndex])

            } else {
                // Remove old keyed items
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        } else {
            // Match the item in a with the next free item in b
            if (freeIndex < freeCount) {
                itemIndex = bFree[freeIndex++]
                newChildren.push(bChildren[itemIndex])
            } else {
                // There are no free items in b to match with
                // the free items in a, so the extra free nodes
                // are deleted.
                itemIndex = i - deletedItems++
                newChildren.push(null)
            }
        }
    }

    var lastFreeIndex = freeIndex >= bFree.length ?
        bChildren.length :
        bFree[freeIndex]

    // Iterate through b and append any new keys
    // O(M) time
    for (var j = 0; j < bChildren.length; j++) {
        var newItem = bChildren[j]

        if (newItem.key) {
            if (!aKeys.hasOwnProperty(newItem.key)) {
                // Add any new keyed items
                // We are adding new items to the end and then sorting them
                // in place. In future we should insert new items in place.
                newChildren.push(newItem)
            }
        } else if (j >= lastFreeIndex) {
            // Add any leftover non-keyed items
            newChildren.push(newItem)
        }
    }

    var simulate = newChildren.slice()
    var simulateIndex = 0
    var removes = []
    var inserts = []
    var simulateItem

    for (var k = 0; k < bChildren.length;) {
        var wantedItem = bChildren[k]
        simulateItem = simulate[simulateIndex]

        // remove items
        while (simulateItem === null && simulate.length) {
            removes.push(remove(simulate, simulateIndex, null))
            simulateItem = simulate[simulateIndex]
        }

        if (!simulateItem || simulateItem.key !== wantedItem.key) {
            // if we need a key in this position...
            if (wantedItem.key) {
                if (simulateItem && simulateItem.key) {
                    // if an insert doesn't put this key in place, it needs to move
                    if (bKeys[simulateItem.key] !== k + 1) {
                        removes.push(remove(simulate, simulateIndex, simulateItem.key))
                        simulateItem = simulate[simulateIndex]
                        // if the remove didn't put the wanted item in place, we need to insert it
                        if (!simulateItem || simulateItem.key !== wantedItem.key) {
                            inserts.push({key: wantedItem.key, to: k})
                        }
                        // items are matching, so skip ahead
                        else {
                            simulateIndex++
                        }
                    }
                    else {
                        inserts.push({key: wantedItem.key, to: k})
                    }
                }
                else {
                    inserts.push({key: wantedItem.key, to: k})
                }
                k++
            }
            // a key in simulate has no matching wanted key, remove it
            else if (simulateItem && simulateItem.key) {
                removes.push(remove(simulate, simulateIndex, simulateItem.key))
            }
        }
        else {
            simulateIndex++
            k++
        }
    }

    // remove all the remaining nodes from simulate
    while(simulateIndex < simulate.length) {
        simulateItem = simulate[simulateIndex]
        removes.push(remove(simulate, simulateIndex, simulateItem && simulateItem.key))
    }

    // If the only moves we have are deletes then we can just
    // let the delete patch remove these items.
    if (removes.length === deletedItems && !inserts.length) {
        return {
            children: newChildren,
            moves: null
        }
    }

    return {
        children: newChildren,
        moves: {
            removes: removes,
            inserts: inserts
        }
    }
}

function remove(arr, index, key) {
    arr.splice(index, 1)

    return {
        from: index,
        key: key
    }
}

function keyIndex(children) {
    var keys = {}
    var free = []
    var length = children.length

    for (var i = 0; i < length; i++) {
        var child = children[i]

        if (child.key) {
            keys[child.key] = i
        } else {
            free.push(i)
        }
    }

    return {
        keys: keys,     // A hash of key name to index
        free: free      // An array of unkeyed item indices
    }
}

function appendPatch(apply, patch) {
    if (apply) {
        if (isArray(apply)) {
            apply.push(patch)
        } else {
            apply = [apply, patch]
        }

        return apply
    } else {
        return patch
    }
}

},{"x-is-array":"../../node_modules/x-is-array/index.js","../vnode/vpatch":"../../node_modules/virtual-dom/vnode/vpatch.js","../vnode/is-vnode":"../../node_modules/virtual-dom/vnode/is-vnode.js","../vnode/is-vtext":"../../node_modules/virtual-dom/vnode/is-vtext.js","../vnode/is-widget":"../../node_modules/virtual-dom/vnode/is-widget.js","../vnode/is-thunk":"../../node_modules/virtual-dom/vnode/is-thunk.js","../vnode/handle-thunk":"../../node_modules/virtual-dom/vnode/handle-thunk.js","./diff-props":"../../node_modules/virtual-dom/vtree/diff-props.js"}],"../../node_modules/virtual-dom/diff.js":[function(require,module,exports) {
var diff = require("./vtree/diff.js")

module.exports = diff

},{"./vtree/diff.js":"../../node_modules/virtual-dom/vtree/diff.js"}],"../../node_modules/virtual-dom/vdom/dom-index.js":[function(require,module,exports) {
// Maps a virtual DOM tree onto a real DOM tree in an efficient manner.
// We don't want to read all of the DOM nodes in the tree so we use
// the in-order tree indexing to eliminate recursion down certain branches.
// We only recurse into a DOM node if we know that it contains a child of
// interest.

var noChild = {}

module.exports = domIndex

function domIndex(rootNode, tree, indices, nodes) {
    if (!indices || indices.length === 0) {
        return {}
    } else {
        indices.sort(ascending)
        return recurse(rootNode, tree, indices, nodes, 0)
    }
}

function recurse(rootNode, tree, indices, nodes, rootIndex) {
    nodes = nodes || {}


    if (rootNode) {
        if (indexInRange(indices, rootIndex, rootIndex)) {
            nodes[rootIndex] = rootNode
        }

        var vChildren = tree.children

        if (vChildren) {

            var childNodes = rootNode.childNodes

            for (var i = 0; i < tree.children.length; i++) {
                rootIndex += 1

                var vChild = vChildren[i] || noChild
                var nextIndex = rootIndex + (vChild.count || 0)

                // skip recursion down the tree if there are no nodes down here
                if (indexInRange(indices, rootIndex, nextIndex)) {
                    recurse(childNodes[i], vChild, indices, nodes, rootIndex)
                }

                rootIndex = nextIndex
            }
        }
    }

    return nodes
}

// Binary search for an index in the interval [left, right]
function indexInRange(indices, left, right) {
    if (indices.length === 0) {
        return false
    }

    var minIndex = 0
    var maxIndex = indices.length - 1
    var currentIndex
    var currentItem

    while (minIndex <= maxIndex) {
        currentIndex = ((maxIndex + minIndex) / 2) >> 0
        currentItem = indices[currentIndex]

        if (minIndex === maxIndex) {
            return currentItem >= left && currentItem <= right
        } else if (currentItem < left) {
            minIndex = currentIndex + 1
        } else  if (currentItem > right) {
            maxIndex = currentIndex - 1
        } else {
            return true
        }
    }

    return false;
}

function ascending(a, b) {
    return a > b ? 1 : -1
}

},{}],"../../node_modules/virtual-dom/vdom/update-widget.js":[function(require,module,exports) {
var isWidget = require("../vnode/is-widget.js")

module.exports = updateWidget

function updateWidget(a, b) {
    if (isWidget(a) && isWidget(b)) {
        if ("name" in a && "name" in b) {
            return a.id === b.id
        } else {
            return a.init === b.init
        }
    }

    return false
}

},{"../vnode/is-widget.js":"../../node_modules/virtual-dom/vnode/is-widget.js"}],"../../node_modules/virtual-dom/vdom/patch-op.js":[function(require,module,exports) {
var applyProperties = require("./apply-properties")

var isWidget = require("../vnode/is-widget.js")
var VPatch = require("../vnode/vpatch.js")

var updateWidget = require("./update-widget")

module.exports = applyPatch

function applyPatch(vpatch, domNode, renderOptions) {
    var type = vpatch.type
    var vNode = vpatch.vNode
    var patch = vpatch.patch

    switch (type) {
        case VPatch.REMOVE:
            return removeNode(domNode, vNode)
        case VPatch.INSERT:
            return insertNode(domNode, patch, renderOptions)
        case VPatch.VTEXT:
            return stringPatch(domNode, vNode, patch, renderOptions)
        case VPatch.WIDGET:
            return widgetPatch(domNode, vNode, patch, renderOptions)
        case VPatch.VNODE:
            return vNodePatch(domNode, vNode, patch, renderOptions)
        case VPatch.ORDER:
            reorderChildren(domNode, patch)
            return domNode
        case VPatch.PROPS:
            applyProperties(domNode, patch, vNode.properties)
            return domNode
        case VPatch.THUNK:
            return replaceRoot(domNode,
                renderOptions.patch(domNode, patch, renderOptions))
        default:
            return domNode
    }
}

function removeNode(domNode, vNode) {
    var parentNode = domNode.parentNode

    if (parentNode) {
        parentNode.removeChild(domNode)
    }

    destroyWidget(domNode, vNode);

    return null
}

function insertNode(parentNode, vNode, renderOptions) {
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode) {
        parentNode.appendChild(newNode)
    }

    return parentNode
}

function stringPatch(domNode, leftVNode, vText, renderOptions) {
    var newNode

    if (domNode.nodeType === 3) {
        domNode.replaceData(0, domNode.length, vText.text)
        newNode = domNode
    } else {
        var parentNode = domNode.parentNode
        newNode = renderOptions.render(vText, renderOptions)

        if (parentNode && newNode !== domNode) {
            parentNode.replaceChild(newNode, domNode)
        }
    }

    return newNode
}

function widgetPatch(domNode, leftVNode, widget, renderOptions) {
    var updating = updateWidget(leftVNode, widget)
    var newNode

    if (updating) {
        newNode = widget.update(leftVNode, domNode) || domNode
    } else {
        newNode = renderOptions.render(widget, renderOptions)
    }

    var parentNode = domNode.parentNode

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    if (!updating) {
        destroyWidget(domNode, leftVNode)
    }

    return newNode
}

function vNodePatch(domNode, leftVNode, vNode, renderOptions) {
    var parentNode = domNode.parentNode
    var newNode = renderOptions.render(vNode, renderOptions)

    if (parentNode && newNode !== domNode) {
        parentNode.replaceChild(newNode, domNode)
    }

    return newNode
}

function destroyWidget(domNode, w) {
    if (typeof w.destroy === "function" && isWidget(w)) {
        w.destroy(domNode)
    }
}

function reorderChildren(domNode, moves) {
    var childNodes = domNode.childNodes
    var keyMap = {}
    var node
    var remove
    var insert

    for (var i = 0; i < moves.removes.length; i++) {
        remove = moves.removes[i]
        node = childNodes[remove.from]
        if (remove.key) {
            keyMap[remove.key] = node
        }
        domNode.removeChild(node)
    }

    var length = childNodes.length
    for (var j = 0; j < moves.inserts.length; j++) {
        insert = moves.inserts[j]
        node = keyMap[insert.key]
        // this is the weirdest bug i've ever seen in webkit
        domNode.insertBefore(node, insert.to >= length++ ? null : childNodes[insert.to])
    }
}

function replaceRoot(oldRoot, newRoot) {
    if (oldRoot && newRoot && oldRoot !== newRoot && oldRoot.parentNode) {
        oldRoot.parentNode.replaceChild(newRoot, oldRoot)
    }

    return newRoot;
}

},{"./apply-properties":"../../node_modules/virtual-dom/vdom/apply-properties.js","../vnode/is-widget.js":"../../node_modules/virtual-dom/vnode/is-widget.js","../vnode/vpatch.js":"../../node_modules/virtual-dom/vnode/vpatch.js","./update-widget":"../../node_modules/virtual-dom/vdom/update-widget.js"}],"../../node_modules/virtual-dom/vdom/patch.js":[function(require,module,exports) {
var document = require("global/document")
var isArray = require("x-is-array")

var render = require("./create-element")
var domIndex = require("./dom-index")
var patchOp = require("./patch-op")
module.exports = patch

function patch(rootNode, patches, renderOptions) {
    renderOptions = renderOptions || {}
    renderOptions.patch = renderOptions.patch && renderOptions.patch !== patch
        ? renderOptions.patch
        : patchRecursive
    renderOptions.render = renderOptions.render || render

    return renderOptions.patch(rootNode, patches, renderOptions)
}

function patchRecursive(rootNode, patches, renderOptions) {
    var indices = patchIndices(patches)

    if (indices.length === 0) {
        return rootNode
    }

    var index = domIndex(rootNode, patches.a, indices)
    var ownerDocument = rootNode.ownerDocument

    if (!renderOptions.document && ownerDocument !== document) {
        renderOptions.document = ownerDocument
    }

    for (var i = 0; i < indices.length; i++) {
        var nodeIndex = indices[i]
        rootNode = applyPatch(rootNode,
            index[nodeIndex],
            patches[nodeIndex],
            renderOptions)
    }

    return rootNode
}

function applyPatch(rootNode, domNode, patchList, renderOptions) {
    if (!domNode) {
        return rootNode
    }

    var newNode

    if (isArray(patchList)) {
        for (var i = 0; i < patchList.length; i++) {
            newNode = patchOp(patchList[i], domNode, renderOptions)

            if (domNode === rootNode) {
                rootNode = newNode
            }
        }
    } else {
        newNode = patchOp(patchList, domNode, renderOptions)

        if (domNode === rootNode) {
            rootNode = newNode
        }
    }

    return rootNode
}

function patchIndices(patches) {
    var indices = []

    for (var key in patches) {
        if (key !== "a") {
            indices.push(Number(key))
        }
    }

    return indices
}

},{"global/document":"../../node_modules/global/document.js","x-is-array":"../../node_modules/x-is-array/index.js","./create-element":"../../node_modules/virtual-dom/vdom/create-element.js","./dom-index":"../../node_modules/virtual-dom/vdom/dom-index.js","./patch-op":"../../node_modules/virtual-dom/vdom/patch-op.js"}],"../../node_modules/virtual-dom/patch.js":[function(require,module,exports) {
var patch = require("./vdom/patch.js")

module.exports = patch

},{"./vdom/patch.js":"../../node_modules/virtual-dom/vdom/patch.js"}],"../../node_modules/inline-worker/index.js":[function(require,module,exports) {
var global = arguments[3];
var WORKER_ENABLED = !!(global === global.window && global.URL && global.Blob && global.Worker);

function InlineWorker(func, self) {
  var _this = this;
  var functionBody;

  self = self || {};

  if (WORKER_ENABLED) {
    functionBody = func.toString().trim().match(
      /^function\s*\w*\s*\([\w\s,]*\)\s*{([\w\W]*?)}$/
    )[1];

    return new global.Worker(global.URL.createObjectURL(
      new global.Blob([ functionBody ], { type: "text/javascript" })
    ));
  }

  function postMessage(data) {
    setTimeout(function() {
      _this.onmessage({ data: data });
    }, 0);
  }

  this.self = self;
  this.self.postMessage = postMessage;

  setTimeout(func.bind(self, self), 0);
}

InlineWorker.prototype.postMessage = function postMessage(data) {
  var _this = this;

  setTimeout(function() {
    _this.self.onmessage({ data: data });
  }, 0);
};

module.exports = InlineWorker;

},{}],"../../node_modules/waveform-playlist/lib/utils/conversions.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.samplesToSeconds = samplesToSeconds;
exports.secondsToSamples = secondsToSamples;
exports.samplesToPixels = samplesToPixels;
exports.pixelsToSamples = pixelsToSamples;
exports.pixelsToSeconds = pixelsToSeconds;
exports.secondsToPixels = secondsToPixels;
function samplesToSeconds(samples, sampleRate) {
  return samples / sampleRate;
}

function secondsToSamples(seconds, sampleRate) {
  return Math.ceil(seconds * sampleRate);
}

function samplesToPixels(samples, resolution) {
  return Math.floor(samples / resolution);
}

function pixelsToSamples(pixels, resolution) {
  return Math.floor(pixels * resolution);
}

function pixelsToSeconds(pixels, resolution, sampleRate) {
  return pixels * resolution / sampleRate;
}

function secondsToPixels(seconds, resolution, sampleRate) {
  return Math.ceil(seconds * sampleRate / resolution);
}
},{}],"../../node_modules/waveform-playlist/lib/track/loader/Loader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.STATE_FINISHED = exports.STATE_DECODING = exports.STATE_LOADING = exports.STATE_UNINITIALIZED = undefined;

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var STATE_UNINITIALIZED = exports.STATE_UNINITIALIZED = 0;
var STATE_LOADING = exports.STATE_LOADING = 1;
var STATE_DECODING = exports.STATE_DECODING = 2;
var STATE_FINISHED = exports.STATE_FINISHED = 3;

var _class = function () {
  function _class(src, audioContext) {
    var ee = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : (0, _eventEmitter2.default)();

    _classCallCheck(this, _class);

    this.src = src;
    this.ac = audioContext;
    this.audioRequestState = STATE_UNINITIALIZED;
    this.ee = ee;
  }

  _createClass(_class, [{
    key: 'setStateChange',
    value: function setStateChange(state) {
      this.audioRequestState = state;
      this.ee.emit('audiorequeststatechange', this.audioRequestState, this.src);
    }
  }, {
    key: 'fileProgress',
    value: function fileProgress(e) {
      var percentComplete = 0;

      if (this.audioRequestState === STATE_UNINITIALIZED) {
        this.setStateChange(STATE_LOADING);
      }

      if (e.lengthComputable) {
        percentComplete = e.loaded / e.total * 100;
      }

      this.ee.emit('loadprogress', percentComplete, this.src);
    }
  }, {
    key: 'fileLoad',
    value: function fileLoad(e) {
      var _this = this;

      var audioData = e.target.response || e.target.result;

      this.setStateChange(STATE_DECODING);

      return new Promise(function (resolve, reject) {
        _this.ac.decodeAudioData(audioData, function (audioBuffer) {
          _this.audioBuffer = audioBuffer;
          _this.setStateChange(STATE_FINISHED);

          resolve(audioBuffer);
        }, function (err) {
          if (err === null) {
            // Safari issues with null error
            reject(Error('MediaDecodeAudioDataUnknownContentType'));
          } else {
            reject(err);
          }
        });
      });
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"event-emitter":"../../node_modules/event-emitter/index.js"}],"../../node_modules/waveform-playlist/lib/track/loader/BlobLoader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Loader2 = require('./Loader');

var _Loader3 = _interopRequireDefault(_Loader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Loader) {
  _inherits(_class, _Loader);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'load',


    /*
    * Loads an audio file via a FileReader
    */
    value: function load() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        if (_this2.src.type.match(/audio.*/) ||
        // added for problems with Firefox mime types + ogg.
        _this2.src.type.match(/video\/ogg/)) {
          var fr = new FileReader();

          fr.readAsArrayBuffer(_this2.src);

          fr.addEventListener('progress', function (e) {
            _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'fileProgress', _this2).call(_this2, e);
          });

          fr.addEventListener('load', function (e) {
            var decoderPromise = _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'fileLoad', _this2).call(_this2, e);

            decoderPromise.then(function (audioBuffer) {
              resolve(audioBuffer);
            }).catch(reject);
          });

          fr.addEventListener('error', reject);
        } else {
          reject(Error('Unsupported file type ' + _this2.src.type));
        }
      });
    }
  }]);

  return _class;
}(_Loader3.default);

exports.default = _class;
},{"./Loader":"../../node_modules/waveform-playlist/lib/track/loader/Loader.js"}],"../../node_modules/waveform-playlist/lib/track/loader/XHRLoader.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _get = function get(object, property, receiver) { if (object === null) object = Function.prototype; var desc = Object.getOwnPropertyDescriptor(object, property); if (desc === undefined) { var parent = Object.getPrototypeOf(object); if (parent === null) { return undefined; } else { return get(parent, property, receiver); } } else if ("value" in desc) { return desc.value; } else { var getter = desc.get; if (getter === undefined) { return undefined; } return getter.call(receiver); } };

var _Loader2 = require('./Loader');

var _Loader3 = _interopRequireDefault(_Loader2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

var _class = function (_Loader) {
  _inherits(_class, _Loader);

  function _class() {
    _classCallCheck(this, _class);

    return _possibleConstructorReturn(this, (_class.__proto__ || Object.getPrototypeOf(_class)).apply(this, arguments));
  }

  _createClass(_class, [{
    key: 'load',


    /**
     * Loads an audio file via XHR.
     */
    value: function load() {
      var _this2 = this;

      return new Promise(function (resolve, reject) {
        var xhr = new XMLHttpRequest();

        xhr.open('GET', _this2.src, true);
        xhr.responseType = 'arraybuffer';
        xhr.send();

        xhr.addEventListener('progress', function (e) {
          _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'fileProgress', _this2).call(_this2, e);
        });

        xhr.addEventListener('load', function (e) {
          var decoderPromise = _get(_class.prototype.__proto__ || Object.getPrototypeOf(_class.prototype), 'fileLoad', _this2).call(_this2, e);

          decoderPromise.then(function (audioBuffer) {
            resolve(audioBuffer);
          }).catch(reject);
        });

        xhr.addEventListener('error', function () {
          reject(Error('Track ' + _this2.src + ' failed to load'));
        });
      });
    }
  }]);

  return _class;
}(_Loader3.default);

exports.default = _class;
},{"./Loader":"../../node_modules/waveform-playlist/lib/track/loader/Loader.js"}],"../../node_modules/waveform-playlist/lib/track/loader/LoaderFactory.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _BlobLoader = require('./BlobLoader');

var _BlobLoader2 = _interopRequireDefault(_BlobLoader);

var _XHRLoader = require('./XHRLoader');

var _XHRLoader2 = _interopRequireDefault(_XHRLoader);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);
  }

  _createClass(_class, null, [{
    key: 'createLoader',
    value: function createLoader(src, audioContext, ee) {
      if (src instanceof Blob) {
        return new _BlobLoader2.default(src, audioContext, ee);
      } else if (typeof src === 'string') {
        return new _XHRLoader2.default(src, audioContext, ee);
      }

      throw new Error('Unsupported src type');
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"./BlobLoader":"../../node_modules/waveform-playlist/lib/track/loader/BlobLoader.js","./XHRLoader":"../../node_modules/waveform-playlist/lib/track/loader/XHRLoader.js"}],"../../node_modules/waveform-playlist/lib/render/ScrollHook.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversions = require('../utils/conversions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
 * virtual-dom hook for scrolling the track container.
 */
var _class = function () {
  function _class(playlist) {
    _classCallCheck(this, _class);

    this.playlist = playlist;
  }

  _createClass(_class, [{
    key: 'hook',
    value: function hook(node) {
      var playlist = this.playlist;
      if (!playlist.isScrolling) {
        var el = node;

        if (playlist.isAutomaticScroll && node.querySelector('.cursor')) {
          var rect = node.getBoundingClientRect();
          var cursorRect = node.querySelector('.cursor').getBoundingClientRect();

          if (cursorRect.right > rect.right || cursorRect.right < 0) {
            var controlWidth = playlist.controls.show ? playlist.controls.width : 0;
            var width = (0, _conversions.pixelsToSeconds)(rect.right - rect.left, playlist.samplesPerPixel, playlist.sampleRate);
            playlist.scrollLeft = Math.min(playlist.playbackSeconds, playlist.duration - (width - controlWidth));
          }
        }

        var left = (0, _conversions.secondsToPixels)(playlist.scrollLeft, playlist.samplesPerPixel, playlist.sampleRate);

        el.scrollLeft = left;
      }
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"../utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js"}],"../../node_modules/waveform-playlist/lib/render/TimeScaleHook.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* virtual-dom hook for rendering the time scale canvas.
*/
var _class = function () {
  function _class(tickInfo, offset, samplesPerPixel, duration, colors) {
    _classCallCheck(this, _class);

    this.tickInfo = tickInfo;
    this.offset = offset;
    this.samplesPerPixel = samplesPerPixel;
    this.duration = duration;
    this.colors = colors;
  }

  _createClass(_class, [{
    key: 'hook',
    value: function hook(canvas, prop, prev) {
      var _this = this;

      // canvas is up to date
      if (prev !== undefined && prev.offset === this.offset && prev.duration === this.duration && prev.samplesPerPixel === this.samplesPerPixel) {
        return;
      }

      var width = canvas.width;
      var height = canvas.height;
      var ctx = canvas.getContext('2d');

      ctx.clearRect(0, 0, width, height);
      ctx.fillStyle = this.colors.timeColor;

      Object.keys(this.tickInfo).forEach(function (x) {
        var scaleHeight = _this.tickInfo[x];
        var scaleY = height - scaleHeight;
        ctx.fillRect(x, scaleY, 1, scaleHeight);
      });
    }
  }]);

  return _class;
}();

exports.default = _class;
},{}],"../../node_modules/waveform-playlist/lib/TimeScale.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _h = require('virtual-dom/h');

var _h2 = _interopRequireDefault(_h);

var _conversions = require('./utils/conversions');

var _TimeScaleHook = require('./render/TimeScaleHook');

var _TimeScaleHook2 = _interopRequireDefault(_TimeScaleHook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var TimeScale = function () {
  function TimeScale(duration, offset, samplesPerPixel, sampleRate) {
    var marginLeft = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : 0;
    var colors = arguments[5];

    _classCallCheck(this, TimeScale);

    this.duration = duration;
    this.offset = offset;
    this.samplesPerPixel = samplesPerPixel;
    this.sampleRate = sampleRate;
    this.marginLeft = marginLeft;
    this.colors = colors;

    this.timeinfo = {
      20000: {
        marker: 30000,
        bigStep: 10000,
        smallStep: 5000,
        secondStep: 5
      },
      12000: {
        marker: 15000,
        bigStep: 5000,
        smallStep: 1000,
        secondStep: 1
      },
      10000: {
        marker: 10000,
        bigStep: 5000,
        smallStep: 1000,
        secondStep: 1
      },
      5000: {
        marker: 5000,
        bigStep: 1000,
        smallStep: 500,
        secondStep: 1 / 2
      },
      2500: {
        marker: 2000,
        bigStep: 1000,
        smallStep: 500,
        secondStep: 1 / 2
      },
      1500: {
        marker: 2000,
        bigStep: 1000,
        smallStep: 200,
        secondStep: 1 / 5
      },
      700: {
        marker: 1000,
        bigStep: 500,
        smallStep: 100,
        secondStep: 1 / 10
      }
    };
  }

  _createClass(TimeScale, [{
    key: 'getScaleInfo',
    value: function getScaleInfo(resolution) {
      var keys = Object.keys(this.timeinfo).map(function (item) {
        return parseInt(item, 10);
      });

      // make sure keys are numerically sorted.
      keys = keys.sort(function (a, b) {
        return a - b;
      });

      for (var i = 0; i < keys.length; i += 1) {
        if (resolution <= keys[i]) {
          return this.timeinfo[keys[i]];
        }
      }

      return this.timeinfo[keys[0]];
    }

    /*
      Return time in format mm:ss
    */

  }, {
    key: 'render',
    value: function render() {
      var widthX = (0, _conversions.secondsToPixels)(this.duration, this.samplesPerPixel, this.sampleRate);
      var pixPerSec = this.sampleRate / this.samplesPerPixel;
      var pixOffset = (0, _conversions.secondsToPixels)(this.offset, this.samplesPerPixel, this.sampleRate);
      var scaleInfo = this.getScaleInfo(this.samplesPerPixel);
      var canvasInfo = {};
      var timeMarkers = [];
      var end = widthX + pixOffset;
      var counter = 0;

      for (var i = 0; i < end; i += pixPerSec * scaleInfo.secondStep) {
        var pixIndex = Math.floor(i);
        var pix = pixIndex - pixOffset;

        if (pixIndex >= pixOffset) {
          // put a timestamp every 30 seconds.
          if (scaleInfo.marker && counter % scaleInfo.marker === 0) {
            timeMarkers.push((0, _h2.default)('div.time', {
              attributes: {
                style: 'position: absolute; left: ' + pix + 'px;'
              }
            }, [TimeScale.formatTime(counter)]));

            canvasInfo[pix] = 10;
          } else if (scaleInfo.bigStep && counter % scaleInfo.bigStep === 0) {
            canvasInfo[pix] = 5;
          } else if (scaleInfo.smallStep && counter % scaleInfo.smallStep === 0) {
            canvasInfo[pix] = 2;
          }
        }

        counter += 1000 * scaleInfo.secondStep;
      }

      return (0, _h2.default)('div.playlist-time-scale', {
        attributes: {
          style: 'position: relative; left: 0; right: 0; margin-left: ' + this.marginLeft + 'px;'
        }
      }, [timeMarkers, (0, _h2.default)('canvas', {
        attributes: {
          width: widthX,
          height: 30,
          style: 'position: absolute; left: 0; right: 0; top: 0; bottom: 0;'
        },
        hook: new _TimeScaleHook2.default(canvasInfo, this.offset, this.samplesPerPixel, this.duration, this.colors)
      })]);
    }
  }], [{
    key: 'formatTime',
    value: function formatTime(milliseconds) {
      var seconds = milliseconds / 1000;
      var s = seconds % 60;
      var m = (seconds - s) / 60;

      if (s < 10) {
        s = '0' + s;
      }

      return m + ':' + s;
    }
  }]);

  return TimeScale;
}();

exports.default = TimeScale;
},{"virtual-dom/h":"../../node_modules/virtual-dom/h.js","./utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js","./render/TimeScaleHook":"../../node_modules/waveform-playlist/lib/render/TimeScaleHook.js"}],"../../node_modules/lodash.forown/index.js":[function(require,module,exports) {
/**
 * lodash (Custom Build) <https://lodash.com/>
 * Build: `lodash modularize exports="npm" -o ./`
 * Copyright jQuery Foundation and other contributors <https://jquery.org/>
 * Released under MIT license <https://lodash.com/license>
 * Based on Underscore.js 1.8.3 <http://underscorejs.org/LICENSE>
 * Copyright Jeremy Ashkenas, DocumentCloud and Investigative Reporters & Editors
 */

/** Used as references for various `Number` constants. */
var MAX_SAFE_INTEGER = 9007199254740991;

/** `Object#toString` result references. */
var argsTag = '[object Arguments]',
    funcTag = '[object Function]',
    genTag = '[object GeneratorFunction]';

/** Used to detect unsigned integer values. */
var reIsUint = /^(?:0|[1-9]\d*)$/;

/**
 * The base implementation of `_.times` without support for iteratee shorthands
 * or max array length checks.
 *
 * @private
 * @param {number} n The number of times to invoke `iteratee`.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Array} Returns the array of results.
 */
function baseTimes(n, iteratee) {
  var index = -1,
      result = Array(n);

  while (++index < n) {
    result[index] = iteratee(index);
  }
  return result;
}

/**
 * Creates a unary function that invokes `func` with its argument transformed.
 *
 * @private
 * @param {Function} func The function to wrap.
 * @param {Function} transform The argument transform.
 * @returns {Function} Returns the new function.
 */
function overArg(func, transform) {
  return function(arg) {
    return func(transform(arg));
  };
}

/** Used for built-in method references. */
var objectProto = Object.prototype;

/** Used to check objects for own properties. */
var hasOwnProperty = objectProto.hasOwnProperty;

/**
 * Used to resolve the
 * [`toStringTag`](http://ecma-international.org/ecma-262/7.0/#sec-object.prototype.tostring)
 * of values.
 */
var objectToString = objectProto.toString;

/** Built-in value references. */
var propertyIsEnumerable = objectProto.propertyIsEnumerable;

/* Built-in method references for those with the same name as other `lodash` methods. */
var nativeKeys = overArg(Object.keys, Object);

/**
 * Creates an array of the enumerable property names of the array-like `value`.
 *
 * @private
 * @param {*} value The value to query.
 * @param {boolean} inherited Specify returning inherited property names.
 * @returns {Array} Returns the array of property names.
 */
function arrayLikeKeys(value, inherited) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  // Safari 9 makes `arguments.length` enumerable in strict mode.
  var result = (isArray(value) || isArguments(value))
    ? baseTimes(value.length, String)
    : [];

  var length = result.length,
      skipIndexes = !!length;

  for (var key in value) {
    if ((inherited || hasOwnProperty.call(value, key)) &&
        !(skipIndexes && (key == 'length' || isIndex(key, length)))) {
      result.push(key);
    }
  }
  return result;
}

/**
 * The base implementation of `baseForOwn` which iterates over `object`
 * properties returned by `keysFunc` and invokes `iteratee` for each property.
 * Iteratee functions may exit iteration early by explicitly returning `false`.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @param {Function} keysFunc The function to get the keys of `object`.
 * @returns {Object} Returns `object`.
 */
var baseFor = createBaseFor();

/**
 * The base implementation of `_.forOwn` without support for iteratee shorthands.
 *
 * @private
 * @param {Object} object The object to iterate over.
 * @param {Function} iteratee The function invoked per iteration.
 * @returns {Object} Returns `object`.
 */
function baseForOwn(object, iteratee) {
  return object && baseFor(object, iteratee, keys);
}

/**
 * The base implementation of `_.keys` which doesn't treat sparse arrays as dense.
 *
 * @private
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 */
function baseKeys(object) {
  if (!isPrototype(object)) {
    return nativeKeys(object);
  }
  var result = [];
  for (var key in Object(object)) {
    if (hasOwnProperty.call(object, key) && key != 'constructor') {
      result.push(key);
    }
  }
  return result;
}

/**
 * Creates a base function for methods like `_.forIn` and `_.forOwn`.
 *
 * @private
 * @param {boolean} [fromRight] Specify iterating from right to left.
 * @returns {Function} Returns the new base function.
 */
function createBaseFor(fromRight) {
  return function(object, iteratee, keysFunc) {
    var index = -1,
        iterable = Object(object),
        props = keysFunc(object),
        length = props.length;

    while (length--) {
      var key = props[fromRight ? length : ++index];
      if (iteratee(iterable[key], key, iterable) === false) {
        break;
      }
    }
    return object;
  };
}

/**
 * Checks if `value` is a valid array-like index.
 *
 * @private
 * @param {*} value The value to check.
 * @param {number} [length=MAX_SAFE_INTEGER] The upper bounds of a valid index.
 * @returns {boolean} Returns `true` if `value` is a valid index, else `false`.
 */
function isIndex(value, length) {
  length = length == null ? MAX_SAFE_INTEGER : length;
  return !!length &&
    (typeof value == 'number' || reIsUint.test(value)) &&
    (value > -1 && value % 1 == 0 && value < length);
}

/**
 * Checks if `value` is likely a prototype object.
 *
 * @private
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a prototype, else `false`.
 */
function isPrototype(value) {
  var Ctor = value && value.constructor,
      proto = (typeof Ctor == 'function' && Ctor.prototype) || objectProto;

  return value === proto;
}

/**
 * Checks if `value` is likely an `arguments` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an `arguments` object,
 *  else `false`.
 * @example
 *
 * _.isArguments(function() { return arguments; }());
 * // => true
 *
 * _.isArguments([1, 2, 3]);
 * // => false
 */
function isArguments(value) {
  // Safari 8.1 makes `arguments.callee` enumerable in strict mode.
  return isArrayLikeObject(value) && hasOwnProperty.call(value, 'callee') &&
    (!propertyIsEnumerable.call(value, 'callee') || objectToString.call(value) == argsTag);
}

/**
 * Checks if `value` is classified as an `Array` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array, else `false`.
 * @example
 *
 * _.isArray([1, 2, 3]);
 * // => true
 *
 * _.isArray(document.body.children);
 * // => false
 *
 * _.isArray('abc');
 * // => false
 *
 * _.isArray(_.noop);
 * // => false
 */
var isArray = Array.isArray;

/**
 * Checks if `value` is array-like. A value is considered array-like if it's
 * not a function and has a `value.length` that's an integer greater than or
 * equal to `0` and less than or equal to `Number.MAX_SAFE_INTEGER`.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is array-like, else `false`.
 * @example
 *
 * _.isArrayLike([1, 2, 3]);
 * // => true
 *
 * _.isArrayLike(document.body.children);
 * // => true
 *
 * _.isArrayLike('abc');
 * // => true
 *
 * _.isArrayLike(_.noop);
 * // => false
 */
function isArrayLike(value) {
  return value != null && isLength(value.length) && !isFunction(value);
}

/**
 * This method is like `_.isArrayLike` except that it also checks if `value`
 * is an object.
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an array-like object,
 *  else `false`.
 * @example
 *
 * _.isArrayLikeObject([1, 2, 3]);
 * // => true
 *
 * _.isArrayLikeObject(document.body.children);
 * // => true
 *
 * _.isArrayLikeObject('abc');
 * // => false
 *
 * _.isArrayLikeObject(_.noop);
 * // => false
 */
function isArrayLikeObject(value) {
  return isObjectLike(value) && isArrayLike(value);
}

/**
 * Checks if `value` is classified as a `Function` object.
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a function, else `false`.
 * @example
 *
 * _.isFunction(_);
 * // => true
 *
 * _.isFunction(/abc/);
 * // => false
 */
function isFunction(value) {
  // The use of `Object#toString` avoids issues with the `typeof` operator
  // in Safari 8-9 which returns 'object' for typed array and other constructors.
  var tag = isObject(value) ? objectToString.call(value) : '';
  return tag == funcTag || tag == genTag;
}

/**
 * Checks if `value` is a valid array-like length.
 *
 * **Note:** This method is loosely based on
 * [`ToLength`](http://ecma-international.org/ecma-262/7.0/#sec-tolength).
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is a valid length, else `false`.
 * @example
 *
 * _.isLength(3);
 * // => true
 *
 * _.isLength(Number.MIN_VALUE);
 * // => false
 *
 * _.isLength(Infinity);
 * // => false
 *
 * _.isLength('3');
 * // => false
 */
function isLength(value) {
  return typeof value == 'number' &&
    value > -1 && value % 1 == 0 && value <= MAX_SAFE_INTEGER;
}

/**
 * Checks if `value` is the
 * [language type](http://www.ecma-international.org/ecma-262/7.0/#sec-ecmascript-language-types)
 * of `Object`. (e.g. arrays, functions, objects, regexes, `new Number(0)`, and `new String('')`)
 *
 * @static
 * @memberOf _
 * @since 0.1.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is an object, else `false`.
 * @example
 *
 * _.isObject({});
 * // => true
 *
 * _.isObject([1, 2, 3]);
 * // => true
 *
 * _.isObject(_.noop);
 * // => true
 *
 * _.isObject(null);
 * // => false
 */
function isObject(value) {
  var type = typeof value;
  return !!value && (type == 'object' || type == 'function');
}

/**
 * Checks if `value` is object-like. A value is object-like if it's not `null`
 * and has a `typeof` result of "object".
 *
 * @static
 * @memberOf _
 * @since 4.0.0
 * @category Lang
 * @param {*} value The value to check.
 * @returns {boolean} Returns `true` if `value` is object-like, else `false`.
 * @example
 *
 * _.isObjectLike({});
 * // => true
 *
 * _.isObjectLike([1, 2, 3]);
 * // => true
 *
 * _.isObjectLike(_.noop);
 * // => false
 *
 * _.isObjectLike(null);
 * // => false
 */
function isObjectLike(value) {
  return !!value && typeof value == 'object';
}

/**
 * Iterates over own enumerable string keyed properties of an object and
 * invokes `iteratee` for each property. The iteratee is invoked with three
 * arguments: (value, key, object). Iteratee functions may exit iteration
 * early by explicitly returning `false`.
 *
 * @static
 * @memberOf _
 * @since 0.3.0
 * @category Object
 * @param {Object} object The object to iterate over.
 * @param {Function} [iteratee=_.identity] The function invoked per iteration.
 * @returns {Object} Returns `object`.
 * @see _.forOwnRight
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.forOwn(new Foo, function(value, key) {
 *   console.log(key);
 * });
 * // => Logs 'a' then 'b' (iteration order is not guaranteed).
 */
function forOwn(object, iteratee) {
  return object && baseForOwn(object, typeof iteratee == 'function' ? iteratee : identity);
}

/**
 * Creates an array of the own enumerable property names of `object`.
 *
 * **Note:** Non-object values are coerced to objects. See the
 * [ES spec](http://ecma-international.org/ecma-262/7.0/#sec-object.keys)
 * for more details.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Object
 * @param {Object} object The object to query.
 * @returns {Array} Returns the array of property names.
 * @example
 *
 * function Foo() {
 *   this.a = 1;
 *   this.b = 2;
 * }
 *
 * Foo.prototype.c = 3;
 *
 * _.keys(new Foo);
 * // => ['a', 'b'] (iteration order is not guaranteed)
 *
 * _.keys('hi');
 * // => ['0', '1']
 */
function keys(object) {
  return isArrayLike(object) ? arrayLikeKeys(object) : baseKeys(object);
}

/**
 * This method returns the first argument it receives.
 *
 * @static
 * @since 0.1.0
 * @memberOf _
 * @category Util
 * @param {*} value Any value.
 * @returns {*} Returns `value`.
 * @example
 *
 * var object = { 'a': 1 };
 *
 * console.log(_.identity(object) === object);
 * // => true
 */
function identity(value) {
  return value;
}

module.exports = forOwn;

},{}],"../../node_modules/waveform-playlist/node_modules/uuid/rng-browser.js":[function(require,module,exports) {
var global = arguments[3];

var rng;

var crypto = global.crypto || global.msCrypto; // for IE 11
if (crypto && crypto.getRandomValues) {
  // WHATWG crypto-based RNG - http://wiki.whatwg.org/wiki/Crypto
  // Moderately fast, high quality
  var _rnds8 = new Uint8Array(16);
  rng = function whatwgRNG() {
    crypto.getRandomValues(_rnds8);
    return _rnds8;
  };
}

if (!rng) {
  // Math.random()-based (RNG)
  //
  // If all else fails, use Math.random().  It's fast, but is of unspecified
  // quality.
  var  _rnds = new Array(16);
  rng = function() {
    for (var i = 0, r; i < 16; i++) {
      if ((i & 0x03) === 0) r = Math.random() * 0x100000000;
      _rnds[i] = r >>> ((i & 0x03) << 3) & 0xff;
    }

    return _rnds;
  };
}

module.exports = rng;


},{}],"../../node_modules/waveform-playlist/node_modules/uuid/uuid.js":[function(require,module,exports) {
//     uuid.js
//
//     Copyright (c) 2010-2012 Robert Kieffer
//     MIT License - http://opensource.org/licenses/mit-license.php

// Unique ID creation requires a high quality random # generator.  We feature
// detect to determine the best RNG source, normalizing to a function that
// returns 128-bits of randomness, since that's what's usually required
var _rng = require('./rng');

// Maps for number <-> hex string conversion
var _byteToHex = [];
var _hexToByte = {};
for (var i = 0; i < 256; i++) {
  _byteToHex[i] = (i + 0x100).toString(16).substr(1);
  _hexToByte[_byteToHex[i]] = i;
}

// **`parse()` - Parse a UUID into it's component bytes**
function parse(s, buf, offset) {
  var i = (buf && offset) || 0, ii = 0;

  buf = buf || [];
  s.toLowerCase().replace(/[0-9a-f]{2}/g, function(oct) {
    if (ii < 16) { // Don't overflow!
      buf[i + ii++] = _hexToByte[oct];
    }
  });

  // Zero out remaining bytes if string was short
  while (ii < 16) {
    buf[i + ii++] = 0;
  }

  return buf;
}

// **`unparse()` - Convert UUID byte array (ala parse()) into a string**
function unparse(buf, offset) {
  var i = offset || 0, bth = _byteToHex;
  return  bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] + '-' +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]] +
          bth[buf[i++]] + bth[buf[i++]];
}

// **`v1()` - Generate time-based UUID**
//
// Inspired by https://github.com/LiosK/UUID.js
// and http://docs.python.org/library/uuid.html

// random #'s we need to init node and clockseq
var _seedBytes = _rng();

// Per 4.5, create and 48-bit node id, (47 random bits + multicast bit = 1)
var _nodeId = [
  _seedBytes[0] | 0x01,
  _seedBytes[1], _seedBytes[2], _seedBytes[3], _seedBytes[4], _seedBytes[5]
];

// Per 4.2.2, randomize (14 bit) clockseq
var _clockseq = (_seedBytes[6] << 8 | _seedBytes[7]) & 0x3fff;

// Previous uuid creation time
var _lastMSecs = 0, _lastNSecs = 0;

// See https://github.com/broofa/node-uuid for API details
function v1(options, buf, offset) {
  var i = buf && offset || 0;
  var b = buf || [];

  options = options || {};

  var clockseq = options.clockseq !== undefined ? options.clockseq : _clockseq;

  // UUID timestamps are 100 nano-second units since the Gregorian epoch,
  // (1582-10-15 00:00).  JSNumbers aren't precise enough for this, so
  // time is handled internally as 'msecs' (integer milliseconds) and 'nsecs'
  // (100-nanoseconds offset from msecs) since unix epoch, 1970-01-01 00:00.
  var msecs = options.msecs !== undefined ? options.msecs : new Date().getTime();

  // Per 4.2.1.2, use count of uuid's generated during the current clock
  // cycle to simulate higher resolution clock
  var nsecs = options.nsecs !== undefined ? options.nsecs : _lastNSecs + 1;

  // Time since last uuid creation (in msecs)
  var dt = (msecs - _lastMSecs) + (nsecs - _lastNSecs)/10000;

  // Per 4.2.1.2, Bump clockseq on clock regression
  if (dt < 0 && options.clockseq === undefined) {
    clockseq = clockseq + 1 & 0x3fff;
  }

  // Reset nsecs if clock regresses (new clockseq) or we've moved onto a new
  // time interval
  if ((dt < 0 || msecs > _lastMSecs) && options.nsecs === undefined) {
    nsecs = 0;
  }

  // Per 4.2.1.2 Throw error if too many uuids are requested
  if (nsecs >= 10000) {
    throw new Error('uuid.v1(): Can\'t create more than 10M uuids/sec');
  }

  _lastMSecs = msecs;
  _lastNSecs = nsecs;
  _clockseq = clockseq;

  // Per 4.1.4 - Convert from unix epoch to Gregorian epoch
  msecs += 12219292800000;

  // `time_low`
  var tl = ((msecs & 0xfffffff) * 10000 + nsecs) % 0x100000000;
  b[i++] = tl >>> 24 & 0xff;
  b[i++] = tl >>> 16 & 0xff;
  b[i++] = tl >>> 8 & 0xff;
  b[i++] = tl & 0xff;

  // `time_mid`
  var tmh = (msecs / 0x100000000 * 10000) & 0xfffffff;
  b[i++] = tmh >>> 8 & 0xff;
  b[i++] = tmh & 0xff;

  // `time_high_and_version`
  b[i++] = tmh >>> 24 & 0xf | 0x10; // include version
  b[i++] = tmh >>> 16 & 0xff;

  // `clock_seq_hi_and_reserved` (Per 4.2.2 - include variant)
  b[i++] = clockseq >>> 8 | 0x80;

  // `clock_seq_low`
  b[i++] = clockseq & 0xff;

  // `node`
  var node = options.node || _nodeId;
  for (var n = 0; n < 6; n++) {
    b[i + n] = node[n];
  }

  return buf ? buf : unparse(b);
}

// **`v4()` - Generate random UUID**

// See https://github.com/broofa/node-uuid for API details
function v4(options, buf, offset) {
  // Deprecated - 'format' argument, as supported in v1.2
  var i = buf && offset || 0;

  if (typeof(options) == 'string') {
    buf = options == 'binary' ? new Array(16) : null;
    options = null;
  }
  options = options || {};

  var rnds = options.random || (options.rng || _rng)();

  // Per 4.4, set bits for version and `clock_seq_hi_and_reserved`
  rnds[6] = (rnds[6] & 0x0f) | 0x40;
  rnds[8] = (rnds[8] & 0x3f) | 0x80;

  // Copy bytes to buffer, if provided
  if (buf) {
    for (var ii = 0; ii < 16; ii++) {
      buf[i + ii] = rnds[ii];
    }
  }

  return buf || unparse(rnds);
}

// Export public API
var uuid = v4;
uuid.v1 = v1;
uuid.v4 = v4;
uuid.parse = parse;
uuid.unparse = unparse;

module.exports = uuid;

},{"./rng":"../../node_modules/waveform-playlist/node_modules/uuid/rng-browser.js"}],"../../node_modules/webaudio-peaks/index.js":[function(require,module,exports) {
'use strict';

//http://jsperf.com/typed-array-min-max/2
//plain for loop for finding min/max is way faster than anything else.
/**
* @param {TypedArray} array - Subarray of audio to calculate peaks from.
*/
function findMinMax(array) {
    var min = Infinity;
    var max = -Infinity;
    var i = 0;
    var len = array.length;
    var curr;

    for(; i < len; i++) {
        curr = array[i];
        if (min > curr) {
            min = curr;
        }
        if (max < curr) {
            max = curr;
        }
    }

    return {
        min: min,
        max: max
    };
}

/**
* @param {Number} n - peak to convert from float to Int8, Int16 etc.
* @param {Number} bits - convert to #bits two's complement signed integer
*/
function convert(n, bits) {
    var max = Math.pow(2, bits-1);
    var v = n < 0 ? n * max : n * max - 1;
    return Math.max(-max, Math.min(max-1, v));
}

/**
* @param {TypedArray} channel - Audio track frames to calculate peaks from.
* @param {Number} samplesPerPixel - Audio frames per peak
*/
function extractPeaks(channel, samplesPerPixel, bits) {
    var i;
    var chanLength = channel.length;
    var numPeaks = Math.ceil(chanLength / samplesPerPixel);
    var start;
    var end;
    var segment;
    var max; 
    var min;
    var extrema;

    //create interleaved array of min,max
    var peaks = new (eval("Int"+bits+"Array"))(numPeaks*2);

    for (i = 0; i < numPeaks; i++) {

        start = i * samplesPerPixel;
        end = (i + 1) * samplesPerPixel > chanLength ? chanLength : (i + 1) * samplesPerPixel;

        segment = channel.subarray(start, end);
        extrema = findMinMax(segment);
        min = convert(extrema.min, bits);
        max = convert(extrema.max, bits);

        peaks[i*2] = min;
        peaks[i*2+1] = max;
    }

    return peaks;
}

function makeMono(channelPeaks, bits) {
    var numChan = channelPeaks.length;
    var weight = 1 / numChan;
    var numPeaks = channelPeaks[0].length / 2;
    var c = 0;
    var i = 0;
    var min;
    var max;
    var peaks = new (eval("Int"+bits+"Array"))(numPeaks*2);

    for (i = 0; i < numPeaks; i++) {
        min = 0;
        max = 0;

        for (c = 0; c < numChan; c++) {
            min += weight * channelPeaks[c][i*2];
            max += weight * channelPeaks[c][i*2+1];
        }

        peaks[i*2] = min;
        peaks[i*2+1] = max;
    }

    //return in array so channel number counts still work.
    return [peaks];
}

/**
* @param {AudioBuffer,TypedArray} source - Source of audio samples for peak calculations.
* @param {Number} samplesPerPixel - Number of audio samples per peak.
* @param {Number} cueIn - index in channel to start peak calculations from.
* @param {Number} cueOut - index in channel to end peak calculations from (non-inclusive).
*/
module.exports = function(source, samplesPerPixel, isMono, cueIn, cueOut, bits) {
    samplesPerPixel = samplesPerPixel || 10000;
    bits = bits || 8;
    
    if (isMono === null || isMono === undefined) {
        isMono = true;
    }

    if ([8, 16, 32].indexOf(bits) < 0) {
        throw new Error("Invalid number of bits specified for peaks.");
    }

    var numChan = source.numberOfChannels;
    var peaks = [];
    var c;
    var numPeaks;
    var channel;
    var slice;

    if (typeof source.subarray === "undefined") {
        for (c = 0; c < numChan; c++) {
            channel = source.getChannelData(c);
            cueIn = cueIn || 0;
            cueOut = cueOut || channel.length;
            slice = channel.subarray(cueIn, cueOut);
            peaks.push(extractPeaks(slice, samplesPerPixel, bits));
        }
    }
    else {
        cueIn = cueIn || 0;
        cueOut = cueOut || source.length;
        peaks.push(extractPeaks(source.subarray(cueIn, cueOut), samplesPerPixel, bits));
    }

    if (isMono && peaks.length > 1) {
        peaks = makeMono(peaks, bits);
    }

    numPeaks = peaks[0].length / 2;

    return {
        length: numPeaks,
        data: peaks,
        bits: bits
    };
};
},{}],"../../node_modules/fade-curves/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.linear = linear;
exports.exponential = exponential;
exports.sCurve = sCurve;
exports.logarithmic = logarithmic;
function linear(length, rotation) {
    var curve = new Float32Array(length),
        i,
        x,
        scale = length - 1;

    for (i = 0; i < length; i++) {
        x = i / scale;

        if (rotation > 0) {
            curve[i] = x;
        } else {
            curve[i] = 1 - x;
        }
    }

    return curve;
}

function exponential(length, rotation) {
    var curve = new Float32Array(length),
        i,
        x,
        scale = length - 1,
        index;

    for (i = 0; i < length; i++) {
        x = i / scale;
        index = rotation > 0 ? i : length - 1 - i;

        curve[index] = Math.exp(2 * x - 1) / Math.exp(1);
    }

    return curve;
}

//creating a curve to simulate an S-curve with setValueCurveAtTime.
function sCurve(length, rotation) {
    var curve = new Float32Array(length),
        i,
        phase = rotation > 0 ? Math.PI / 2 : -(Math.PI / 2);

    for (i = 0; i < length; ++i) {
        curve[i] = Math.sin(Math.PI * i / length - phase) / 2 + 0.5;
    }
    return curve;
}

//creating a curve to simulate a logarithmic curve with setValueCurveAtTime.
function logarithmic(length, base, rotation) {
    var curve = new Float32Array(length),
        index,
        x = 0,
        i;

    for (i = 0; i < length; i++) {
        //index for the curve array.
        index = rotation > 0 ? i : length - 1 - i;

        x = i / length;
        curve[index] = Math.log(1 + base * x) / Math.log(1 + base);
    }

    return curve;
}

},{}],"../../node_modules/fade-maker/index.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
exports.FADEOUT = exports.FADEIN = exports.LOGARITHMIC = exports.EXPONENTIAL = exports.LINEAR = exports.SCURVE = undefined;
exports.createFadeIn = createFadeIn;
exports.createFadeOut = createFadeOut;

var _fadeCurves = require('fade-curves');

var SCURVE = exports.SCURVE = "sCurve";
var LINEAR = exports.LINEAR = "linear";
var EXPONENTIAL = exports.EXPONENTIAL = "exponential";
var LOGARITHMIC = exports.LOGARITHMIC = "logarithmic";

var FADEIN = exports.FADEIN = "FadeIn";
var FADEOUT = exports.FADEOUT = "FadeOut";

function sCurveFadeIn(start, duration) {
    var curve = (0, _fadeCurves.sCurve)(10000, 1);
    this.setValueCurveAtTime(curve, start, duration);
}

function sCurveFadeOut(start, duration) {
    var curve = (0, _fadeCurves.sCurve)(10000, -1);
    this.setValueCurveAtTime(curve, start, duration);
}

function linearFadeIn(start, duration) {
    this.linearRampToValueAtTime(0, start);
    this.linearRampToValueAtTime(1, start + duration);
}

function linearFadeOut(start, duration) {
    this.linearRampToValueAtTime(1, start);
    this.linearRampToValueAtTime(0, start + duration);
}

function exponentialFadeIn(start, duration) {
    this.exponentialRampToValueAtTime(0.01, start);
    this.exponentialRampToValueAtTime(1, start + duration);
}

function exponentialFadeOut(start, duration) {
    this.exponentialRampToValueAtTime(1, start);
    this.exponentialRampToValueAtTime(0.01, start + duration);
}

function logarithmicFadeIn(start, duration) {
    var curve = (0, _fadeCurves.logarithmic)(10000, 10, 1);
    this.setValueCurveAtTime(curve, start, duration);
}

function logarithmicFadeOut(start, duration) {
    var curve = (0, _fadeCurves.logarithmic)(10000, 10, -1);
    this.setValueCurveAtTime(curve, start, duration);
}

function createFadeIn(gain, shape, start, duration) {
    switch (shape) {
        case SCURVE:
            sCurveFadeIn.call(gain, start, duration);
            break;
        case LINEAR:
            linearFadeIn.call(gain, start, duration);
            break;
        case EXPONENTIAL:
            exponentialFadeIn.call(gain, start, duration);
            break;
        case LOGARITHMIC:
            logarithmicFadeIn.call(gain, start, duration);
            break;
        default:
            throw new Error("Unsupported Fade type");
    }
}

function createFadeOut(gain, shape, start, duration) {
    switch (shape) {
        case SCURVE:
            sCurveFadeOut.call(gain, start, duration);
            break;
        case LINEAR:
            linearFadeOut.call(gain, start, duration);
            break;
        case EXPONENTIAL:
            exponentialFadeOut.call(gain, start, duration);
            break;
        case LOGARITHMIC:
            logarithmicFadeOut.call(gain, start, duration);
            break;
        default:
            throw new Error("Unsupported Fade type");
    }
}

},{"fade-curves":"../../node_modules/fade-curves/index.js"}],"../../node_modules/waveform-playlist/lib/track/states/CursorState.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversions = require('../../utils/conversions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(track) {
    _classCallCheck(this, _class);

    this.track = track;
  }

  _createClass(_class, [{
    key: 'setup',
    value: function setup(samplesPerPixel, sampleRate) {
      this.samplesPerPixel = samplesPerPixel;
      this.sampleRate = sampleRate;
    }
  }, {
    key: 'click',
    value: function click(e) {
      e.preventDefault();

      var startX = e.offsetX;
      var startTime = (0, _conversions.pixelsToSeconds)(startX, this.samplesPerPixel, this.sampleRate);

      this.track.ee.emit('select', startTime, startTime, this.track);
    }
  }], [{
    key: 'getClass',
    value: function getClass() {
      return '.state-cursor';
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      return ['click'];
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"../../utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js"}],"../../node_modules/waveform-playlist/lib/track/states/SelectState.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversions = require('../../utils/conversions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(track) {
    _classCallCheck(this, _class);

    this.track = track;
    this.active = false;
  }

  _createClass(_class, [{
    key: 'setup',
    value: function setup(samplesPerPixel, sampleRate) {
      this.samplesPerPixel = samplesPerPixel;
      this.sampleRate = sampleRate;
    }
  }, {
    key: 'emitSelection',
    value: function emitSelection(x) {
      var minX = Math.min(x, this.startX);
      var maxX = Math.max(x, this.startX);
      var startTime = (0, _conversions.pixelsToSeconds)(minX, this.samplesPerPixel, this.sampleRate);
      var endTime = (0, _conversions.pixelsToSeconds)(maxX, this.samplesPerPixel, this.sampleRate);

      this.track.ee.emit('select', startTime, endTime, this.track);
    }
  }, {
    key: 'complete',
    value: function complete(x) {
      this.emitSelection(x);
      this.active = false;
    }
  }, {
    key: 'mousedown',
    value: function mousedown(e) {
      e.preventDefault();
      this.active = true;

      this.startX = e.offsetX;
      var startTime = (0, _conversions.pixelsToSeconds)(this.startX, this.samplesPerPixel, this.sampleRate);

      this.track.ee.emit('select', startTime, startTime, this.track);
    }
  }, {
    key: 'mousemove',
    value: function mousemove(e) {
      if (this.active) {
        e.preventDefault();
        this.emitSelection(e.offsetX);
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup(e) {
      if (this.active) {
        e.preventDefault();
        this.complete(e.offsetX);
      }
    }
  }, {
    key: 'mouseleave',
    value: function mouseleave(e) {
      if (this.active) {
        e.preventDefault();
        this.complete(e.offsetX);
      }
    }
  }], [{
    key: 'getClass',
    value: function getClass() {
      return '.state-select';
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      return ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"../../utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js"}],"../../node_modules/waveform-playlist/lib/track/states/ShiftState.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversions = require('../../utils/conversions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(track) {
    _classCallCheck(this, _class);

    this.track = track;
    this.active = false;
  }

  _createClass(_class, [{
    key: 'setup',
    value: function setup(samplesPerPixel, sampleRate) {
      this.samplesPerPixel = samplesPerPixel;
      this.sampleRate = sampleRate;
    }
  }, {
    key: 'emitShift',
    value: function emitShift(x) {
      var deltaX = x - this.prevX;
      var deltaTime = (0, _conversions.pixelsToSeconds)(deltaX, this.samplesPerPixel, this.sampleRate);
      this.prevX = x;
      this.track.ee.emit('shift', deltaTime, this.track);
    }
  }, {
    key: 'complete',
    value: function complete(x) {
      this.emitShift(x);
      this.active = false;
    }
  }, {
    key: 'mousedown',
    value: function mousedown(e) {
      e.preventDefault();

      this.active = true;
      this.el = e.target;
      this.prevX = e.offsetX;
    }
  }, {
    key: 'mousemove',
    value: function mousemove(e) {
      if (this.active) {
        e.preventDefault();
        this.emitShift(e.offsetX);
      }
    }
  }, {
    key: 'mouseup',
    value: function mouseup(e) {
      if (this.active) {
        e.preventDefault();
        this.complete(e.offsetX);
      }
    }
  }, {
    key: 'mouseleave',
    value: function mouseleave(e) {
      if (this.active) {
        e.preventDefault();
        this.complete(e.offsetX);
      }
    }
  }], [{
    key: 'getClass',
    value: function getClass() {
      return '.state-shift';
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      return ['mousedown', 'mousemove', 'mouseup', 'mouseleave'];
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"../../utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js"}],"../../node_modules/waveform-playlist/lib/track/states/FadeInState.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversions = require('../../utils/conversions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(track) {
    _classCallCheck(this, _class);

    this.track = track;
  }

  _createClass(_class, [{
    key: 'setup',
    value: function setup(samplesPerPixel, sampleRate) {
      this.samplesPerPixel = samplesPerPixel;
      this.sampleRate = sampleRate;
    }
  }, {
    key: 'click',
    value: function click(e) {
      var startX = e.offsetX;
      var time = (0, _conversions.pixelsToSeconds)(startX, this.samplesPerPixel, this.sampleRate);

      if (time > this.track.getStartTime() && time < this.track.getEndTime()) {
        this.track.ee.emit('fadein', time - this.track.getStartTime(), this.track);
      }
    }
  }], [{
    key: 'getClass',
    value: function getClass() {
      return '.state-fadein';
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      return ['click'];
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"../../utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js"}],"../../node_modules/waveform-playlist/lib/track/states/FadeOutState.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversions = require('../../utils/conversions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(track) {
    _classCallCheck(this, _class);

    this.track = track;
  }

  _createClass(_class, [{
    key: 'setup',
    value: function setup(samplesPerPixel, sampleRate) {
      this.samplesPerPixel = samplesPerPixel;
      this.sampleRate = sampleRate;
    }
  }, {
    key: 'click',
    value: function click(e) {
      var startX = e.offsetX;
      var time = (0, _conversions.pixelsToSeconds)(startX, this.samplesPerPixel, this.sampleRate);

      if (time > this.track.getStartTime() && time < this.track.getEndTime()) {
        this.track.ee.emit('fadeout', this.track.getEndTime() - time, this.track);
      }
    }
  }], [{
    key: 'getClass',
    value: function getClass() {
      return '.state-fadeout';
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      return ['click'];
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"../../utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js"}],"../../node_modules/waveform-playlist/lib/track/states.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _CursorState = require('./states/CursorState');

var _CursorState2 = _interopRequireDefault(_CursorState);

var _SelectState = require('./states/SelectState');

var _SelectState2 = _interopRequireDefault(_SelectState);

var _ShiftState = require('./states/ShiftState');

var _ShiftState2 = _interopRequireDefault(_ShiftState);

var _FadeInState = require('./states/FadeInState');

var _FadeInState2 = _interopRequireDefault(_FadeInState);

var _FadeOutState = require('./states/FadeOutState');

var _FadeOutState2 = _interopRequireDefault(_FadeOutState);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = {
  cursor: _CursorState2.default,
  select: _SelectState2.default,
  shift: _ShiftState2.default,
  fadein: _FadeInState2.default,
  fadeout: _FadeOutState2.default
};
},{"./states/CursorState":"../../node_modules/waveform-playlist/lib/track/states/CursorState.js","./states/SelectState":"../../node_modules/waveform-playlist/lib/track/states/SelectState.js","./states/ShiftState":"../../node_modules/waveform-playlist/lib/track/states/ShiftState.js","./states/FadeInState":"../../node_modules/waveform-playlist/lib/track/states/FadeInState.js","./states/FadeOutState":"../../node_modules/waveform-playlist/lib/track/states/FadeOutState.js"}],"../../node_modules/waveform-playlist/lib/render/CanvasHook.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* virtual-dom hook for drawing to the canvas element.
*/
var CanvasHook = function () {
  function CanvasHook(peaks, offset, bits, color, scale) {
    _classCallCheck(this, CanvasHook);

    this.peaks = peaks;
    // http://stackoverflow.com/questions/6081483/maximum-size-of-a-canvas-element
    this.offset = offset;
    this.color = color;
    this.bits = bits;
    this.scale = scale;
  }

  _createClass(CanvasHook, [{
    key: 'hook',
    value: function hook(canvas, prop, prev) {
      // canvas is up to date
      if (prev !== undefined && prev.peaks === this.peaks) {
        return;
      }

      var scale = this.scale;
      var len = canvas.width / scale;
      var cc = canvas.getContext('2d');
      var h2 = canvas.height / scale / 2;
      var maxValue = Math.pow(2, this.bits - 1);

      cc.clearRect(0, 0, canvas.width, canvas.height);
      cc.fillStyle = this.color;
      cc.scale(scale, scale);

      for (var i = 0; i < len; i += 1) {
        var minPeak = this.peaks[(i + this.offset) * 2] / maxValue;
        var maxPeak = this.peaks[(i + this.offset) * 2 + 1] / maxValue;
        CanvasHook.drawFrame(cc, h2, i, minPeak, maxPeak);
      }
    }
  }], [{
    key: 'drawFrame',
    value: function drawFrame(cc, h2, x, minPeak, maxPeak) {
      var min = Math.abs(minPeak * h2);
      var max = Math.abs(maxPeak * h2);

      // draw max
      cc.fillRect(x, 0, 1, h2 - max);
      // draw min
      cc.fillRect(x, h2 + min, 1, h2 - min);
    }
  }]);

  return CanvasHook;
}();

exports.default = CanvasHook;
},{}],"../../node_modules/waveform-playlist/lib/render/FadeCanvasHook.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fadeMaker = require('fade-maker');

var _fadeCurves = require('fade-curves');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* virtual-dom hook for drawing the fade curve to the canvas element.
*/
var FadeCanvasHook = function () {
  function FadeCanvasHook(type, shape, duration, samplesPerPixel) {
    _classCallCheck(this, FadeCanvasHook);

    this.type = type;
    this.shape = shape;
    this.duration = duration;
    this.samplesPerPixel = samplesPerPixel;
  }

  _createClass(FadeCanvasHook, [{
    key: 'hook',
    value: function hook(canvas, prop, prev) {
      // node is up to date.
      if (prev !== undefined && prev.shape === this.shape && prev.type === this.type && prev.duration === this.duration && prev.samplesPerPixel === this.samplesPerPixel) {
        return;
      }

      var ctx = canvas.getContext('2d');
      var width = canvas.width;
      var height = canvas.height;
      var curve = FadeCanvasHook.createCurve(this.shape, this.type, width);
      var len = curve.length;
      var y = height - curve[0] * height;

      ctx.strokeStyle = 'black';
      ctx.beginPath();
      ctx.moveTo(0, y);

      for (var i = 1; i < len; i += 1) {
        y = height - curve[i] * height;
        ctx.lineTo(i, y);
      }
      ctx.stroke();
    }
  }], [{
    key: 'createCurve',
    value: function createCurve(shape, type, width) {
      var reflection = void 0;
      var curve = void 0;

      switch (type) {
        case _fadeMaker.FADEIN:
          {
            reflection = 1;
            break;
          }
        case _fadeMaker.FADEOUT:
          {
            reflection = -1;
            break;
          }
        default:
          {
            throw new Error('Unsupported fade type.');
          }
      }

      switch (shape) {
        case _fadeMaker.SCURVE:
          {
            curve = (0, _fadeCurves.sCurve)(width, reflection);
            break;
          }
        case _fadeMaker.LINEAR:
          {
            curve = (0, _fadeCurves.linear)(width, reflection);
            break;
          }
        case _fadeMaker.EXPONENTIAL:
          {
            curve = (0, _fadeCurves.exponential)(width, reflection);
            break;
          }
        case _fadeMaker.LOGARITHMIC:
          {
            curve = (0, _fadeCurves.logarithmic)(width, 10, reflection);
            break;
          }
        default:
          {
            throw new Error('Unsupported fade shape');
          }
      }

      return curve;
    }
  }]);

  return FadeCanvasHook;
}();

exports.default = FadeCanvasHook;
},{"fade-maker":"../../node_modules/fade-maker/index.js","fade-curves":"../../node_modules/fade-curves/index.js"}],"../../node_modules/waveform-playlist/lib/render/VolumeSliderHook.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

/*
* virtual-dom hook for setting the volume input programmatically.
*/
var _class = function () {
  function _class(gain) {
    _classCallCheck(this, _class);

    this.gain = gain;
  }

  _createClass(_class, [{
    key: 'hook',
    value: function hook(volumeInput) {
      volumeInput.setAttribute('value', this.gain * 100);
    }
  }]);

  return _class;
}();

exports.default = _class;
},{}],"../../node_modules/waveform-playlist/lib/Track.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _lodash3 = require('lodash.forown');

var _lodash4 = _interopRequireDefault(_lodash3);

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

var _h = require('virtual-dom/h');

var _h2 = _interopRequireDefault(_h);

var _webaudioPeaks = require('webaudio-peaks');

var _webaudioPeaks2 = _interopRequireDefault(_webaudioPeaks);

var _fadeMaker = require('fade-maker');

var _conversions = require('./utils/conversions');

var _states = require('./track/states');

var _states2 = _interopRequireDefault(_states);

var _CanvasHook = require('./render/CanvasHook');

var _CanvasHook2 = _interopRequireDefault(_CanvasHook);

var _FadeCanvasHook = require('./render/FadeCanvasHook');

var _FadeCanvasHook2 = _interopRequireDefault(_FadeCanvasHook);

var _VolumeSliderHook = require('./render/VolumeSliderHook');

var _VolumeSliderHook2 = _interopRequireDefault(_VolumeSliderHook);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var MAX_CANVAS_WIDTH = 1000;

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.name = 'Untitled';
    this.customClass = undefined;
    this.waveOutlineColor = undefined;
    this.gain = 1;
    this.fades = {};
    this.peakData = {
      type: 'WebAudio',
      mono: false
    };

    this.cueIn = 0;
    this.cueOut = 0;
    this.duration = 0;
    this.startTime = 0;
    this.endTime = 0;
    this.stereoPan = 0;
  }

  _createClass(_class, [{
    key: 'setEventEmitter',
    value: function setEventEmitter(ee) {
      this.ee = ee;
    }
  }, {
    key: 'setName',
    value: function setName(name) {
      this.name = name;
    }
  }, {
    key: 'setCustomClass',
    value: function setCustomClass(className) {
      this.customClass = className;
    }
  }, {
    key: 'setWaveOutlineColor',
    value: function setWaveOutlineColor(color) {
      this.waveOutlineColor = color;
    }
  }, {
    key: 'setCues',
    value: function setCues(cueIn, cueOut) {
      if (cueOut < cueIn) {
        throw new Error('cue out cannot be less than cue in');
      }

      this.cueIn = cueIn;
      this.cueOut = cueOut;
      this.duration = this.cueOut - this.cueIn;
      this.endTime = this.startTime + this.duration;
    }

    /*
    *   start, end in seconds relative to the entire playlist.
    */

  }, {
    key: 'trim',
    value: function trim(start, end) {
      var trackStart = this.getStartTime();
      var trackEnd = this.getEndTime();
      var offset = this.cueIn - trackStart;

      if (trackStart <= start && trackEnd >= start || trackStart <= end && trackEnd >= end) {
        var cueIn = start < trackStart ? trackStart : start;
        var cueOut = end > trackEnd ? trackEnd : end;

        this.setCues(cueIn + offset, cueOut + offset);
        if (start > trackStart) {
          this.setStartTime(start);
        }
      }
    }
  }, {
    key: 'setStartTime',
    value: function setStartTime(start) {
      this.startTime = start;
      this.endTime = start + this.duration;
    }
  }, {
    key: 'setPlayout',
    value: function setPlayout(playout) {
      this.playout = playout;
    }
  }, {
    key: 'setOfflinePlayout',
    value: function setOfflinePlayout(playout) {
      this.offlinePlayout = playout;
    }
  }, {
    key: 'setEnabledStates',
    value: function setEnabledStates() {
      var enabledStates = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var defaultStatesEnabled = {
        cursor: true,
        fadein: true,
        fadeout: true,
        select: true,
        shift: true
      };

      this.enabledStates = (0, _lodash2.default)({}, defaultStatesEnabled, enabledStates);
    }
  }, {
    key: 'setFadeIn',
    value: function setFadeIn(duration) {
      var shape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'logarithmic';

      if (duration > this.duration) {
        throw new Error('Invalid Fade In');
      }

      var fade = {
        shape: shape,
        start: 0,
        end: duration
      };

      if (this.fadeIn) {
        this.removeFade(this.fadeIn);
        this.fadeIn = undefined;
      }

      this.fadeIn = this.saveFade(_fadeMaker.FADEIN, fade.shape, fade.start, fade.end);
    }
  }, {
    key: 'setFadeOut',
    value: function setFadeOut(duration) {
      var shape = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 'logarithmic';

      if (duration > this.duration) {
        throw new Error('Invalid Fade Out');
      }

      var fade = {
        shape: shape,
        start: this.duration - duration,
        end: this.duration
      };

      if (this.fadeOut) {
        this.removeFade(this.fadeOut);
        this.fadeOut = undefined;
      }

      this.fadeOut = this.saveFade(_fadeMaker.FADEOUT, fade.shape, fade.start, fade.end);
    }
  }, {
    key: 'saveFade',
    value: function saveFade(type, shape, start, end) {
      var id = _uuid2.default.v4();

      this.fades[id] = {
        type: type,
        shape: shape,
        start: start,
        end: end
      };

      return id;
    }
  }, {
    key: 'removeFade',
    value: function removeFade(id) {
      delete this.fades[id];
    }
  }, {
    key: 'setBuffer',
    value: function setBuffer(buffer) {
      this.buffer = buffer;
    }
  }, {
    key: 'setPeakData',
    value: function setPeakData(data) {
      this.peakData = data;
    }
  }, {
    key: 'calculatePeaks',
    value: function calculatePeaks(samplesPerPixel, sampleRate) {
      var cueIn = (0, _conversions.secondsToSamples)(this.cueIn, sampleRate);
      var cueOut = (0, _conversions.secondsToSamples)(this.cueOut, sampleRate);

      this.setPeaks((0, _webaudioPeaks2.default)(this.buffer, samplesPerPixel, this.peakData.mono, cueIn, cueOut));
    }
  }, {
    key: 'setPeaks',
    value: function setPeaks(peaks) {
      this.peaks = peaks;
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      this.state = state;

      if (this.state && this.enabledStates[this.state]) {
        var StateClass = _states2.default[this.state];
        this.stateObj = new StateClass(this);
      } else {
        this.stateObj = undefined;
      }
    }
  }, {
    key: 'getStartTime',
    value: function getStartTime() {
      return this.startTime;
    }
  }, {
    key: 'getEndTime',
    value: function getEndTime() {
      return this.endTime;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.duration;
    }
  }, {
    key: 'isPlaying',
    value: function isPlaying() {
      return this.playout.isPlaying();
    }
  }, {
    key: 'setShouldPlay',
    value: function setShouldPlay(bool) {
      this.playout.setShouldPlay(bool);
    }
  }, {
    key: 'setGainLevel',
    value: function setGainLevel(level) {
      this.gain = level;
      this.playout.setVolumeGainLevel(level);
    }
  }, {
    key: 'setMasterGainLevel',
    value: function setMasterGainLevel(level) {
      this.playout.setMasterGainLevel(level);
    }
  }, {
    key: 'setStereoPanValue',
    value: function setStereoPanValue(value) {
      this.stereoPan = value;
      this.playout.setStereoPanValue(value);
    }

    /*
      startTime, endTime in seconds (float).
      segment is for a highlighted section in the UI.
       returns a Promise that will resolve when the AudioBufferSource
      is either stopped or plays out naturally.
    */

  }, {
    key: 'schedulePlay',
    value: function schedulePlay(now, startTime, endTime, config) {
      var start = void 0;
      var duration = void 0;
      var when = now;
      var segment = endTime ? endTime - startTime : undefined;

      var defaultOptions = {
        shouldPlay: true,
        masterGain: 1,
        isOffline: false
      };

      var options = (0, _lodash2.default)({}, defaultOptions, config);
      var playoutSystem = options.isOffline ? this.offlinePlayout : this.playout;

      // 1) track has no content to play.
      // 2) track does not play in this selection.
      if (this.endTime <= startTime || segment && startTime + segment < this.startTime) {
        // return a resolved promise since this track is technically "stopped".
        return Promise.resolve();
      }

      // track should have something to play if it gets here.

      // the track starts in the future or on the cursor position
      if (this.startTime >= startTime) {
        start = 0;
        // schedule additional delay for this audio node.
        when += this.startTime - startTime;

        if (endTime) {
          segment -= this.startTime - startTime;
          duration = Math.min(segment, this.duration);
        } else {
          duration = this.duration;
        }
      } else {
        start = startTime - this.startTime;

        if (endTime) {
          duration = Math.min(segment, this.duration - start);
        } else {
          duration = this.duration - start;
        }
      }

      start += this.cueIn;
      var relPos = startTime - this.startTime;
      var sourcePromise = playoutSystem.setUpSource();

      // param relPos: cursor position in seconds relative to this track.
      // can be negative if the cursor is placed before the start of this track etc.
      (0, _lodash4.default)(this.fades, function (fade) {
        var fadeStart = void 0;
        var fadeDuration = void 0;

        // only apply fade if it's ahead of the cursor.
        if (relPos < fade.end) {
          if (relPos <= fade.start) {
            fadeStart = now + (fade.start - relPos);
            fadeDuration = fade.end - fade.start;
          } else if (relPos > fade.start && relPos < fade.end) {
            fadeStart = now - (relPos - fade.start);
            fadeDuration = fade.end - fade.start;
          }

          switch (fade.type) {
            case _fadeMaker.FADEIN:
              {
                playoutSystem.applyFadeIn(fadeStart, fadeDuration, fade.shape);
                break;
              }
            case _fadeMaker.FADEOUT:
              {
                playoutSystem.applyFadeOut(fadeStart, fadeDuration, fade.shape);
                break;
              }
            default:
              {
                throw new Error('Invalid fade type saved on track.');
              }
          }
        }
      });

      playoutSystem.setVolumeGainLevel(this.gain);
      playoutSystem.setShouldPlay(options.shouldPlay);
      playoutSystem.setMasterGainLevel(options.masterGain);
      playoutSystem.setStereoPanValue(this.stereoPan);
      playoutSystem.play(when, start, duration);

      return sourcePromise;
    }
  }, {
    key: 'scheduleStop',
    value: function scheduleStop() {
      var when = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      this.playout.stop(when);
    }
  }, {
    key: 'renderOverlay',
    value: function renderOverlay(data) {
      var _this = this;

      var channelPixels = (0, _conversions.secondsToPixels)(data.playlistLength, data.resolution, data.sampleRate);

      var config = {
        attributes: {
          style: 'position: absolute; top: 0; right: 0; bottom: 0; left: 0; width: ' + channelPixels + 'px; z-index: 9;'
        }
      };

      var overlayClass = '';

      if (this.stateObj) {
        this.stateObj.setup(data.resolution, data.sampleRate);
        var StateClass = _states2.default[this.state];
        var events = StateClass.getEvents();

        events.forEach(function (event) {
          config['on' + event] = _this.stateObj[event].bind(_this.stateObj);
        });

        overlayClass = StateClass.getClass();
      }
      // use this overlay for track event cursor position calculations.
      return (0, _h2.default)('div.playlist-overlay' + overlayClass, config);
    }
  }, {
    key: 'renderControls',
    value: function renderControls(data) {
      var _this2 = this;

      var muteClass = data.muted ? '.active' : '';
      var soloClass = data.soloed ? '.active' : '';
      var numChan = this.peaks.data.length;

      return (0, _h2.default)('div.controls', {
        attributes: {
          style: 'height: ' + numChan * data.height + 'px; width: ' + data.controls.width + 'px; position: absolute; left: 0; z-index: 10;'
        }
      }, [(0, _h2.default)('header', [this.name]), (0, _h2.default)('div.btn-group', [(0, _h2.default)('span.btn.btn-default.btn-xs.btn-mute' + muteClass, {
        onclick: function onclick() {
          _this2.ee.emit('mute', _this2);
        }
      }, ['Mute']), (0, _h2.default)('span.btn.btn-default.btn-xs.btn-solo' + soloClass, {
        onclick: function onclick() {
          _this2.ee.emit('solo', _this2);
        }
      }, ['Solo'])]), (0, _h2.default)('label', [(0, _h2.default)('input.volume-slider', {
        attributes: {
          type: 'range',
          min: 0,
          max: 100,
          value: 100
        },
        hook: new _VolumeSliderHook2.default(this.gain),
        oninput: function oninput(e) {
          _this2.ee.emit('volumechange', e.target.value, _this2);
        }
      })])]);
    }
  }, {
    key: 'render',
    value: function render(data) {
      var _this3 = this;

      var width = this.peaks.length;
      var playbackX = (0, _conversions.secondsToPixels)(data.playbackSeconds, data.resolution, data.sampleRate);
      var startX = (0, _conversions.secondsToPixels)(this.startTime, data.resolution, data.sampleRate);
      var endX = (0, _conversions.secondsToPixels)(this.endTime, data.resolution, data.sampleRate);
      var progressWidth = 0;
      var numChan = this.peaks.data.length;
      var scale = window.devicePixelRatio;

      if (playbackX > 0 && playbackX > startX) {
        if (playbackX < endX) {
          progressWidth = playbackX - startX;
        } else {
          progressWidth = width;
        }
      }

      var waveformChildren = [(0, _h2.default)('div.cursor', {
        attributes: {
          style: 'position: absolute; width: 1px; margin: 0; padding: 0; top: 0; left: ' + playbackX + 'px; bottom: 0; z-index: 5;'
        }
      })];

      var channels = Object.keys(this.peaks.data).map(function (channelNum) {
        var channelChildren = [(0, _h2.default)('div.channel-progress', {
          attributes: {
            style: 'position: absolute; width: ' + progressWidth + 'px; height: ' + data.height + 'px; z-index: 2;'
          }
        })];
        var offset = 0;
        var totalWidth = width;
        var peaks = _this3.peaks.data[channelNum];

        while (totalWidth > 0) {
          var currentWidth = Math.min(totalWidth, MAX_CANVAS_WIDTH);
          var canvasColor = _this3.waveOutlineColor ? _this3.waveOutlineColor : data.colors.waveOutlineColor;

          channelChildren.push((0, _h2.default)('canvas', {
            attributes: {
              width: currentWidth * scale,
              height: data.height * scale,
              style: 'float: left; position: relative; margin: 0; padding: 0; z-index: 3; width: ' + currentWidth + 'px; height: ' + data.height + 'px;'
            },
            hook: new _CanvasHook2.default(peaks, offset, _this3.peaks.bits, canvasColor, scale)
          }));

          totalWidth -= currentWidth;
          offset += MAX_CANVAS_WIDTH;
        }

        // if there are fades, display them.
        if (_this3.fadeIn) {
          var fadeIn = _this3.fades[_this3.fadeIn];
          var fadeWidth = (0, _conversions.secondsToPixels)(fadeIn.end - fadeIn.start, data.resolution, data.sampleRate);

          channelChildren.push((0, _h2.default)('div.wp-fade.wp-fadein', {
            attributes: {
              style: 'position: absolute; height: ' + data.height + 'px; width: ' + fadeWidth + 'px; top: 0; left: 0; z-index: 4;'
            }
          }, [(0, _h2.default)('canvas', {
            attributes: {
              width: fadeWidth,
              height: data.height
            },
            hook: new _FadeCanvasHook2.default(fadeIn.type, fadeIn.shape, fadeIn.end - fadeIn.start, data.resolution)
          })]));
        }

        if (_this3.fadeOut) {
          var fadeOut = _this3.fades[_this3.fadeOut];
          var _fadeWidth = (0, _conversions.secondsToPixels)(fadeOut.end - fadeOut.start, data.resolution, data.sampleRate);

          channelChildren.push((0, _h2.default)('div.wp-fade.wp-fadeout', {
            attributes: {
              style: 'position: absolute; height: ' + data.height + 'px; width: ' + _fadeWidth + 'px; top: 0; right: 0; z-index: 4;'
            }
          }, [(0, _h2.default)('canvas', {
            attributes: {
              width: _fadeWidth,
              height: data.height
            },
            hook: new _FadeCanvasHook2.default(fadeOut.type, fadeOut.shape, fadeOut.end - fadeOut.start, data.resolution)
          })]));
        }

        return (0, _h2.default)('div.channel.channel-' + channelNum, {
          attributes: {
            style: 'height: ' + data.height + 'px; width: ' + width + 'px; top: ' + channelNum * data.height + 'px; left: ' + startX + 'px; position: absolute; margin: 0; padding: 0; z-index: 1;'
          }
        }, channelChildren);
      });

      waveformChildren.push(channels);
      waveformChildren.push(this.renderOverlay(data));

      // draw cursor selection on active track.
      if (data.isActive === true) {
        var cStartX = (0, _conversions.secondsToPixels)(data.timeSelection.start, data.resolution, data.sampleRate);
        var cEndX = (0, _conversions.secondsToPixels)(data.timeSelection.end, data.resolution, data.sampleRate);
        var cWidth = cEndX - cStartX + 1;
        var cClassName = cWidth > 1 ? '.segment' : '.point';

        waveformChildren.push((0, _h2.default)('div.selection' + cClassName, {
          attributes: {
            style: 'position: absolute; width: ' + cWidth + 'px; bottom: 0; top: 0; left: ' + cStartX + 'px; z-index: 4;'
          }
        }));
      }

      var waveform = (0, _h2.default)('div.waveform', {
        attributes: {
          style: 'height: ' + numChan * data.height + 'px; position: relative;'
        }
      }, waveformChildren);

      var channelChildren = [];
      var channelMargin = 0;

      if (data.controls.show) {
        channelChildren.push(this.renderControls(data));
        channelMargin = data.controls.width;
      }

      channelChildren.push(waveform);

      var audibleClass = data.shouldPlay ? '' : '.silent';
      var customClass = this.customClass === undefined ? '' : '.' + this.customClass;

      return (0, _h2.default)('div.channel-wrapper' + audibleClass + customClass, {
        attributes: {
          style: 'margin-left: ' + channelMargin + 'px; height: ' + data.height * numChan + 'px;'
        }
      }, channelChildren);
    }
  }, {
    key: 'getTrackDetails',
    value: function getTrackDetails() {
      var info = {
        src: this.src,
        start: this.startTime,
        end: this.endTime,
        name: this.name,
        customClass: this.customClass,
        cuein: this.cueIn,
        cueout: this.cueOut
      };

      if (this.fadeIn) {
        var fadeIn = this.fades[this.fadeIn];

        info.fadeIn = {
          shape: fadeIn.shape,
          duration: fadeIn.end - fadeIn.start
        };
      }

      if (this.fadeOut) {
        var fadeOut = this.fades[this.fadeOut];

        info.fadeOut = {
          shape: fadeOut.shape,
          duration: fadeOut.end - fadeOut.start
        };
      }

      return info;
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"lodash.assign":"../../node_modules/lodash.assign/index.js","lodash.forown":"../../node_modules/lodash.forown/index.js","uuid":"../../node_modules/waveform-playlist/node_modules/uuid/uuid.js","virtual-dom/h":"../../node_modules/virtual-dom/h.js","webaudio-peaks":"../../node_modules/webaudio-peaks/index.js","fade-maker":"../../node_modules/fade-maker/index.js","./utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js","./track/states":"../../node_modules/waveform-playlist/lib/track/states.js","./render/CanvasHook":"../../node_modules/waveform-playlist/lib/render/CanvasHook.js","./render/FadeCanvasHook":"../../node_modules/waveform-playlist/lib/render/FadeCanvasHook.js","./render/VolumeSliderHook":"../../node_modules/waveform-playlist/lib/render/VolumeSliderHook.js"}],"../../node_modules/waveform-playlist/lib/Playout.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _fadeMaker = require('fade-maker');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(ac, buffer) {
    _classCallCheck(this, _class);

    this.ac = ac;
    this.gain = 1;
    this.buffer = buffer;
    this.destination = this.ac.destination;
    this.ac.createStereoPanner = ac.createStereoPanner || ac.createPanner;
  }

  _createClass(_class, [{
    key: 'applyFade',
    value: function applyFade(type, start, duration) {
      var shape = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : 'logarithmic';

      if (type === _fadeMaker.FADEIN) {
        (0, _fadeMaker.createFadeIn)(this.fadeGain.gain, shape, start, duration);
      } else if (type === _fadeMaker.FADEOUT) {
        (0, _fadeMaker.createFadeOut)(this.fadeGain.gain, shape, start, duration);
      } else {
        throw new Error('Unsupported fade type');
      }
    }
  }, {
    key: 'applyFadeIn',
    value: function applyFadeIn(start, duration) {
      var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'logarithmic';

      this.applyFade(_fadeMaker.FADEIN, start, duration, shape);
    }
  }, {
    key: 'applyFadeOut',
    value: function applyFadeOut(start, duration) {
      var shape = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 'logarithmic';

      this.applyFade(_fadeMaker.FADEOUT, start, duration, shape);
    }
  }, {
    key: 'isPlaying',
    value: function isPlaying() {
      return this.source !== undefined;
    }
  }, {
    key: 'getDuration',
    value: function getDuration() {
      return this.buffer.duration;
    }
  }, {
    key: 'setAudioContext',
    value: function setAudioContext(ac) {
      this.ac = ac;
      this.ac.createStereoPanner = ac.createStereoPanner || ac.createPanner;
      this.destination = this.ac.destination;
    }
  }, {
    key: 'setUpSource',
    value: function setUpSource() {
      var _this = this;

      this.source = this.ac.createBufferSource();
      this.source.buffer = this.buffer;

      var sourcePromise = new Promise(function (resolve) {
        // keep track of the buffer state.
        _this.source.onended = function () {
          _this.source.disconnect();
          _this.fadeGain.disconnect();
          _this.volumeGain.disconnect();
          _this.shouldPlayGain.disconnect();
          _this.panner.disconnect();
          _this.masterGain.disconnect();

          _this.source = undefined;
          _this.fadeGain = undefined;
          _this.volumeGain = undefined;
          _this.shouldPlayGain = undefined;
          _this.panner = undefined;
          _this.masterGain = undefined;

          resolve();
        };
      });

      this.fadeGain = this.ac.createGain();
      // used for track volume slider
      this.volumeGain = this.ac.createGain();
      // used for solo/mute
      this.shouldPlayGain = this.ac.createGain();
      this.masterGain = this.ac.createGain();

      this.panner = this.ac.createStereoPanner();

      this.source.connect(this.fadeGain);
      this.fadeGain.connect(this.volumeGain);
      this.volumeGain.connect(this.shouldPlayGain);
      this.shouldPlayGain.connect(this.masterGain);
      this.masterGain.connect(this.panner);
      this.panner.connect(this.destination);

      return sourcePromise;
    }
  }, {
    key: 'setVolumeGainLevel',
    value: function setVolumeGainLevel(level) {
      if (this.volumeGain) {
        this.volumeGain.gain.value = level;
      }
    }
  }, {
    key: 'setShouldPlay',
    value: function setShouldPlay(bool) {
      if (this.shouldPlayGain) {
        this.shouldPlayGain.gain.value = bool ? 1 : 0;
      }
    }
  }, {
    key: 'setMasterGainLevel',
    value: function setMasterGainLevel(level) {
      if (this.masterGain) {
        this.masterGain.gain.value = level;
      }
    }
  }, {
    key: 'setStereoPanValue',
    value: function setStereoPanValue(value) {
      var pan = value === undefined ? 0 : value;

      if (this.panner) {
        if (this.panner.pan !== undefined) {
          this.panner.pan.value = pan;
        } else {
          this.panner.panningModel = 'equalpower';
          this.panner.setPosition(pan, 0, 1 - Math.abs(pan));
        }
      }
    }

    /*
      source.start is picky when passing the end time.
      If rounding error causes a number to make the source think
      it is playing slightly more samples than it has it won't play at all.
      Unfortunately it doesn't seem to work if you just give it a start time.
    */

  }, {
    key: 'play',
    value: function play(when, start, duration) {
      this.source.start(when, start, duration);
    }
  }, {
    key: 'stop',
    value: function stop() {
      var when = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;

      if (this.source) {
        this.source.stop(when);
      }
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"fade-maker":"../../node_modules/fade-maker/index.js"}],"../../node_modules/waveform-playlist/lib/annotation/input/aeneas.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (aeneas) {
  var annotation = {
    id: aeneas.id || _uuid2.default.v4(),
    start: Number(aeneas.begin) || 0,
    end: Number(aeneas.end) || 0,
    lines: aeneas.lines || [''],
    lang: aeneas.language || 'en'
  };

  return annotation;
};

var _uuid = require('uuid');

var _uuid2 = _interopRequireDefault(_uuid);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }
},{"uuid":"../../node_modules/waveform-playlist/node_modules/uuid/uuid.js"}],"../../node_modules/waveform-playlist/lib/annotation/output/aeneas.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (annotation) {
  return {
    begin: String(annotation.start.toFixed(3)),
    end: String(annotation.end.toFixed(3)),
    id: String(annotation.id),
    language: annotation.lang,
    lines: annotation.lines
  };
};
},{}],"../../node_modules/waveform-playlist/lib/interaction/DragInteraction.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _conversions = require('../utils/conversions');

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class(playlist) {
    var _this = this;

    var data = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

    _classCallCheck(this, _class);

    this.playlist = playlist;
    this.data = data;
    this.active = false;

    this.ondragover = function (e) {
      if (_this.active) {
        e.preventDefault();
        _this.emitDrag(e.clientX);
      }
    };
  }

  _createClass(_class, [{
    key: 'emitDrag',
    value: function emitDrag(x) {
      var deltaX = x - this.prevX;

      // emit shift event if not 0
      if (deltaX) {
        var deltaTime = (0, _conversions.pixelsToSeconds)(deltaX, this.playlist.samplesPerPixel, this.playlist.sampleRate);
        this.prevX = x;
        this.playlist.ee.emit('dragged', deltaTime, this.data);
      }
    }
  }, {
    key: 'complete',
    value: function complete() {
      this.active = false;
      document.removeEventListener('dragover', this.ondragover);
    }
  }, {
    key: 'dragstart',
    value: function dragstart(e) {
      var ev = e;
      this.active = true;
      this.prevX = e.clientX;

      ev.dataTransfer.dropEffect = 'move';
      ev.dataTransfer.effectAllowed = 'move';
      ev.dataTransfer.setData('text/plain', '');
      document.addEventListener('dragover', this.ondragover);
    }
  }, {
    key: 'dragend',
    value: function dragend(e) {
      if (this.active) {
        e.preventDefault();
        this.complete();
      }
    }
  }], [{
    key: 'getClass',
    value: function getClass() {
      return '.shift';
    }
  }, {
    key: 'getEvents',
    value: function getEvents() {
      return ['dragstart', 'dragend'];
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"../utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js"}],"../../node_modules/waveform-playlist/lib/annotation/render/ScrollTopHook.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
* virtual-dom hook for scrolling to the text annotation.
*/
var Hook = function ScrollTopHook() {};
Hook.prototype.hook = function hook(node) {
  var el = node.querySelector('.current');
  if (el) {
    var box = node.getBoundingClientRect();
    var row = el.getBoundingClientRect();
    var diff = row.top - box.top;
    var list = node;
    list.scrollTop += diff;
  }
};

exports.default = Hook;
},{}],"../../node_modules/waveform-playlist/lib/utils/timeformat.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function (format) {
  function clockFormat(seconds, decimals) {
    var hours = parseInt(seconds / 3600, 10) % 24;
    var minutes = parseInt(seconds / 60, 10) % 60;
    var secs = (seconds % 60).toFixed(decimals);

    var sHours = hours < 10 ? '0' + hours : hours;
    var sMinutes = minutes < 10 ? '0' + minutes : minutes;
    var sSeconds = secs < 10 ? '0' + secs : secs;

    return sHours + ':' + sMinutes + ':' + sSeconds;
  }

  var formats = {
    seconds: function seconds(_seconds) {
      return _seconds.toFixed(0);
    },
    thousandths: function thousandths(seconds) {
      return seconds.toFixed(3);
    },

    'hh:mm:ss': function hhmmss(seconds) {
      return clockFormat(seconds, 0);
    },
    'hh:mm:ss.u': function hhmmssu(seconds) {
      return clockFormat(seconds, 1);
    },
    'hh:mm:ss.uu': function hhmmssuu(seconds) {
      return clockFormat(seconds, 2);
    },
    'hh:mm:ss.uuu': function hhmmssuuu(seconds) {
      return clockFormat(seconds, 3);
    }
  };

  return formats[format];
};
},{}],"../../node_modules/waveform-playlist/lib/annotation/AnnotationList.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _h = require('virtual-dom/h');

var _h2 = _interopRequireDefault(_h);

var _aeneas = require('./input/aeneas');

var _aeneas2 = _interopRequireDefault(_aeneas);

var _aeneas3 = require('./output/aeneas');

var _aeneas4 = _interopRequireDefault(_aeneas3);

var _conversions = require('../utils/conversions');

var _DragInteraction = require('../interaction/DragInteraction');

var _DragInteraction2 = _interopRequireDefault(_DragInteraction);

var _ScrollTopHook = require('./render/ScrollTopHook');

var _ScrollTopHook2 = _interopRequireDefault(_ScrollTopHook);

var _timeformat = require('../utils/timeformat');

var _timeformat2 = _interopRequireDefault(_timeformat);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var AnnotationList = function () {
  function AnnotationList(playlist, annotations) {
    var controls = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : [];
    var editable = arguments.length > 3 && arguments[3] !== undefined ? arguments[3] : false;
    var linkEndpoints = arguments.length > 4 && arguments[4] !== undefined ? arguments[4] : false;
    var isContinuousPlay = arguments.length > 5 && arguments[5] !== undefined ? arguments[5] : false;

    _classCallCheck(this, AnnotationList);

    this.playlist = playlist;
    this.resizeHandlers = [];
    this.editable = editable;
    this.annotations = annotations.map(function (a) {
      return (
        // TODO support different formats later on.
        (0, _aeneas2.default)(a)
      );
    });
    this.setupInteractions();

    this.controls = controls;
    this.setupEE(playlist.ee);

    // TODO actually make a real plugin system that's not terrible.
    this.playlist.isContinuousPlay = isContinuousPlay;
    this.playlist.linkEndpoints = linkEndpoints;
    this.length = this.annotations.length;
  }

  _createClass(AnnotationList, [{
    key: 'setupInteractions',
    value: function setupInteractions() {
      var _this = this;

      this.annotations.forEach(function (a, i) {
        var leftShift = new _DragInteraction2.default(_this.playlist, {
          direction: 'left',
          index: i
        });
        var rightShift = new _DragInteraction2.default(_this.playlist, {
          direction: 'right',
          index: i
        });

        _this.resizeHandlers.push(leftShift);
        _this.resizeHandlers.push(rightShift);
      });
    }
  }, {
    key: 'setupEE',
    value: function setupEE(ee) {
      var _this2 = this;

      ee.on('dragged', function (deltaTime, data) {
        var annotationIndex = data.index;
        var annotations = _this2.annotations;
        var note = annotations[annotationIndex];

        // resizing to the left
        if (data.direction === 'left') {
          var originalVal = note.start;
          note.start += deltaTime;

          if (note.start < 0) {
            note.start = 0;
          }

          if (annotationIndex && annotations[annotationIndex - 1].end > note.start) {
            annotations[annotationIndex - 1].end = note.start;
          }

          if (_this2.playlist.linkEndpoints && annotationIndex && annotations[annotationIndex - 1].end === originalVal) {
            annotations[annotationIndex - 1].end = note.start;
          }
        } else {
          // resizing to the right
          var _originalVal = note.end;
          note.end += deltaTime;

          if (note.end > _this2.playlist.duration) {
            note.end = _this2.playlist.duration;
          }

          if (annotationIndex < annotations.length - 1 && annotations[annotationIndex + 1].start < note.end) {
            annotations[annotationIndex + 1].start = note.end;
          }

          if (_this2.playlist.linkEndpoints && annotationIndex < annotations.length - 1 && annotations[annotationIndex + 1].start === _originalVal) {
            annotations[annotationIndex + 1].start = note.end;
          }
        }

        _this2.playlist.drawRequest();
      });

      ee.on('continuousplay', function (val) {
        _this2.playlist.isContinuousPlay = val;
      });

      ee.on('linkendpoints', function (val) {
        _this2.playlist.linkEndpoints = val;
      });

      ee.on('annotationsrequest', function () {
        _this2.export();
      });

      return ee;
    }
  }, {
    key: 'export',
    value: function _export() {
      var output = this.annotations.map(function (a) {
        return (0, _aeneas4.default)(a);
      });
      var dataStr = 'data:text/json;charset=utf-8,' + encodeURIComponent(JSON.stringify(output));
      var a = document.createElement('a');

      document.body.appendChild(a);
      a.href = dataStr;
      a.download = 'annotations.json';
      a.click();
      document.body.removeChild(a);
    }
  }, {
    key: 'renderResizeLeft',
    value: function renderResizeLeft(i) {
      var events = _DragInteraction2.default.getEvents();
      var config = { attributes: {
          style: 'position: absolute; height: 30px; width: 10px; top: 0; left: -2px',
          draggable: true
        } };
      var handler = this.resizeHandlers[i * 2];

      events.forEach(function (event) {
        config['on' + event] = handler[event].bind(handler);
      });

      return (0, _h2.default)('div.resize-handle.resize-w', config);
    }
  }, {
    key: 'renderResizeRight',
    value: function renderResizeRight(i) {
      var events = _DragInteraction2.default.getEvents();
      var config = { attributes: {
          style: 'position: absolute; height: 30px; width: 10px; top: 0; right: -2px',
          draggable: true
        } };
      var handler = this.resizeHandlers[i * 2 + 1];

      events.forEach(function (event) {
        config['on' + event] = handler[event].bind(handler);
      });

      return (0, _h2.default)('div.resize-handle.resize-e', config);
    }
  }, {
    key: 'renderControls',
    value: function renderControls(note, i) {
      var _this3 = this;

      // seems to be a bug with references, or I'm missing something.
      var that = this;
      return this.controls.map(function (ctrl) {
        return (0, _h2.default)('i.' + ctrl.class, {
          attributes: {
            title: ctrl.title
          },
          onclick: function onclick() {
            ctrl.action(note, i, that.annotations, {
              linkEndpoints: that.playlist.linkEndpoints
            });
            _this3.setupInteractions();
            that.playlist.drawRequest();
          }
        });
      });
    }
  }, {
    key: 'render',
    value: function render() {
      var _this4 = this;

      var boxes = (0, _h2.default)('div.annotations-boxes', {
        attributes: {
          style: 'height: 30px;'
        }
      }, this.annotations.map(function (note, i) {
        var samplesPerPixel = _this4.playlist.samplesPerPixel;
        var sampleRate = _this4.playlist.sampleRate;
        var pixPerSec = sampleRate / samplesPerPixel;
        var pixOffset = (0, _conversions.secondsToPixels)(_this4.playlist.scrollLeft, samplesPerPixel, sampleRate);
        var left = Math.floor(note.start * pixPerSec - pixOffset);
        var width = Math.ceil(note.end * pixPerSec - note.start * pixPerSec);

        return (0, _h2.default)('div.annotation-box', {
          attributes: {
            style: 'position: absolute; height: 30px; width: ' + width + 'px; left: ' + left + 'px',
            'data-id': note.id
          }
        }, [_this4.renderResizeLeft(i), (0, _h2.default)('span.id', {
          onclick: function onclick() {
            if (_this4.playlist.isContinuousPlay) {
              _this4.playlist.ee.emit('play', _this4.annotations[i].start);
            } else {
              _this4.playlist.ee.emit('play', _this4.annotations[i].start, _this4.annotations[i].end);
            }
          }
        }, [note.id]), _this4.renderResizeRight(i)]);
      }));

      var boxesWrapper = (0, _h2.default)('div.annotations-boxes-wrapper', {
        attributes: {
          style: 'overflow: hidden;'
        }
      }, [boxes]);

      var text = (0, _h2.default)('div.annotations-text', {
        hook: new _ScrollTopHook2.default()
      }, this.annotations.map(function (note, i) {
        var format = (0, _timeformat2.default)(_this4.playlist.durationFormat);
        var start = format(note.start);
        var end = format(note.end);

        var segmentClass = '';
        if (_this4.playlist.isPlaying() && _this4.playlist.playbackSeconds >= note.start && _this4.playlist.playbackSeconds <= note.end) {
          segmentClass = '.current';
        }

        var editableConfig = {
          attributes: {
            contenteditable: true
          },
          oninput: function oninput(e) {
            // needed currently for references
            // eslint-disable-next-line no-param-reassign
            note.lines = [e.target.innerText];
          },
          onkeypress: function onkeypress(e) {
            if (e.which === 13 || e.keyCode === 13) {
              e.target.blur();
              e.preventDefault();
            }
          }
        };

        var linesConfig = _this4.editable ? editableConfig : {};

        return (0, _h2.default)('div.annotation' + segmentClass, [(0, _h2.default)('span.annotation-id', [note.id]), (0, _h2.default)('span.annotation-start', [start]), (0, _h2.default)('span.annotation-end', [end]), (0, _h2.default)('span.annotation-lines', linesConfig, [note.lines]), (0, _h2.default)('span.annotation-actions', _this4.renderControls(note, i))]);
      }));

      return (0, _h2.default)('div.annotations', [boxesWrapper, text]);
    }
  }]);

  return AnnotationList;
}();

exports.default = AnnotationList;
},{"virtual-dom/h":"../../node_modules/virtual-dom/h.js","./input/aeneas":"../../node_modules/waveform-playlist/lib/annotation/input/aeneas.js","./output/aeneas":"../../node_modules/waveform-playlist/lib/annotation/output/aeneas.js","../utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js","../interaction/DragInteraction":"../../node_modules/waveform-playlist/lib/interaction/DragInteraction.js","./render/ScrollTopHook":"../../node_modules/waveform-playlist/lib/annotation/render/ScrollTopHook.js","../utils/timeformat":"../../node_modules/waveform-playlist/lib/utils/timeformat.js"}],"../../node_modules/waveform-playlist/lib/utils/recorderWorker.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  // http://jsperf.com/typed-array-min-max/2
  // plain for loop for finding min/max is way faster than anything else.
  /**
  * @param {TypedArray} array - Subarray of audio to calculate peaks from.
  */
  function findMinMax(array) {
    var min = Infinity;
    var max = -Infinity;
    var curr = void 0;

    for (var i = 0; i < array.length; i += 1) {
      curr = array[i];
      if (min > curr) {
        min = curr;
      }
      if (max < curr) {
        max = curr;
      }
    }

    return {
      min: min,
      max: max
    };
  }

  /**
  * @param {Number} n - peak to convert from float to Int8, Int16 etc.
  * @param {Number} bits - convert to #bits two's complement signed integer
  */
  function convert(n, bits) {
    var max = Math.pow(2, bits - 1);
    var v = n < 0 ? n * max : n * max - 1;
    return Math.max(-max, Math.min(max - 1, v));
  }

  /**
  * @param {TypedArray} channel - Audio track frames to calculate peaks from.
  * @param {Number} samplesPerPixel - Audio frames per peak
  */
  function extractPeaks(channel, samplesPerPixel, bits) {
    var chanLength = channel.length;
    var numPeaks = Math.ceil(chanLength / samplesPerPixel);
    var start = void 0;
    var end = void 0;
    var segment = void 0;
    var max = void 0;
    var min = void 0;
    var extrema = void 0;

    // create interleaved array of min,max
    var peaks = new self['Int' + bits + 'Array'](numPeaks * 2);

    for (var i = 0; i < numPeaks; i += 1) {
      start = i * samplesPerPixel;
      end = (i + 1) * samplesPerPixel > chanLength ? chanLength : (i + 1) * samplesPerPixel;

      segment = channel.subarray(start, end);
      extrema = findMinMax(segment);
      min = convert(extrema.min, bits);
      max = convert(extrema.max, bits);

      peaks[i * 2] = min;
      peaks[i * 2 + 1] = max;
    }

    return peaks;
  }

  /**
  * @param {TypedArray} source - Source of audio samples for peak calculations.
  * @param {Number} samplesPerPixel - Number of audio samples per peak.
  * @param {Number} cueIn - index in channel to start peak calculations from.
  * @param {Number} cueOut - index in channel to end peak calculations from (non-inclusive).
  */
  function audioPeaks(source) {
    var samplesPerPixel = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : 10000;
    var bits = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : 8;

    if ([8, 16, 32].indexOf(bits) < 0) {
      throw new Error('Invalid number of bits specified for peaks.');
    }

    var peaks = [];
    var start = 0;
    var end = source.length;
    peaks.push(extractPeaks(source.subarray(start, end), samplesPerPixel, bits));

    var length = peaks[0].length / 2;

    return {
      bits: bits,
      length: length,
      data: peaks
    };
  }

  onmessage = function onmessage(e) {
    var peaks = audioPeaks(e.data.samples, e.data.samplesPerPixel);

    postMessage(peaks);
  };
};
},{}],"../../node_modules/waveform-playlist/lib/utils/exportWavWorker.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

exports.default = function () {
  var recLength = 0;
  var recBuffersL = [];
  var recBuffersR = [];
  var sampleRate = void 0;

  function init(config) {
    sampleRate = config.sampleRate;
  }

  function record(inputBuffer) {
    recBuffersL.push(inputBuffer[0]);
    recBuffersR.push(inputBuffer[1]);
    recLength += inputBuffer[0].length;
  }

  function writeString(view, offset, string) {
    for (var i = 0; i < string.length; i += 1) {
      view.setUint8(offset + i, string.charCodeAt(i));
    }
  }

  function floatTo16BitPCM(output, offset, input) {
    var writeOffset = offset;
    for (var i = 0; i < input.length; i += 1, writeOffset += 2) {
      var s = Math.max(-1, Math.min(1, input[i]));
      output.setInt16(writeOffset, s < 0 ? s * 0x8000 : s * 0x7FFF, true);
    }
  }

  function encodeWAV(samples) {
    var mono = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;

    var buffer = new ArrayBuffer(44 + samples.length * 2);
    var view = new DataView(buffer);

    /* RIFF identifier */
    writeString(view, 0, 'RIFF');
    /* file length */
    view.setUint32(4, 32 + samples.length * 2, true);
    /* RIFF type */
    writeString(view, 8, 'WAVE');
    /* format chunk identifier */
    writeString(view, 12, 'fmt ');
    /* format chunk length */
    view.setUint32(16, 16, true);
    /* sample format (raw) */
    view.setUint16(20, 1, true);
    /* channel count */
    view.setUint16(22, mono ? 1 : 2, true);
    /* sample rate */
    view.setUint32(24, sampleRate, true);
    /* byte rate (sample rate * block align) */
    view.setUint32(28, sampleRate * 4, true);
    /* block align (channel count * bytes per sample) */
    view.setUint16(32, 4, true);
    /* bits per sample */
    view.setUint16(34, 16, true);
    /* data chunk identifier */
    writeString(view, 36, 'data');
    /* data chunk length */
    view.setUint32(40, samples.length * 2, true);

    floatTo16BitPCM(view, 44, samples);

    return view;
  }

  function mergeBuffers(recBuffers, length) {
    var result = new Float32Array(length);
    var offset = 0;

    for (var i = 0; i < recBuffers.length; i += 1) {
      result.set(recBuffers[i], offset);
      offset += recBuffers[i].length;
    }
    return result;
  }

  function interleave(inputL, inputR) {
    var length = inputL.length + inputR.length;
    var result = new Float32Array(length);

    var index = 0;
    var inputIndex = 0;

    while (index < length) {
      result[index += 1] = inputL[inputIndex];
      result[index += 1] = inputR[inputIndex];
      inputIndex += 1;
    }

    return result;
  }

  function exportWAV(type) {
    var bufferL = mergeBuffers(recBuffersL, recLength);
    var bufferR = mergeBuffers(recBuffersR, recLength);
    var interleaved = interleave(bufferL, bufferR);
    var dataview = encodeWAV(interleaved);
    var audioBlob = new Blob([dataview], { type: type });

    postMessage(audioBlob);
  }

  function clear() {
    recLength = 0;
    recBuffersL = [];
    recBuffersR = [];
  }

  onmessage = function onmessage(e) {
    switch (e.data.command) {
      case 'init':
        {
          init(e.data.config);
          break;
        }
      case 'record':
        {
          record(e.data.buffer);
          break;
        }
      case 'exportWAV':
        {
          exportWAV(e.data.type);
          break;
        }
      case 'clear':
        {
          clear();
          break;
        }
      default:
        {
          throw new Error('Unknown export worker command');
        }
    }
  };
};
},{}],"../../node_modules/waveform-playlist/lib/Playlist.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

var _lodash = require('lodash.defaults');

var _lodash2 = _interopRequireDefault(_lodash);

var _h = require('virtual-dom/h');

var _h2 = _interopRequireDefault(_h);

var _diff = require('virtual-dom/diff');

var _diff2 = _interopRequireDefault(_diff);

var _patch = require('virtual-dom/patch');

var _patch2 = _interopRequireDefault(_patch);

var _inlineWorker = require('inline-worker');

var _inlineWorker2 = _interopRequireDefault(_inlineWorker);

var _conversions = require('./utils/conversions');

var _LoaderFactory = require('./track/loader/LoaderFactory');

var _LoaderFactory2 = _interopRequireDefault(_LoaderFactory);

var _ScrollHook = require('./render/ScrollHook');

var _ScrollHook2 = _interopRequireDefault(_ScrollHook);

var _TimeScale = require('./TimeScale');

var _TimeScale2 = _interopRequireDefault(_TimeScale);

var _Track = require('./Track');

var _Track2 = _interopRequireDefault(_Track);

var _Playout = require('./Playout');

var _Playout2 = _interopRequireDefault(_Playout);

var _AnnotationList = require('./annotation/AnnotationList');

var _AnnotationList2 = _interopRequireDefault(_AnnotationList);

var _recorderWorker = require('./utils/recorderWorker');

var _recorderWorker2 = _interopRequireDefault(_recorderWorker);

var _exportWavWorker = require('./utils/exportWavWorker');

var _exportWavWorker2 = _interopRequireDefault(_exportWavWorker);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var _class = function () {
  function _class() {
    _classCallCheck(this, _class);

    this.tracks = [];
    this.soloedTracks = [];
    this.mutedTracks = [];
    this.playoutPromises = [];

    this.cursor = 0;
    this.playbackSeconds = 0;
    this.duration = 0;
    this.scrollLeft = 0;
    this.scrollTimer = undefined;
    this.showTimescale = false;
    // whether a user is scrolling the waveform
    this.isScrolling = false;

    this.fadeType = 'logarithmic';
    this.masterGain = 1;
    this.annotations = [];
    this.durationFormat = 'hh:mm:ss.uuu';
    this.isAutomaticScroll = false;
    this.resetDrawTimer = undefined;
  }

  // TODO extract into a plugin


  _createClass(_class, [{
    key: 'initExporter',
    value: function initExporter() {
      this.exportWorker = new _inlineWorker2.default(_exportWavWorker2.default);
    }

    // TODO extract into a plugin

  }, {
    key: 'initRecorder',
    value: function initRecorder(stream) {
      var _this = this;

      this.mediaRecorder = new window.MediaRecorder(stream);

      this.mediaRecorder.onstart = function () {
        var track = new _Track2.default();
        track.setName('Recording');
        track.setEnabledStates();
        track.setEventEmitter(_this.ee);

        _this.recordingTrack = track;
        _this.tracks.push(track);

        _this.chunks = [];
        _this.working = false;
      };

      this.mediaRecorder.ondataavailable = function (e) {
        _this.chunks.push(e.data);

        // throttle peaks calculation
        if (!_this.working) {
          var recording = new Blob(_this.chunks, { type: 'audio/ogg; codecs=opus' });
          var loader = _LoaderFactory2.default.createLoader(recording, _this.ac);
          loader.load().then(function (audioBuffer) {
            // ask web worker for peaks.
            _this.recorderWorker.postMessage({
              samples: audioBuffer.getChannelData(0),
              samplesPerPixel: _this.samplesPerPixel
            });
            _this.recordingTrack.setCues(0, audioBuffer.duration);
            _this.recordingTrack.setBuffer(audioBuffer);
            _this.recordingTrack.setPlayout(new _Playout2.default(_this.ac, audioBuffer));
            _this.adjustDuration();
          }).catch(function () {
            _this.working = false;
          });
          _this.working = true;
        }
      };

      this.mediaRecorder.onstop = function () {
        _this.chunks = [];
        _this.working = false;
      };

      this.recorderWorker = new _inlineWorker2.default(_recorderWorker2.default);
      // use a worker for calculating recording peaks.
      this.recorderWorker.onmessage = function (e) {
        _this.recordingTrack.setPeaks(e.data);
        _this.working = false;
        _this.drawRequest();
      };
    }
  }, {
    key: 'setShowTimeScale',
    value: function setShowTimeScale(show) {
      this.showTimescale = show;
    }
  }, {
    key: 'setMono',
    value: function setMono(mono) {
      this.mono = mono;
    }
  }, {
    key: 'setExclSolo',
    value: function setExclSolo(exclSolo) {
      this.exclSolo = exclSolo;
    }
  }, {
    key: 'setSeekStyle',
    value: function setSeekStyle(style) {
      this.seekStyle = style;
    }
  }, {
    key: 'getSeekStyle',
    value: function getSeekStyle() {
      return this.seekStyle;
    }
  }, {
    key: 'setSampleRate',
    value: function setSampleRate(sampleRate) {
      this.sampleRate = sampleRate;
    }
  }, {
    key: 'setSamplesPerPixel',
    value: function setSamplesPerPixel(samplesPerPixel) {
      this.samplesPerPixel = samplesPerPixel;
    }
  }, {
    key: 'setAudioContext',
    value: function setAudioContext(ac) {
      this.ac = ac;
    }
  }, {
    key: 'setControlOptions',
    value: function setControlOptions(controlOptions) {
      this.controls = controlOptions;
    }
  }, {
    key: 'setWaveHeight',
    value: function setWaveHeight(height) {
      this.waveHeight = height;
    }
  }, {
    key: 'setColors',
    value: function setColors(colors) {
      this.colors = colors;
    }
  }, {
    key: 'setAnnotations',
    value: function setAnnotations(config) {
      this.annotationList = new _AnnotationList2.default(this, config.annotations, config.controls, config.editable, config.linkEndpoints, config.isContinuousPlay);
    }
  }, {
    key: 'setEventEmitter',
    value: function setEventEmitter(ee) {
      this.ee = ee;
    }
  }, {
    key: 'getEventEmitter',
    value: function getEventEmitter() {
      return this.ee;
    }
  }, {
    key: 'setUpEventEmitter',
    value: function setUpEventEmitter() {
      var _this2 = this;

      var ee = this.ee;

      ee.on('automaticscroll', function (val) {
        _this2.isAutomaticScroll = val;
      });

      ee.on('durationformat', function (format) {
        _this2.durationFormat = format;
        _this2.drawRequest();
      });

      ee.on('select', function (start, end, track) {
        if (_this2.isPlaying()) {
          _this2.lastSeeked = start;
          _this2.pausedAt = undefined;
          _this2.restartPlayFrom(start);
        } else {
          // reset if it was paused.
          _this2.seek(start, end, track);
          _this2.ee.emit('timeupdate', start);
          _this2.drawRequest();
        }
      });

      ee.on('startaudiorendering', function (type) {
        _this2.startOfflineRender(type);
      });

      ee.on('statechange', function (state) {
        _this2.setState(state);
        _this2.drawRequest();
      });

      ee.on('shift', function (deltaTime, track) {
        track.setStartTime(track.getStartTime() + deltaTime);
        _this2.adjustDuration();
        _this2.drawRequest();
      });

      ee.on('record', function () {
        _this2.record();
      });

      ee.on('play', function (start, end) {
        _this2.play(start, end);
      });

      ee.on('pause', function () {
        _this2.pause();
      });

      ee.on('stop', function () {
        _this2.stop();
      });

      ee.on('rewind', function () {
        _this2.rewind();
      });

      ee.on('fastforward', function () {
        _this2.fastForward();
      });

      ee.on('clear', function () {
        _this2.clear().then(function () {
          _this2.drawRequest();
        });
      });

      ee.on('solo', function (track) {
        _this2.soloTrack(track);
        _this2.adjustTrackPlayout();
        _this2.drawRequest();
      });

      ee.on('mute', function (track) {
        _this2.muteTrack(track);
        _this2.adjustTrackPlayout();
        _this2.drawRequest();
      });

      ee.on('volumechange', function (volume, track) {
        track.setGainLevel(volume / 100);
      });

      ee.on('mastervolumechange', function (volume) {
        _this2.masterGain = volume / 100;
        _this2.tracks.forEach(function (track) {
          track.setMasterGainLevel(_this2.masterGain);
        });
      });

      ee.on('fadein', function (duration, track) {
        track.setFadeIn(duration, _this2.fadeType);
        _this2.drawRequest();
      });

      ee.on('fadeout', function (duration, track) {
        track.setFadeOut(duration, _this2.fadeType);
        _this2.drawRequest();
      });

      ee.on('stereopan', function (panvalue, track) {
        track.setStereoPanValue(panvalue);
      });

      ee.on('fadetype', function (type) {
        _this2.fadeType = type;
      });

      ee.on('newtrack', function (file) {
        _this2.load([{
          src: file,
          name: file.name
        }]);
      });

      ee.on('trim', function () {
        var track = _this2.getActiveTrack();
        var timeSelection = _this2.getTimeSelection();

        track.trim(timeSelection.start, timeSelection.end);
        track.calculatePeaks(_this2.samplesPerPixel, _this2.sampleRate);

        _this2.setTimeSelection(0, 0);
        _this2.drawRequest();
      });

      ee.on('zoomin', function () {
        var zoomIndex = Math.max(0, _this2.zoomIndex - 1);
        var zoom = _this2.zoomLevels[zoomIndex];

        if (zoom !== _this2.samplesPerPixel) {
          _this2.setZoom(zoom);
          _this2.drawRequest();
        }
      });

      ee.on('zoomout', function () {
        var zoomIndex = Math.min(_this2.zoomLevels.length - 1, _this2.zoomIndex + 1);
        var zoom = _this2.zoomLevels[zoomIndex];

        if (zoom !== _this2.samplesPerPixel) {
          _this2.setZoom(zoom);
          _this2.drawRequest();
        }
      });

      ee.on('scroll', function () {
        _this2.isScrolling = true;
        _this2.drawRequest();
        clearTimeout(_this2.scrollTimer);
        _this2.scrollTimer = setTimeout(function () {
          _this2.isScrolling = false;
        }, 200);
      });
    }
  }, {
    key: 'load',
    value: function load(trackList) {
      var _this3 = this;

      var loadPromises = trackList.map(function (trackInfo) {
        var loader = _LoaderFactory2.default.createLoader(trackInfo.src, _this3.ac, _this3.ee);
        return loader.load();
      });

      return Promise.all(loadPromises).then(function (audioBuffers) {
        _this3.ee.emit('audiosourcesloaded');

        var tracks = audioBuffers.map(function (audioBuffer, index) {
          var info = trackList[index];
          var name = info.name || 'Untitled';
          var start = info.start || 0;
          var states = info.states || {};
          var fadeIn = info.fadeIn;
          var fadeOut = info.fadeOut;
          var cueIn = info.cuein || 0;
          var cueOut = info.cueout || audioBuffer.duration;
          var gain = info.gain || 1;
          var muted = info.muted || false;
          var soloed = info.soloed || false;
          var selection = info.selected;
          var peaks = info.peaks || { type: 'WebAudio', mono: _this3.mono };
          var customClass = info.customClass || undefined;
          var waveOutlineColor = info.waveOutlineColor || undefined;
          var stereoPan = info.stereoPan || 0;

          // webaudio specific playout for now.
          var playout = new _Playout2.default(_this3.ac, audioBuffer);

          var track = new _Track2.default();
          track.src = info.src;
          track.setBuffer(audioBuffer);
          track.setName(name);
          track.setEventEmitter(_this3.ee);
          track.setEnabledStates(states);
          track.setCues(cueIn, cueOut);
          track.setCustomClass(customClass);
          track.setWaveOutlineColor(waveOutlineColor);

          if (fadeIn !== undefined) {
            track.setFadeIn(fadeIn.duration, fadeIn.shape);
          }

          if (fadeOut !== undefined) {
            track.setFadeOut(fadeOut.duration, fadeOut.shape);
          }

          if (selection !== undefined) {
            _this3.setActiveTrack(track);
            _this3.setTimeSelection(selection.start, selection.end);
          }

          if (peaks !== undefined) {
            track.setPeakData(peaks);
          }

          track.setState(_this3.getState());
          track.setStartTime(start);
          track.setPlayout(playout);

          track.setGainLevel(gain);
          track.setStereoPanValue(stereoPan);

          if (muted) {
            _this3.muteTrack(track);
          }

          if (soloed) {
            _this3.soloTrack(track);
          }

          // extract peaks with AudioContext for now.
          track.calculatePeaks(_this3.samplesPerPixel, _this3.sampleRate);

          return track;
        });

        _this3.tracks = _this3.tracks.concat(tracks);
        _this3.adjustDuration();
        _this3.draw(_this3.render());

        _this3.ee.emit('audiosourcesrendered');
      }).catch(function (e) {
        _this3.ee.emit('audiosourceserror', e);
      });
    }

    /*
      track instance of Track.
    */

  }, {
    key: 'setActiveTrack',
    value: function setActiveTrack(track) {
      this.activeTrack = track;
    }
  }, {
    key: 'getActiveTrack',
    value: function getActiveTrack() {
      return this.activeTrack;
    }
  }, {
    key: 'isSegmentSelection',
    value: function isSegmentSelection() {
      return this.timeSelection.start !== this.timeSelection.end;
    }

    /*
      start, end in seconds.
    */

  }, {
    key: 'setTimeSelection',
    value: function setTimeSelection() {
      var start = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : 0;
      var end = arguments[1];

      this.timeSelection = {
        start: start,
        end: end === undefined ? start : end
      };

      this.cursor = start;
    }
  }, {
    key: 'startOfflineRender',
    value: function startOfflineRender(type) {
      var _this4 = this;

      if (this.isRendering) {
        return;
      }

      this.isRendering = true;
      this.offlineAudioContext = new OfflineAudioContext(2, 44100 * this.duration, 44100);

      var currentTime = this.offlineAudioContext.currentTime;

      this.tracks.forEach(function (track) {
        track.setOfflinePlayout(new _Playout2.default(_this4.offlineAudioContext, track.buffer));
        track.schedulePlay(currentTime, 0, 0, {
          shouldPlay: _this4.shouldTrackPlay(track),
          masterGain: 1,
          isOffline: true
        });
      });

      /*
        TODO cleanup of different audio playouts handling.
      */
      this.offlineAudioContext.startRendering().then(function (audioBuffer) {
        if (type === 'buffer') {
          _this4.ee.emit('audiorenderingfinished', type, audioBuffer);
          _this4.isRendering = false;
          return;
        }

        if (type === 'wav') {
          _this4.exportWorker.postMessage({
            command: 'init',
            config: {
              sampleRate: 44100
            }
          });

          // callback for `exportWAV`
          _this4.exportWorker.onmessage = function (e) {
            _this4.ee.emit('audiorenderingfinished', type, e.data);
            _this4.isRendering = false;

            // clear out the buffer for next renderings.
            _this4.exportWorker.postMessage({
              command: 'clear'
            });
          };

          // send the channel data from our buffer to the worker
          _this4.exportWorker.postMessage({
            command: 'record',
            buffer: [audioBuffer.getChannelData(0), audioBuffer.getChannelData(1)]
          });

          // ask the worker for a WAV
          _this4.exportWorker.postMessage({
            command: 'exportWAV',
            type: 'audio/wav'
          });
        }
      }).catch(function (e) {
        throw e;
      });
    }
  }, {
    key: 'getTimeSelection',
    value: function getTimeSelection() {
      return this.timeSelection;
    }
  }, {
    key: 'setState',
    value: function setState(state) {
      this.state = state;

      this.tracks.forEach(function (track) {
        track.setState(state);
      });
    }
  }, {
    key: 'getState',
    value: function getState() {
      return this.state;
    }
  }, {
    key: 'setZoomIndex',
    value: function setZoomIndex(index) {
      this.zoomIndex = index;
    }
  }, {
    key: 'setZoomLevels',
    value: function setZoomLevels(levels) {
      this.zoomLevels = levels;
    }
  }, {
    key: 'setZoom',
    value: function setZoom(zoom) {
      var _this5 = this;

      this.samplesPerPixel = zoom;
      this.zoomIndex = this.zoomLevels.indexOf(zoom);
      this.tracks.forEach(function (track) {
        track.calculatePeaks(zoom, _this5.sampleRate);
      });
    }
  }, {
    key: 'muteTrack',
    value: function muteTrack(track) {
      var index = this.mutedTracks.indexOf(track);

      if (index > -1) {
        this.mutedTracks.splice(index, 1);
      } else {
        this.mutedTracks.push(track);
      }
    }
  }, {
    key: 'soloTrack',
    value: function soloTrack(track) {
      var index = this.soloedTracks.indexOf(track);

      if (index > -1) {
        this.soloedTracks.splice(index, 1);
      } else if (this.exclSolo) {
        this.soloedTracks = [track];
      } else {
        this.soloedTracks.push(track);
      }
    }
  }, {
    key: 'adjustTrackPlayout',
    value: function adjustTrackPlayout() {
      var _this6 = this;

      this.tracks.forEach(function (track) {
        track.setShouldPlay(_this6.shouldTrackPlay(track));
      });
    }
  }, {
    key: 'adjustDuration',
    value: function adjustDuration() {
      this.duration = this.tracks.reduce(function (duration, track) {
        return Math.max(duration, track.getEndTime());
      }, 0);
    }
  }, {
    key: 'shouldTrackPlay',
    value: function shouldTrackPlay(track) {
      var shouldPlay = void 0;
      // if there are solo tracks, only they should play.
      if (this.soloedTracks.length > 0) {
        shouldPlay = false;
        if (this.soloedTracks.indexOf(track) > -1) {
          shouldPlay = true;
        }
      } else {
        // play all tracks except any muted tracks.
        shouldPlay = true;
        if (this.mutedTracks.indexOf(track) > -1) {
          shouldPlay = false;
        }
      }

      return shouldPlay;
    }
  }, {
    key: 'isPlaying',
    value: function isPlaying() {
      return this.tracks.reduce(function (isPlaying, track) {
        return isPlaying || track.isPlaying();
      }, false);
    }

    /*
    *   returns the current point of time in the playlist in seconds.
    */

  }, {
    key: 'getCurrentTime',
    value: function getCurrentTime() {
      var cursorPos = this.lastSeeked || this.pausedAt || this.cursor;

      return cursorPos + this.getElapsedTime();
    }
  }, {
    key: 'getElapsedTime',
    value: function getElapsedTime() {
      return this.ac.currentTime - this.lastPlay;
    }
  }, {
    key: 'setMasterGain',
    value: function setMasterGain(gain) {
      this.ee.emit('mastervolumechange', gain);
    }
  }, {
    key: 'restartPlayFrom',
    value: function restartPlayFrom(start, end) {
      this.stopAnimation();

      this.tracks.forEach(function (editor) {
        editor.scheduleStop();
      });

      return Promise.all(this.playoutPromises).then(this.play.bind(this, start, end));
    }
  }, {
    key: 'play',
    value: function play(startTime, endTime) {
      var _this7 = this;

      clearTimeout(this.resetDrawTimer);

      var currentTime = this.ac.currentTime;
      var selected = this.getTimeSelection();
      var playoutPromises = [];

      var start = startTime || this.pausedAt || this.cursor;
      var end = endTime;

      if (!end && selected.end !== selected.start && selected.end > start) {
        end = selected.end;
      }

      if (this.isPlaying()) {
        return this.restartPlayFrom(start, end);
      }

      this.tracks.forEach(function (track) {
        track.setState('cursor');
        playoutPromises.push(track.schedulePlay(currentTime, start, end, {
          shouldPlay: _this7.shouldTrackPlay(track),
          masterGain: _this7.masterGain
        }));
      });

      this.lastPlay = currentTime;
      // use these to track when the playlist has fully stopped.
      this.playoutPromises = playoutPromises;
      this.startAnimation(start);

      return Promise.all(this.playoutPromises);
    }
  }, {
    key: 'pause',
    value: function pause() {
      if (!this.isPlaying()) {
        return Promise.all(this.playoutPromises);
      }

      this.pausedAt = this.getCurrentTime();
      return this.playbackReset();
    }
  }, {
    key: 'stop',
    value: function stop() {
      if (this.mediaRecorder && this.mediaRecorder.state === 'recording') {
        this.mediaRecorder.stop();
      }

      this.pausedAt = undefined;
      this.playbackSeconds = 0;
      return this.playbackReset();
    }
  }, {
    key: 'playbackReset',
    value: function playbackReset() {
      var _this8 = this;

      this.lastSeeked = undefined;
      this.stopAnimation();

      this.tracks.forEach(function (track) {
        track.scheduleStop();
        track.setState(_this8.getState());
      });

      this.drawRequest();
      return Promise.all(this.playoutPromises);
    }
  }, {
    key: 'rewind',
    value: function rewind() {
      var _this9 = this;

      return this.stop().then(function () {
        _this9.scrollLeft = 0;
        _this9.ee.emit('select', 0, 0);
      });
    }
  }, {
    key: 'fastForward',
    value: function fastForward() {
      var _this10 = this;

      return this.stop().then(function () {
        if (_this10.viewDuration < _this10.duration) {
          _this10.scrollLeft = _this10.duration - _this10.viewDuration;
        } else {
          _this10.scrollLeft = 0;
        }

        _this10.ee.emit('select', _this10.duration, _this10.duration);
      });
    }
  }, {
    key: 'clear',
    value: function clear() {
      var _this11 = this;

      return this.stop().then(function () {
        _this11.tracks = [];
        _this11.soloedTracks = [];
        _this11.mutedTracks = [];
        _this11.playoutPromises = [];

        _this11.cursor = 0;
        _this11.playbackSeconds = 0;
        _this11.duration = 0;
        _this11.scrollLeft = 0;

        _this11.seek(0, 0, undefined);
      });
    }
  }, {
    key: 'record',
    value: function record() {
      var _this12 = this;

      var playoutPromises = [];
      this.mediaRecorder.start(300);

      this.tracks.forEach(function (track) {
        track.setState('none');
        playoutPromises.push(track.schedulePlay(_this12.ac.currentTime, 0, undefined, {
          shouldPlay: _this12.shouldTrackPlay(track)
        }));
      });

      this.playoutPromises = playoutPromises;
    }
  }, {
    key: 'startAnimation',
    value: function startAnimation(startTime) {
      var _this13 = this;

      this.lastDraw = this.ac.currentTime;
      this.animationRequest = window.requestAnimationFrame(function () {
        _this13.updateEditor(startTime);
      });
    }
  }, {
    key: 'stopAnimation',
    value: function stopAnimation() {
      window.cancelAnimationFrame(this.animationRequest);
      this.lastDraw = undefined;
    }
  }, {
    key: 'seek',
    value: function seek(start, end, track) {
      if (this.isPlaying()) {
        this.lastSeeked = start;
        this.pausedAt = undefined;
        this.restartPlayFrom(start);
      } else {
        // reset if it was paused.
        this.setActiveTrack(track || this.tracks[0]);
        this.pausedAt = start;
        this.setTimeSelection(start, end);
        if (this.getSeekStyle() === 'fill') {
          this.playbackSeconds = start;
        }
      }
    }

    /*
    * Animation function for the playlist.
    * Keep under 16.7 milliseconds based on a typical screen refresh rate of 60fps.
    */

  }, {
    key: 'updateEditor',
    value: function updateEditor(cursor) {
      var _this14 = this;

      var currentTime = this.ac.currentTime;
      var selection = this.getTimeSelection();
      var cursorPos = cursor || this.cursor;
      var elapsed = currentTime - this.lastDraw;

      if (this.isPlaying()) {
        var playbackSeconds = cursorPos + elapsed;
        this.ee.emit('timeupdate', playbackSeconds);
        this.animationRequest = window.requestAnimationFrame(function () {
          _this14.updateEditor(playbackSeconds);
        });

        this.playbackSeconds = playbackSeconds;
        this.draw(this.render());
        this.lastDraw = currentTime;
      } else {
        if (cursorPos + elapsed >= (this.isSegmentSelection() ? selection.end : this.duration)) {
          this.ee.emit('finished');
        }

        this.stopAnimation();

        this.resetDrawTimer = setTimeout(function () {
          _this14.pausedAt = undefined;
          _this14.lastSeeked = undefined;
          _this14.setState(_this14.getState());

          _this14.playbackSeconds = 0;
          _this14.draw(_this14.render());
        }, 0);
      }
    }
  }, {
    key: 'drawRequest',
    value: function drawRequest() {
      var _this15 = this;

      window.requestAnimationFrame(function () {
        _this15.draw(_this15.render());
      });
    }
  }, {
    key: 'draw',
    value: function draw(newTree) {
      var patches = (0, _diff2.default)(this.tree, newTree);
      this.rootNode = (0, _patch2.default)(this.rootNode, patches);
      this.tree = newTree;

      // use for fast forwarding.
      this.viewDuration = (0, _conversions.pixelsToSeconds)(this.rootNode.clientWidth - this.controls.width, this.samplesPerPixel, this.sampleRate);
    }
  }, {
    key: 'getTrackRenderData',
    value: function getTrackRenderData() {
      var data = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};

      var defaults = {
        height: this.waveHeight,
        resolution: this.samplesPerPixel,
        sampleRate: this.sampleRate,
        controls: this.controls,
        isActive: false,
        timeSelection: this.getTimeSelection(),
        playlistLength: this.duration,
        playbackSeconds: this.playbackSeconds,
        colors: this.colors
      };

      return (0, _lodash2.default)(data, defaults);
    }
  }, {
    key: 'isActiveTrack',
    value: function isActiveTrack(track) {
      var activeTrack = this.getActiveTrack();

      if (this.isSegmentSelection()) {
        return activeTrack === track;
      }

      return true;
    }
  }, {
    key: 'renderAnnotations',
    value: function renderAnnotations() {
      return this.annotationList.render();
    }
  }, {
    key: 'renderTimeScale',
    value: function renderTimeScale() {
      var controlWidth = this.controls.show ? this.controls.width : 0;
      var timeScale = new _TimeScale2.default(this.duration, this.scrollLeft, this.samplesPerPixel, this.sampleRate, controlWidth, this.colors);

      return timeScale.render();
    }
  }, {
    key: 'renderTrackSection',
    value: function renderTrackSection() {
      var _this16 = this;

      var trackElements = this.tracks.map(function (track) {
        return track.render(_this16.getTrackRenderData({
          isActive: _this16.isActiveTrack(track),
          shouldPlay: _this16.shouldTrackPlay(track),
          soloed: _this16.soloedTracks.indexOf(track) > -1,
          muted: _this16.mutedTracks.indexOf(track) > -1
        }));
      });

      return (0, _h2.default)('div.playlist-tracks', {
        attributes: {
          style: 'overflow: auto;'
        },
        onscroll: function onscroll(e) {
          _this16.scrollLeft = (0, _conversions.pixelsToSeconds)(e.target.scrollLeft, _this16.samplesPerPixel, _this16.sampleRate);

          _this16.ee.emit('scroll', _this16.scrollLeft);
        },
        hook: new _ScrollHook2.default(this)
      }, trackElements);
    }
  }, {
    key: 'render',
    value: function render() {
      var containerChildren = [];

      if (this.showTimescale) {
        containerChildren.push(this.renderTimeScale());
      }

      containerChildren.push(this.renderTrackSection());

      if (this.annotationList.length) {
        containerChildren.push(this.renderAnnotations());
      }

      return (0, _h2.default)('div.playlist', {
        attributes: {
          style: 'overflow: hidden; position: relative;'
        }
      }, containerChildren);
    }
  }, {
    key: 'getInfo',
    value: function getInfo() {
      var info = [];

      this.tracks.forEach(function (track) {
        info.push(track.getTrackDetails());
      });

      return info;
    }
  }]);

  return _class;
}();

exports.default = _class;
},{"lodash.defaults":"../../node_modules/lodash.defaults/index.js","virtual-dom/h":"../../node_modules/virtual-dom/h.js","virtual-dom/diff":"../../node_modules/virtual-dom/diff.js","virtual-dom/patch":"../../node_modules/virtual-dom/patch.js","inline-worker":"../../node_modules/inline-worker/index.js","./utils/conversions":"../../node_modules/waveform-playlist/lib/utils/conversions.js","./track/loader/LoaderFactory":"../../node_modules/waveform-playlist/lib/track/loader/LoaderFactory.js","./render/ScrollHook":"../../node_modules/waveform-playlist/lib/render/ScrollHook.js","./TimeScale":"../../node_modules/waveform-playlist/lib/TimeScale.js","./Track":"../../node_modules/waveform-playlist/lib/Track.js","./Playout":"../../node_modules/waveform-playlist/lib/Playout.js","./annotation/AnnotationList":"../../node_modules/waveform-playlist/lib/annotation/AnnotationList.js","./utils/recorderWorker":"../../node_modules/waveform-playlist/lib/utils/recorderWorker.js","./utils/exportWavWorker":"../../node_modules/waveform-playlist/lib/utils/exportWavWorker.js"}],"../../node_modules/waveform-playlist/lib/app.js":[function(require,module,exports) {
'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.init = init;

exports.default = function () {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ee = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _eventEmitter2.default)();

  return init(options, ee);
};

var _lodash = require('lodash.assign');

var _lodash2 = _interopRequireDefault(_lodash);

var _createElement = require('virtual-dom/create-element');

var _createElement2 = _interopRequireDefault(_createElement);

var _eventEmitter = require('event-emitter');

var _eventEmitter2 = _interopRequireDefault(_eventEmitter);

var _Playlist = require('./Playlist');

var _Playlist2 = _interopRequireDefault(_Playlist);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function init() {
  var options = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : {};
  var ee = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : (0, _eventEmitter2.default)();

  if (options.container === undefined) {
    throw new Error('DOM element container must be given.');
  }

  window.OfflineAudioContext = window.OfflineAudioContext || window.webkitOfflineAudioContext;
  window.AudioContext = window.AudioContext || window.webkitAudioContext;

  var audioContext = new window.AudioContext();

  var defaults = {
    ac: audioContext,
    sampleRate: audioContext.sampleRate,
    samplesPerPixel: 4096,
    mono: true,
    fadeType: 'logarithmic',
    exclSolo: false,
    timescale: false,
    controls: {
      show: false,
      width: 150
    },
    colors: {
      waveOutlineColor: 'white',
      timeColor: 'grey',
      fadeColor: 'black'
    },
    seekStyle: 'line',
    waveHeight: 128,
    state: 'cursor',
    zoomLevels: [512, 1024, 2048, 4096],
    annotationList: {
      annotations: [],
      controls: [],
      editable: false,
      linkEndpoints: false,
      isContinuousPlay: false
    },
    isAutomaticScroll: false
  };

  var config = (0, _lodash2.default)(defaults, options);
  var zoomIndex = config.zoomLevels.indexOf(config.samplesPerPixel);

  if (zoomIndex === -1) {
    throw new Error('initial samplesPerPixel must be included in array zoomLevels');
  }

  var playlist = new _Playlist2.default();
  playlist.setSampleRate(config.sampleRate);
  playlist.setSamplesPerPixel(config.samplesPerPixel);
  playlist.setAudioContext(config.ac);
  playlist.setEventEmitter(ee);
  playlist.setUpEventEmitter();
  playlist.setTimeSelection(0, 0);
  playlist.setState(config.state);
  playlist.setControlOptions(config.controls);
  playlist.setWaveHeight(config.waveHeight);
  playlist.setColors(config.colors);
  playlist.setZoomLevels(config.zoomLevels);
  playlist.setZoomIndex(zoomIndex);
  playlist.setMono(config.mono);
  playlist.setExclSolo(config.exclSolo);
  playlist.setShowTimeScale(config.timescale);
  playlist.setSeekStyle(config.seekStyle);
  playlist.setAnnotations(config.annotationList);
  playlist.isAutomaticScroll = config.isAutomaticScroll;
  playlist.isContinuousPlay = config.isContinuousPlay;
  playlist.linkedEndpoints = config.linkedEndpoints;

  // take care of initial virtual dom rendering.
  var tree = playlist.render();
  var rootNode = (0, _createElement2.default)(tree);

  config.container.appendChild(rootNode);
  playlist.tree = tree;
  playlist.rootNode = rootNode;

  return playlist;
}
},{"lodash.assign":"../../node_modules/lodash.assign/index.js","virtual-dom/create-element":"../../node_modules/virtual-dom/create-element.js","event-emitter":"../../node_modules/event-emitter/index.js","./Playlist":"../../node_modules/waveform-playlist/lib/Playlist.js"}],"views.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.TrainingView = exports.CreateTaskChooseSentenceView = exports.CreateTaskRandomView = exports.AudioEditorView = exports.CreateSentenceFormView = exports.SignupFormView = exports.LoginFormView = exports.DataParserView = exports.AlertView = exports.LogoutView = void 0;

var _diff = require("diff");

var _sentencetable = require("./templates/sentencetable");

var _waveformPlaylist = _interopRequireDefault(require("waveform-playlist"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

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
    this.elementGroups[groupName].forEach(elementName => this.showElement(elementName));
  }

  hideGroup(groupName) {
    this.elementGroups[groupName].forEach(elementName => this.hideElement(elementName));
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

  eventOnRoot(event, callback) {
    this.root.addEventListener(event, e => {
      callback();
    });
  }

} // FORMS


class FormView extends View {
  onFormData(callback) {
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

  clearFormData() {
    const inputs = Array.from(this.root.querySelectorAll('input'));
    inputs.forEach(el => {
      el.value = '';
    });
  }

} // GENERIC DOM MANIP


class LogoutView extends View {}

exports.LogoutView = LogoutView;

class AlertView extends View {
  static hide() {
    const el = document.querySelector('.alert');
    if (el) el.parentElement.removeChild(el);
  } // type is 'success' or 'error'
  // returns a promise (that resolves when the alert is hidden by timeout)


  static show(type, msg) {
    this.hide();
    const markup = "<div class=\"alert alert--".concat(type, "\">").concat(msg, "</div>");
    document.querySelector('body').insertAdjacentHTML('afterbegin', markup);
    return new Promise((resolve, reject) => {
      window.setTimeout(() => {
        this.hide();
        resolve();
      }, 3000);
    });
  }

}

exports.AlertView = AlertView;

window.onerror = err => AlertView.show('error', err);

class DataParserView extends View {
  static get(input_name) {
    return JSON.parse(document.querySelector(".js-value[name=\"".concat(input_name, "\"]")).value);
  }

} // AUTH VIEWS -----------


exports.DataParserView = DataParserView;

class LoginFormView extends FormView {}

exports.LoginFormView = LoginFormView;

class SignupFormView extends FormView {} // CREATE SENTENCE VIEWS --------


exports.SignupFormView = SignupFormView;

class CreateSentenceFormView extends FormView {}

exports.CreateSentenceFormView = CreateSentenceFormView;

class AudioEditorView extends View {
  constructor(element) {
    super(element); // gnarly, awkward workaround for the fact that WaveformPlaylist uses eval for something that could have been a member access on window
    // but, we can technically replace `eval` with a function that invokes member access on window, so... that kind of works?

    window.eval = str => window[str];

    this.elements.save = this.root.querySelector('.save-button');
    this.elements.record = this.root.querySelector('.record-button');
    this.elements.save.addEventListener('click', () => {
      this.ee.emit('startaudiorendering', 'buffer');
    });
    this.elements.record.addEventListener('click', () => {
      try {
        this.ee.emit('record');
      } catch (err) {
        AlertView.show('success', err.stack);
      }
    });
    this.setupEditor();
  }

  setupEditor() {
    this.playlist = (0, _waveformPlaylist.default)({
      container: this.root.querySelector('.TEST-audio-editor'),
      state: 'select'
    });
    this.ee = this.playlist.getEventEmitter(); //navigator.mediaDevices.getUserMedia({audio:true}).then(stream => this.playlist.initRecorder(stream))

    this.playlist.load([{
      src: "/heather-test-audio.mp3"
    }]).then(() => {
      this.ee.emit('zoomin');
      this.ee.emit('zoomin');
    });
    document.addEventListener('keydown', evt => {
      if (evt.key == '\\') {
        evt.preventDefault();
        this.ee.emit('play');
      }

      if (evt.key == '/') {
        evt.preventDefault();
        this.ee.emit('select', 0.5, 2.5); //ee.emit('statechange', 'select');
      }
    });
    this.ee.on('select', (start, end, track) => {
      this.start = start;
      this.end = end;
    });
    this.ee.on('audiorenderingfinished', (type, data) => {
      //AlertView.show('success', `${type}: ${data.__proto__.constructor.name}[${data.length/data.sampleRate}]`)
      try {
        const start = Math.floor(this.start * data.sampleRate) || 0;
        const length = (this.end ? Math.floor(this.end * data.sampleRate) : data.length) - start;
        const chan = data.getChannelData(0).slice(start);
        const sampleRate = data.sampleRate;
        const seconds = this.end - this.start;
        const buf = new AudioBuffer({
          length,
          sampleRate
        }); //AlertView.show('success', `${type}: ${data.__proto__.constructor.name}[${buf.length/buf.sampleRate}]\n${data.length}\n${chan.length}\n${buf.length}`)

        buf.copyToChannel(chan, 0);
        return;
        this.playlist.load([{
          src: buf
        }]);
      } catch (err) {
        AlertView.show('error', err);
      }
    });
  }

} // CREATE TASK VIEWS --------


exports.AudioEditorView = AudioEditorView;

class CreateTaskView extends View {
  getValues(selector) {
    const nonToggleInputs = Array.from(this.root.querySelectorAll("".concat(selector)));
    const data = {};
    nonToggleInputs.forEach(el => {
      const name = el.name;

      if (el.value) {
        data[name] = el.value;
      }
    });
    return data;
  }

}

class CreateTaskRandomView extends CreateTaskView {
  constructor(element) {
    super(element); //Get inputs (.elements name must match their corresponding switch's name)

    _defineProperty(this, "onCreateTaskRandomValues", callback => {
      this.root.addEventListener('submit', e => {
        e.preventDefault();
        const vivaRefRes = this.getUpperLower(this.elements.switches.vivaRefLow[0], this.elements.switches.vivaRefHigh[0], 'vivaRef');
        const levelRes = this.getUpperLower(this.elements.switches.levelLow[0], this.elements.switches.levelHigh[0], 'level');
        const nonToggleValues = this.getValues('.sentence-details');

        const paramsObject = _objectSpread(_objectSpread(_objectSpread({}, vivaRefRes), levelRes), nonToggleValues);

        const params = new URLSearchParams(paramsObject);
        const searchParams = decodeURIComponent(params.toString());
        const taskDetails = this.getValues('.task-details');
        callback(searchParams, taskDetails);
      });
    });

    _defineProperty(this, "showHide", el => {
      if (el.checked) {
        this.showElement(el.name);
      } else {
        this.hideElement(el.name);
      }
    });

    this.elements.vivaRefLow = this.root.querySelector('.vivaref-low');
    this.elements.vivaRefHigh = this.root.querySelector('.vivaref-high');
    this.elements.levelLow = this.root.querySelector('.level-low');
    this.elements.levelHigh = this.root.querySelector('.level-high');
    this.elements.switches = {};
    this.elements.switches.vivaRefLow = this.root.querySelector('.check-vivaref-low').getElementsByTagName('input');
    this.elements.switches.vivaRefHigh = this.root.querySelector('.check-vivaref-high').getElementsByTagName('input');
    this.elements.switches.levelLow = this.root.querySelector('.check-level-low').getElementsByTagName('input');
    this.elements.switches.levelHigh = this.root.querySelector('.check-level-high').getElementsByTagName('input');
    const switches = Array.from(this.root.querySelectorAll('input[type=checkbox]')); //Prep DOM

    switches.forEach(e => this.showHide(e)); //Add event listener for change

    switches.forEach(e => {
      e.addEventListener('change', e => this.showHide(e.srcElement));
    });
  } //Function to return form data on submit


  getUpperLower(checkOne, checkTwo, searchParam) {
    const lowerValue = this.elements[checkOne.name].value;
    const higherValue = this.elements[checkTwo.name].value;

    if (checkTwo.checked) {
      const res = "{\"".concat(searchParam, "[gte]\": ").concat(lowerValue, ",\n\t\t  \"").concat(searchParam, "[lte]\": ").concat(higherValue, "}");
      return JSON.parse(res);
    } else if (checkOne.checked) {
      const res = JSON.parse("{\"".concat(searchParam, "\" : ").concat(lowerValue, "}"));
      return res;
    } else {
      return null;
    }
  }

}

exports.CreateTaskRandomView = CreateTaskRandomView;

class CreateTaskChooseSentenceView extends CreateTaskView {
  constructor(element) {
    super(element);
    this.elements.tableParent = this.root.querySelector('.sentence-table-holder');
    this.elements.saveButton = this.root.querySelector('button.set-tasks-button-choose-sentences');
    this.getFilterElements().forEach(el => {
      el.addEventListener('change', this.updateFilters.bind(this));
    });
    this.elements.saveButton.addEventListener('click', () => this.trigger('save', {}));
    this.elements.tableParent.addEventListener('change', evt => {
      if (evt.target.tagName == 'INPUT' && evt.target.type == 'checkbox') {
        const sentenceId = evt.target.dataset.sentence_id;

        if (sentenceId) {
          const triggerType = evt.target.checked ? 'add_sentence' : 'remove_sentence';
          this.trigger(triggerType, {
            sentenceId
          });
        }
      }
    });
  }

  getFilterElements() {
    return Array.from(this.root.querySelectorAll('.filter-selector'));
  }

  updateFilters() {
    const filterState = {};
    this.getFilterElements().filter(el => el.value != '').forEach(el => filterState[el.name] = el.value);
    this.trigger('filter_update', filterState);
  }

  updateDisplay(sentences, toSave) {
    const fields = ['grammar', 'vivaRef', 'tense', 'level', 'sentence', 'translation'];
    const fieldClasses = {
      grammar: 'narrow',
      vivaRef: 'narrow',
      tense: 'narrow',
      level: 'narrow'
    };
    this.elements.tableParent.innerHTML = (0, _sentencetable.sentencetableTemplate)({
      fields,
      sentences,
      fieldClasses
    });
  }

} // TRAINING VIEW


exports.CreateTaskChooseSentenceView = CreateTaskChooseSentenceView;

class TrainingView extends FormView {
  constructor(element) {
    super(element); // get our sub-elements

    this.elements.prompt = this.root.querySelector('.card-title');
    this.elements.input = this.root.querySelector('[name=student_answer]');
    this.elements.answer_feedback = this.root.querySelector('.answer-feedback');
    this.elements.answer_feedback_inner = this.root.querySelector('.answer-feedback-inner');
    this.elements.correct_answer = this.root.querySelector('.correct-answer');
    this.elements.correct_answer_inner = this.root.querySelector('.correct-answer-inner');
    this.elements.right_count = this.root.querySelector('.right-count');
    this.elements.total_count = this.root.querySelector('.total-count');
    this.elements.submit_button = this.root.querySelector('button[type=submit]');
    this.elements.next_button = this.root.querySelector('button[type=button].btn-next');
    this.elements.audio = this.root.querySelector('audio.sentence-audio'); // define some groups of elements

    this.defineElementGroup('feedback', ['answer_feedback', 'next_button']);
    this.defineElementGroup('dataEntry', ['input', 'submit_button']); // prep DOM

    this.hideGroup('feedback');
    this.clearAnswerText(); // set up event listeners

    this.onFormData(data => this.handleStudentAnswer(data));
    this.elements.next_button.addEventListener('click', () => {
      this.hideGroup('feedback');
      this.showGroup('dataEntry');
      this.clearAnswerText();
      this.elements.input.focus();
      this.trigger('next');
    }); // global hotkeys (should be fine, though?)

    document.addEventListener('keydown', evt => {
      if (evt.key == '[') {
        evt.preventDefault();
        this.elements.audio.play();
      }
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

  handleStudentAnswer(_ref) {
    let {
      student_answer
    } = _ref;

    // CALCULATE VARIOUS DATA (maybe could live outside of the View layer?)
    function normalize(str) {
      // normalize to ONLY letters and numbers (cross-language), lowercase
      // this'll require fairly modern JS, incidentally 
      return str.replace(/(?:(?![0-9A-Za-z\xAA\xB2\xB3\xB5\xB9\xBA\xBC-\xBE\xC0-\xD6\xD8-\xF6\xF8-\u02C1\u02C6-\u02D1\u02E0-\u02E4\u02EC\u02EE\u0370-\u0374\u0376\u0377\u037A-\u037D\u037F\u0386\u0388-\u038A\u038C\u038E-\u03A1\u03A3-\u03F5\u03F7-\u0481\u048A-\u052F\u0531-\u0556\u0559\u0560-\u0588\u05D0-\u05EA\u05EF-\u05F2\u0620-\u064A\u0660-\u0669\u066E\u066F\u0671-\u06D3\u06D5\u06E5\u06E6\u06EE-\u06FC\u06FF\u0710\u0712-\u072F\u074D-\u07A5\u07B1\u07C0-\u07EA\u07F4\u07F5\u07FA\u0800-\u0815\u081A\u0824\u0828\u0840-\u0858\u0860-\u086A\u08A0-\u08B4\u08B6-\u08C7\u0904-\u0939\u093D\u0950\u0958-\u0961\u0966-\u096F\u0971-\u0980\u0985-\u098C\u098F\u0990\u0993-\u09A8\u09AA-\u09B0\u09B2\u09B6-\u09B9\u09BD\u09CE\u09DC\u09DD\u09DF-\u09E1\u09E6-\u09F1\u09F4-\u09F9\u09FC\u0A05-\u0A0A\u0A0F\u0A10\u0A13-\u0A28\u0A2A-\u0A30\u0A32\u0A33\u0A35\u0A36\u0A38\u0A39\u0A59-\u0A5C\u0A5E\u0A66-\u0A6F\u0A72-\u0A74\u0A85-\u0A8D\u0A8F-\u0A91\u0A93-\u0AA8\u0AAA-\u0AB0\u0AB2\u0AB3\u0AB5-\u0AB9\u0ABD\u0AD0\u0AE0\u0AE1\u0AE6-\u0AEF\u0AF9\u0B05-\u0B0C\u0B0F\u0B10\u0B13-\u0B28\u0B2A-\u0B30\u0B32\u0B33\u0B35-\u0B39\u0B3D\u0B5C\u0B5D\u0B5F-\u0B61\u0B66-\u0B6F\u0B71-\u0B77\u0B83\u0B85-\u0B8A\u0B8E-\u0B90\u0B92-\u0B95\u0B99\u0B9A\u0B9C\u0B9E\u0B9F\u0BA3\u0BA4\u0BA8-\u0BAA\u0BAE-\u0BB9\u0BD0\u0BE6-\u0BF2\u0C05-\u0C0C\u0C0E-\u0C10\u0C12-\u0C28\u0C2A-\u0C39\u0C3D\u0C58-\u0C5A\u0C60\u0C61\u0C66-\u0C6F\u0C78-\u0C7E\u0C80\u0C85-\u0C8C\u0C8E-\u0C90\u0C92-\u0CA8\u0CAA-\u0CB3\u0CB5-\u0CB9\u0CBD\u0CDE\u0CE0\u0CE1\u0CE6-\u0CEF\u0CF1\u0CF2\u0D04-\u0D0C\u0D0E-\u0D10\u0D12-\u0D3A\u0D3D\u0D4E\u0D54-\u0D56\u0D58-\u0D61\u0D66-\u0D78\u0D7A-\u0D7F\u0D85-\u0D96\u0D9A-\u0DB1\u0DB3-\u0DBB\u0DBD\u0DC0-\u0DC6\u0DE6-\u0DEF\u0E01-\u0E30\u0E32\u0E33\u0E40-\u0E46\u0E50-\u0E59\u0E81\u0E82\u0E84\u0E86-\u0E8A\u0E8C-\u0EA3\u0EA5\u0EA7-\u0EB0\u0EB2\u0EB3\u0EBD\u0EC0-\u0EC4\u0EC6\u0ED0-\u0ED9\u0EDC-\u0EDF\u0F00\u0F20-\u0F33\u0F40-\u0F47\u0F49-\u0F6C\u0F88-\u0F8C\u1000-\u102A\u103F-\u1049\u1050-\u1055\u105A-\u105D\u1061\u1065\u1066\u106E-\u1070\u1075-\u1081\u108E\u1090-\u1099\u10A0-\u10C5\u10C7\u10CD\u10D0-\u10FA\u10FC-\u1248\u124A-\u124D\u1250-\u1256\u1258\u125A-\u125D\u1260-\u1288\u128A-\u128D\u1290-\u12B0\u12B2-\u12B5\u12B8-\u12BE\u12C0\u12C2-\u12C5\u12C8-\u12D6\u12D8-\u1310\u1312-\u1315\u1318-\u135A\u1369-\u137C\u1380-\u138F\u13A0-\u13F5\u13F8-\u13FD\u1401-\u166C\u166F-\u167F\u1681-\u169A\u16A0-\u16EA\u16EE-\u16F8\u1700-\u170C\u170E-\u1711\u1720-\u1731\u1740-\u1751\u1760-\u176C\u176E-\u1770\u1780-\u17B3\u17D7\u17DC\u17E0-\u17E9\u17F0-\u17F9\u1810-\u1819\u1820-\u1878\u1880-\u1884\u1887-\u18A8\u18AA\u18B0-\u18F5\u1900-\u191E\u1946-\u196D\u1970-\u1974\u1980-\u19AB\u19B0-\u19C9\u19D0-\u19DA\u1A00-\u1A16\u1A20-\u1A54\u1A80-\u1A89\u1A90-\u1A99\u1AA7\u1B05-\u1B33\u1B45-\u1B4B\u1B50-\u1B59\u1B83-\u1BA0\u1BAE-\u1BE5\u1C00-\u1C23\u1C40-\u1C49\u1C4D-\u1C7D\u1C80-\u1C88\u1C90-\u1CBA\u1CBD-\u1CBF\u1CE9-\u1CEC\u1CEE-\u1CF3\u1CF5\u1CF6\u1CFA\u1D00-\u1DBF\u1E00-\u1F15\u1F18-\u1F1D\u1F20-\u1F45\u1F48-\u1F4D\u1F50-\u1F57\u1F59\u1F5B\u1F5D\u1F5F-\u1F7D\u1F80-\u1FB4\u1FB6-\u1FBC\u1FBE\u1FC2-\u1FC4\u1FC6-\u1FCC\u1FD0-\u1FD3\u1FD6-\u1FDB\u1FE0-\u1FEC\u1FF2-\u1FF4\u1FF6-\u1FFC\u2070\u2071\u2074-\u2079\u207F-\u2089\u2090-\u209C\u2102\u2107\u210A-\u2113\u2115\u2119-\u211D\u2124\u2126\u2128\u212A-\u212D\u212F-\u2139\u213C-\u213F\u2145-\u2149\u214E\u2150-\u2189\u2460-\u249B\u24EA-\u24FF\u2776-\u2793\u2C00-\u2C2E\u2C30-\u2C5E\u2C60-\u2CE4\u2CEB-\u2CEE\u2CF2\u2CF3\u2CFD\u2D00-\u2D25\u2D27\u2D2D\u2D30-\u2D67\u2D6F\u2D80-\u2D96\u2DA0-\u2DA6\u2DA8-\u2DAE\u2DB0-\u2DB6\u2DB8-\u2DBE\u2DC0-\u2DC6\u2DC8-\u2DCE\u2DD0-\u2DD6\u2DD8-\u2DDE\u2E2F\u3005-\u3007\u3021-\u3029\u3031-\u3035\u3038-\u303C\u3041-\u3096\u309D-\u309F\u30A1-\u30FA\u30FC-\u30FF\u3105-\u312F\u3131-\u318E\u3192-\u3195\u31A0-\u31BF\u31F0-\u31FF\u3220-\u3229\u3248-\u324F\u3251-\u325F\u3280-\u3289\u32B1-\u32BF\u3400-\u4DBF\u4E00-\u9FFC\uA000-\uA48C\uA4D0-\uA4FD\uA500-\uA60C\uA610-\uA62B\uA640-\uA66E\uA67F-\uA69D\uA6A0-\uA6EF\uA717-\uA71F\uA722-\uA788\uA78B-\uA7BF\uA7C2-\uA7CA\uA7F5-\uA801\uA803-\uA805\uA807-\uA80A\uA80C-\uA822\uA830-\uA835\uA840-\uA873\uA882-\uA8B3\uA8D0-\uA8D9\uA8F2-\uA8F7\uA8FB\uA8FD\uA8FE\uA900-\uA925\uA930-\uA946\uA960-\uA97C\uA984-\uA9B2\uA9CF-\uA9D9\uA9E0-\uA9E4\uA9E6-\uA9FE\uAA00-\uAA28\uAA40-\uAA42\uAA44-\uAA4B\uAA50-\uAA59\uAA60-\uAA76\uAA7A\uAA7E-\uAAAF\uAAB1\uAAB5\uAAB6\uAAB9-\uAABD\uAAC0\uAAC2\uAADB-\uAADD\uAAE0-\uAAEA\uAAF2-\uAAF4\uAB01-\uAB06\uAB09-\uAB0E\uAB11-\uAB16\uAB20-\uAB26\uAB28-\uAB2E\uAB30-\uAB5A\uAB5C-\uAB69\uAB70-\uABE2\uABF0-\uABF9\uAC00-\uD7A3\uD7B0-\uD7C6\uD7CB-\uD7FB\uF900-\uFA6D\uFA70-\uFAD9\uFB00-\uFB06\uFB13-\uFB17\uFB1D\uFB1F-\uFB28\uFB2A-\uFB36\uFB38-\uFB3C\uFB3E\uFB40\uFB41\uFB43\uFB44\uFB46-\uFBB1\uFBD3-\uFD3D\uFD50-\uFD8F\uFD92-\uFDC7\uFDF0-\uFDFB\uFE70-\uFE74\uFE76-\uFEFC\uFF10-\uFF19\uFF21-\uFF3A\uFF41-\uFF5A\uFF66-\uFFBE\uFFC2-\uFFC7\uFFCA-\uFFCF\uFFD2-\uFFD7\uFFDA-\uFFDC]|\uD800[\uDC00-\uDC0B\uDC0D-\uDC26\uDC28-\uDC3A\uDC3C\uDC3D\uDC3F-\uDC4D\uDC50-\uDC5D\uDC80-\uDCFA\uDD07-\uDD33\uDD40-\uDD78\uDD8A\uDD8B\uDE80-\uDE9C\uDEA0-\uDED0\uDEE1-\uDEFB\uDF00-\uDF23\uDF2D-\uDF4A\uDF50-\uDF75\uDF80-\uDF9D\uDFA0-\uDFC3\uDFC8-\uDFCF\uDFD1-\uDFD5]|\uD801[\uDC00-\uDC9D\uDCA0-\uDCA9\uDCB0-\uDCD3\uDCD8-\uDCFB\uDD00-\uDD27\uDD30-\uDD63\uDE00-\uDF36\uDF40-\uDF55\uDF60-\uDF67]|\uD802[\uDC00-\uDC05\uDC08\uDC0A-\uDC35\uDC37\uDC38\uDC3C\uDC3F-\uDC55\uDC58-\uDC76\uDC79-\uDC9E\uDCA7-\uDCAF\uDCE0-\uDCF2\uDCF4\uDCF5\uDCFB-\uDD1B\uDD20-\uDD39\uDD80-\uDDB7\uDDBC-\uDDCF\uDDD2-\uDE00\uDE10-\uDE13\uDE15-\uDE17\uDE19-\uDE35\uDE40-\uDE48\uDE60-\uDE7E\uDE80-\uDE9F\uDEC0-\uDEC7\uDEC9-\uDEE4\uDEEB-\uDEEF\uDF00-\uDF35\uDF40-\uDF55\uDF58-\uDF72\uDF78-\uDF91\uDFA9-\uDFAF]|\uD803[\uDC00-\uDC48\uDC80-\uDCB2\uDCC0-\uDCF2\uDCFA-\uDD23\uDD30-\uDD39\uDE60-\uDE7E\uDE80-\uDEA9\uDEB0\uDEB1\uDF00-\uDF27\uDF30-\uDF45\uDF51-\uDF54\uDFB0-\uDFCB\uDFE0-\uDFF6]|\uD804[\uDC03-\uDC37\uDC52-\uDC6F\uDC83-\uDCAF\uDCD0-\uDCE8\uDCF0-\uDCF9\uDD03-\uDD26\uDD36-\uDD3F\uDD44\uDD47\uDD50-\uDD72\uDD76\uDD83-\uDDB2\uDDC1-\uDDC4\uDDD0-\uDDDA\uDDDC\uDDE1-\uDDF4\uDE00-\uDE11\uDE13-\uDE2B\uDE80-\uDE86\uDE88\uDE8A-\uDE8D\uDE8F-\uDE9D\uDE9F-\uDEA8\uDEB0-\uDEDE\uDEF0-\uDEF9\uDF05-\uDF0C\uDF0F\uDF10\uDF13-\uDF28\uDF2A-\uDF30\uDF32\uDF33\uDF35-\uDF39\uDF3D\uDF50\uDF5D-\uDF61]|\uD805[\uDC00-\uDC34\uDC47-\uDC4A\uDC50-\uDC59\uDC5F-\uDC61\uDC80-\uDCAF\uDCC4\uDCC5\uDCC7\uDCD0-\uDCD9\uDD80-\uDDAE\uDDD8-\uDDDB\uDE00-\uDE2F\uDE44\uDE50-\uDE59\uDE80-\uDEAA\uDEB8\uDEC0-\uDEC9\uDF00-\uDF1A\uDF30-\uDF3B]|\uD806[\uDC00-\uDC2B\uDCA0-\uDCF2\uDCFF-\uDD06\uDD09\uDD0C-\uDD13\uDD15\uDD16\uDD18-\uDD2F\uDD3F\uDD41\uDD50-\uDD59\uDDA0-\uDDA7\uDDAA-\uDDD0\uDDE1\uDDE3\uDE00\uDE0B-\uDE32\uDE3A\uDE50\uDE5C-\uDE89\uDE9D\uDEC0-\uDEF8]|\uD807[\uDC00-\uDC08\uDC0A-\uDC2E\uDC40\uDC50-\uDC6C\uDC72-\uDC8F\uDD00-\uDD06\uDD08\uDD09\uDD0B-\uDD30\uDD46\uDD50-\uDD59\uDD60-\uDD65\uDD67\uDD68\uDD6A-\uDD89\uDD98\uDDA0-\uDDA9\uDEE0-\uDEF2\uDFB0\uDFC0-\uDFD4]|\uD808[\uDC00-\uDF99]|\uD809[\uDC00-\uDC6E\uDC80-\uDD43]|[\uD80C\uD81C-\uD820\uD822\uD840-\uD868\uD86A-\uD86C\uD86F-\uD872\uD874-\uD879\uD880-\uD883][\uDC00-\uDFFF]|\uD80D[\uDC00-\uDC2E]|\uD811[\uDC00-\uDE46]|\uD81A[\uDC00-\uDE38\uDE40-\uDE5E\uDE60-\uDE69\uDED0-\uDEED\uDF00-\uDF2F\uDF40-\uDF43\uDF50-\uDF59\uDF5B-\uDF61\uDF63-\uDF77\uDF7D-\uDF8F]|\uD81B[\uDE40-\uDE96\uDF00-\uDF4A\uDF50\uDF93-\uDF9F\uDFE0\uDFE1\uDFE3]|\uD821[\uDC00-\uDFF7]|\uD823[\uDC00-\uDCD5\uDD00-\uDD08]|\uD82C[\uDC00-\uDD1E\uDD50-\uDD52\uDD64-\uDD67\uDD70-\uDEFB]|\uD82F[\uDC00-\uDC6A\uDC70-\uDC7C\uDC80-\uDC88\uDC90-\uDC99]|\uD834[\uDEE0-\uDEF3\uDF60-\uDF78]|\uD835[\uDC00-\uDC54\uDC56-\uDC9C\uDC9E\uDC9F\uDCA2\uDCA5\uDCA6\uDCA9-\uDCAC\uDCAE-\uDCB9\uDCBB\uDCBD-\uDCC3\uDCC5-\uDD05\uDD07-\uDD0A\uDD0D-\uDD14\uDD16-\uDD1C\uDD1E-\uDD39\uDD3B-\uDD3E\uDD40-\uDD44\uDD46\uDD4A-\uDD50\uDD52-\uDEA5\uDEA8-\uDEC0\uDEC2-\uDEDA\uDEDC-\uDEFA\uDEFC-\uDF14\uDF16-\uDF34\uDF36-\uDF4E\uDF50-\uDF6E\uDF70-\uDF88\uDF8A-\uDFA8\uDFAA-\uDFC2\uDFC4-\uDFCB\uDFCE-\uDFFF]|\uD838[\uDD00-\uDD2C\uDD37-\uDD3D\uDD40-\uDD49\uDD4E\uDEC0-\uDEEB\uDEF0-\uDEF9]|\uD83A[\uDC00-\uDCC4\uDCC7-\uDCCF\uDD00-\uDD43\uDD4B\uDD50-\uDD59]|\uD83B[\uDC71-\uDCAB\uDCAD-\uDCAF\uDCB1-\uDCB4\uDD01-\uDD2D\uDD2F-\uDD3D\uDE00-\uDE03\uDE05-\uDE1F\uDE21\uDE22\uDE24\uDE27\uDE29-\uDE32\uDE34-\uDE37\uDE39\uDE3B\uDE42\uDE47\uDE49\uDE4B\uDE4D-\uDE4F\uDE51\uDE52\uDE54\uDE57\uDE59\uDE5B\uDE5D\uDE5F\uDE61\uDE62\uDE64\uDE67-\uDE6A\uDE6C-\uDE72\uDE74-\uDE77\uDE79-\uDE7C\uDE7E\uDE80-\uDE89\uDE8B-\uDE9B\uDEA1-\uDEA3\uDEA5-\uDEA9\uDEAB-\uDEBB]|\uD83C[\uDD00-\uDD0C]|\uD83E[\uDFF0-\uDFF9]|\uD869[\uDC00-\uDEDD\uDF00-\uDFFF]|\uD86D[\uDC00-\uDF34\uDF40-\uDFFF]|\uD86E[\uDC00-\uDC1D\uDC20-\uDFFF]|\uD873[\uDC00-\uDEA1\uDEB0-\uDFFF]|\uD87A[\uDC00-\uDFE0]|\uD87E[\uDC00-\uDE1D]|\uD884[\uDC00-\uDF4A])[\s\S])/gi, '').toLowerCase();
    } // TODO DESIGN QUESTION: where should isCorrect be calculated? what code owns that logic?


    const isCorrect = normalize(student_answer) == normalize(this.answer);
    const diffs = (0, _diff.diffWords)(this.answer, student_answer, {
      ignoreCase: true
    }); // DISPLAY CALCULATED DATA

    {
      // NOTE from Heather to Tom:
      //   this method call looks a little over-fancy. feel free to refactor into something easier to read. hopefully I've added enough comments to make it understandable?
      this.setAsHighlightedSpan( // element name
      'answer_feedback_inner', // pass only the diff entries that we want to display
      diffs.filter(diff => !diff.removed), // CSS class name callback
      diff => diff.added ? 'highlight-wrong' : 'highlight-right');
      this.setAsHighlightedSpan('correct_answer_inner', diffs.filter(diff => !diff.added), diff => diff.removed ? 'highlight-wrong' : 'highlight-right');
    } // SET UP DOM STATE

    {
      this.hideGroup('dataEntry');
      this.showGroup('feedback');
      this.elements.next_button.focus();
      this.trigger('answer', {
        student_answer,
        isCorrect
      });
    }
  } // this method replaces the content of an element with a set of highlighted/styled spans, such as you might want if you're presenting diff output.
  // also, this could live in one of the parent classes, if it ends up being useful elsewhere.
  //
  // `elementName` is the string name of some element that this view tracks
  // `array` is expected to be an array of items with at least a `value` property
  // `classNameCallback` is a callback that spits out the CSS classes, space-separated, that go with each entry of the array


  setAsHighlightedSpan(elementName, array, classNameCallback) {
    const baseEl = this.elements[elementName]; // keep track of the index so that we can do a .innerText later (thus bypassing issues with HTML injection / XSS)

    const spans = array.map((entry, index) => {
      const elClass = classNameCallback(entry); // using some index-juggling in order to avoid having to worry about HTML injection

      return "<span class=\"".concat(elClass, "\">").concat(index, "</span>");
    });
    baseEl.innerHTML = spans.join(''); // now we can safely assign user-defined text, via `.innerText` (which doesn't get parsed as HTML)

    Array.from(baseEl.querySelectorAll('span')).forEach(span => {
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
    return this.elements.prompt.innerText = value;
  }

  get audioUrl() {
    return this.elements.audio.src;
  }

  set audioUrl(value) {
    return this.elements.audio.src = value;
  }

}

exports.TrainingView = TrainingView;
},{"diff":"../../node_modules/diff/dist/diff.js","./templates/sentencetable":"templates/sentencetable.js","waveform-playlist":"../../node_modules/waveform-playlist/lib/app.js"}],"../../node_modules/axios/lib/helpers/bind.js":[function(require,module,exports) {
'use strict';

module.exports = function bind(fn, thisArg) {
  return function wrap() {
    var args = new Array(arguments.length);
    for (var i = 0; i < args.length; i++) {
      args[i] = arguments[i];
    }
    return fn.apply(thisArg, args);
  };
};

},{}],"../../node_modules/axios/lib/utils.js":[function(require,module,exports) {
'use strict';

var bind = require('./helpers/bind');

/*global toString:true*/

// utils is a library of generic helper functions non-specific to axios

var toString = Object.prototype.toString;

/**
 * Determine if a value is an Array
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Array, otherwise false
 */
function isArray(val) {
  return toString.call(val) === '[object Array]';
}

/**
 * Determine if a value is undefined
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if the value is undefined, otherwise false
 */
function isUndefined(val) {
  return typeof val === 'undefined';
}

/**
 * Determine if a value is a Buffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Buffer, otherwise false
 */
function isBuffer(val) {
  return val !== null && !isUndefined(val) && val.constructor !== null && !isUndefined(val.constructor)
    && typeof val.constructor.isBuffer === 'function' && val.constructor.isBuffer(val);
}

/**
 * Determine if a value is an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an ArrayBuffer, otherwise false
 */
function isArrayBuffer(val) {
  return toString.call(val) === '[object ArrayBuffer]';
}

/**
 * Determine if a value is a FormData
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an FormData, otherwise false
 */
function isFormData(val) {
  return (typeof FormData !== 'undefined') && (val instanceof FormData);
}

/**
 * Determine if a value is a view on an ArrayBuffer
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a view on an ArrayBuffer, otherwise false
 */
function isArrayBufferView(val) {
  var result;
  if ((typeof ArrayBuffer !== 'undefined') && (ArrayBuffer.isView)) {
    result = ArrayBuffer.isView(val);
  } else {
    result = (val) && (val.buffer) && (val.buffer instanceof ArrayBuffer);
  }
  return result;
}

/**
 * Determine if a value is a String
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a String, otherwise false
 */
function isString(val) {
  return typeof val === 'string';
}

/**
 * Determine if a value is a Number
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Number, otherwise false
 */
function isNumber(val) {
  return typeof val === 'number';
}

/**
 * Determine if a value is an Object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is an Object, otherwise false
 */
function isObject(val) {
  return val !== null && typeof val === 'object';
}

/**
 * Determine if a value is a Date
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Date, otherwise false
 */
function isDate(val) {
  return toString.call(val) === '[object Date]';
}

/**
 * Determine if a value is a File
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a File, otherwise false
 */
function isFile(val) {
  return toString.call(val) === '[object File]';
}

/**
 * Determine if a value is a Blob
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Blob, otherwise false
 */
function isBlob(val) {
  return toString.call(val) === '[object Blob]';
}

/**
 * Determine if a value is a Function
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Function, otherwise false
 */
function isFunction(val) {
  return toString.call(val) === '[object Function]';
}

/**
 * Determine if a value is a Stream
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a Stream, otherwise false
 */
function isStream(val) {
  return isObject(val) && isFunction(val.pipe);
}

/**
 * Determine if a value is a URLSearchParams object
 *
 * @param {Object} val The value to test
 * @returns {boolean} True if value is a URLSearchParams object, otherwise false
 */
function isURLSearchParams(val) {
  return typeof URLSearchParams !== 'undefined' && val instanceof URLSearchParams;
}

/**
 * Trim excess whitespace off the beginning and end of a string
 *
 * @param {String} str The String to trim
 * @returns {String} The String freed of excess whitespace
 */
function trim(str) {
  return str.replace(/^\s*/, '').replace(/\s*$/, '');
}

/**
 * Determine if we're running in a standard browser environment
 *
 * This allows axios to run in a web worker, and react-native.
 * Both environments support XMLHttpRequest, but not fully standard globals.
 *
 * web workers:
 *  typeof window -> undefined
 *  typeof document -> undefined
 *
 * react-native:
 *  navigator.product -> 'ReactNative'
 * nativescript
 *  navigator.product -> 'NativeScript' or 'NS'
 */
function isStandardBrowserEnv() {
  if (typeof navigator !== 'undefined' && (navigator.product === 'ReactNative' ||
                                           navigator.product === 'NativeScript' ||
                                           navigator.product === 'NS')) {
    return false;
  }
  return (
    typeof window !== 'undefined' &&
    typeof document !== 'undefined'
  );
}

/**
 * Iterate over an Array or an Object invoking a function for each item.
 *
 * If `obj` is an Array callback will be called passing
 * the value, index, and complete array for each item.
 *
 * If 'obj' is an Object callback will be called passing
 * the value, key, and complete object for each property.
 *
 * @param {Object|Array} obj The object to iterate
 * @param {Function} fn The callback to invoke for each item
 */
function forEach(obj, fn) {
  // Don't bother if no value provided
  if (obj === null || typeof obj === 'undefined') {
    return;
  }

  // Force an array if not already something iterable
  if (typeof obj !== 'object') {
    /*eslint no-param-reassign:0*/
    obj = [obj];
  }

  if (isArray(obj)) {
    // Iterate over array values
    for (var i = 0, l = obj.length; i < l; i++) {
      fn.call(null, obj[i], i, obj);
    }
  } else {
    // Iterate over object keys
    for (var key in obj) {
      if (Object.prototype.hasOwnProperty.call(obj, key)) {
        fn.call(null, obj[key], key, obj);
      }
    }
  }
}

/**
 * Accepts varargs expecting each argument to be an object, then
 * immutably merges the properties of each object and returns result.
 *
 * When multiple objects contain the same key the later object in
 * the arguments list will take precedence.
 *
 * Example:
 *
 * ```js
 * var result = merge({foo: 123}, {foo: 456});
 * console.log(result.foo); // outputs 456
 * ```
 *
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function merge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = merge(result[key], val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Function equal to merge with the difference being that no reference
 * to original objects is kept.
 *
 * @see merge
 * @param {Object} obj1 Object to merge
 * @returns {Object} Result of all merge properties
 */
function deepMerge(/* obj1, obj2, obj3, ... */) {
  var result = {};
  function assignValue(val, key) {
    if (typeof result[key] === 'object' && typeof val === 'object') {
      result[key] = deepMerge(result[key], val);
    } else if (typeof val === 'object') {
      result[key] = deepMerge({}, val);
    } else {
      result[key] = val;
    }
  }

  for (var i = 0, l = arguments.length; i < l; i++) {
    forEach(arguments[i], assignValue);
  }
  return result;
}

/**
 * Extends object a by mutably adding to it the properties of object b.
 *
 * @param {Object} a The object to be extended
 * @param {Object} b The object to copy properties from
 * @param {Object} thisArg The object to bind function to
 * @return {Object} The resulting value of object a
 */
function extend(a, b, thisArg) {
  forEach(b, function assignValue(val, key) {
    if (thisArg && typeof val === 'function') {
      a[key] = bind(val, thisArg);
    } else {
      a[key] = val;
    }
  });
  return a;
}

module.exports = {
  isArray: isArray,
  isArrayBuffer: isArrayBuffer,
  isBuffer: isBuffer,
  isFormData: isFormData,
  isArrayBufferView: isArrayBufferView,
  isString: isString,
  isNumber: isNumber,
  isObject: isObject,
  isUndefined: isUndefined,
  isDate: isDate,
  isFile: isFile,
  isBlob: isBlob,
  isFunction: isFunction,
  isStream: isStream,
  isURLSearchParams: isURLSearchParams,
  isStandardBrowserEnv: isStandardBrowserEnv,
  forEach: forEach,
  merge: merge,
  deepMerge: deepMerge,
  extend: extend,
  trim: trim
};

},{"./helpers/bind":"../../node_modules/axios/lib/helpers/bind.js"}],"../../node_modules/axios/lib/helpers/buildURL.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function encode(val) {
  return encodeURIComponent(val).
    replace(/%40/gi, '@').
    replace(/%3A/gi, ':').
    replace(/%24/g, '$').
    replace(/%2C/gi, ',').
    replace(/%20/g, '+').
    replace(/%5B/gi, '[').
    replace(/%5D/gi, ']');
}

/**
 * Build a URL by appending params to the end
 *
 * @param {string} url The base of the url (e.g., http://www.google.com)
 * @param {object} [params] The params to be appended
 * @returns {string} The formatted url
 */
module.exports = function buildURL(url, params, paramsSerializer) {
  /*eslint no-param-reassign:0*/
  if (!params) {
    return url;
  }

  var serializedParams;
  if (paramsSerializer) {
    serializedParams = paramsSerializer(params);
  } else if (utils.isURLSearchParams(params)) {
    serializedParams = params.toString();
  } else {
    var parts = [];

    utils.forEach(params, function serialize(val, key) {
      if (val === null || typeof val === 'undefined') {
        return;
      }

      if (utils.isArray(val)) {
        key = key + '[]';
      } else {
        val = [val];
      }

      utils.forEach(val, function parseValue(v) {
        if (utils.isDate(v)) {
          v = v.toISOString();
        } else if (utils.isObject(v)) {
          v = JSON.stringify(v);
        }
        parts.push(encode(key) + '=' + encode(v));
      });
    });

    serializedParams = parts.join('&');
  }

  if (serializedParams) {
    var hashmarkIndex = url.indexOf('#');
    if (hashmarkIndex !== -1) {
      url = url.slice(0, hashmarkIndex);
    }

    url += (url.indexOf('?') === -1 ? '?' : '&') + serializedParams;
  }

  return url;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/InterceptorManager.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

function InterceptorManager() {
  this.handlers = [];
}

/**
 * Add a new interceptor to the stack
 *
 * @param {Function} fulfilled The function to handle `then` for a `Promise`
 * @param {Function} rejected The function to handle `reject` for a `Promise`
 *
 * @return {Number} An ID used to remove interceptor later
 */
InterceptorManager.prototype.use = function use(fulfilled, rejected) {
  this.handlers.push({
    fulfilled: fulfilled,
    rejected: rejected
  });
  return this.handlers.length - 1;
};

/**
 * Remove an interceptor from the stack
 *
 * @param {Number} id The ID that was returned by `use`
 */
InterceptorManager.prototype.eject = function eject(id) {
  if (this.handlers[id]) {
    this.handlers[id] = null;
  }
};

/**
 * Iterate over all the registered interceptors
 *
 * This method is particularly useful for skipping over any
 * interceptors that may have become `null` calling `eject`.
 *
 * @param {Function} fn The function to call for each interceptor
 */
InterceptorManager.prototype.forEach = function forEach(fn) {
  utils.forEach(this.handlers, function forEachHandler(h) {
    if (h !== null) {
      fn(h);
    }
  });
};

module.exports = InterceptorManager;

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/transformData.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

/**
 * Transform the data for a request or a response
 *
 * @param {Object|String} data The data to be transformed
 * @param {Array} headers The headers for the request or response
 * @param {Array|Function} fns A single function or Array of functions
 * @returns {*} The resulting transformed data
 */
module.exports = function transformData(data, headers, fns) {
  /*eslint no-param-reassign:0*/
  utils.forEach(fns, function transform(fn) {
    data = fn(data, headers);
  });

  return data;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/cancel/isCancel.js":[function(require,module,exports) {
'use strict';

module.exports = function isCancel(value) {
  return !!(value && value.__CANCEL__);
};

},{}],"../../node_modules/axios/lib/helpers/normalizeHeaderName.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

module.exports = function normalizeHeaderName(headers, normalizedName) {
  utils.forEach(headers, function processHeader(value, name) {
    if (name !== normalizedName && name.toUpperCase() === normalizedName.toUpperCase()) {
      headers[normalizedName] = value;
      delete headers[name];
    }
  });
};

},{"../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/enhanceError.js":[function(require,module,exports) {
'use strict';

/**
 * Update an Error with the specified config, error code, and response.
 *
 * @param {Error} error The error to update.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The error.
 */
module.exports = function enhanceError(error, config, code, request, response) {
  error.config = config;
  if (code) {
    error.code = code;
  }

  error.request = request;
  error.response = response;
  error.isAxiosError = true;

  error.toJSON = function() {
    return {
      // Standard
      message: this.message,
      name: this.name,
      // Microsoft
      description: this.description,
      number: this.number,
      // Mozilla
      fileName: this.fileName,
      lineNumber: this.lineNumber,
      columnNumber: this.columnNumber,
      stack: this.stack,
      // Axios
      config: this.config,
      code: this.code
    };
  };
  return error;
};

},{}],"../../node_modules/axios/lib/core/createError.js":[function(require,module,exports) {
'use strict';

var enhanceError = require('./enhanceError');

/**
 * Create an Error with the specified message, config, error code, request and response.
 *
 * @param {string} message The error message.
 * @param {Object} config The config.
 * @param {string} [code] The error code (for example, 'ECONNABORTED').
 * @param {Object} [request] The request.
 * @param {Object} [response] The response.
 * @returns {Error} The created error.
 */
module.exports = function createError(message, config, code, request, response) {
  var error = new Error(message);
  return enhanceError(error, config, code, request, response);
};

},{"./enhanceError":"../../node_modules/axios/lib/core/enhanceError.js"}],"../../node_modules/axios/lib/core/settle.js":[function(require,module,exports) {
'use strict';

var createError = require('./createError');

/**
 * Resolve or reject a Promise based on response status.
 *
 * @param {Function} resolve A function that resolves the promise.
 * @param {Function} reject A function that rejects the promise.
 * @param {object} response The response.
 */
module.exports = function settle(resolve, reject, response) {
  var validateStatus = response.config.validateStatus;
  if (!validateStatus || validateStatus(response.status)) {
    resolve(response);
  } else {
    reject(createError(
      'Request failed with status code ' + response.status,
      response.config,
      null,
      response.request,
      response
    ));
  }
};

},{"./createError":"../../node_modules/axios/lib/core/createError.js"}],"../../node_modules/axios/lib/helpers/isAbsoluteURL.js":[function(require,module,exports) {
'use strict';

/**
 * Determines whether the specified URL is absolute
 *
 * @param {string} url The URL to test
 * @returns {boolean} True if the specified URL is absolute, otherwise false
 */
module.exports = function isAbsoluteURL(url) {
  // A URL is considered absolute if it begins with "<scheme>://" or "//" (protocol-relative URL).
  // RFC 3986 defines scheme name as a sequence of characters beginning with a letter and followed
  // by any combination of letters, digits, plus, period, or hyphen.
  return /^([a-z][a-z\d\+\-\.]*:)?\/\//i.test(url);
};

},{}],"../../node_modules/axios/lib/helpers/combineURLs.js":[function(require,module,exports) {
'use strict';

/**
 * Creates a new URL by combining the specified URLs
 *
 * @param {string} baseURL The base URL
 * @param {string} relativeURL The relative URL
 * @returns {string} The combined URL
 */
module.exports = function combineURLs(baseURL, relativeURL) {
  return relativeURL
    ? baseURL.replace(/\/+$/, '') + '/' + relativeURL.replace(/^\/+/, '')
    : baseURL;
};

},{}],"../../node_modules/axios/lib/core/buildFullPath.js":[function(require,module,exports) {
'use strict';

var isAbsoluteURL = require('../helpers/isAbsoluteURL');
var combineURLs = require('../helpers/combineURLs');

/**
 * Creates a new URL by combining the baseURL with the requestedURL,
 * only when the requestedURL is not already an absolute URL.
 * If the requestURL is absolute, this function returns the requestedURL untouched.
 *
 * @param {string} baseURL The base URL
 * @param {string} requestedURL Absolute or relative URL to combine
 * @returns {string} The combined full path
 */
module.exports = function buildFullPath(baseURL, requestedURL) {
  if (baseURL && !isAbsoluteURL(requestedURL)) {
    return combineURLs(baseURL, requestedURL);
  }
  return requestedURL;
};

},{"../helpers/isAbsoluteURL":"../../node_modules/axios/lib/helpers/isAbsoluteURL.js","../helpers/combineURLs":"../../node_modules/axios/lib/helpers/combineURLs.js"}],"../../node_modules/axios/lib/helpers/parseHeaders.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

// Headers whose duplicates are ignored by node
// c.f. https://nodejs.org/api/http.html#http_message_headers
var ignoreDuplicateOf = [
  'age', 'authorization', 'content-length', 'content-type', 'etag',
  'expires', 'from', 'host', 'if-modified-since', 'if-unmodified-since',
  'last-modified', 'location', 'max-forwards', 'proxy-authorization',
  'referer', 'retry-after', 'user-agent'
];

/**
 * Parse headers into an object
 *
 * ```
 * Date: Wed, 27 Aug 2014 08:58:49 GMT
 * Content-Type: application/json
 * Connection: keep-alive
 * Transfer-Encoding: chunked
 * ```
 *
 * @param {String} headers Headers needing to be parsed
 * @returns {Object} Headers parsed into an object
 */
module.exports = function parseHeaders(headers) {
  var parsed = {};
  var key;
  var val;
  var i;

  if (!headers) { return parsed; }

  utils.forEach(headers.split('\n'), function parser(line) {
    i = line.indexOf(':');
    key = utils.trim(line.substr(0, i)).toLowerCase();
    val = utils.trim(line.substr(i + 1));

    if (key) {
      if (parsed[key] && ignoreDuplicateOf.indexOf(key) >= 0) {
        return;
      }
      if (key === 'set-cookie') {
        parsed[key] = (parsed[key] ? parsed[key] : []).concat([val]);
      } else {
        parsed[key] = parsed[key] ? parsed[key] + ', ' + val : val;
      }
    }
  });

  return parsed;
};

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/isURLSameOrigin.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs have full support of the APIs needed to test
  // whether the request URL is of the same origin as current location.
    (function standardBrowserEnv() {
      var msie = /(msie|trident)/i.test(navigator.userAgent);
      var urlParsingNode = document.createElement('a');
      var originURL;

      /**
    * Parse a URL to discover it's components
    *
    * @param {String} url The URL to be parsed
    * @returns {Object}
    */
      function resolveURL(url) {
        var href = url;

        if (msie) {
        // IE needs attribute set twice to normalize properties
          urlParsingNode.setAttribute('href', href);
          href = urlParsingNode.href;
        }

        urlParsingNode.setAttribute('href', href);

        // urlParsingNode provides the UrlUtils interface - http://url.spec.whatwg.org/#urlutils
        return {
          href: urlParsingNode.href,
          protocol: urlParsingNode.protocol ? urlParsingNode.protocol.replace(/:$/, '') : '',
          host: urlParsingNode.host,
          search: urlParsingNode.search ? urlParsingNode.search.replace(/^\?/, '') : '',
          hash: urlParsingNode.hash ? urlParsingNode.hash.replace(/^#/, '') : '',
          hostname: urlParsingNode.hostname,
          port: urlParsingNode.port,
          pathname: (urlParsingNode.pathname.charAt(0) === '/') ?
            urlParsingNode.pathname :
            '/' + urlParsingNode.pathname
        };
      }

      originURL = resolveURL(window.location.href);

      /**
    * Determine if a URL shares the same origin as the current location
    *
    * @param {String} requestURL The URL to test
    * @returns {boolean} True if URL shares the same origin, otherwise false
    */
      return function isURLSameOrigin(requestURL) {
        var parsed = (utils.isString(requestURL)) ? resolveURL(requestURL) : requestURL;
        return (parsed.protocol === originURL.protocol &&
            parsed.host === originURL.host);
      };
    })() :

  // Non standard browser envs (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return function isURLSameOrigin() {
        return true;
      };
    })()
);

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/helpers/cookies.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');

module.exports = (
  utils.isStandardBrowserEnv() ?

  // Standard browser envs support document.cookie
    (function standardBrowserEnv() {
      return {
        write: function write(name, value, expires, path, domain, secure) {
          var cookie = [];
          cookie.push(name + '=' + encodeURIComponent(value));

          if (utils.isNumber(expires)) {
            cookie.push('expires=' + new Date(expires).toGMTString());
          }

          if (utils.isString(path)) {
            cookie.push('path=' + path);
          }

          if (utils.isString(domain)) {
            cookie.push('domain=' + domain);
          }

          if (secure === true) {
            cookie.push('secure');
          }

          document.cookie = cookie.join('; ');
        },

        read: function read(name) {
          var match = document.cookie.match(new RegExp('(^|;\\s*)(' + name + ')=([^;]*)'));
          return (match ? decodeURIComponent(match[3]) : null);
        },

        remove: function remove(name) {
          this.write(name, '', Date.now() - 86400000);
        }
      };
    })() :

  // Non standard browser env (web workers, react-native) lack needed support.
    (function nonStandardBrowserEnv() {
      return {
        write: function write() {},
        read: function read() { return null; },
        remove: function remove() {}
      };
    })()
);

},{"./../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/adapters/xhr.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var settle = require('./../core/settle');
var buildURL = require('./../helpers/buildURL');
var buildFullPath = require('../core/buildFullPath');
var parseHeaders = require('./../helpers/parseHeaders');
var isURLSameOrigin = require('./../helpers/isURLSameOrigin');
var createError = require('../core/createError');

module.exports = function xhrAdapter(config) {
  return new Promise(function dispatchXhrRequest(resolve, reject) {
    var requestData = config.data;
    var requestHeaders = config.headers;

    if (utils.isFormData(requestData)) {
      delete requestHeaders['Content-Type']; // Let the browser set it
    }

    var request = new XMLHttpRequest();

    // HTTP basic authentication
    if (config.auth) {
      var username = config.auth.username || '';
      var password = config.auth.password || '';
      requestHeaders.Authorization = 'Basic ' + btoa(username + ':' + password);
    }

    var fullPath = buildFullPath(config.baseURL, config.url);
    request.open(config.method.toUpperCase(), buildURL(fullPath, config.params, config.paramsSerializer), true);

    // Set the request timeout in MS
    request.timeout = config.timeout;

    // Listen for ready state
    request.onreadystatechange = function handleLoad() {
      if (!request || request.readyState !== 4) {
        return;
      }

      // The request errored out and we didn't get a response, this will be
      // handled by onerror instead
      // With one exception: request that using file: protocol, most browsers
      // will return status as 0 even though it's a successful request
      if (request.status === 0 && !(request.responseURL && request.responseURL.indexOf('file:') === 0)) {
        return;
      }

      // Prepare the response
      var responseHeaders = 'getAllResponseHeaders' in request ? parseHeaders(request.getAllResponseHeaders()) : null;
      var responseData = !config.responseType || config.responseType === 'text' ? request.responseText : request.response;
      var response = {
        data: responseData,
        status: request.status,
        statusText: request.statusText,
        headers: responseHeaders,
        config: config,
        request: request
      };

      settle(resolve, reject, response);

      // Clean up request
      request = null;
    };

    // Handle browser request cancellation (as opposed to a manual cancellation)
    request.onabort = function handleAbort() {
      if (!request) {
        return;
      }

      reject(createError('Request aborted', config, 'ECONNABORTED', request));

      // Clean up request
      request = null;
    };

    // Handle low level network errors
    request.onerror = function handleError() {
      // Real errors are hidden from us by the browser
      // onerror should only fire if it's a network error
      reject(createError('Network Error', config, null, request));

      // Clean up request
      request = null;
    };

    // Handle timeout
    request.ontimeout = function handleTimeout() {
      var timeoutErrorMessage = 'timeout of ' + config.timeout + 'ms exceeded';
      if (config.timeoutErrorMessage) {
        timeoutErrorMessage = config.timeoutErrorMessage;
      }
      reject(createError(timeoutErrorMessage, config, 'ECONNABORTED',
        request));

      // Clean up request
      request = null;
    };

    // Add xsrf header
    // This is only done if running in a standard browser environment.
    // Specifically not if we're in a web worker, or react-native.
    if (utils.isStandardBrowserEnv()) {
      var cookies = require('./../helpers/cookies');

      // Add xsrf header
      var xsrfValue = (config.withCredentials || isURLSameOrigin(fullPath)) && config.xsrfCookieName ?
        cookies.read(config.xsrfCookieName) :
        undefined;

      if (xsrfValue) {
        requestHeaders[config.xsrfHeaderName] = xsrfValue;
      }
    }

    // Add headers to the request
    if ('setRequestHeader' in request) {
      utils.forEach(requestHeaders, function setRequestHeader(val, key) {
        if (typeof requestData === 'undefined' && key.toLowerCase() === 'content-type') {
          // Remove Content-Type if data is undefined
          delete requestHeaders[key];
        } else {
          // Otherwise add header to the request
          request.setRequestHeader(key, val);
        }
      });
    }

    // Add withCredentials to request if needed
    if (!utils.isUndefined(config.withCredentials)) {
      request.withCredentials = !!config.withCredentials;
    }

    // Add responseType to request if needed
    if (config.responseType) {
      try {
        request.responseType = config.responseType;
      } catch (e) {
        // Expected DOMException thrown by browsers not compatible XMLHttpRequest Level 2.
        // But, this can be suppressed for 'json' type as it can be parsed by default 'transformResponse' function.
        if (config.responseType !== 'json') {
          throw e;
        }
      }
    }

    // Handle progress if needed
    if (typeof config.onDownloadProgress === 'function') {
      request.addEventListener('progress', config.onDownloadProgress);
    }

    // Not all browsers support upload events
    if (typeof config.onUploadProgress === 'function' && request.upload) {
      request.upload.addEventListener('progress', config.onUploadProgress);
    }

    if (config.cancelToken) {
      // Handle cancellation
      config.cancelToken.promise.then(function onCanceled(cancel) {
        if (!request) {
          return;
        }

        request.abort();
        reject(cancel);
        // Clean up request
        request = null;
      });
    }

    if (requestData === undefined) {
      requestData = null;
    }

    // Send the request
    request.send(requestData);
  });
};

},{"./../utils":"../../node_modules/axios/lib/utils.js","./../core/settle":"../../node_modules/axios/lib/core/settle.js","./../helpers/buildURL":"../../node_modules/axios/lib/helpers/buildURL.js","../core/buildFullPath":"../../node_modules/axios/lib/core/buildFullPath.js","./../helpers/parseHeaders":"../../node_modules/axios/lib/helpers/parseHeaders.js","./../helpers/isURLSameOrigin":"../../node_modules/axios/lib/helpers/isURLSameOrigin.js","../core/createError":"../../node_modules/axios/lib/core/createError.js","./../helpers/cookies":"../../node_modules/axios/lib/helpers/cookies.js"}],"../../../../.nvm/versions/node/v14.16.0/lib/node_modules/parcel-bundler/node_modules/process/browser.js":[function(require,module,exports) {

// shim for using process in browser
var process = module.exports = {}; // cached from whatever global is present so that test runners that stub it
// don't break things.  But we need to wrap it in a try catch in case it is
// wrapped in strict mode code which doesn't define any globals.  It's inside a
// function because try/catches deoptimize in certain engines.

var cachedSetTimeout;
var cachedClearTimeout;

function defaultSetTimout() {
  throw new Error('setTimeout has not been defined');
}

function defaultClearTimeout() {
  throw new Error('clearTimeout has not been defined');
}

(function () {
  try {
    if (typeof setTimeout === 'function') {
      cachedSetTimeout = setTimeout;
    } else {
      cachedSetTimeout = defaultSetTimout;
    }
  } catch (e) {
    cachedSetTimeout = defaultSetTimout;
  }

  try {
    if (typeof clearTimeout === 'function') {
      cachedClearTimeout = clearTimeout;
    } else {
      cachedClearTimeout = defaultClearTimeout;
    }
  } catch (e) {
    cachedClearTimeout = defaultClearTimeout;
  }
})();

function runTimeout(fun) {
  if (cachedSetTimeout === setTimeout) {
    //normal enviroments in sane situations
    return setTimeout(fun, 0);
  } // if setTimeout wasn't available but was latter defined


  if ((cachedSetTimeout === defaultSetTimout || !cachedSetTimeout) && setTimeout) {
    cachedSetTimeout = setTimeout;
    return setTimeout(fun, 0);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedSetTimeout(fun, 0);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't trust the global object when called normally
      return cachedSetTimeout.call(null, fun, 0);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error
      return cachedSetTimeout.call(this, fun, 0);
    }
  }
}

function runClearTimeout(marker) {
  if (cachedClearTimeout === clearTimeout) {
    //normal enviroments in sane situations
    return clearTimeout(marker);
  } // if clearTimeout wasn't available but was latter defined


  if ((cachedClearTimeout === defaultClearTimeout || !cachedClearTimeout) && clearTimeout) {
    cachedClearTimeout = clearTimeout;
    return clearTimeout(marker);
  }

  try {
    // when when somebody has screwed with setTimeout but no I.E. maddness
    return cachedClearTimeout(marker);
  } catch (e) {
    try {
      // When we are in I.E. but the script has been evaled so I.E. doesn't  trust the global object when called normally
      return cachedClearTimeout.call(null, marker);
    } catch (e) {
      // same as above but when it's a version of I.E. that must have the global object for 'this', hopfully our context correct otherwise it will throw a global error.
      // Some versions of I.E. have different rules for clearTimeout vs setTimeout
      return cachedClearTimeout.call(this, marker);
    }
  }
}

var queue = [];
var draining = false;
var currentQueue;
var queueIndex = -1;

function cleanUpNextTick() {
  if (!draining || !currentQueue) {
    return;
  }

  draining = false;

  if (currentQueue.length) {
    queue = currentQueue.concat(queue);
  } else {
    queueIndex = -1;
  }

  if (queue.length) {
    drainQueue();
  }
}

function drainQueue() {
  if (draining) {
    return;
  }

  var timeout = runTimeout(cleanUpNextTick);
  draining = true;
  var len = queue.length;

  while (len) {
    currentQueue = queue;
    queue = [];

    while (++queueIndex < len) {
      if (currentQueue) {
        currentQueue[queueIndex].run();
      }
    }

    queueIndex = -1;
    len = queue.length;
  }

  currentQueue = null;
  draining = false;
  runClearTimeout(timeout);
}

process.nextTick = function (fun) {
  var args = new Array(arguments.length - 1);

  if (arguments.length > 1) {
    for (var i = 1; i < arguments.length; i++) {
      args[i - 1] = arguments[i];
    }
  }

  queue.push(new Item(fun, args));

  if (queue.length === 1 && !draining) {
    runTimeout(drainQueue);
  }
}; // v8 likes predictible objects


function Item(fun, array) {
  this.fun = fun;
  this.array = array;
}

Item.prototype.run = function () {
  this.fun.apply(null, this.array);
};

process.title = 'browser';
process.env = {};
process.argv = [];
process.version = ''; // empty string to avoid regexp issues

process.versions = {};

function noop() {}

process.on = noop;
process.addListener = noop;
process.once = noop;
process.off = noop;
process.removeListener = noop;
process.removeAllListeners = noop;
process.emit = noop;
process.prependListener = noop;
process.prependOnceListener = noop;

process.listeners = function (name) {
  return [];
};

process.binding = function (name) {
  throw new Error('process.binding is not supported');
};

process.cwd = function () {
  return '/';
};

process.chdir = function (dir) {
  throw new Error('process.chdir is not supported');
};

process.umask = function () {
  return 0;
};
},{}],"../../node_modules/axios/lib/defaults.js":[function(require,module,exports) {
var process = require("process");
'use strict';

var utils = require('./utils');
var normalizeHeaderName = require('./helpers/normalizeHeaderName');

var DEFAULT_CONTENT_TYPE = {
  'Content-Type': 'application/x-www-form-urlencoded'
};

function setContentTypeIfUnset(headers, value) {
  if (!utils.isUndefined(headers) && utils.isUndefined(headers['Content-Type'])) {
    headers['Content-Type'] = value;
  }
}

function getDefaultAdapter() {
  var adapter;
  if (typeof XMLHttpRequest !== 'undefined') {
    // For browsers use XHR adapter
    adapter = require('./adapters/xhr');
  } else if (typeof process !== 'undefined' && Object.prototype.toString.call(process) === '[object process]') {
    // For node use HTTP adapter
    adapter = require('./adapters/http');
  }
  return adapter;
}

var defaults = {
  adapter: getDefaultAdapter(),

  transformRequest: [function transformRequest(data, headers) {
    normalizeHeaderName(headers, 'Accept');
    normalizeHeaderName(headers, 'Content-Type');
    if (utils.isFormData(data) ||
      utils.isArrayBuffer(data) ||
      utils.isBuffer(data) ||
      utils.isStream(data) ||
      utils.isFile(data) ||
      utils.isBlob(data)
    ) {
      return data;
    }
    if (utils.isArrayBufferView(data)) {
      return data.buffer;
    }
    if (utils.isURLSearchParams(data)) {
      setContentTypeIfUnset(headers, 'application/x-www-form-urlencoded;charset=utf-8');
      return data.toString();
    }
    if (utils.isObject(data)) {
      setContentTypeIfUnset(headers, 'application/json;charset=utf-8');
      return JSON.stringify(data);
    }
    return data;
  }],

  transformResponse: [function transformResponse(data) {
    /*eslint no-param-reassign:0*/
    if (typeof data === 'string') {
      try {
        data = JSON.parse(data);
      } catch (e) { /* Ignore */ }
    }
    return data;
  }],

  /**
   * A timeout in milliseconds to abort a request. If set to 0 (default) a
   * timeout is not created.
   */
  timeout: 0,

  xsrfCookieName: 'XSRF-TOKEN',
  xsrfHeaderName: 'X-XSRF-TOKEN',

  maxContentLength: -1,

  validateStatus: function validateStatus(status) {
    return status >= 200 && status < 300;
  }
};

defaults.headers = {
  common: {
    'Accept': 'application/json, text/plain, */*'
  }
};

utils.forEach(['delete', 'get', 'head'], function forEachMethodNoData(method) {
  defaults.headers[method] = {};
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  defaults.headers[method] = utils.merge(DEFAULT_CONTENT_TYPE);
});

module.exports = defaults;

},{"./utils":"../../node_modules/axios/lib/utils.js","./helpers/normalizeHeaderName":"../../node_modules/axios/lib/helpers/normalizeHeaderName.js","./adapters/xhr":"../../node_modules/axios/lib/adapters/xhr.js","./adapters/http":"../../node_modules/axios/lib/adapters/xhr.js","process":"../../../../.nvm/versions/node/v14.16.0/lib/node_modules/parcel-bundler/node_modules/process/browser.js"}],"../../node_modules/axios/lib/core/dispatchRequest.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var transformData = require('./transformData');
var isCancel = require('../cancel/isCancel');
var defaults = require('../defaults');

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
function throwIfCancellationRequested(config) {
  if (config.cancelToken) {
    config.cancelToken.throwIfRequested();
  }
}

/**
 * Dispatch a request to the server using the configured adapter.
 *
 * @param {object} config The config that is to be used for the request
 * @returns {Promise} The Promise to be fulfilled
 */
module.exports = function dispatchRequest(config) {
  throwIfCancellationRequested(config);

  // Ensure headers exist
  config.headers = config.headers || {};

  // Transform request data
  config.data = transformData(
    config.data,
    config.headers,
    config.transformRequest
  );

  // Flatten headers
  config.headers = utils.merge(
    config.headers.common || {},
    config.headers[config.method] || {},
    config.headers
  );

  utils.forEach(
    ['delete', 'get', 'head', 'post', 'put', 'patch', 'common'],
    function cleanHeaderConfig(method) {
      delete config.headers[method];
    }
  );

  var adapter = config.adapter || defaults.adapter;

  return adapter(config).then(function onAdapterResolution(response) {
    throwIfCancellationRequested(config);

    // Transform response data
    response.data = transformData(
      response.data,
      response.headers,
      config.transformResponse
    );

    return response;
  }, function onAdapterRejection(reason) {
    if (!isCancel(reason)) {
      throwIfCancellationRequested(config);

      // Transform response data
      if (reason && reason.response) {
        reason.response.data = transformData(
          reason.response.data,
          reason.response.headers,
          config.transformResponse
        );
      }
    }

    return Promise.reject(reason);
  });
};

},{"./../utils":"../../node_modules/axios/lib/utils.js","./transformData":"../../node_modules/axios/lib/core/transformData.js","../cancel/isCancel":"../../node_modules/axios/lib/cancel/isCancel.js","../defaults":"../../node_modules/axios/lib/defaults.js"}],"../../node_modules/axios/lib/core/mergeConfig.js":[function(require,module,exports) {
'use strict';

var utils = require('../utils');

/**
 * Config-specific merge-function which creates a new config-object
 * by merging two configuration objects together.
 *
 * @param {Object} config1
 * @param {Object} config2
 * @returns {Object} New object resulting from merging config2 to config1
 */
module.exports = function mergeConfig(config1, config2) {
  // eslint-disable-next-line no-param-reassign
  config2 = config2 || {};
  var config = {};

  var valueFromConfig2Keys = ['url', 'method', 'params', 'data'];
  var mergeDeepPropertiesKeys = ['headers', 'auth', 'proxy'];
  var defaultToConfig2Keys = [
    'baseURL', 'url', 'transformRequest', 'transformResponse', 'paramsSerializer',
    'timeout', 'withCredentials', 'adapter', 'responseType', 'xsrfCookieName',
    'xsrfHeaderName', 'onUploadProgress', 'onDownloadProgress',
    'maxContentLength', 'validateStatus', 'maxRedirects', 'httpAgent',
    'httpsAgent', 'cancelToken', 'socketPath'
  ];

  utils.forEach(valueFromConfig2Keys, function valueFromConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    }
  });

  utils.forEach(mergeDeepPropertiesKeys, function mergeDeepProperties(prop) {
    if (utils.isObject(config2[prop])) {
      config[prop] = utils.deepMerge(config1[prop], config2[prop]);
    } else if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (utils.isObject(config1[prop])) {
      config[prop] = utils.deepMerge(config1[prop]);
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  utils.forEach(defaultToConfig2Keys, function defaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  var axiosKeys = valueFromConfig2Keys
    .concat(mergeDeepPropertiesKeys)
    .concat(defaultToConfig2Keys);

  var otherKeys = Object
    .keys(config2)
    .filter(function filterAxiosKeys(key) {
      return axiosKeys.indexOf(key) === -1;
    });

  utils.forEach(otherKeys, function otherKeysDefaultToConfig2(prop) {
    if (typeof config2[prop] !== 'undefined') {
      config[prop] = config2[prop];
    } else if (typeof config1[prop] !== 'undefined') {
      config[prop] = config1[prop];
    }
  });

  return config;
};

},{"../utils":"../../node_modules/axios/lib/utils.js"}],"../../node_modules/axios/lib/core/Axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./../utils');
var buildURL = require('../helpers/buildURL');
var InterceptorManager = require('./InterceptorManager');
var dispatchRequest = require('./dispatchRequest');
var mergeConfig = require('./mergeConfig');

/**
 * Create a new instance of Axios
 *
 * @param {Object} instanceConfig The default config for the instance
 */
function Axios(instanceConfig) {
  this.defaults = instanceConfig;
  this.interceptors = {
    request: new InterceptorManager(),
    response: new InterceptorManager()
  };
}

/**
 * Dispatch a request
 *
 * @param {Object} config The config specific for this request (merged with this.defaults)
 */
Axios.prototype.request = function request(config) {
  /*eslint no-param-reassign:0*/
  // Allow for axios('example/url'[, config]) a la fetch API
  if (typeof config === 'string') {
    config = arguments[1] || {};
    config.url = arguments[0];
  } else {
    config = config || {};
  }

  config = mergeConfig(this.defaults, config);

  // Set config.method
  if (config.method) {
    config.method = config.method.toLowerCase();
  } else if (this.defaults.method) {
    config.method = this.defaults.method.toLowerCase();
  } else {
    config.method = 'get';
  }

  // Hook up interceptors middleware
  var chain = [dispatchRequest, undefined];
  var promise = Promise.resolve(config);

  this.interceptors.request.forEach(function unshiftRequestInterceptors(interceptor) {
    chain.unshift(interceptor.fulfilled, interceptor.rejected);
  });

  this.interceptors.response.forEach(function pushResponseInterceptors(interceptor) {
    chain.push(interceptor.fulfilled, interceptor.rejected);
  });

  while (chain.length) {
    promise = promise.then(chain.shift(), chain.shift());
  }

  return promise;
};

Axios.prototype.getUri = function getUri(config) {
  config = mergeConfig(this.defaults, config);
  return buildURL(config.url, config.params, config.paramsSerializer).replace(/^\?/, '');
};

// Provide aliases for supported request methods
utils.forEach(['delete', 'get', 'head', 'options'], function forEachMethodNoData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url
    }));
  };
});

utils.forEach(['post', 'put', 'patch'], function forEachMethodWithData(method) {
  /*eslint func-names:0*/
  Axios.prototype[method] = function(url, data, config) {
    return this.request(utils.merge(config || {}, {
      method: method,
      url: url,
      data: data
    }));
  };
});

module.exports = Axios;

},{"./../utils":"../../node_modules/axios/lib/utils.js","../helpers/buildURL":"../../node_modules/axios/lib/helpers/buildURL.js","./InterceptorManager":"../../node_modules/axios/lib/core/InterceptorManager.js","./dispatchRequest":"../../node_modules/axios/lib/core/dispatchRequest.js","./mergeConfig":"../../node_modules/axios/lib/core/mergeConfig.js"}],"../../node_modules/axios/lib/cancel/Cancel.js":[function(require,module,exports) {
'use strict';

/**
 * A `Cancel` is an object that is thrown when an operation is canceled.
 *
 * @class
 * @param {string=} message The message.
 */
function Cancel(message) {
  this.message = message;
}

Cancel.prototype.toString = function toString() {
  return 'Cancel' + (this.message ? ': ' + this.message : '');
};

Cancel.prototype.__CANCEL__ = true;

module.exports = Cancel;

},{}],"../../node_modules/axios/lib/cancel/CancelToken.js":[function(require,module,exports) {
'use strict';

var Cancel = require('./Cancel');

/**
 * A `CancelToken` is an object that can be used to request cancellation of an operation.
 *
 * @class
 * @param {Function} executor The executor function.
 */
function CancelToken(executor) {
  if (typeof executor !== 'function') {
    throw new TypeError('executor must be a function.');
  }

  var resolvePromise;
  this.promise = new Promise(function promiseExecutor(resolve) {
    resolvePromise = resolve;
  });

  var token = this;
  executor(function cancel(message) {
    if (token.reason) {
      // Cancellation has already been requested
      return;
    }

    token.reason = new Cancel(message);
    resolvePromise(token.reason);
  });
}

/**
 * Throws a `Cancel` if cancellation has been requested.
 */
CancelToken.prototype.throwIfRequested = function throwIfRequested() {
  if (this.reason) {
    throw this.reason;
  }
};

/**
 * Returns an object that contains a new `CancelToken` and a function that, when called,
 * cancels the `CancelToken`.
 */
CancelToken.source = function source() {
  var cancel;
  var token = new CancelToken(function executor(c) {
    cancel = c;
  });
  return {
    token: token,
    cancel: cancel
  };
};

module.exports = CancelToken;

},{"./Cancel":"../../node_modules/axios/lib/cancel/Cancel.js"}],"../../node_modules/axios/lib/helpers/spread.js":[function(require,module,exports) {
'use strict';

/**
 * Syntactic sugar for invoking a function and expanding an array for arguments.
 *
 * Common use case would be to use `Function.prototype.apply`.
 *
 *  ```js
 *  function f(x, y, z) {}
 *  var args = [1, 2, 3];
 *  f.apply(null, args);
 *  ```
 *
 * With `spread` this example can be re-written.
 *
 *  ```js
 *  spread(function(x, y, z) {})([1, 2, 3]);
 *  ```
 *
 * @param {Function} callback
 * @returns {Function}
 */
module.exports = function spread(callback) {
  return function wrap(arr) {
    return callback.apply(null, arr);
  };
};

},{}],"../../node_modules/axios/lib/axios.js":[function(require,module,exports) {
'use strict';

var utils = require('./utils');
var bind = require('./helpers/bind');
var Axios = require('./core/Axios');
var mergeConfig = require('./core/mergeConfig');
var defaults = require('./defaults');

/**
 * Create an instance of Axios
 *
 * @param {Object} defaultConfig The default config for the instance
 * @return {Axios} A new instance of Axios
 */
function createInstance(defaultConfig) {
  var context = new Axios(defaultConfig);
  var instance = bind(Axios.prototype.request, context);

  // Copy axios.prototype to instance
  utils.extend(instance, Axios.prototype, context);

  // Copy context to instance
  utils.extend(instance, context);

  return instance;
}

// Create the default instance to be exported
var axios = createInstance(defaults);

// Expose Axios class to allow class inheritance
axios.Axios = Axios;

// Factory for creating new instances
axios.create = function create(instanceConfig) {
  return createInstance(mergeConfig(axios.defaults, instanceConfig));
};

// Expose Cancel & CancelToken
axios.Cancel = require('./cancel/Cancel');
axios.CancelToken = require('./cancel/CancelToken');
axios.isCancel = require('./cancel/isCancel');

// Expose all/spread
axios.all = function all(promises) {
  return Promise.all(promises);
};
axios.spread = require('./helpers/spread');

module.exports = axios;

// Allow use of default import syntax in TypeScript
module.exports.default = axios;

},{"./utils":"../../node_modules/axios/lib/utils.js","./helpers/bind":"../../node_modules/axios/lib/helpers/bind.js","./core/Axios":"../../node_modules/axios/lib/core/Axios.js","./core/mergeConfig":"../../node_modules/axios/lib/core/mergeConfig.js","./defaults":"../../node_modules/axios/lib/defaults.js","./cancel/Cancel":"../../node_modules/axios/lib/cancel/Cancel.js","./cancel/CancelToken":"../../node_modules/axios/lib/cancel/CancelToken.js","./cancel/isCancel":"../../node_modules/axios/lib/cancel/isCancel.js","./helpers/spread":"../../node_modules/axios/lib/helpers/spread.js"}],"../../node_modules/axios/index.js":[function(require,module,exports) {
module.exports = require('./lib/axios');
},{"./lib/axios":"../../node_modules/axios/lib/axios.js"}],"models.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.SentenceModel = exports.StudentResultsModel = exports.CreateSentenceModel = exports.CreateTaskModel = exports.AuthModel = void 0;

var _views = require("./views.js");

var _axios = _interopRequireDefault(require("axios"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

class ModelApiError extends Error {} // parent class for models. includes some utility methods, and such
//
// if we wanted to get fancy, we might consider picking up the mongoose model definitions, and making use of that somehow.
// but, that seems like it might take more effort than it's worth, at least until we start needing client-side validation


class Model {
  constructor(data) {
    this.data = data;
  } // can throw, catch in the Controller layer


  static async sendApiRequest(url, method, data) {
    try {
      const res = await (0, _axios.default)({
        method,
        url,
        data
      });

      if (res.data.status == 'success') {
        return res;
      } // TODO question for Tom: what should we pass as the error message here?


      throw new ModelApiError('API failure');
    } catch (err) {
      throw new ModelApiError(err.response.data.message);
    }
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
    return this.sendApiRequest('api/v1/users/login', 'POST', {
      email,
      password
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
      classCode
    });
  }

}

exports.AuthModel = AuthModel;

class CreateTaskModel extends Model {}

exports.CreateTaskModel = CreateTaskModel;

class CreateSentenceModel extends Model {
  // can throw, catch in the Controller layer
  static async create(sentence, translation, level, vivaRef, tense, grammar) {
    const data = {
      sentence,
      translation,
      level,
      vivaRef,
      grammar,
      tense
    };
    return this.sendApiRequest('/api/v1/sentences', 'POST', data);
  }

} // TODO maybe move some of the data from the controller into this?


exports.CreateSentenceModel = CreateSentenceModel;

class StudentResultsModel extends Model {
  static async send(correctCount, wrongCount, studentSentences) {
    const payload = {
      correctCount: this.correctCount,
      wrongCount: this.wrongCount,
      studentSentences: this.finishedSentences
    };
    return this.sendApiRequest('TODO-PLACEHOLDER', 'POST', payload);
  }

}

exports.StudentResultsModel = StudentResultsModel;

class SentenceModel extends Model {
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

  static async fetchAll() {
    const res = await this.sendApiRequest('api/v1/sentences', 'GET', {});
    const sentences = res.data.data.data;
    return sentences.map(sentenceData => new this(sentenceData));
  }

}

exports.SentenceModel = SentenceModel;

class GappedSentenceModel extends SentenceModel {
  constructor(data) {
    super(data);
    const words = this.data.sentence.trim().split(/\s+/g);
    const gapIndex = Math.floor(Math.random() * words.length); // TODO handle punctuation

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
},{"./views.js":"views.js","axios":"../../node_modules/axios/index.js"}],"controllers.js":[function(require,module,exports) {
"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.CreateTaskChooseSentenceController = exports.TrainController = exports.CreateTaskRandomController = exports.AudioEditorController = exports.CreateSentenceController = exports.SignupController = exports.LogoutController = exports.LoginController = void 0;

var _views = require("./views.js");

var _models = require("./models.js");

function ownKeys(object, enumerableOnly) { var keys = Object.keys(object); if (Object.getOwnPropertySymbols) { var symbols = Object.getOwnPropertySymbols(object); if (enumerableOnly) symbols = symbols.filter(function (sym) { return Object.getOwnPropertyDescriptor(object, sym).enumerable; }); keys.push.apply(keys, symbols); } return keys; }

function _objectSpread(target) { for (var i = 1; i < arguments.length; i++) { var source = arguments[i] != null ? arguments[i] : {}; if (i % 2) { ownKeys(Object(source), true).forEach(function (key) { _defineProperty(target, key, source[key]); }); } else if (Object.getOwnPropertyDescriptors) { Object.defineProperties(target, Object.getOwnPropertyDescriptors(source)); } else { ownKeys(Object(source)).forEach(function (key) { Object.defineProperty(target, key, Object.getOwnPropertyDescriptor(source, key)); }); } } return target; }

function _defineProperty(obj, key, value) { if (key in obj) { Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); } else { obj[key] = value; } return obj; }

// parent class for controllers. Not much needs to be in here, I don't think, so leave it empty.
class Controller {
  constructor(viewBaseElement) {
    const viewClass = this.getViewClass();
    this.view = new viewClass(viewBaseElement);
  }

}

class LoginController extends Controller {
  getViewClass() {
    return _views.LoginFormView;
  }

  constructor() {
    super(...arguments);
    this.view.onFormData(async (_ref) => {
      let {
        email,
        password
      } = _ref;

      try {
        await _models.AuthModel.login(email, password);

        _views.AlertView.show('success', 'Logged in successfully!');

        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      } catch (err) {
        _views.AlertView.show('error', err.message);
      }
    });
  }

}

exports.LoginController = LoginController;

class LogoutController extends Controller {
  getViewClass() {
    return _views.LogoutView;
  }

  constructor() {
    super(...arguments);
    this.view.eventOnRoot('click', async () => {
      try {
        await _models.AuthModel.logout();

        _views.AlertView.show('success', 'Logged out!');

        window.setTimeout(() => {
          location.assign('/login');
        }, 1500);
      } catch (err) {
        _views.AlertView.show('error', err.message);
      }
    });
  }

}

exports.LogoutController = LogoutController;

class SignupController extends Controller {
  getViewClass() {
    return _views.SignupFormView;
  }

  constructor() {
    super(...arguments);
    this.view.onFormData(async (_ref2) => {
      let {
        name,
        email,
        password,
        passwordConfirm,
        classCode
      } = _ref2;

      try {
        await _models.AuthModel.signup(name, email, password, passwordConfirm, classCode);

        _views.AlertView.show('success', 'Signed up successfully!');

        window.setTimeout(() => {
          location.assign('/');
        }, 1500);
      } catch (err) {
        _views.AlertView.show('error', err.message);
      }
    });
  }

}

exports.SignupController = SignupController;

class CreateSentenceController extends Controller {
  getViewClass() {
    return _views.CreateSentenceFormView;
  }

  constructor() {
    super(...arguments);
    this.view.onFormData(async (_ref3) => {
      let {
        sentence,
        translation,
        level,
        vivaRef,
        tense,
        grammar
      } = _ref3;

      try {
        const res = await _models.CreateSentenceModel.create(sentence, translation, level, vivaRef, tense, grammar);
        this.view.clearFormData();

        if (res) {
          _views.AlertView.show('success', 'Sentence created');
        }
      } catch (err) {
        _views.AlertView.show('error', err.message);
      }
    });
  }

}

exports.CreateSentenceController = CreateSentenceController;

class AudioEditorController extends Controller {
  getViewClass() {
    return _views.AudioEditorView;
  }

}

exports.AudioEditorController = AudioEditorController;

class CreateTaskRandomController extends Controller {
  getViewClass() {
    return _views.CreateTaskRandomView;
  }

  constructor() {
    super(...arguments);
    this.view.onCreateTaskRandomValues(async (searchParams, taskDetails) => {
      try {
        //Get sentences from API
        const sentencesRes = await _models.CreateTaskModel.sendApiRequest("/api/v1/sentences?".concat(searchParams), 'GET'); // Add sentence ID array and teacher to req.body for task creation

        taskDetails.sentences = sentencesRes.data.data.data.map(e => e._id);
        taskDetails.teacher = _views.DataParserView.get('user'); //Create task

        const createTask = await _models.CreateTaskModel.sendApiRequest('/api/v1/tasks', 'POST', taskDetails);

        if (createTask) {
          _views.AlertView.show('success', 'Task created');
        }
      } catch (err) {
        _views.AlertView.show('error', err.message);
      }
    });
  }

}

exports.CreateTaskRandomController = CreateTaskRandomController;

class TrainController extends Controller {
  getViewClass() {
    return _views.TrainingView;
  }

  constructor() {
    super(...arguments);

    const exerciseType = _views.DataParserView.get('exercise');

    this.sentences = _models.SentenceModel.getLocal('sentences').map(sent => sent.subclassAs(exerciseType));
    this.finishedSentences = [];
    this.initialCount = this.sentences.length;
    this.rightCount = 0;
    this.wrongCount = 0;
    this.view.updateCounts(this.rightCount, this.initialCount);
    this.view.on('answer', this.doAnswer.bind(this));
    this.view.on('next', this.doNextSentence.bind(this));
    this.doNextSentence();
  }

  doAnswer(_ref4) {
    let {
      student_answer,
      isCorrect
    } = _ref4;
    const desiredReaskLength = 3;
    const sentenceObject = this.sentences.shift();
    this.finishedSentences.push({
      sentence: sentenceObject.data,
      student_answer,
      isCorrect
    });

    if (isCorrect) {
      _views.AlertView.show('success', 'Correct Answer');

      this.rightCount++;
    } else {
      _views.AlertView.show('error', 'Incorrect Answer');

      this.wrongCount++;
      const insertionIndex = Math.min(this.sentences.length, desiredReaskLength);
      this.sentences.splice(insertionIndex, 0, sentenceObject);
    }

    this.view.updateCounts(this.rightCount, this.initialCount);
  }

  doNextSentence() {
    if (!this.sentences[0]) {
      this.view.finish(); // wait to show the AlertView until *after* the data has hit the server successfully

      this.sendResultsToServer().then(() => {
        return _views.AlertView.show('success', 'Task Completed');
      }).then(() => {
        window.location = '/';
      });
      return;
    }

    const sentence = this.sentences[0];
    this.view.prompt = sentence.prompt;
    this.view.answer = sentence.answer;
    this.view.audioUrl = sentence.audioUrl;
  }

  async sendResultsToServer() {
    try {
      await _models.StudentResultsModel.send(this.correctCount, this.wrongCount, this.finishedSentences); // do we need to show feedback or anything?
    } catch (err) {
      _views.AlertView.show('error', err.message);
    }
  }

}

exports.TrainController = TrainController;

class CreateTaskChooseSentenceController extends Controller {
  getViewClass() {
    return _views.CreateTaskChooseSentenceView;
  }

  constructor(viewBaseElement) {
    super(viewBaseElement);
    this.view.on('filter_update', async filterData => {
      /*
      const tmp = this.sentences.filter((sent) => {
        if (
          this.sentencesToSave.some((other) => other.data._id == sent.data._id)
        ) {
          return true;
        }
        for (let key in filterData) {
          if (filterData[key] == '') {
            continue;
          }
          if (sent.data[key] instanceof Array) {
            if (!sent.data[key].includes(filterData[key])) {
              return false;
            }
          } else {
            if (sent.data[key] != filterData[key]) {
              return false;
            }
          }
        }
         return true;
      });
      */
      const searchParams = new URLSearchParams(_objectSpread({}, filterData));
      const tmp = await _models.SentenceModel.sendApiRequest("/api/v1/sentences?".concat(searchParams.toString()), 'GET');
      const sents = tmp.data.data.data.map(dbObj => new _models.SentenceModel(dbObj));
      const saveIds = this.sentencesToSave.map(sent => sent.data._id);
      this.view.updateDisplay(sents.filter(sent => !saveIds.includes(sent.data._id)), this.sentencesToSave);
    });
    this.sentencesToSave = [];
    this.view.on('add_sentence', (_ref5) => {
      let {
        sentenceId
      } = _ref5;
      this.sentencesToSave.push(this.sentences.find(sent => sent.data._id == sentenceId));
    });
    this.view.on('remove_sentence', (_ref6) => {
      let {
        sentenceId
      } = _ref6;
      this.sentencesToSave = this.sentencesToSave.filter(sent => sent.data._id != sentenceId);
    });
    this.view.on('save', this.save.bind(this));
    this.sentences = [];

    _models.SentenceModel.fetchAll().then(sent => this.updateSentences(sent)).catch(err => _views.AlertView.show('error', err));
  }

  updateSentences(sentences) {
    this.sentences = sentences;
    this.view.updateDisplay(sentences, this.sentencesToSave);
  }

  async save() {
    try {
      const sentences = this.sentencesToSave.map(e => e.data._id);
      const taskDetails = this.view.getValues('.task-details');
      taskDetails.sentences = sentences;
      taskDetails.teacher = _views.DataParserView.get('user');
      const createTask = await _models.CreateTaskModel.sendApiRequest('/api/v1/tasks', 'POST', taskDetails);

      if (createTask) {
        _views.AlertView.show('success', 'Task created!');
      }
    } catch (err) {
      _views.AlertView.show('error', err.message);
    }
  }

}

exports.CreateTaskChooseSentenceController = CreateTaskChooseSentenceController;
},{"./views.js":"views.js","./models.js":"models.js"}],"app.js":[function(require,module,exports) {
"use strict";

var controllers = _interopRequireWildcard(require("./controllers.js"));

function _getRequireWildcardCache() { if (typeof WeakMap !== "function") return null; var cache = new WeakMap(); _getRequireWildcardCache = function () { return cache; }; return cache; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

(function () {
  // load controllers dynamically based on what the server-generated HTML requests
  Array.from(document.querySelectorAll('[data-controller]')).forEach(domElement => {
    const controllerClass = controllers[domElement.dataset['controller']];
    new controllerClass(domElement);
  });
})();
},{"./controllers.js":"controllers.js"}]},{},["app.js"], null)
//# sourceMappingURL=/js/bundle.js.map