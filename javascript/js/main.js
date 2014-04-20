$(document).ready( function() {
  "use strict";
  var width = 700;
  var height = 300;
  var stage = new PIXI.Stage(0xEEFFFF);
  var antiAlias = true
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, antiAlias);

  document.body.appendChild(renderer.view);

  requestAnimFrame(animate);

  var triangle = buildTriangle(100, 100, 100, 100);

  stage.addChild(triangle);

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
    //triangle.rotation += 0.01;

    updateVehicle(triangle);
    triangle.move();//(timeSinceLastFrame);

    renderer.render(stage);
  }

  requestAnimFrame(animate);
});
