
function buildTriangle(graphics, w, h, x, y) {
  "use strict";
  //var triangle = new DisplayObjectContainer();

  var backgroundColor = 0xFFAA33;
  var borderColor = 0xBB77AA;

  graphics.beginFill(backgroundColor);
  graphics.x = x;
  graphics.y = y;
  graphics.lineStyle(1, borderColor, 1);
  graphics.moveTo(x, y);
  graphics.pivot.x = x;
  graphics.pivot.y = y;

  graphics.lineTo(x + 10, y + 10);
  graphics.lineTo(x - 10, y + 10);
  graphics.lineTo(x, y);

  graphics.endFill();

  graphics.setInteractive(true);
  graphics.mousemove = function(mouseData){
    // this line will get the mouse coords relative to the sprites..
    var localCoordsPosition = mouseData.getLocalPosition(graphics);

    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(graphics.parent);

    this.position.x = parentCoordsPosition.x;
    this.position.y = parentCoordsPosition.y;
  }

  return graphics;
};

