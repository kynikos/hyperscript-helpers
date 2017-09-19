'use strict';

Object.defineProperty(exports, '__esModule', {
  value: true
});
var isValidString = function isValidString(param) {
  return typeof param === 'string' && param.length > 0;
};

var startsWith = function startsWith(string, start) {
  return string[0] === start;
};

var isSelector = function isSelector(param) {
  return isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));
};

exports['default'] = function (h) {
  // Inspired by https://stackoverflow.com/a/40075864/645498
  return new Proxy({}, {
    get: function get(target, property) {
      switch (property) {
        case 'TAG_NAMES':
          return []; // TODO: Still useful? How to preserve backward compatibility?
        case 'createTag':
          return function () {}; // TODO: Preserve for backward compatibility?
        case 'isSelector':
          return isSelector; // TODO: Still useful to expose this?
        default:
          return function (first) {
            for (var _len = arguments.length, rest = Array(_len > 1 ? _len - 1 : 0), _key = 1; _key < _len; _key++) {
              rest[_key - 1] = arguments[_key];
            }

            if (isSelector(first)) {
              return h.apply(undefined, [property + first].concat(rest));
            } else if (typeof first === 'undefined') {
              return h(property);
            } else {
              return h.apply(undefined, [property, first].concat(rest));
            }
          };
      }
    }
  });
};

module.exports = exports['default'];