"use strict";

function TextInfo(message) {
  PIXI.Text.call(this, message);
  //this.borderColor = 0xBB0000;
};

TextInfo.constructor = TextInfo;
TextInfo.prototype = Object.create(PIXI.Text.prototype);

//TextInfo.prototype.display = function(position, message) {
  //this.clear();
  //this.lineStyle(10, this.borderColor, 1);

  //this.moveTo(origin.x, origin.y);

  //this.lineTo(
      //origin.x + vector[0] * 100,
      //origin.y + vector[1] * 100
      //);
//};
