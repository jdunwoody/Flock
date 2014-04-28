function GraphicalObject(triangle) {
  var graphics = new PIXI.Graphics();
  graphics.triangle = triangle;
  //graphics.notifyTargetPositionChanged = notifyTargetPositionChanged;

  graphics.draw = function(x, y) {
    var backgroundColor = 0xFFAA33;
    var borderColor = 0xBB77AA;

    this.beginFill(backgroundColor);
    this.lineStyle(1, borderColor, 1);
    this.moveTo(x, y);
    this.pivot.x = x;
    this.pivot.y = y;

    this.lineTo(x - 10, y - 10);
    this.lineTo(x + 10, y - 10);
    this.lineTo(x, y);

    this.endFill();
  };

  graphics.drawHeading = function() {
    var x = 100;
    var y = 100;
    this.lineStyle(3, '0x00FF00', 1);
    this.moveTo(x, y);
    this.pivot.x = x;
    this.pivot.y = y;

    this.lineTo(x, y + 100);
  };

  graphics.hitArea = new PIXI.Rectangle(0, 0, 10, 10);

  graphics.setInteractive(true);
  graphics.mousemove = function(mouseData) {
    // this line will get the mouse coords relative to the sprites..
    //var localCoordsPosition = mouseData.getLocalPosition(graphics);
    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(this.parent);

    var x = parentCoordsPosition.x;
    var y = parentCoordsPosition.y;
    console.log("Mouse moved to "+x+","+y);

    this.triangle.vehicle.target[0] = x;
    this.triangle.vehicle.target[1] = y;

    //this.notifyTargetPositionChanged(vec2.fromValues(x, y));
  };

  return graphics;
};

