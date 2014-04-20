function buildBunny(width, height) {
  var texture = new PIXI.Texture.fromImage("img/bunny.png");
  var bunny = new PIXI.Sprite(texture);

  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  bunny.position.x = width/2;
  bunny.position.y = height/2;

  return bunny;
};

function moveBunny(bunny) {
  bunny.rotation += 0.01;
};
