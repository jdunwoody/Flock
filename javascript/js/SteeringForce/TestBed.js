"use strict";

var main = function() {
  var stage = new PIXI.Stage(0x3355AA);

  var antiAlias = true;

  var width = document.getElementById("game-canvas").width;
  var height = document.getElementById("game-canvas").height;

  var renderer = new PIXI.autoDetectRenderer(
      width,
      height,
      document.getElementById("game-canvas"),
      false,
      antiAlias);

  var texture = PIXI.Texture.fromImage("img/black_bird.gif");

  var bird = new PIXI.Sprite(texture);
  bird.position.x = 0;
  bird.position.y = 0;

  stage.addChild(bird);

  requestAnimFrame(update);

  var x = 10;
  var y = 10;

  var vehicle = {};
  vehicle.position = vec2.fromValues(bird.position.x, bird.position.y);
  vehicle.deceleration = 20;
  vehicle.maxSpeed = 3;
  vehicle.velocity = vec2.create();

  vehicle.positionVector = function() {
    return this.position;
  };

  var arrive = new Arrive(vehicle);

  var targetPosition = vec2.fromValues(400,400);

  function update(timeSinceLastFrame) {
    timeSinceLastFrame = Math.min(10, timeSinceLastFrame);

    var changeInVelocity = arrive.calculate(targetPosition);

    var x = bird.position.x;
    var y = bird.position.y;

    var newX = x;
    var newY = y;

    if (Math.abs(changeInVelocity[0]) > 0.001 && Math.abs(changeInVelocity[1]) > 0.001) {
      vehicle.velocity[0] += changeInVelocity[0];
      vehicle.velocity[1] += changeInVelocity[1];

      var x = bird.position.x;
      var y = bird.position.y;

      newX = vehicle.velocity[0] * timeSinceLastFrame + x;
      newY = vehicle.velocity[1] * timeSinceLastFrame + y;
    }

    vehicle.position[0] = newX;
    vehicle.position[1] = newY;

    bird.position.x = newX;
    bird.position.y = newY;

    renderer.render(stage);
    requestAnimFrame(update);
  };
};
