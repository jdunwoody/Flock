"use strict";

function ForceLine(color) {
  PIXI.Graphics.call(this);
  this.borderColor = color;
};

ForceLine.constructor = ForceLine;
ForceLine.prototype = Object.create(PIXI.Graphics.prototype);

ForceLine.prototype.display = function(origin, vector) {
  if (this.toggleDebugging) {
    this.clear();
    this.lineStyle(10, this.borderColor, 1);

    this.moveTo(origin.x, origin.y);

    this.lineTo(
        origin.x + vector[0] * 100,
        origin.y + vector[1] * 100
        );
  }
};
