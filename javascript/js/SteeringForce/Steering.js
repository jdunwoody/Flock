"use strict";

function Steering(options, target, threat, bird, neighbours) {
  this.target = target;
  this.threat = threat;

  this.arrive = new Arrive(options, bird);
  this.evade = new Evade(options, bird);
  this.separation = new Separation(options, bird, neighbours);
  this.cohesion = new Cohesion(options, bird, neighbours);
};

Steering.prototype.calculate = function() {
  var evadeVector = this.evade.calculate(toVector(this.threat.position));
  var arriveVector = this.arrive.calculate(toVector(this.target.position));
  var separationVector = this.separation.calculate();
  var cohesionVector = this.cohesion.calculate();

  return add(cohesionVector, add(separationVector, add(evadeVector, arriveVector)));

  //var steeringForce = zero();
  //steeringForce = add(steeringForce, scale(this.calculateCohesion(), this.cohesionWeight));
  //steeringForce = add(steeringForce, scale(this.calculateAlignment(), this.alignmentWeight));
  //steeringForce = add(steeringForce, scale(this.calculateSeparation(), this.separationWeight));
  //steeringForce = add(steeringForce, scale(this.calculateEvade(), this.evadeWeight));
  //steeringForce = add(steeringForce, scale(this.calculateArrive(), this.arriveWeight));


  //console.log("Evade ("+ evadeVector[0] +", "+evadeVector[1]+")");
  //console.log("Arrive ("+ arriveVector[0] +", "+arriveVector[1]+")");

  //var changeInVelocity = steeringForce;
  //console.log("Net vector ("+ changeInVelocity[0] +", "+changeInVelocity[1]+")");
}
