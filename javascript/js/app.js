(function() {
  var app = angular.module('flock', []);

  app.controller('flockController', function() {

    testBed = new TestBed();

    this.pausePlayPressed = function() {
      testBed.running = !testBed.running;
    };

    this.nextPressed = function() {
    };

  });

})();
