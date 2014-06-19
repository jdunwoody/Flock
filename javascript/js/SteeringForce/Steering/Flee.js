"use strict";

function Flee(vehicle){
  this.vehicle = vehicle;
};

Flee.prototype.calculate = function(targetVector) {
  var desiredVelocity = scale(normalize(subtract(this.vehicle.position, targetVector)), this.vehicle.maxSpeed);

  return subtract(desiredVelocity, this.vehicle.velocity);
};
