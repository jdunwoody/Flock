function Mid(width, height) {
  var texture = PIXI.Texture.fromImage("img/green-water.png");//bg-mid.png");
  PIXI.TilingSprite.call(this, texture, width, height);//512, 256);

  this.position.x = 0;
  this.position.y = 0;//128;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;

  this.viewportX = 0;
}

Mid.constructor = Mid;
Mid.prototype = Object.create(PIXI.TilingSprite.prototype);

//Mid.DELTA_X = 0.128;
Mid.DELTA_X = 0.32;
Mid.DELTA_Y = 0.32;

Mid.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * Mid.DELTA_X);
  this.tilePosition.y -= (distanceTravelled * Mid.DELTA_Y);
};
