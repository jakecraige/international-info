var tape = require("tape");
var tryPromise = require("../../app/utils/try-promise");

tape.test("utils - tryPromise - calls error cb when promise fails", function(t) {
  t.plan(1);

  var failureError = new Error("Failed");

  tryPromise(function() {
    return Promise.reject(failureError);
  }).then(null, function(err) {
    t.equal(err, failureError);
  });
});

tape.test("utils - tryPromise - calls error cb when error thrown", function(t) {
  t.plan(1);

  var failureError = new Error("Failed");

  tryPromise(function() {
    throw failureError;
    return Promise.resolve();
  }).then(null, function(err) {
    t.equal(err, failureError);
  });
});
