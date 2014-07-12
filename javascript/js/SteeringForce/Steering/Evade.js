"use strict";

function Evade(options, bird) {
  this.bird = bird;
  this.flee = new Flee(this.bird);
  this.fleeInRange = new FleeInRange(this.bird);
  this.options = options;
}

Evade.prototype.calculate = function(obstacle) {
  if(!this.options.evadeEnabled) {
    return zero();
  }

  var vectorToPursuer = subtract(obstacle, this.bird.positionVector);

  var obstacleSpeed = 0;

  var lookAheadTime = length(vectorToPursuer) / (this.bird.maxSpeed + obstacleSpeed);

  var obstacleVelocity = zero();

  var amountToCalculate = add(obstacle, scale(obstacleVelocity, lookAheadTime));

  //result = this.flee.calculate(amountToCalculate);
  var result = this.fleeInRange.calculate(amountToCalculate);
  //console.log(result);
  return result;
};
