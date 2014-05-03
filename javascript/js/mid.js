function Mid() {
  var texture = PIXI.Texture.fromImage("img/bg-mid.png");
  PIXI.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 128;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
}

Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.TilingSprite.prototype);

Mid.prototype.update = function() {
  this.tilePosition.x -= 0.64;
};
