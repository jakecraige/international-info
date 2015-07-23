module.exports = function(string) {
  var action, meta = {}, from, to, via = null;
  var words = string.split(" ");
  var fromIndex, toIndex, viaIndex;

  words.forEach(function(word, index) {
    if (word === "from") {
      fromIndex = index;
    } else if (word === "to") {
      toIndex = index;
    } else if (word === "via") {
      viaIndex = index;
    }
  });

  from = words.slice(fromIndex + 1, toIndex).join(" ");
  to = words.slice(toIndex + 1).join(" ");
  if (via !== null) {
    via = words.slice(viaIndex + 1).join(" ");
  }

  return {
    action: words[0].toLowerCase(),
    meta: {
      from: from,
      to: to,
      via: via
    }
  };
}
