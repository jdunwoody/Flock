(function() {
  var app = angular.module('flock', []);

  app.controller('flockController', function() {

    testBed = new TestBed();

    this.pausePlayPressed = function() {
      testBed.running = !testBed.running;
    };

    this.moveTarget = function() {
      testBed.target.position.x = getRandomInt(10, 780)
      testBed.target.position.y = getRandomInt(10, 780)
    };

    this.arriveSteering = function() {
      testBed.force = testBed.arrive;
    };

    this.evadeSteering = function() {
      testBed.force = testBed.evade;
    };
  });

})();
