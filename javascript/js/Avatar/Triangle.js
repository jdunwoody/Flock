"use strict";

function Triangle(initialPosition, mass, maxSpeed, color, screenDimensions) {
  this.vehicle = new Vehicle(initialPosition, mass, maxSpeed);
  this.screenDimensions = screenDimensions;

  this.graphicalObject = new GraphicalObject(this, color);
  this.graphicalObject.draw(this.vehicle.position[0], this.vehicle.position[1]);

  this.update = function(timeSinceLastFrame) {
    var minX = 5;
    var maxX = this.screenDimensions[0] - 5;
    var minY = 5;
    var maxY = this.screenDimensions[1] - 5;

    this.graphicalObject.position.x = this.vehicle.position[0];
    this.graphicalObject.position.y = this.vehicle.position[1];

    this.vehicle.update(timeSinceLastFrame);

    this.graphicalObject.rotation = vec2.dot(vec2.fromValues(0,1), this.vehicle.velocity)
  }
};
