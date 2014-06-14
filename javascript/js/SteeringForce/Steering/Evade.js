"use strict";

function Evade(vehicle) {
  this.vehicle = vehicle;
  this.flee = new Flee(this.vehicle);
  this.fleeInRange = new FleeInRange(this.vehicle);
}

Evade.prototype.calculate = function(obstacle) {
  var vectorToPursuer = subtract(obstacle.positionVector(), this.vehicle.positionVector());

  var lookAheadTime = vectorToPursuer.length / (this.vehicle.maxSpeed + obstacle.speed);

  var amountToCalculate = add(obstacle.positionVector(), scale(obstacle.velocity, lookAheadTime));
  //console.log(amountToCalculate);

  //result = this.flee.calculate(amountToCalculate);
  result = this.fleeInRange.calculate(amountToCalculate);
  //console.log(result);
  return result;
};
