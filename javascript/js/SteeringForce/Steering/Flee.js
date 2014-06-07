function Flee(){

};

Flee.prototype.calculate = function(vehicle, target) {
  desiredVelocity = Normalize(vehicle.position - target.position) * vehicle.maxSpeed;

  return desiredVelocity - vehicle.velocity;
};

FleeInRange = function(vehicle, target) {
  panicDistance = 100 * 100;

  if (DistanceSquared(vehicle.position, target) > panicDistance) {
    return new SteeringForce();
  }

  return new Flee();
};
