const _ = require('lodash');
const jsforce = require('jsforce');

function connectSalesforce (user, options) {
  const conn = new jsforce.Connection({
    loginUrl: options.adminLoginUrl || 'https://client-domain.my.salesforce.com'
  });
  return conn.login(options.adminUsername || 'USERNAME', options.adminPasswordAndToken || 'PASSWORD')
    .then(function () {
      return conn.query(`SELECT Id, Name FROM Account WHERE Username ='${user.username}'`);
    })
    .then(function (data) {
      console.log('📯', data);

      return user;
    })
    .catch(function (e) {
      throw e;
    });
};

module.exports = {
  connectSalesforce
};