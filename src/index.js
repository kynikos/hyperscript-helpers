const isValidString = param => typeof param === 'string' && param.length > 0;

const startsWith = (string, start) => string[0] === start;

const isSelector = param =>
  isValidString(param) && (startsWith(param, '.') || startsWith(param, '#'));

export default h => {
  // Inspired by https://stackoverflow.com/a/40075864/645498
  return new Proxy({}, {
    get(target, property) {
      switch (property) {
      case 'TAG_NAMES':
        return [];  // TODO: Still useful? How to preserve backward compatibility?
      case 'createTag':
        return () => {};  // TODO: Preserve for backward compatibility?
      case 'isSelector':
        return isSelector;  // TODO: Still useful to expose this?
      default:
        return (first, ...rest) => {
          if (isSelector(first)) {
            return h(property + first, ...rest);
          } else if (typeof first === 'undefined') {
            return h(property);
          } else {
            return h(property, first, ...rest);
          }
        };
      }
    }
  });
};
