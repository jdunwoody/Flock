"use strict";

var SteeringForce = function(maxSteeringForce) {
  this.maxSteeringForce = maxSteeringForce;
  this.forces = [];
};

SteeringForce.prototype.add = function(force) {
  this.forces.push(force);
};

SteeringForce.prototype.resolve = function() {
  var resolvedForces = vec2.create();

  for(var i = 0, len = this.forces.length; i < len; i++) {
    console.log("forces ("+ this.forces[i][0]+","+this.forces[i][1]+")");

    resolvedForces = truncate(
        add(resolvedForces, this.forces[i]),
        this.maxSteeringForce
        );

    console.log("after resolved ("+ resolvedForces[0]+","+resolvedForces[1]+")");
  }


  return resolvedForces;
};
