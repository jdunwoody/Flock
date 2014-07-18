"use strict";

function Cohesion(options, bird, neighbours) {
  this.bird = bird;
  this.neighbours = neighbours;
  this.options = options;
  this.seek = new Seek(bird);
};

Cohesion.prototype.calculate = function() {
  if(!this.options.cohesionEnabled) {
    return zero();
  }

  var centreOfMass = zero();
  var steeringForce = zero();
  var neighbourCount = 0;

  for (var i=0; i<this.neighbours.length; ++i) {
    if((this.neighbours[i] != this.bird) && this.neighbours[i].isTagged) {
      centreOfMass = add(centreOfMass, this.neighbours[i].positionVector);
      ++neighbourCount;
    }
  }

  if (neighbourCount > 0) {
    centreOfMass = scale(centreOfMass, 1/neighbourCount);

    steeringForce = this.seek.calculate(centreOfMass);
  }

  return steeringForce;
}
