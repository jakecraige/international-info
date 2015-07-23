var stripHTML = require("../utils/strip-html");

module.exports = function(response) {
  var leg = response.routes[0].legs[0];

  return [
    summaryText(leg),
    stepsText(leg)
  ];
}

function summaryText(leg) {
  return leg.distance.text + " | " + leg.duration.text + "\n" +
    "From: " + leg.start_address + "\nTo: " + leg.end_address;
}

function stepsText(leg) {
  var depart = "Depart: " + leg.departure_time.text +
    " (" + leg.departure_time.time_zone + ")\n";
  var arrive = "Arrive: " + leg.arrival_time.text +
    " (" + leg.arrival_time.time_zone + ")\n";
  var steps = leg.steps.map(function(step, index) {
    var summary = (index + 1) + ". " + step.travel_mode + ": " +
      step.distance.text + " | " + step.duration.text;
    var instructions = stripHTML(step.html_instructions);
    var description = summary + "\n" + instructions;
    var transit = step.transit_details;

    if (step.transit_details) {
      var transitDepart = "Depart from " + transit.departure_stop.name +
        " at " + timeString(transit.departure_time) + "\n";
      var transitArrive = "Arrive at " + transit.arrival_stop.name +
        " at " + timeString(transit.arrival_time) + "\n";
      var line = lineString(transit.line);
      description += "\n\n";
      description += transitDepart;
      description += transitArrive;
      description += line;
    }

    return description;
  });

  return steps.join("\n\n");
}

function timeString(time) {
  return time.text + " (" + time.time_zone + ")";
}

function lineString(line) {
  var name = line.short_name + " " + line.vehicle.name;
  var via = line.agencies.map(function(agency) {
    return agency.name + " (" + agency.url + ")";
  }).join(",");
  return name + " via " + via;
}
