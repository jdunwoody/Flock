function Main() {
  var screenDimensions = vec2.fromValues($(window).width(), $(window).height());
  this.stage = new PIXI.Stage(0x3355AA);
  var antiAlias = true;
  this.renderer = new PIXI.autoDetectRenderer(
      screenDimensions[0],
      screenDimensions[1],
      document.getElementById("game-canvas"),
      false,
      antiAlias
      );

  this.loadSpriteSheet();

  //document.body.appendChild(renderer.view);

  this.targets = [ new Target(200, 400), new Target(100,600) ];
  for (var i in this.targets) {
    this.stage.addChild(this.targets[i].moveableObject);
  }

  this.triangles = [
    new Triangle(vec2.fromValues(400,100), 200, 9, 0x88FFAA, screenDimensions),
        new Triangle(vec2.fromValues(500,200), 140, 3, 0x883311, screenDimensions),
        new Triangle(vec2.fromValues(300,200), 80, 3, 0xAA33BB, screenDimensions),
        new Triangle(vec2.fromValues(200,200), 50, 4, 0x88AA22, screenDimensions),
        new Triangle(vec2.fromValues(0,0), 100, 5, 0xAA3344, screenDimensions)
          ];
  for (var i in this.triangles) {
    this.stage.addChild(this.triangles[i].graphicalObject);
  }

  this.lastTime = Date.now();
  this.timeSinceLastFrame = 0;
}

Main.SCROLL_SPEED = 5;

Main.prototype.update = function() {
  var now = Date.now();
  this.timeSinceLastFrame = now - this.lastTime;
  this.lastTime = now;

  for (var i in this.triangles) {
    this.triangles[i].update(this.timeSinceLastFrame);
  }

  this.scroller.moveViewportXBy(Main.SCROLL_SPEED);
  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function() {
  var assetsToLoad = ["img/wall.json", "img/bg-mid.png", "img/bg-far.png"];
  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = this.spriteSheetLoaded.bind(this);
  loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage);
  requestAnimFrame(this.update.bind(this));
};
