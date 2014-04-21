$(document).ready( function() {
  "use strict";
  var width = 700;
  var height = 300;
  var stage = new PIXI.Stage(0xEEFFFF);
  var antiAlias = true
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, antiAlias);

document.body.appendChild(renderer.view);

requestAnimFrame(animate);

//var moveableObject = buildTriangle(100, 100, 100, 100);
var moveableObject = new MoveableObject(100, 100);
stage.addChild(moveableObject.shape);

//var bunny = buildBunny(width, height);
//stage.addChild(bunny);
//drawTerrain(graphics, width, height);

//var lastTime = Date.now();
//var timeSinceLastFrame = 0;

function animate() {
  requestAnimFrame(animate);

  //timeSinceLastFrame = now - lastTime;
  //lastTime = now;

  //moveBunny(bunny);
  //moveableObject.rotation += 0.01;
  //updateVehicle(moveableObject);
  moveableObject.updatePosition();//(timeSinceLastFrame);

  renderer.render(stage);
}

requestAnimFrame(animate);
});
