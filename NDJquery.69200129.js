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
})({"assets/js/NDJquery.js":[function(require,module,exports) {
function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

function _defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } }

function _createClass(Constructor, protoProps, staticProps) { if (protoProps) _defineProperties(Constructor.prototype, protoProps); if (staticProps) _defineProperties(Constructor, staticProps); return Constructor; }

function _addClass(element, classToAdd) {
  return element.className += " ".concat(classToAdd);
}

function _removeClass(element, classToRemove) {
  return element.className = element.className.replace(classToRemove, "").trim();
}

function append(element, addableElements) {
  return element.innerHTML += addableElements;
}

function _remove(element) {
  var removeableElements = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

  if (removeableElements) {
    removeableElements.forEach(function (element) {
      return element.removeChild(element);
    });
  } else {
    return element.remove();
  }
}

function _text(element) {
  (function rec(el) {
    var childs = el.childNodes;
    var i = childs.length;
    var str = "";

    while (i--) {
      if (childs[i].nodeType === 1) {
        str += rec(childs[i]);
      } else {
        str += childs[i].nodeValue;
      }
    }

    return str;
  })(element);
}

function _attr(element, attribute) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (value === null) {
    return element.getAttribute(attribute);
  } else {
    element.setAttribute(attribute, value);
  }
}

function _children(element) {
  return element.childNodes;
}

function _empty(element) {
  element.innerHTML = null;
}

function _css(element, property) {
  var value = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;

  if (value === null) {
    var styles = window.getComputedStyle(element);
    return styles.getPropertyValue(property);
  } else {
    element.setAttribute(property, value);
  }
}

function _click(element, func) {
  element.addEventListener('click', func, false);
}

function toggle(element) {
  if (element.style.visibility !== "hidden") {
    element.style.visibility = "hidden";
  } else {
    element.style.visibility = "visible";
  }
}

function _wrap(element, tags) {
  var startTagsIndex = tags.indexOf('/') - 1;
  element.outerHTML = "".concat(tags.substr(0, startTagsIndex)).concat(element.parentNode.innerHTML).concat(tags.substr(startTagsIndex - 1, tags.length));
}

function $(sel) {
  return new JQR(sel);
}

var JQR = /*#__PURE__*/function () {
  function JQR(sel) {
    _classCallCheck(this, JQR);

    this.elements = document.querySelectorAll(sel);
  }

  _createClass(JQR, [{
    key: "addClass",
    value: function addClass(classToAdd) {
      this.elements.forEach(function (element) {
        return _addClass(element, classToAdd);
      });
    }
  }, {
    key: "removeClass",
    value: function removeClass(classToRemove) {
      this.elements.forEach(function (element) {
        return _removeClass(element, classToRemove);
      });
    }
  }, {
    key: "append",
    value: function append(addableElements) {
      this.elements.forEach(function (element) {
        return _addClass(element, addableElements);
      });
    }
  }, {
    key: "remove",
    value: function remove() {
      var removeableElements = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : null;
      this.elements.forEach(function (element) {
        return _remove(element, removeableElements);
      });
    }
  }, {
    key: "text",
    value: function text() {
      var txt = "";

      for (var _i = 0; _i < this.elements.length; _i++) {
        txt += _text(this.elements[_i]);
      }

      return txt;
    }
  }, {
    key: "attr",
    value: function attr(attribute) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;
      this.elements.forEach(function (element) {
        return _attr(element, attribute, value);
      });
    }
  }, {
    key: "children",
    value: function children() {
      var elem;

      for (var _i2 = 0; _i2 < this.elements.length; _i2++) {
        elem += _children(this.elements[_i2]);
      }

      return elem;
    }
  }, {
    key: "empty",
    value: function empty() {
      this.elements.forEach(function (element) {
        return _empty(element);
      });
    }
  }, {
    key: "css",
    value: function css(property) {
      var value = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : null;

      if (value === null) {
        var styles = "";

        for (var _i3 = 0; _i3 < this.elements.length; _i3++) {
          styles += _css(this.elements[_i3], property);
        }

        return styles;
      } else {
        _css(this.elements[i], property, value);
      }
    }
  }, {
    key: "click",
    value: function click(func) {
      this.elements.forEach(function (element) {
        return _click(element, func);
      });
    }
  }, {
    key: "each",
    value: function each(func) {
      this.elements.forEach(func);
    }
  }, {
    key: "wrap",
    value: function wrap(tags) {
      this.elements.forEach(function (element) {
        return _wrap(element, tags);
      });
    }
  }]);

  return JQR;
}();
},{}],"../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js":[function(require,module,exports) {
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
  var ws = new WebSocket(protocol + '://' + hostname + ':' + "62175" + '/');

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
},{}]},{},["../../AppData/Roaming/npm/node_modules/parcel-bundler/src/builtins/hmr-runtime.js","assets/js/NDJquery.js"], null)
//# sourceMappingURL=/NDJquery.69200129.js.map