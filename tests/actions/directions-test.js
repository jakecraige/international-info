var tape = require("tape");
var directions = require("../../app/actions/directions");
var transitResponse = require("../fixtures/transit-response");

tape.test("directions - returns formatted string", function(t) {
  var gmAPI = {
    directions: function(params, callback) {
      callback(null, transitResponse);
    }
  };
  var message = {
    meta: {
      from: "Askew Elementary Houston ",
      to: "Poetic Systems Houston",
      via: "transit"
    }
  };

  directions(message, gmAPI).then(function(textContents) {
    t.equal(textContents.length, 2);
    t.end();
  }, function(err) {
    t.fail(err);
    t.end();
  });
});
