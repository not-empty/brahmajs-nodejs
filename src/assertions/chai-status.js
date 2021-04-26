module.exports = (_chai, utils) => {
  const { Assertion } = _chai;

  function assertStatus(status) {
    const respStatus = this._obj.status;

    this.assert(
      respStatus === status,
      `expected status code ${respStatus} to equal ${status}`,
      `expected status code ${respStatus} not to equal ${status}`,
      status,
      respStatus,
    );
  }

  Assertion.addMethod('status', assertStatus);
};
