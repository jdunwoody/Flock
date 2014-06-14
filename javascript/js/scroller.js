"use strict";

function Scroller(stage, width, height) {
  this.far = new Far(width, height);
  stage.addChild(this.far);

  this.mid = new Mid(width, height);
  stage.addChild(this.mid);

  //this.front = new Walls();
  //stage.addChild(this.front);

  this.avatars = [];

  var avatar = new Avatar();
  //avatar.maxSpeed = 90;
  avatar.position.x = 200;
  avatar.position.y = 200;
  //avatar.mass = 5;
  stage.addChild(avatar);
  stage.addChild(avatar.arriveForceLine);
  this.avatars.push(avatar);

  //var avatar = new Avatar();
  //avatar.maxSpeed = 50;
  //avatar.position.x = 500;
  //avatar.position.y = 800;
  //avatar.mass = 2;
  //stage.addChild(avatar);
  ////stage.addChild(avatar.arriveForceLine);
  //this.avatars.push(avatar);

  this.obstacle = new Repulsor(100,100);
  stage.addChild(this.obstacle);

  //this.evadeForce = new ForceLine();
  //stage.addChild(this.evadeForce);

  //this.mapBuilder = new MapBuilder(this.front);k

  this.viewportX = 0;
  this.viewport = vec2.create();
};

Scroller.prototype.setViewportX = function(viewportX) {
  this.viewportX = viewportX;
  this.far.setViewportX(viewportX);
  this.mid.setViewportX(viewportX);
  //this.front.setViewportX(viewportX);
  for(var i = 0; i < this.avatars.length; i++) {
    this.avatars[i].setViewportX;
  }
};

Scroller.prototype.setViewport = function(viewport) {
  this.viewport = viewport;
  this.far.setViewport(viewport);
  this.mid.setViewportX(viewport[0]);
  //this.front.setViewportX(viewport[0]);
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
      this.viewport[1] + velocity[1]
      );

  this.viewport[0] += velocity[0];
  this.viewport[1] += velocity[1];

  this.setViewport(this.viewport);
};

Scroller.prototype.updateAvatar = function(timeSinceLastFrame) {
  for(var i = 0; i < this.avatars.length; i++) {
    var avatar = this.avatars[i];

    avatar.update(timeSinceLastFrame, this.obstacle);
  }
};
