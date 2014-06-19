"use strict";

function FleeInRange(vehicle) {
  this.vehicle = vehicle;
  this.flee = new Flee(this.vehicle);
};

FleeInRange.prototype.calculate = function(targetVector) {

  var distanceFromTarget = squaredDistance(this.vehicle.position, targetVector);

  var cautionDistance = 300 * 300;
  var panicDistance = 100 * 100;

  if (distanceFromTarget > cautionDistance) {
    return zero();
  } else if (distanceFromTarget > panicDistance) {
    debugger;
    return scale(this.flee.calculate(targetVector), 0.2);
  } else {
    return this.flee.calculate(targetVector);
  }
};
