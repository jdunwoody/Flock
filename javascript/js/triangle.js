
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

  return graphics;
};

function moveTriangle(graphics) {
  //triangle.rotation += 0.01;
};
