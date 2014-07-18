"use strict";

function Separation(options, bird, neighbours) {
  this.options = options;
  this.bird = bird;
  this.neighbours = neighbours;
};

Separation.prototype.calculate = function() {
  if(!this.options.separationEnabled) {
    return zero();
  }

  var steeringForce = zero();

  for (var i=0; i<this.neighbours.length; ++i) {
    //make sure this agent isn't included in the calculations and that //the agent being examined is close enough.
    if((this.neighbours[i] != this.bird) && this.neighbours[i].isTagged) {
      var toAgent = subtract(this.bird.positionVector, this.neighbours[i].positionVector);
      //scale the force inversely proportional to the agent's distance //from its neighbor.
      //if (length(toAgent) < 100) {
      steeringForce = add(steeringForce, scale(normalize(toAgent), 1/length(toAgent)));
      //steeringForce = scale(steeringForce, 10);
      //}
    }
  }

  return steeringForce;
}
