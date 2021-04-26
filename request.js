const axios = require('axios');

var exports = module.exports = {};

exports.transformData = null;

exports.send = async (method, url, formData = {}, params = {}) => {

    let requestData = {
        method: method,
        url: url,
        route: '',
        headers: {
            'Content-Type': 'application/x-www-form-urlencoded'
        },
        ...params
    }

    if (formData) {
        requestData.data = typeof exports.transformData === 'function' ?
            exports.transformData(formData) :
            formData;
    }

    return axios.request(requestData)
        .then((response) => {
            // console.log(`axios request success ${requestData.url}`, response.data);
            return response;
        })
}