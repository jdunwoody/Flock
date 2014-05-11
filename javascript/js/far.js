function Far(width, height) {
  var texture = PIXI.Texture.fromImage("img/blue-water-texture.jpg");//bg-far.png");
  PIXI.TilingSprite.call(this, texture, width, height);//512, 256);

  this.position.x = 0;
  this.position.y = 0;
  this.tilePosition.x = 0;
  this.tilePosition.y = 0;

  this.viewportX = 0;
  this.viewport = vec2.create();
}

Far.constructor = Far;

Far.prototype = Object.create(PIXI.TilingSprite.prototype);

Far.DELTA_X = 0.064;
Far.DELTA_Y = 0.064;

Far.prototype.setViewportX = function(newViewportX) {
  var distanceTravelled = newViewportX - this.viewportX;
  this.viewportX = newViewportX;
  this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
};

Far.prototype.setViewport = function(newViewport) {
  var distanceTravelled = vec2.create();
  vec2.subtract(distanceTravelled, newViewport, this.viewport);
  this.viewport = newViewport;

  vec2.scale(distanceTravelled, distanceTravelled, Far.DELTA_X);

  this.tilePosition.x -= (distanceTravelled[0] * Far.DELTA_X);
  this.tilePosition.y -= (distanceTravelled[1] * Far.DELTA_Y);

  //var distanceTravelled = newViewport - this.viewport;
  //this.viewport = newViewport;
  //this.tilePosition.x -= (distanceTravelled * Far.DELTA_X);
  //this.tilePosition.y -= (distanceTravelled * Far.DELTA_Y);
};
