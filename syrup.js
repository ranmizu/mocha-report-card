function expect(argA) {
  return {
    toBe: function(argB) {
      if (argA === argB) return true;
      throw new Error('no no no')
    },
    toNotBe: function(argB) {
      return argA !== argB;
    },
    toExist: function() {
      return !!argA;
    },
    toNotExist: function() {
      return !argA;
    },
  }
}

module.exports = expect;
