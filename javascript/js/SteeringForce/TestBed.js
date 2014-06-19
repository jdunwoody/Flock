"use strict";

//function TestBed() {
var TestBed = function() {
  this.running = true;

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

  var texture = PIXI.Texture.fromImage("img/black_bird.gif");
  var bunnyTexture = PIXI.Texture.fromImage("img/bunny.png");
  var greenBirdTexture = PIXI.Texture.fromImage("img/newton.gif");

  this.bird = new PIXI.Sprite(texture);
  this.bird.position.x = 0;
  this.bird.position.y = 0;

  //this.targetPosition = vec2.fromValues(400,400);

  this.target = new PIXI.Sprite(bunnyTexture);
  this.target.position.x = 100;
  this.target.position.y = 100;

  this.threat = new PIXI.Sprite(greenBirdTexture);
  this.threat.position.x = 400;
  this.threat.position.y = 400;

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
  this.panicCircle.endFill();

  this.stage.addChild(this.cautionCircle);
  this.stage.addChild(this.panicCircle);
  this.stage.addChild(this.bird);
  this.stage.addChild(this.threat);
  this.stage.addChild(this.target);

  requestAnimFrame(this.update.bind(this));

  //this.x = 10;
  //this.y = 10;

  this.vehicle = {};
  this.vehicle.position = vec2.fromValues(this.bird.position.x, this.bird.position.y);
  this.vehicle.deceleration = 20;
  this.vehicle.maxSpeed = 3;
  this.vehicle.velocity = vec2.create();

  //this.vehicle.positionVector = function() {
  //return this.position;
  //};

  this.arrive = new Arrive(this.vehicle);
  this.evade = new Evade(this.vehicle);
};

TestBed.prototype.update = function(timeSinceLastFrame) {
  if (!this.running) {
    //console.log('not running');
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
    return;
  }
  //console.log('running');
  timeSinceLastFrame = Math.min(10, timeSinceLastFrame);

  var changeInVelocity = add(
      this.evade.calculate(toVector(this.threat.position)),
      this.arrive.calculate(toVector(this.target.position))
      );

  var x = this.bird.position.x;
  var y = this.bird.position.y;

  var newX = x;
  var newY = y;

  if (Math.abs(changeInVelocity[0]) > 0.001 || Math.abs(changeInVelocity[1]) > 0.001) {
    this.vehicle.velocity[0] += changeInVelocity[0];
    this.vehicle.velocity[1] += changeInVelocity[1];

    //var x = this.bird.position.x;
    //var y = this.bird.position.y;

    newX = this.vehicle.velocity[0] * timeSinceLastFrame + x;
    newY = this.vehicle.velocity[1] * timeSinceLastFrame + y;
  }
  newX = Math.min(780, Math.max(10, newX));
  newY = Math.min(780, Math.max(10, newY));

  this.vehicle.position[0] = newX;
  this.vehicle.position[1] = newY;

  this.bird.position.x = newX;
  this.bird.position.y = newY;

  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};