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

  this.bird = new PIXI.Sprite(texture);
  this.bird.position.x = 0;
  this.bird.position.y = 0;

  this.stage.addChild(this.bird);

  requestAnimFrame(this.update.bind(this));

  //this.x = 10;
  //this.y = 10;

  this.vehicle = {};
  this.vehicle.position = vec2.fromValues(this.bird.position.x, this.bird.position.y);
  this.vehicle.deceleration = 20;
  this.vehicle.maxSpeed = 3;
  this.vehicle.velocity = vec2.create();

  this.vehicle.positionVector = function() {
    return this.position;
  };

  this.arrive = new Arrive(this.vehicle);

  this.targetPosition = vec2.fromValues(400,400);

};

TestBed.prototype.update = function(timeSinceLastFrame) {
  if (!this.running) {
    console.log('not running');
    this.renderer.render(this.stage);
    requestAnimFrame(this.update.bind(this));
    return;
  }
  console.log('running');
  timeSinceLastFrame = Math.min(10, timeSinceLastFrame);

  var changeInVelocity = this.arrive.calculate(this.targetPosition);

  var x = this.bird.position.x;
  var y = this.bird.position.y;

  var newX = x;
  var newY = y;

  if (Math.abs(changeInVelocity[0]) > 0.001 && Math.abs(changeInVelocity[1]) > 0.001) {
    this.vehicle.velocity[0] += changeInVelocity[0];
    this.vehicle.velocity[1] += changeInVelocity[1];

    var x = this.bird.position.x;
    var y = this.bird.position.y;

    newX = this.vehicle.velocity[0] * timeSinceLastFrame + x;
    newY = this.vehicle.velocity[1] * timeSinceLastFrame + y;
  }

  this.vehicle.position[0] = newX;
  this.vehicle.position[1] = newY;

  this.bird.position.x = newX;
  this.bird.position.y = newY;

  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};
