var tape = require("tape");
var tokenizer = require("../app/tokenize");

tape.test("tokenizer - Directions - returns formatted object", function(t) {
  var message = "Directions from " +
    "Askew Elementary Houston " +
    "to " +
    "Poetic Systems Houston.";

  var tokenizedMessage = tokenizer(message);

  t.equal(tokenizedMessage.action, "directions");
  t.equal(tokenizedMessage.meta.from, "Askew Elementary Houston");
  t.equal(tokenizedMessage.meta.to, "Poetic Systems Houston.");
  t.end();
});
