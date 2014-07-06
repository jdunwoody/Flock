"use strict";

//function TestBed() {
var TestBed = function() {

  KeyboardJS.on('p', this.toggleRunning, null);
  KeyboardJS.on('m', this.toggleMovement, null);
  KeyboardJS.on('r', this.toggleRotating, null);
  KeyboardJS.on('a', this.toggleTarget, null);
  KeyboardJS.on('h', this.toggleThreat, null);
  KeyboardJS.on('E', this.toggleEvade, null);
  KeyboardJS.on('A', this.toggleArrive, null);

  this.running = true;
  this.rotating = true;
  this.moving = false;
  this.arriveEnabled = true;
  this.evadeEnabled = true;
  this.debuggingEnabled = true;

  this.stage = new PIXI.Stage(0x3355AA);

  this.antiAlias = true;

  this.width = document.getElementById("game-canvas").width;
  this.height = document.getElementById("game-canvas").height;

  this.renderer = new PIXI.autoDetectRenderer(
      this.width,
      this.height,
      document.getElementById("game-canvas"),
      false,
      this.antiAlias);

  var texture = PIXI.Texture.fromImage("img/black_bird_down.png");
  var bunnyTexture = PIXI.Texture.fromImage("img/bunny.png");
  var greenBirdTexture = PIXI.Texture.fromImage("img/newton.gif");

  this.forceLine = new ForceLine();
  this.textInfo = new TextInfo("Hello World");

  this.bird = new PIXI.Sprite(texture);
  this.bird.anchor = new PIXI.Point(0.5, 0.5);
  this.bird.rotate = new PIXI.Point(0.5, 0.5);
  this.bird.position.x = 400;
  this.bird.position.y = 400;
  this.bird.interactive = true;

  this.target = new PIXI.Sprite(bunnyTexture);
  this.target.anchor = new PIXI.Point(0.5, 0.5);
  this.target.rotate = new PIXI.Point(0.5, 0.5);
  this.target.position.x = 100;
  this.target.position.y = 100;

  this.threat = new PIXI.Sprite(greenBirdTexture);
  this.threat.anchor = new PIXI.Point(0.5, 0.5);
  this.threat.rotate = new PIXI.Point(0.5, 0.5);
  this.cautionCircle = new PIXI.Graphics();

  this.cautionCircle.borderColor = 0xAA00CC;
  this.cautionCircle.beginFill(0xAA00CC);
  this.cautionCircle.drawCircle(
      this.threat.position.x,
      this.threat.position.y,
      200);
  this.cautionCircle.endFill();

  this.panicCircle = new PIXI.Graphics();
  this.panicCircle.borderColor = 0xAABBCC;
  this.panicCircle.beginFill(0x77AA00);
  this.panicCircle.drawCircle(
      this.threat.position.x,
      this.threat.position.y,
      100);

  this.moveThreat(new PIXI.Point(700, 700));

  this.stage.addChild(this.textInfo);
  this.stage.addChild(this.cautionCircle);
  this.stage.addChild(this.panicCircle);
  this.stage.addChild(this.forceLine);
  this.stage.addChild(this.bird);
  this.stage.addChild(this.threat);
  this.stage.addChild(this.target);

  this.bird.target = this.target;

  this.bird.mousemove = function(mouseData) {
    // this line will get the mouse coords relative to the sprites..
    //var localCoordsPosition = mouseData.getLocalPosition(graphics);
    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(this.parent);

    var x = parentCoordsPosition.x;
    var y = parentCoordsPosition.y;

    this.target.position.x = x;
    this.target.position.y = y;

    //console.log("Mouse moved to "+this.targetPosition[0]+","+this.targetPosition[1]);

    //timeElapsed = 1;
    //target = vec2.fromValues(parentCoordsPosition.x, parentCoordsPosition.y);
  };

  requestAnimFrame(this.update.bind(this));

  this.vehicle = {};
  this.vehicle.position = vec2.fromValues(this.bird.position.x, this.bird.position.y);
  this.vehicle.deceleration = 20;
  this.vehicle.maxSpeed = 3;
  this.vehicle.velocity = vec2.create();

  this.arrive = new Arrive(this.vehicle);
  this.evade = new Evade(this.vehicle);
};

TestBed.prototype.update = function(timeSinceLastFrame) {
  if (!this.running) {
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
    return;
  }

  timeSinceLastFrame = Math.min(10, timeSinceLastFrame);

  var newPosition = this.calculatePosition(timeSinceLastFrame);
  if (this.moving) {
    this.updatePosition(newPosition);
  }
  if (this.rotating) {
    this.updateRotation();
  }
  this.updateText();
  if (this.toggleDebugging) {
    this.updateForceLine();
  }

  this.renderer.render(this.stage);

  requestAnimFrame(this.update.bind(this));
};

