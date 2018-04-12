'use strict';

function promised(fn) {
  return new Promise(function(resolve, reject) {
    fn(function(err) {
      if (err) return reject(err);

      var args = Array.prototype.slice.call(arguments, 1);

      return args.length ? resolve.apply(resolve, args) : resolve();
    });
  });
}

module.exports = promised;
