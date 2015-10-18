/*!
 * chrome-promise 1.0.6
 * https://github.com/tfoxy/chrome-promise
 *
 * Copyright 2015 Tomás Fox
 * Released under the MIT license
 */

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define([], factory.bind(null, typeof exports === 'object'? this : root));
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(this);
  } else {
    // Browser globals (root is window)
    root.ChromePromise = factory(root);
  }
}(this, function (root) {
  'use strict';

  function ChromePromise(chrome, Promise) {
    chrome = chrome || root.chrome;
    Promise = Promise || root.Promise;

    var setPromiseFunction = function(fn, self) {

      return function() {
        var args = arguments;

        return new Promise(function(resolve, reject) {
          function callback() {
            var err = chrome.runtime.lastError;
            if (err) {
              reject(err);
            } else {
              resolve.apply(null, arguments);
            }
          }

          args[args.length] = callback;
          args.length++;

          fn.apply(self, args);
        });

      };

    };

    var fillProperties = function(from, to) {
      for (var key in from) {
        if (Object.prototype.hasOwnProperty.call(from, key)) {
          var val = from[key];
          var type = typeof val;

          if (type === 'object' && !(val instanceof ChromePromise)) {
            to[key] = {};
            fillProperties(val, to[key]);
          } else if (type === 'function') {
            to[key] = setPromiseFunction(val, from);
          } else {
            to[key] = val;
          }
        }
      }
    };

    fillProperties(chrome, this);
  }

  return ChromePromise;
}));
