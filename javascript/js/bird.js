"use strict"

function Heading() {
  this.value = vec2.create();
};

function Steering() {
  this.value = vec2.create();

  this.calculate = function() {
    return vec2.create();
  };
};

function buildMovableObject(notifyTargetPositionChanged) {
  var moveableObject = new PIXI.Graphics();

  //moveableObject.notifyTargetPositionChanged = notifyTargetPositionChanged;

  moveableObject.setupPhysics = function() {
    this.position.x = 100;
    this.position.y = 100;
    this.mass = 100;
    this.heading = new Heading();
    this.steering = new Steering();
  };

  moveableObject.setupAppearance = function() {
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

  moveableObject.hitArea = new PIXI.Rectangle(-150, -150, 300, 300);
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

function Bird() {
  this.moveableObject = buildMovableObject(this.targetPositionChanged);

  this.targetPositionChanged = function(targetPosition) {
    this.position = vec2.fromValues(targetPosition[0], targetPosition[1]);
  };

  this.moveableObject.notifyTargetPositionChanged = this.targetPositionChanged;

  this.moveableObject.setupPhysics();
  this.moveableObject.setupAppearance();

  this.position = vec2.fromValues(100,100);
  this.targetPosition = vec2.fromValues(0, 0);

  this.acceleration = function() {
    this.steering.value / this.mass;
  };

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
    var targetX = this.targetPosition[0];
    var targetY = this.targetPosition[1];

    //var horiz = targetX - this.position.x;
    //var vert = targetY - this.position.y;

    //vec2.set(this.steering.value, horiz, vert);

    //this.velocity += this.acceleration() * timeElapsed;
    //position += this.velocity() * timeElapsed;
    //this.position.x = this.targetPosition.x;
    //this.position.y = this.targetPosition.y;
//this.moveableObject.position.x = 100;
//this.moveableObject.position.y = 100;

    //this.rotate(horiz, vert);
    //this.position = vec2.update(this.targetPosition)
    this.moveableObject.position.x = this.position[0];
    this.moveableObject.position.y = this.position[1];

  };
};
