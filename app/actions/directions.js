var moment = require("moment");
var util = require("util");
var transitFormatter = require("../formatters/transit");
var Promise = require("rsvp").Promise;

module.exports = function(tokenized, gmAPI) {
  return new Promise(function(resolve, reject) {
    var mode = tokenized.meta.via || "transit";
    console.log("mde", mode);
    try {
      gmAPI.directions({
        origin: tokenized.meta.from,
        destination: tokenized.meta.to,
        mode: tokenized.meta.via || "transit",
        departure_time: moment().add(5, "minutes").toDate()
      }, function(err, res) {
        if (err) { return reject(err); }

        try {
          console.log(res);
          console.log("formatted", transitFormatter(res));
          return resolve(transitFormatter(res));
        } catch(e) {
          return reject(e);
        }
      });
    } catch(e) {
      return reject(e);
    }
  });
}

function stripHTML(string) {
  return string.replace(/<(?:.|\n)*?>/gm, '');
}

