"use strict";

function SteeringBehaviours(vehicle, arriveForceLine) {
  this.vehicle = vehicle;

  //this.seek = new Seek(this.vehicle);

  this.arrive = new Arrive(this.vehicle);
  this.arriveForceLine = arriveForceLine;

  //this.evade = new Evade(this.vehicle);
}

SteeringBehaviours.prototype.calculate = function(targetPosition, obstacle) {
  var steeringForce = new SteeringForce(this.vehicle.maxSteeringForce);

  //seekForce = this.seek.calculate(vehicle, targetPosition);
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
