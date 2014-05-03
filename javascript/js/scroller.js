function Scroller(stage) {
  this.far = new Far();
  stage.addChild(this.far);

  this.mid = new Mid();
  stage.addChild(this.mid);
};

Scroller.prototype.update = function() {
  this.far.update();
  this.mid.update();
};
