var tape = require('tape');
var transitParser = require('../../app/formatters/transit');
var transitResponse = require('../fixtures/transit-response');

tape.test('transitParser - returns correctly parsed results', function(t) {
  var textContents = transitParser(transitResponse);
  var summary = textContents[0];
  var directions = textContents[1];

  t.equal(textContents.length, 2);
  t.equal(
    summary,
    '2.5 km | 13 mins\n' +
    'From: London Bridge, London SE1, UK\n' +
    'To: London Eye, Lambeth, London SE1 7PB, UK'
  );
  t.equal(
    directions,
    '1. WALKING: 0.1 km | 2 mins\nWalk to London Bridge\n\n' +
    '2. TRANSIT: 1.8 km | 2 mins\nSubway towards Stanmore\n\n' +
      'Depart from London Bridge at 10:29am (Europe/London)\n' +
      'Arrive at Waterloo at 10:31am (Europe/London)\n' +
      'Jubilee Subway via Transport for London (http://www.tfl.gov.uk/modes/tube/)\n\n' +
    '3. WALKING: 0.5 km | 7 mins\nWalk to London Eye, Lambeth, London SE1 7PB, UK'
  )
  t.end();
});
