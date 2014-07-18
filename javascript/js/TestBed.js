"use strict";

var TestBed = function() {

  this.setupKeybindings();

  this.options = this.buildOptions();

  this.buildRenderer();

  var blackBirdImage = "img/black_bird_down.png";
  var orangeBirdImage = "img/orange_bird_down.png";

  this.textInfo = new TextInfo("Hello World");
  this.target = new Target(100, 100);
  this.threat = new Threat();

  this.avatar = new Bird(this.options, blackBirdImage, this.target, 100, 100);
  this.avatar.maxSpeed = 4;
  this.avatar.deceleration = 20;

  this.redBird = new Bird(this.options, orangeBirdImage, this.target, 200, 200);
  this.redBird.maxSpeed = 20;
  this.redBird.deceleration = 14;

  this.avatar.configureSteering(this.threat, [this.redBird]);
  this.redBird.configureSteering(this.threat, [this.avatar]);

  this.stage = new MyStage();

  this.stage.addChild(this.textInfo);
  this.stage.addChild(this.threat.cautionCircle);
  this.stage.addChild(this.threat.panicCircle);
  this.stage.addChild(this.threat);
  this.stage.addChild(this.avatar);
  this.stage.addChild(this.redBird);
  this.stage.addChild(this.target);

  requestAnimFrame(this.update.bind(this));
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
  options.running           = true;
  options.rotating          = true;
  options.moving            = true;
  options.arriveEnabled     = true;
  options.evadeEnabled      = true;
  options.separationEnabled = false;
  options.cohesionEnabled   = false;
  options.debuggingEnabled  = true;
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
  KeyboardJS.on('s', this.toggleSeparation, null);
  KeyboardJS.on('c', this.toggleCohesion, null);
}

TestBed.prototype.update = function(timeSinceLastFrame) {
  if (!this.options.running) {
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
    return;
  }

  timeSinceLastFrame = Math.min(10, timeSinceLastFrame);

  if (this.options.moving) {
    this.avatar.updatePosition(timeSinceLastFrame);
    this.redBird.updatePosition(timeSinceLastFrame);
  }
  if (this.options.rotating) {
    this.avatar.updateRotation();
    this.redBird.updateRotation();
  }
  this.updateText();

  this.renderer.render(this.stage);

  requestAnimFrame(this.update.bind(this));
};

TestBed.prototype.updateText = function(message) {

};


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
