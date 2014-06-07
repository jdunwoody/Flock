
var MyStage = function() {
  //PIXI.Stage.call(this);
  PIXI.Stage.apply(this, arguments);
};

MyStage.prototype = PIXI.Stage.prototype;
MyStage.prototype.constructor = PIXI.Stage;


MyStage.prototype.mousedown = function(mouseData) {
  debugger;
};

