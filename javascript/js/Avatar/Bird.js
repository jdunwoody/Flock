"use strict";

function Bird(options, target, x, y) {
  var texture = PIXI.Texture.fromImage("img/black_bird_down.png");
  PIXI.Sprite.call(this, texture);

  this.options = options;

  this.anchor = new PIXI.Point(0.5, 0.5);
  this.rotate = new PIXI.Point(0.5, 0.5);
  this.interactive = true;

  this.target = target;

  this.deceleration = 20;
  this.maxSpeed = 3;
  this.velocity = vec2.create();

  this.position.x = x;
  this.position.y = y;
  this.positionVector = vec2.fromValues(x, y);
  this.isTagged = true;
};

Bird.constructor = Bird;
Bird.prototype = Object.create(PIXI.Sprite.prototype);

Bird.prototype.configureSteering = function(threat, neighbours) {
  this.steering = new Steering(this.options, this.target, threat, this, neighbours);
};

Bird.prototype.mousemove = function(mouseData) {
  var parentCoordsPosition = mouseData.getLocalPosition(this.parent);

  var x = parentCoordsPosition.x;
  var y = parentCoordsPosition.y;

  this.target.position.x = x;
  this.target.position.y = y;
};

Bird.prototype.calculatePosition = function(timeSinceLastFrame) {
  var changeInVelocity = this.steering.calculate();

  var x = this.position.x;
  var y = this.position.y;

  var newX = x;
  var newY = y;

  this.velocity[0] = changeInVelocity[0];
  newX = this.velocity[0] * timeSinceLastFrame + x;

  this.velocity[1] = changeInVelocity[1];
  newY = this.velocity[1] * timeSinceLastFrame + y;

  newX = Math.min(1580, Math.max(10, newX));
  newY = Math.min(1580, Math.max(10, newY));

  return new PIXI.Point(newX, newY);
};

Bird.prototype.updatePosition = function(timeSinceLastFrame) {
  var point = this.calculatePosition(timeSinceLastFrame);
  var x = point.x;
  var y = point.y;

  this.positionVector[0] = x;
  this.positionVector[1] = y;

  this.position.x = x;
  this.position.y = y;
};

Bird.prototype.updateRotation = function() {
  this.rotation = this.changeInRotation(this.rotation, this.velocity);
};

Bird.prototype.changeInRotation = function(currentRotation, vector) {
  var horiz = vector[0];
  var vert = vector[1];

  var newRotation = 0;

  if (vert >= 0) {
    if (horiz >=0) {
      newRotation = Math.PI * 2.0 - Math.atan2(horiz, vert);
    } else {
      newRotation = -Math.atan2(horiz, vert);
    }
  } else {
    if (horiz >=0) {
      newRotation = Math.PI + Math.atan2(horiz, -vert);
    } else {
      newRotation = Math.PI - Math.atan2(-horiz, -vert);
    }
  }

  return newRotation;
};

