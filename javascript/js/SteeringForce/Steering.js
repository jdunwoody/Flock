"use strict";

function Steering(options, target, threat, bird, neighbours) {
  this.bird = bird;
  this.target = target;
  this.threat = threat;

  this.evade = new Evade(options, bird);
  this.evadeForceLine = new ForceLine();
  this.bird.addChild(this.evadeForceLine);

  this.arrive = new Arrive(options, bird);

  this.separation = new Separation(options, bird, neighbours);
  this.cohesion = new Cohesion(options, bird, neighbours);
};

Steering.prototype.calculateMovement = function() {
  var evadeVector = this.evade.calculate(toVector(this.threat.position));
  this.evadeForceLine.display(this.bird.positionVector, evadeVector);

  var arriveVector = this.arrive.calculate(toVector(this.target.position));

  return add(evadeVector, arriveVector);
}

Steering.prototype.calculateGrouping = function() {
  var separationVector = this.separation.calculate();
  var cohesionVector = this.cohesion.calculate();

  return add(cohesionVector, add(separationVector));
};
