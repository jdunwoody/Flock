(function() {
  var app = angular.module('flock', []);

  app.controller('flockController', function() {

    testBed = new TestBed();

    this.pausePlayPressed = function() {
      testBed.running = !testBed.running;
    };

    this.moveTarget = function() {
      debugger;
      testBed.targetPosition = vec2.fromValues(
        getRandomInt(10, 780),
        getRandomInt(11, 780)
        );
    };

  });

})();
