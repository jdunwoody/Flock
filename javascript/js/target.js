function Target(x, y) {
  this.moveableObject = new PIXI.Graphics();

  //moveableObject.notifyTargetPositionChanged = notifyTargetPositionChanged;

  //this.moveableObject.position.x = x;
  //this.moveableObject.position.y = y;

  var width = 3;
  this.moveableObject.lineStyle(width, 0xFF0000, 1);
  this.moveableObject.moveTo(x - 10, y - 10);
  this.moveableObject.lineTo(x + 10, y + 10);

  this.moveableObject.moveTo(x - 10, y + 10);
  this.moveableObject.lineTo(x + 10, y - 10);
};
