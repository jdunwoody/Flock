
function Arrive(vehicle) {
  this.vehicle = vehicle;
  this.decellerationTweeker = 10.0;//0.3;
}

Arrive.prototype.calculate = function(targetPosition) {
  var vectorToTarget = subtract(targetPosition, this.vehicle.position);

  var distance = length(vectorToTarget);
  var result;

  if (distance > 1) {
    var speed = distance / (this.vehicle.deceleration * this.decellerationTweeker);

    speed = Math.min(speed, this.vehicle.maxSpeed);

    var desiredVelocity = scale(vectorToTarget, speed/distance);

    result = subtract(desiredVelocity, this.vehicle.velocity);
  } else {
    result = zero();
  }

  //console.log("Arrive force: " + result[0] +"," +result[1]+") Distance: "+distance);
  return result;
};
