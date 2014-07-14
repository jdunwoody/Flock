
function MyStage() {
  var colour = 0x3355AA;
  PIXI.Stage.call(this, colour);
};

MyStage.constructor = MyStage;
MyStage.prototype = Object.create(PIXI.Stage.prototype);

//MyStage.prototype.mousedown = function(mouseData) {

//};
