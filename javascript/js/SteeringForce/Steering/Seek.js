
function Seek(vehicle) {
  this.vehicle = vehicle;
}

Seek.prototype.calculate = function(targetPosition) {
  desiredVelocity = scale(
      normalize(
        subtract(targetPosition, this.vehicle.positionVector())
        ),
      this.vehicle.maxSpeed);

  var result = subtract(desiredVelocity, this.vehicle.velocity);
  //console.log(result);
  return result;
};
