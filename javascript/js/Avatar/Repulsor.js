
function Repulsor() {
  var texture = PIXI.Texture.fromImage("img/bunny.png");
  PIXI.Sprite.call(this, texture);
  this.position.x = 100;
  this.position.y = 100;
  this.viewportX = 100;

  this.setInteractive(true);
  this.velocity = vec2.create();
  this.speed = 0;
  this.maxSteeringForce = 1;
};

Repulsor.constructor = Repulsor;
Repulsor.prototype = Object.create(PIXI.Sprite.prototype);

Repulsor.prototype.positionVector = function() {
  return vec2.fromValues(this.position.x, this.position.y);
};

