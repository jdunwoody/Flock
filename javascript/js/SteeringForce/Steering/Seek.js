
function Seek() {
}

Seek.prototype.calculate = function(vehicle, targetPosition) {
  desiredVelocity = scale(
      normalize(
        subtract(targetPosition, vehicle.positionVector())
        ),
      vehicle.maxSpeed);

  return subtract(desiredVelocity, vehicle.velocity);
};
