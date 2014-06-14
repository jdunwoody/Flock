"use strict";

function FleeInRange(vehicle) {
  this.vehicle = vehicle;
  this.flee = new Flee(this.vehicle);
};

FleeInRange.prototype.calculate = function(targetVector) {
  panicDistance = 100 * 100;

  var amount = squaredDistance(this.vehicle.positionVector(), targetVector);
  //console.log(amount);

  if (amount < panicDistance) {
    //console.log("In range");
    return vec2.fromValues(1, 1);
    //return new SteeringForce();
  }

  return this.flee.calculate(targetVector);
};
