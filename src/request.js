const axios = require('axios');

module.exports = {};

module.exports.transformData = null;

module.exports.send = async (method, url, formData = {}, params = {}) => {
  const requestData = {
    method,
    url,
    route: '',
    headers: {
      'Content-Type': 'application/x-www-form-urlencoded',
    },
    ...params,
  };

  if (formData) {
    requestData.data = typeof module.exports.transformData === 'function'
      ? module.exports.transformData(formData)
      : formData;
  }

  return axios.request(requestData)
    .then((response) => response);
};
