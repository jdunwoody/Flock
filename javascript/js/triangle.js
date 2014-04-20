
function buildTriangle( w, h, x, y) {
  "use strict";
  //var triangle = new DisplayObjectContainer();

  var triangle = new PIXI.Graphics();
  var backgroundColor = 0xFFAA33;
  var borderColor = 0xBB77AA;

  triangle.beginFill(backgroundColor);
  triangle.x = x;
  triangle.y = y;
  triangle.lineStyle(1, borderColor, 1);
  triangle.moveTo(x, y);
  triangle.pivot.x = x;
  triangle.pivot.y = y;

  triangle.lineTo(x + 10, y + 10);
  triangle.lineTo(x - 10, y + 10);
  triangle.lineTo(x, y);

  triangle.endFill();

  triangle.hitArea = new PIXI.Rectangle(-150, -150, 300, 300);

  triangle.setInteractive(true);

  triangle.targetPosition = [];
  triangle.targetPosition.x = x;
  triangle.targetPosition.y = y;

  triangle.mousemove = function(mouseData){
    // this line will get the mouse coords relative to the sprites..
    //var localCoordsPosition = mouseData.getLocalPosition(triangle);

    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(triangle.parent);

    this.targetPosition.x = parentCoordsPosition.x;
    this.targetPosition.y = parentCoordsPosition.y;

    //this.position.x = parentCoordsPosition.x;
    //this.position.y = parentCoordsPosition.y;
  }

  triangle.move = function() {
    this.position.x = this.targetPosition.x
    this.position.y = this.targetPosition.y
  };

  return triangle;
};

