"use strict";

function FleeInRange(bird) {
  this.bird = bird;
  this.flee = new Flee(this.bird);
};

FleeInRange.prototype.calculate = function(targetVector) {

  var distanceFromTarget = squaredDistance(this.bird.positionVector, targetVector);

  var cautionDistance = 300 * 300;
  var panicDistance = 100 * 100;

  if (distanceFromTarget > cautionDistance) {
    return zero();
  } else if (distanceFromTarget > panicDistance) {
    return scale(this.flee.calculate(targetVector), 0.2);
  } else {
    return this.flee.calculate(targetVector);
  }
};
