
function Avatar() {
  var texture = PIXI.Texture.fromImage("img/black_bird.gif");
  PIXI.Sprite.call(this, texture);
  this.position.x = 200;
  this.position.y = 200;
  this.mass = 100;
  this.viewportX = 100;

  this.setInteractive(true);
  this.velocity = vec2.create();
  this.maxSpeed = 8;
  this.maxSteeringForce = 10;
  this.deceleration = 50;
  this.targetPosition = this.positionVector();
};

Avatar.constructor = Avatar;
Avatar.prototype = Object.create(PIXI.Sprite.prototype);

Avatar.prototype.mousemove = function(mouseData) {
  // this line will get the mouse coords relative to the sprites..
  //var localCoordsPosition = mouseData.getLocalPosition(graphics);
  // this line will get the mouse coords relative to the sprites parent..
  var parentCoordsPosition = mouseData.getLocalPosition(this.parent);

  var x = parentCoordsPosition.x;
  var y = parentCoordsPosition.y;

  this.targetPosition = vec2.fromValues(x, y);
  //this.position.x = x;
  //this.position.y = y;

  //console.log("Mouse moved to "+this.targetPosition[0]+","+this.targetPosition[1]);

  //timeElapsed = 1;
  //target = vec2.fromValues(parentCoordsPosition.x, parentCoordsPosition.y);
};

Avatar.prototype.update = function(timeElapsed, obstacle) {
  var steeringBehaviours = new SteeringBehaviours(this);
  var steeringForce = steeringBehaviours.calculate(this.targetPosition, obstacle);

  var acceleration = scale(steeringForce, 1/this.mass);
  var velocityChange = scale(acceleration, 1);//timeElapsed);
  //vec2.scale(velocityChange, acceleration, timeElapsed);

  //acc = acceleration(timeElapsed, this.velocity, target);
  //console.log("Acceleration "+acc[0]+","+acc[1]);
  //vec2.add(this.position, this.position, acc);

  var newPosition = add(this.positionVector(), velocityChange);
  this.updatePosition(newPosition);
};

Avatar.prototype.positionVector = function() {
  return vec2.fromValues(this.position.x, this.position.y);
};

Avatar.prototype.updatePosition = function(newPosition) {
  this.position.x = newPosition[0];
  this.position.y = newPosition[1];
  //console.log("Avatar: Updating position ("+this.position.x+","+this.position.y+")");
};
