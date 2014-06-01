
function Arrive() {
  this.decellerationTweeker = 0.3;
}

Arrive.prototype.calculate = function(vehicle, targetPosition) {
  var vectorToTarget = subtract(targetPosition, vehicle.positionVector());

  var distance = length(vectorToTarget);

  if (distance > 0) {
    var speed = distance / (vehicle.deceleration * this.decellerationTweeker);
    speed = Math.min(speed, vehicle.maxSpeed);

    var desiredVelocity = scale(vectorToTarget, speed/distance);

    return subtract(desiredVelocity, vehicle.velocity);
  }

  return zero();
};
