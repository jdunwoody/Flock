"use strict";

function ForceLine(avatar) {
  PIXI.Graphics.call(this);
  this.avatar = avatar;
  this.borderColor = 0xBB0000;
};

ForceLine.constructor = ForceLine;
ForceLine.prototype = Object.create(PIXI.Graphics.prototype);

ForceLine.prototype.display = function(avatar) {
  this.clear();
  this.lineStyle(1, this.borderColor, 1);

  this.moveTo(avatar.position.x, avatar.position.y);
  this.lineTo(
      avatar.position.x - avatar.velocity[0] * 10, 
      avatar.position.y - avatar.velocity[1] * 10
      );
};