TestBed.prototype.updateText = function(message) {
  //console.log(toDegrees(this.bird.rotation));
  //this.textInfo.setText(this.bird.rotation);
};

TestBed.prototype.updateForceLine = function() {
  this.forceLine.display(this.bird.position, this.vehicle.velocity);
};

TestBed.prototype.calculateArrive = function() {
  if(!this.arriveEnabled) {
    return zero();
  }
  return this.arrive.calculate(toVector(this.target.position));
};

TestBed.prototype.calculateEvade = function() {
  if(!this.evadeEnabled) {
    return zero();
  }
  return this.evade.calculate(toVector(this.threat.position));
};

TestBed.prototype.calculatePosition = function(timeSinceLastFrame) {
  var evadeVector = this.calculateEvade();
  var arriveVector = this.calculateArrive();

  //console.log("Evade ("+ evadeVector[0] +", "+evadeVector[1]+")");
  //console.log("Arrive ("+ arriveVector[0] +", "+arriveVector[1]+")");

  var changeInVelocity = add(evadeVector, arriveVector);
  //console.log("Net vector ("+ changeInVelocity[0] +", "+changeInVelocity[1]+")");

  var x = this.bird.position.x;
  var y = this.bird.position.y;

  var newX = x;
  var newY = y;

  this.vehicle.velocity[0] += changeInVelocity[0];
  newX = this.vehicle.velocity[0] * timeSinceLastFrame + x;

  this.vehicle.velocity[1] += changeInVelocity[1];
  newY = this.vehicle.velocity[1] * timeSinceLastFrame + y;

  newX = Math.min(1580, Math.max(10, newX));
  newY = Math.min(1580, Math.max(10, newY));

  return new PIXI.Point(newX, newY);
};

TestBed.prototype.updatePosition = function(newPosition) {
  this.vehicle.position[0] = newPosition.x;
  this.vehicle.position[1] = newPosition.y;

  this.bird.position.x = newPosition.x;
  this.bird.position.y = newPosition.y;
};

TestBed.prototype.changeInRotation = function(currentRotation, vector) {
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
  //var changeInRotation = newRotation - currentRotation;

  //changeInRotation = changeInRotation % Math.PI;

  //return changeInRotation;
};


TestBed.prototype.updateRotation = function() {
  //this.bird.rotation = this.rotate(this.bird.rotation, toRotation(this.vehicle.velocity));
  //var changeInRotation = this.changeInRotation(this.bird.rotation, this.vehicle.velocity);

  //console.log(Math.floor(toDegrees(this.bird.rotation)) + ": (" + this.vehicle.velocity[0] + ", " + this.vehicle.velocity[1] + ")");

  this.bird.rotation = this.changeInRotation(this.bird.rotation, this.vehicle.velocity);
};

TestBed.prototype.moveThreat = function(newPosition) {
  this.threat.position = newPosition;
  //this.threat.position.x = newPosition.x;
  //this.threat.position.y = newPosition.y;

  this.cautionCircle.position = newPosition;
  //this.cautionCircle.position.x = newPosition.x;
  //this.cautionCircle.position.y = newPosition.y;

  this.panicCircle.position = newPosition;
  //this.panicCircle.position.x = newPosition.x;
  //this.panicCircle.position.y = newPosition.y;
};

TestBed.prototype.toggleThreat = function() {
  testBed.moveThreat(new PIXI.Point(getRandomInt(10, 780), getRandomInt(10, 780)));
};

TestBed.prototype.toggleTarget = function() {
  testBed.target.position.x = getRandomInt(10, 780);
  testBed.target.position.y = getRandomInt(10, 780);
};

TestBed.prototype.toggleRunning = function() {
  testBed.running = !testBed.running;
};

TestBed.prototype.toggleRotating = function() {
  testBed.rotating = !testBed.rotating;
};

TestBed.prototype.toggleMovement = function() {
  testBed.moving = !testBed.moving;
};

TestBed.prototype.toggleArrive = function() {
  testBed.arriveEnabled = !testBed.arriveEnabled;
};

TestBed.prototype.toggleEvade = function() {
  testBed.evadeEnabled = !testBed.evadeEnabled;
};

TestBed.prototype.toggleDebugging = function() {
  testBed.debuggingEnabled = !testBed.debuggingEnabled;
};

