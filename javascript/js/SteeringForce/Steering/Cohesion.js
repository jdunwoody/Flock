"use strict";

function Cohesion(options, bird, neighbours) {
  this.bird = bird;
  this.neighbours = neighbours;
  this.options = options;
};

Cohesion.prototype.calculate = function() {
  if(!this.options.cohesionEnabled) {
    return zero();
  }

  var centreOfMass;
  var steeringForce;
  var neighbourCount = 0;

  for (var i=0; i<neighbours.length; ++i) {
    if((this.neighbours[i] != this.bird) && this.neighbours[i].IsTagged()) {
      centreOfMass += this.neighbours[i].position;
      ++neighbourCount;
    }
  }

  if (neighbourCount > 0) {
    centreOfMass = divide(centreOfMass, neighbourCount);

    steeringForce = Seek(centreOfMass);
  }

  return steeringForce;
}
