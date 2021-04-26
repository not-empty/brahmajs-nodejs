
var exports = module.exports = {};


exports.runTest = (json, context) => {

    if (!json.hasOwnProperty('method')) {
        throw new Error('Brahma template process error: request method not informed')
    }

    if (!json.hasOwnProperty('name')) {
        throw new Error('Brahma template process error: test name not informed')
    }


    if (
        !json.hasOwnProperty('expected') ||
        typeof json.expected !== 'object' ||
        json.expected.length === 0
    ) {
        throw new Error('Brahma template process error: expected assertion is incorrect or was not informed')
    }

    const formData = {
        ...json.data
    };

    describe(json.name, () => {

        json.expected.forEach(test => {

            it(test.desc, async () => {

                const response = await context.post(formData);
                
                // Run the assertions
                test.assertions.forEach(assertion => {
                    exports.performAssertion(assertion, response, context)
                })

            });

        })

    });


}


exports.performAssertion = (params, response, context) => {


    const { chai } = context;
    const { assert, expect } = chai;

    // load custom assertion name
    const { name } = params;

    // load data body form response
    let { data } = response;

    if (params.hasOwnProperty('prop')) {
        if (!params.prop.includes('|')) {
            data = data[params.prop]
        } else {
            // deep load obj properties 
            const keys = params.prop.split('|');
            for (const i = 0; i < keys.length; i++) {
                data = data[keys[i]];
            }
        }
    }



    // manual assert
    // reference: https://www.chaijs.com/api/assert/
    if (name === 'assert') {
        const { func } = params;
        
        let message = '';
        if (params.hasOwnProperty('message')) {
            message = params.message;
        }

        if (params.hasOwnProperty('value')) {
            const { value } = params;
            assert[func](data, value, message);
        } else {
            assert[func](data, message);
        }
        

        return;
    }

    // load custom assertion value
    const { value } = params;

    // default expect assertions
    // @todo add more assertions
    // reference: https://www.chaijs.com/api/bdd/
    if (name === 'equal') {
        expect(data).to.equal(value);
    }

    if (name === 'be') {
        expect(data).to.be.a(value);
    }

    if (name === 'length') {
        expect(data).to.have.lengthOf(value);
    }


    // extended plugins
    if (name === 'statusCode') {
        expect(response).to.have.status(value);
    }


}