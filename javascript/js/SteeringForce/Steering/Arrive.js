
function Arrive(options, bird) {
  this.options = options;
  this.bird = bird;
  this.decellerationTweeker = 10.0;//0.3;
}

Arrive.prototype.calculate = function(targetPosition) {
  if(!this.options.arriveEnabled) {
    return zero();
  }

  var vectorToTarget = subtract(targetPosition, this.bird.positionVector);

  var distance = length(vectorToTarget);
  var result;

  if (distance > 1) {
    var speed = distance / (this.bird.deceleration * this.decellerationTweeker);

    speed = Math.min(speed, this.bird.maxSpeed);

    var desiredVelocity = scale(vectorToTarget, speed/distance);

    result = subtract(desiredVelocity, this.bird.velocity);
  } else {
    result = zero();
  }

  //console.log("Arrive force: " + result[0] +"," +result[1]+") Distance: "+distance);
  return result;
};
