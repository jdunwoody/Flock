function Main() {
  this.width = $(window).width();
  this.height = $(window).height();

  this.screenDimensions = vec2.fromValues(this.width, this.height);
  this.stage = new PIXI.Stage(0x3355AA);
  var antiAlias = true;
  this.renderer = new PIXI.autoDetectRenderer(
      this.screenDimensions[0],
      this.screenDimensions[1],
      document.getElementById("game-canvas"),
      false,
      antiAlias);

  this.scrollSpeed = Main.MIN_SCROLL_SPEED;

  this.loadSpriteSheet(this.spriteSheetLoaded);

  this.addTargets(this.stage);
  this.seagul = this.addAvatars(this.stage, this.screenDimensions);

  this.lastTime = Date.now();
  this.timeSinceLastFrame = 0;
}

Main.prototype.addTargets = function(stage) {
  var targets = [ new Target(200, 400), new Target(100,600) ];

  for (var i in this.targets) {
    stage.addChild(this.targets[i].moveableObject);
  }
};

Main.MIN_SCROLL_SPEED = 5;
Main.MAX_SCROLL_SPEED = 15;
Main.SCROLL_ACCELERATION = 0.005;

Main.prototype.addAvatars = function(stage, screenDimensions) {
  var seagul = new Triangle(
      vec2.fromValues(0,0),
      100,
      5,
      0xAA3344,
      screenDimensions);

  stage.addChild(seagul.graphicalObject);

  return seagul;
};

Main.prototype.update = function() {
  var now = Date.now();
  this.timeSinceLastFrame = now - this.lastTime;
  this.lastTime = now;

  var acceleration = this.seagul.vehicle.calculateAcceleration(this.timeSinceLastFrame);
  //this.seagul.update(this.timeSinceLastFrame)

  //this.scroller.moveViewportXBy(this.scrollSpeed);
  //this.scroller.moveViewportBy(this.seagul.vehicle.steeringForce);
  var acceleration = vec2.fromValues(1, 1);
  //vec2.fromValues(acceleration[0] - this.width / 2, acceleration[1] + this.height / 2);
  this.scroller.moveViewportBy(acceleration);

  this.scrollSpeed += Main.SCROLL_ACCELERATION;
  if (this.scrollSpeed > Main.MAX_SCROLL_SPEED) {
    this.scrollSpeed = Main.MAX_SCROLL_SPEED;
  }

  this.renderer.render(this.stage);
  requestAnimFrame(this.update.bind(this));
};

Main.prototype.loadSpriteSheet = function(spriteSheetLoaded) {
  var assetsToLoad = ["img/wall.json",
      "img/bg-mid.png",
      "img/bg-far.png",
      "img/blue-water-texture.jpg",
      "img/green-water.png"];

  loader = new PIXI.AssetLoader(assetsToLoad);
  loader.onComplete = spriteSheetLoaded.bind(this);
  loader.load();
};

Main.prototype.spriteSheetLoaded = function() {
  this.scroller = new Scroller(this.stage,
      this.screenDimensions[0],
      this.screenDimensions[1]);
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
