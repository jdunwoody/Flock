function Scroller(stage, width, height) {
  this.far = new Far(width, height);
  stage.addChild(this.far);

  this.mid = new Mid(width, height);
  stage.addChild(this.mid);

  this.front = new Walls();
  stage.addChild(this.front);

  this.mapBuilder = new MapBuilder(this.front);

  this.viewportX = 0;
  this.viewport = vec2.create();
};

Scroller.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;
  //this.far.setViewportX(viewportX);
  this.far.setViewport(viewportX);
  this.mid.setViewportX(viewportX);
  this.front.setViewportX(viewportX);
};

Scroller.prototype.setViewport = function(viewport) {
  this.viewport = viewport;
  this.far.setViewport(viewport);
  this.mid.setViewportX(viewport[0]);
  this.front.setViewportX(viewport[0]);
};

Scroller.prototype.getViewportX = function() {
  return this.viewportX;
};

Scroller.prototype.moveViewportXBy = function(units) {
  var newViewportX = this.viewportX + units;
  this.setViewportX(newViewportX);
};

Scroller.prototype.moveViewportBy = function(velocity) {
  var newViewport = vec2.fromValues(
      this.viewport[0] + velocity[0],
      this.viewport[1] + velocity[1]);

  this.viewport[0] += velocity[0];
  this.viewport[1] += velocity[1];

  this.setViewport(this.viewport);
};
