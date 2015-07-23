var directionsTokenizer = require("./tokenizers/directions");

module.exports = function(string) {
  return directionsTokenizer(string);
}
