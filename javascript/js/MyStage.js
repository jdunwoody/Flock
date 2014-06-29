
var MyStage = function() {
  PIXI.Stage.apply(this, arguments);
};

MyStage.prototype = PIXI.Stage.prototype;
MyStage.prototype.constructor = PIXI.Stage;

MyStage.prototype.mousedown = function(mouseData) {

};
