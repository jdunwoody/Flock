"use strict";

function ForceLine() {
  PIXI.Graphics.call(this);
  this.borderColor = 0xBB0000;
};

ForceLine.constructor = ForceLine;
ForceLine.prototype = Object.create(PIXI.Graphics.prototype);

ForceLine.prototype.display = function(origin, vector) {
  this.clear();
  this.lineStyle(10, this.borderColor, 1);

  this.moveTo(origin.x, origin.y);

  this.lineTo(
      origin.x + vector[0] * 100,
      origin.y + vector[1] * 100
      );
};
