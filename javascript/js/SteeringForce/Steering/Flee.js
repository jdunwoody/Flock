"use strict";

function Flee(bird){
  this.bird = bird;
};

Flee.prototype.calculate = function(targetVector) {
  var desiredVelocity = scale(
      normalize(subtract(this.bird.positionVector, targetVector)),
      this.bird.maxSpeed);

  return subtract(desiredVelocity, this.bird.velocity);
};
