"use strict";

function SteeringBehaviours(bird, arriveForceLine) {
  this.bird = bird;

  //this.seek = new Seek(this.bird);

  this.arrive = new Arrive(this.bird);
  this.arriveForceLine = arriveForceLine;

  //this.evade = new Evade(this.bird);
}

SteeringBehaviours.prototype.calculate = function(targetPosition, obstacle) {
  var steeringForce = new SteeringForce(this.bird.maxSteeringForce);

  //seekForce = this.seek.calculate(bird, targetPosition);
  //evadeForce = this.evade.calculate(obstacle);
  var arriveForce = this.arrive.calculate(targetPosition);
  console.log("Calculating arrive force ("+arriveForce[0]+","+arriveForce[1]+")");


  //steeringForce.add(evadeForce);
  steeringForce.add(arriveForce);

  return steeringForce;
};

SteeringBehaviours.prototype.accumulateForce = function(runningTotal, forceToAdd) {
  // implement me
  return forceToAdd;
};

SteeringBehaviours.prototype.display = function() {
  this.arriveForceLine.display(this.arrive);
};
