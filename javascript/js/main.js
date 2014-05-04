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

Main.prototype.generateTestWallSpan = function() {
  var lookupTable = [
    this.pool.borrowFrontEdge,  // 1st slice
    this.pool.borrowWindow,     // 2nd slice
    this.pool.borrowDecoration, // 3rd slice
    this.pool.borrowStep,       // 4th slice
    this.pool.borrowWindow,     // 5th slice
    this.pool.borrowBackEdge    // 6th slice
      ];

  var yPos = [
    128, // 1st slice
    128, // 2nd slice
    128, // 3rd slice
    192, // 4th slice
    192, // 5th slice
    192  // 6th slice
      ];

  for (var i = 0; i < lookupTable.length; i++) {
    var func = lookupTable[i];

    var sprite = func.call(this.pool);
    sprite.position.x = 64 + (i * 64);
    sprite.position.y = yPos[i];

    this.wallSlices.push(sprite);

    this.stage.addChild(sprite);
  }
};

Main.prototype.clearTestWallSpan = function() {
  var lookupTable = [
    this.pool.returnFrontEdge,  // 1st slice
    this.pool.returnWindow,     // 2nd slice
    this.pool.returnDecoration, // 3rd slice
    this.pool.returnStep,       // 4th slice
    this.pool.returnWindow,     // 5th slice
    this.pool.returnBackEdge    // 6th slice
  ];

  for (var i = 0; i < lookupTable.length; i++) {
    var func = lookupTable[i];
    var sprite = this.wallSlices[i];

    this.stage.removeChild(sprite);
    func.call(this.pool, sprite);
  }

  this.wallSlices = [];
};
