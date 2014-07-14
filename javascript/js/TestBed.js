"use strict";

var TestBed = function() {

  this.setupKeybindings();

  this.options = this.buildOptions();

  this.buildRenderer();

  this.forceLine = new ForceLine();
  this.textInfo = new TextInfo("Hello World");
  this.target = new Target(100, 100);
  this.threat = new Threat();
  this.bird = new Bird(this.options, this.target, this.threat);
  this.bird.updatePosition();

  this.bird2 = new Bird(this.options, this.target, this.threat);
  this.bird2.updatePosition();

  this.stage = new MyStage();

  this.stage.addChild(this.textInfo);
  this.stage.addChild(this.threat.cautionCircle);
  this.stage.addChild(this.threat.panicCircle);
  this.stage.addChild(this.threat);
  this.stage.addChild(this.forceLine);
  this.stage.addChild(this.bird);
  this.stage.addChild(this.bird2);
  this.stage.addChild(this.target);

  //this.bird.target = this.target;

  //this.cohesionWeight = 1;
  //this.alignmentWeight = 1;
  //this.separationWeight = 1;
  //this.evadeWeight = 1;
  //this.arriveWeight = 1;

  //this.bird.mousemove = function(mouseData) {
  //// this line will get the mouse coords relative to the sprites..
  ////var localCoordsPosition = mouseData.getLocalPosition(graphics);
  //// this line will get the mouse coords relative to the sprites parent..
  //var parentCoordsPosition = mouseData.getLocalPosition(this.parent);

  //var x = parentCoordsPosition.x;
  //var y = parentCoordsPosition.y;

  //this.target.position.x = x;
  //this.target.position.y = y;


  ////timeElapsed = 1;
  ////target = vec2.fromValues(parentCoordsPosition.x, parentCoordsPosition.y);
  //};

  requestAnimFrame(this.update.bind(this));

  //this.bird = {};
  //this.bird.positionVector = vec2.fromValues(this.bird.position.x, this.bird.position.y);
  //this.bird.deceleration = 20;
  //this.bird.maxSpeed = 3;
  //this.bird.velocity = vec2.create();

  //this.redVehicle = {};
  //this.redVehicle.position =

  this.entourage = [];

};

TestBed.prototype.buildRenderer = function() {
  var antiAlias = true;

  var width = document.getElementById("game-canvas").width;
  var height = document.getElementById("game-canvas").height;

  this.renderer = new PIXI.autoDetectRenderer(
      width,
      height,
      document.getElementById("game-canvas"),
      false,
      antiAlias);
}

TestBed.prototype.buildOptions = function() {
  var options = {};
  options.running = true;
  options.rotating = true;
  options.moving = true;
  options.arriveEnabled = true;
  options.evadeEnabled = true;
  options.debuggingEnabled = true;
  return options;
}

TestBed.prototype.setupKeybindings = function() {
  KeyboardJS.on('p', this.toggleRunning, null);
  KeyboardJS.on('m', this.toggleMovement, null);
  KeyboardJS.on('r', this.toggleRotating, null);
  KeyboardJS.on('a', this.toggleTarget, null);
  KeyboardJS.on('h', this.toggleThreat, null);
  KeyboardJS.on('E', this.toggleEvade, null);
  KeyboardJS.on('A', this.toggleArrive, null);
}

TestBed.prototype.update = function(timeSinceLastFrame) {
  if (!this.options.running) {
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
    return;
  }

  timeSinceLastFrame = Math.min(10, timeSinceLastFrame);

  if (this.options.moving) {
    this.bird.updatePosition(timeSinceLastFrame);
    this.bird2.updatePosition(timeSinceLastFrame);
  }
  if (this.options.rotating) {
    this.bird.updateRotation();
    this.bird2.updateRotation();
  }
  this.updateText();
  if (this.toggleDebugging) {
    this.updateForceLine();
  }

  this.renderer.render(this.stage);

  requestAnimFrame(this.update.bind(this));
};

TestBed.prototype.updateText = function(message) {

};

TestBed.prototype.updateForceLine = function() {
  this.forceLine.display(this.bird.positionVector, this.bird.velocity);
};

//TestBed.prototype.calculateCohesion = function() {
//if(!this.cohesionEnabled) {
//return zero();
//}
//return this.cohesion.calculate(this.bird);
//};

//TestBed.prototype.calculateAlignment = function() {
//if(!this.alignmentEnabled) {
//return zero();
//}
////return this.cohesion.calculate(this.bird);
//};

//TestBed.prototype.calculateSeparation = function() {
//if(!this.separationEnabled) {
//return zero();
//}
////return this.cohesion.calculate(this.bird);
//};

//TestBed.prototype.calculateArrive = function() {
//if(!this.arriveEnabled) {
//return zero();
//}
//return this.arrive.calculate(toVector(this.target.position));
//};

//TestBed.prototype.calculateEvade = function() {
//if(!this.evadeEnabled) {
//return zero();
//}
//return this.evade.calculate(toVector(this.threat.position));
//};


TestBed.prototype.toggleThreat = function() {
  testBed.threat.move(new PIXI.Point(getRandomInt(10, 780), getRandomInt(10, 780)));
};

TestBed.prototype.toggleTarget = function() {
  testBed.target.position.x = getRandomInt(10, 780);
  testBed.target.position.y = getRandomInt(10, 780);
};

TestBed.prototype.toggleRunning = function() {
  testBed.options.running = !testBed.options.running;
};

TestBed.prototype.toggleRotating = function() {
  testBed.options.rotating = !testBed.options.rotating;
};

TestBed.prototype.toggleMovement = function() {
  testBed.options.moving = !testBed.options.moving;
};

TestBed.prototype.toggleArrive = function() {
  testBed.options.arriveEnabled = !testBed.options.arriveEnabled;
};

TestBed.prototype.toggleEvade = function() {
  testBed.options.evadeEnabled = !testBed.options.evadeEnabled;
};

TestBed.prototype.toggleDebugging = function() {
  testBed.options.debuggingEnabled = !testBed.options.debuggingEnabled;
};

TestBed.prototype.toggleAlignment = function() {
  testBed.options.alignmentEnabled = !testBed.options.alignmentEnabled;
};

TestBed.prototype.toggleCohesion = function() {
  testBed.options.cohesionEnabled = !testBed.options.cohesionEnabled;
};

TestBed.prototype.toggleSeparation = function() {
  testBed.options.separationEnabled = !testBed.options.separationEnabled;
};
