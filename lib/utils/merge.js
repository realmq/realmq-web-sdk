'use strict';

function merge() {
  var target = {};

  for (var i = 0, l = arguments.length; i < l; ++i) {
    var src = arguments[i];

    if (src) {
      Object.keys(src).forEach(function(key) {
        if (typeof src[key] !== 'undefined') {
          target[key] = src[key];
        }
      });
    }
  }

  return target;
}

module.exports = merge;
