"use strict"

$(document).ready( function() {
  "use strict";

  var width = 700;
  var height = 800;
  var antiAlias = true;
  var renderer = PIXI.autoDetectRenderer(width, height);//, null, false, antiAlias);

  document.body.appendChild(renderer.view);

  requestAnimFrame(animate);
  var triangle1 = new Triangle(vec2.fromValues(0,0), 100, 0xAA3344);
  var triangle2 = new Triangle(vec2.fromValues(200,200), 50, 0x88AA22);
  var triangle3 = new Triangle(vec2.fromValues(400,100), 200, 0x88FFAA);
  var triangle4 = new Triangle(vec2.fromValues(500,200), 140, 0x883311);
  var triangle5 = new Triangle(vec2.fromValues(300,200), 80, 0xAA33BB);

  var stage = new PIXI.Stage(0x3355AA);
  stage.addChild(triangle1.graphicalObject);
  stage.addChild(triangle2.graphicalObject);
  stage.addChild(triangle3.graphicalObject);
  stage.addChild(triangle4.graphicalObject);
  stage.addChild(triangle5.graphicalObject);

  var lastTime = Date.now();
  var timeSinceLastFrame = 0;

  function animate() {
    requestAnimFrame(animate);

    var now = Date.now();
    timeSinceLastFrame = now - lastTime;
    lastTime = now;

    triangle1.update(timeSinceLastFrame);
    triangle2.update(timeSinceLastFrame);
    triangle3.update(timeSinceLastFrame);
    triangle4.update(timeSinceLastFrame);
    triangle5.update(timeSinceLastFrame);

    renderer.render(stage);
  };

  requestAnimFrame(animate);
});


//var moveableObject = buildTriangle(100, 100, 100, 100);
//var moveableObject = new MoveableObject(100, 100);

//var bunny = buildBunny(width, height);
//stage.addChild(bunny);
//drawTerrain(graphics, width, height);
//moveBunny(bunny);
//updateVehicle(moveableObject);
//moveableObject.rotation += 0.01;
//renderer.render(stage);
