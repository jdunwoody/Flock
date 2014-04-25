$(document).ready( function() {

  // create a renderer instance
  var renderer = PIXI.autoDetectRenderer(600, 400);

  // add the renderer view element to the DOM
  document.body.appendChild(renderer.view);

  requestAnimFrame(animate);

  // create a texture from an image path
  var texture = PIXI.Texture.fromImage("img/bunny.png");

  // create a new Sprite using the texture
  var bunny = new PIXI.Sprite(texture);

  // center the sprites anchor point
  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  // move the sprite to the center of the screen
  bunny.position.x = 200;
  bunny.position.y = 150;

  // create an new instance of a pixi stage
  var stage = new PIXI.Stage(0x66FF99);

  stage.addChild(bunny);

  function animate() {
    requestAnimFrame(animate);

    // just for fun, let's rotate mr rabbit a little
    bunny.rotation += 0.1;

    // render the stage
    renderer.render(stage);
  }
});
