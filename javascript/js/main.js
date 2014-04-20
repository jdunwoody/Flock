$(document).ready( function() {
  "use strict";
  var width = 700;
  var height = 300;
  var stage = new PIXI.Stage(0xEEFFFF);
  var antiAlias = true
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, antiAlias);

  var graphics = new PIXI.Graphics();
  stage.addChild(graphics);

  document.body.appendChild(renderer.view);

  requestAnimFrame(animate);

  //drawTerrain(graphics, width, height);

  var triangle = buildTriangle(graphics, 100, 100, 100, 100);

  //var bunny = buildBunny(width, height);
  //stage.addChild(bunny);

  function animate() {
    requestAnimFrame(animate);

    //moveBunny(bunny);
    triangle.rotation += 0.01;

    renderer.render(stage);
  }

  requestAnimFrame(animate);
});
