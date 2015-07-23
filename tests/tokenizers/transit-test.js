var tape = require('tape');
var directionsTokenizer = require('../../app/tokenizers/directions');

tape.test('directionsTokenizer - parses out from and to', function(t) {
  var message = "Directions from " +
    "Askew Elementary Houston " +
    "to " +
    "Poetic Systems Houston";

  var tokenizedMessage = directionsTokenizer(message);

  t.equal(tokenizedMessage.action, "directions");
  t.equal(tokenizedMessage.meta.from, "Askew Elementary Houston");
  t.equal(tokenizedMessage.meta.to, "Poetic Systems Houston");
  t.equal(tokenizedMessage.meta.via, "transit");
  t.end();
});

tape.only('directionsTokenizer - parses out via', function(t) {
  var message = "Directions from " +
    "Askew Elementary Houston " +
    "to " +
    "Poetic Systems Houston " +
    "via walking";

  var tokenizedMessage = directionsTokenizer(message);

  t.equal(tokenizedMessage.meta.via, "walking");
  t.end();
});
