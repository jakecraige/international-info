var twilio = require('twilio');
var tokenize = require('../tokenize');
var directions = require('../actions/directions');
var GoogleMaps = require('googlemaps');
var tryPromise = require('../utils/try-promise')

var googleConfig = {
  key: process.env.GOOGLE_API_KEY,
  secure: true
};

module.exports = {
  post: function(req, res) {
    var gmAPI, tokenized, resp;
    res.append('Content-Type', 'text/xml');
    resp = new twilio.TwimlResponse();

    tryPromise(function() {
      gmAPI = new GoogleMaps(googleConfig);
      tokenized = tokenize(req.body.Body);

      return directions(tokenized, gmAPI);
    }).then(function(textContents) {
      textContents.forEach(function(text) { resp.message(text); });
    }).catch(function(err) {
      console.log(err.stack);
      resp.message('Internal server error.');
    }).finally(function() {
      res.send(resp.toString());
    });
  }
};
