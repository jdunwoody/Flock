"use strict"

//function Heading() {
//this.value = vec2.create();
//};

//function Steering() {
//this.value = vec2.create();

//this.calculate = function() {
//return vec2.create();
//};
//};

function buildMovableObject(notifyTargetPositionChanged) {
  var moveableObject = new PIXI.Graphics();

  //moveableObject.notifyTargetPositionChanged = notifyTargetPositionChanged;

  //moveableObject.position.x = 0;
  //moveableObject.position.y = 0;

  moveableObject.draw = function() {
    var backgroundColor = 0xFFAA33;
    var borderColor = 0xBB77AA;

    this.beginFill(backgroundColor);
    var x = 100;
    var y = 100;
    this.lineStyle(1, borderColor, 1);
    this.moveTo(x, y);
    this.pivot.x = x;
    this.pivot.y = y;

    this.lineTo(x - 10, y - 10);
    this.lineTo(x + 10, y - 10);
    this.lineTo(x, y);

    this.endFill();
  };

  moveableObject.drawHeading = function() {
    var x = 100;
    var y = 100;
    this.lineStyle(3, '0x00FF00', 1);
    this.moveTo(x, y);
    this.pivot.x = x;
    this.pivot.y = y;

    this.lineTo(x, y + 100);
  };

  //moveableObject.hitArea = new PIXI.Rectangle(-150, -150, 300, 300);
  moveableObject.setInteractive(true);
  moveableObject.mousemove = function(mouseData) {
    // this line will get the mouse coords relative to the sprites..
    //var localCoordsPosition = mouseData.getLocalPosition(moveableObject);
    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(this.parent);

    var x = parentCoordsPosition.x;
    var y = parentCoordsPosition.y;
    this.notifyTargetPositionChanged(vec2.fromValues(x, y));
  };

  return moveableObject;
};

//function Seek(bird, target) {
//var desiredVelocity = vec2.create(1,1);

//vec2.normalize(desiredVelocity, target.position - bird.position) * bird.maxSpeed;

//var result = vec2.create();
//vec2.subtract(result, desiredVelocity, bird.velocity);
//return result;
//};

//function Pursue() {
//var toTarget = vec2.create();
//vec2.sub(toTarget, this.target.position, this.position);
//var relativeHeading = vec2.dot(this.heading, this.target.heading);

//if (vec2.dot(toTarget, this.target.heading) > 0 && relativeHeading < -0.95) {
//return new Seek(this, this.target.position);
//}
//};

function Bird(diagnostics) {
  this.moveableObject = buildMovableObject(this.targetPositionChanged);

  this.targetPositionChanged = function(targetPosition) {
    this.position = vec2.fromValues(targetPosition[0], targetPosition[1]);
  };

  this.moveableObject.notifyTargetPositionChanged = this.targetPositionChanged;

  // Physics
  this.mass = 10;
  this.heading = vec2.fromValues(0,0);
  this.velocity = vec2.fromValues(0,0);

  // Appearance
  this.moveableObject.draw();
  this.moveableObject.drawHeading();

  this.position = vec2.fromValues(0,0);
  this.targetPosition = vec2.fromValues(0, 0);

  //this.calculateAcceleration = function() {
  //var steering = vec2.fromValues(10, 2);
  ////vec2.divide(steering, this.calculateSteering(), this.mass);
  //return steering;
  //};


  //this.calculateSteering = function() {
  ////var targetX = this.targetPosition[0];
  ////var targetY = this.targetPosition[1];

  ////var horiz = targetX - this.position.x;
  ////var vert = targetY - this.position.y;

  //return vec2.create(1,1);
  ////return new Pursue();
  //};

  this.rotate = function(horiz, vert) {
    if (horiz >= 0) {
      if (vert >= 0) {
        this.rotation = Math.atan( - horiz / vert );
      } else{
        this.rotation = Math.PI + Math.atan( -horiz / vert );
      }
    } else {
      if (vert >= 0) {
        this.rotation = Math.atan( -horiz / vert );
      } else{
        this.rotation = Math.PI / 2 + Math.atan( vert / horiz );
      }
    }
    this.moveableObject.rotation = this.rotation;
  };

  this.updatePosition = function(timeElapsed) {
    //var vel = vec2.clone(this.velocity);
    //var acc = vec2.clone(this.calculateAcceleration());
    //vec2.scale(acc, acc, timeElapsed);
    //vec2.add(vel, vel, acc);
    //vec2.add(this.position, this.position, vec2.scale(vel, vel, timeElapsed));
    //this.velocity = vel;
    //this.acceleration = acc;

    //
    // Velocity
    //
    var targetPosition = vec2.fromValues(100,100); // this.targetPosition;
    var newVelocity = vec2.create();
    var maxSpeed = 10;

    vec2.normalize(newVelocity, vec2.sub(newVelocity, targetPosition, this.position));
    vec2.scale(newVelocity, newVelocity, maxSpeed);
    //vec2.sub(newVelocity, newVelocity, this.velocity);
    this.velocity = newVelocity;
    this.rotate(this.velocity[0], this.velocity[1]);
    //
    // Position
    //
    //final_position = (v * t) + orig_position
    var desiredPosition = vec2.create();
    vec2.add(desiredPosition, this.velocity, this.position);
    this.position = desiredPosition;

    //diagnostics.show("(" + this.position[0] + ", " + this.position[1] + "), " +
    //"velocity: (" + this.velocity[0] +", " + this.velocity[1]+")");

    //
    // clip position to be within the screen
    //
    var MIN_X = 5;
    var MAX_X = 696;
    var MIN_Y = 5;
    var MAX_Y = 295;

    var x = this.position[0];
    if (x > MAX_X) {
      x = MAX_X;
    }
    if (x < MIN_X) {
      x = MIN_X;
    }
    this.position[0] = x;

    var y = this.position[1];
    if (y > MAX_Y) {
      y = MAX_Y;
    }
    if (y < MAX_Y) {
      y = MAX_Y;
    }
    this.position[1] = y;

    this.moveableObject.position.x = this.position[0];
    this.moveableObject.position.y = this.position[1];
  };
};
