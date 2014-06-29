(function() {
  var app = angular.module('flock', []);

  app.controller('flockController', function() {

    testBed = new TestBed();

    this.pausePlayPressed = function() {
      testBed.running = !testBed.running;
    };

    this.toggleMovement = function() {
      testBed.moving = !testBed.moving;
    };

    this.toggleRotation = function() {
      testBed.rotating = !testBed.rotating;
    };

    this.moveTarget = function() {
      testBed.target.position.x = getRandomInt(10, 780)
      testBed.target.position.y = getRandomInt(10, 780)
    };

    this.moveThreat = function() {
      testBed.moveThreat(new PIXI.Point(getRandomInt(10, 780), getRandomInt(10, 780)));
    };

    this.arriveSteering = function() {
      testBed.force = testBed.arrive;
    };

    this.evadeSteering = function() {
      testBed.force = testBed.evade;
    };
  });

})();
