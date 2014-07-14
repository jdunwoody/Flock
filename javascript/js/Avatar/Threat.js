"use strict";

function Threat() {

  var texture = PIXI.Texture.fromImage("img/newton.gif");
  //texture = new PIXI.Sprite(greenBirdTexture);j
  PIXI.Sprite.call(this, texture);

  this.anchor = new PIXI.Point(0.5, 0.5);
  this.rotate = new PIXI.Point(0.5, 0.5);

  this.cautionCircle = new PIXI.Graphics();
  this.cautionCircle.borderColor = 0xAA00CC;
  this.cautionCircle.beginFill(0xAA00CC);
  this.cautionCircle.drawCircle(
      this.position.x,
      this.position.y,
      200);
  this.cautionCircle.endFill();
  this.cautionCircle.anchor = new PIXI.Point(0.5, 0.5);

  this.panicCircle = new PIXI.Graphics();
  this.panicCircle.borderColor = 0xAABBCC;
  this.panicCircle.beginFill(0x77AA00);
  this.panicCircle.drawCircle(
      this.position.x,
      this.position.y,
      100);
  this.panicCircle.anchor = new PIXI.Point(0.5, 0.5);
};

Threat.constructor = Threat;
Threat.prototype = Object.create(PIXI.Sprite.prototype);

Threat.prototype.move = function(newPosition) {
  this.position = newPosition;
  this.cautionCircle.position = newPosition;
  this.panicCircle.position = newPosition;
};
