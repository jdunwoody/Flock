$(document).ready( function() {
  "use strict";

  var width = 700;
  var height = 300;
  var antiAlias = true;
  var renderer = PIXI.autoDetectRenderer(width, height);//, null, false, antiAlias);

  document.body.appendChild(renderer.view);

  requestAnimFrame(animate);

  //var bunny = buildBunny(width, height);
  var bird = new Bird();

  var stage = new PIXI.Stage(0xEEFFFF);
  stage.addChild(bird.moveableObject);
  //stage.addChild(bunny);
  //stage.addChild(buildBunny(100,100));//moveableObject);

  var lastTime = Date.now();
  var timeSinceLastFrame = 0;

  function animate() {
    requestAnimFrame(animate);
    //var now = Date.now();
    //timeSinceLastFrame = now - lastTime;
    //lastTime = now;

    ////moveBunny(bunny);//timeSinceLastFrame);
    //bird.updatePosition(timeSinceLastFrame);

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
