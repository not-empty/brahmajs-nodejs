module.exports = (_chai, utils) => {
  function isInteger(num) {
    return (num % 1 === 0);
  }

  function assertInteger() {
    const obj = this._obj;

    this.assert(
      isInteger(obj),
      'expected #{this} to be an integer',
      'expected #{this} to not be an integer',
      obj,
    );
  }

  utils.addMethod(_chai.Assertion.prototype, 'integer', assertInteger);
};
