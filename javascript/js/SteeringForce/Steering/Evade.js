"use strict";

function Evade(vehicle) {
  this.vehicle = vehicle;
  this.flee = new Flee(this.vehicle);
  this.fleeInRange = new FleeInRange(this.vehicle);
}

Evade.prototype.calculate = function(obstacle) {
  var vectorToPursuer = subtract(obstacle, this.vehicle.position);

  var obstacleSpeed = 0;

  var lookAheadTime = length(vectorToPursuer) / (this.vehicle.maxSpeed + obstacleSpeed);

  var obstacleVelocity = zero();

  var amountToCalculate = add(obstacle, scale(obstacleVelocity, lookAheadTime));

  //result = this.flee.calculate(amountToCalculate);
  var result = this.fleeInRange.calculate(amountToCalculate);
  //console.log(result);
  return result;
};
