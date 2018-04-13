'use strict';

function isFunction(thing) {
  return typeof thing === 'function';
}

function isES6Promise(thing) {
  return (
    thing &&
    thing.prototype &&
    isFunction(thing.prototype.then) &&
    isFunction(thing.prototype.catch) &&
    isFunction(thing.all) &&
    isFunction(thing.race) &&
    isFunction(thing.resolve) &&
    isFunction(thing.reject)
  );
}

module.exports = isES6Promise(Promise)
  ? Promise
  : require('promise/lib/es6-extensions');
