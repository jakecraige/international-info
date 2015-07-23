var Promise = require("rsvp").Promise;

module.exports = function(attemptCallback) {
  return new Promise(function(resolve, reject) {
    try {
      attemptCallback().then(resolve, reject);
    } catch(e) {
      reject(e);
    }
  });
};
