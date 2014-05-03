function Far() {
  var texture = PIXI.Texture.fromImage("img/bg-far.png");
  PIXI.TilingSprite.call(this, texture, 512, 256);

  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;
}

Far.constructor = Far;

Far.prototype = Object.create(PIXI.TilingSprite.prototype);

Far.prototype.update = function() {
  this.tilePosition.x -= 0.128;
};
