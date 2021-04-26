
module.exports = (_chai, utils) => {
    let Assertion = _chai.Assertion;

    function assertStatus(status) {
        
        var respStatus = this._obj.status;

        this.assert(
            respStatus === status
            , 'expected status code ' + respStatus + ' to equal ' + status
            , 'expected status code ' + respStatus + ' not to equal ' + status
            , status
            , respStatus
        );
    }

    Assertion.addMethod('status', assertStatus);
};


