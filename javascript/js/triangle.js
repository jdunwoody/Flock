function Triangle(initialPosition, mass, maxSpeed, color, screenDimensions) {
  this.vehicle = new Vehicle(initialPosition, mass, maxSpeed);
  this.screenDimensions = screenDimensions;

  //this.targetPositionChanged = function(target) {
  //debugger;

  //this.vehicle.target[0] = target[0];
  //this.vehicle.target[1] = target[1];
  //};

  this.graphicalObject = new GraphicalObject(this, color);
  //this.graphicalObject.drawHeading();

  this.graphicalObject.draw(this.vehicle.position[0], this.vehicle.position[1]);

  clipToBounds = function(vector, minX, maxX, minY, maxY) {
    var clipped = vec2.clone(vector);

    if (vector[0] > maxX) {
      clipped[0] = maxX;
    }
    if (vector[0] < minX) {
      clipped[0] = minX;
    }

    if (vector[1] > maxY) {
      clipped[1] = maxY;
    }
    if (vector[1] < minY) {
      clipped[1] = minY;
    }
    return clipped;
  };


  this.update = function(timeSinceLastFrame) {
    var minX = 5;
    var maxX = this.screenDimensions[0] - 5;
    var minY = 5;
    var maxY = this.screenDimensions[1] - 5;
    var clipped = clipToBounds(this.vehicle.position, minX, maxX, minY, maxY);

    this.graphicalObject.position.x = clipped[0];
    this.graphicalObject.position.y = clipped[1];

    this.vehicle.update(timeSinceLastFrame);
  }
};
