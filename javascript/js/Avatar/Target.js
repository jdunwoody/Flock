"use strict";

function Target(x, y) {
  var texture = PIXI.Texture.fromImage("img/bunny.png");
  PIXI.Sprite.call(this, texture);

  this.anchor = new PIXI.Point(0.5, 0.5);
  this.rotate = new PIXI.Point(0.5, 0.5);
  this.position.x = x;
  this.position.y = y;
};

Target.constructor = Target;
Target.prototype = Object.create(PIXI.Sprite.prototype);
