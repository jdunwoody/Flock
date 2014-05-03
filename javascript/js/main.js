"use strict"

$(document).ready( function() {
  "use strict";

  //var width = document.getElementById("game-canvas").width;

  var width = $(window).width();
  var height = $(window).height();
  var screenDimensions = vec2.fromValues($(window).width(), $(window).height());
  var antiAlias = true;
  var renderer = PIXI.autoDetectRenderer(width, height, null, false, antiAlias);

  document.body.appendChild(renderer.view);

  requestAnimFrame(animate);
  var targets = [ new Target(100, 100), new Target(200,200) ];

  var triangles = [
  new Triangle(vec2.fromValues(400,100), 200, 9, 0x88FFAA, screenDimensions),
new Triangle(vec2.fromValues(500,200), 140, 3, 0x883311, screenDimensions),
new Triangle(vec2.fromValues(300,200), 80, 3, 0xAA33BB, screenDimensions),
new Triangle(vec2.fromValues(200,200), 50, 4, 0x88AA22, screenDimensions),
new Triangle(vec2.fromValues(0,0), 100, 5, 0xAA3344, screenDimensions)
  ];

  var far = new Far();
  var mid = new Mid();

  var stage = new PIXI.Stage(0x3355AA);
  stage.addChild(far);
  stage.addChild(mid);
  for (var i in targets) {
    stage.addChild(targets[i].moveableObject);
  }
  for (var i in triangles) {
    stage.addChild(triangles[i].graphicalObject);
  }

  var lastTime = Date.now();
  var timeSinceLastFrame = 0;

  function animate() {
    requestAnimFrame(animate);

    var now = Date.now();
    timeSinceLastFrame = now - lastTime;
    lastTime = now;

    for (var i in triangles) {
      triangles[i].update(timeSinceLastFrame);
    }

    far.update();
    mid.update();

    renderer.render(stage);
  };

  requestAnimFrame(animate);
});
