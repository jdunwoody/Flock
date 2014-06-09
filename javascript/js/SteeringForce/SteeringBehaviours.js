
function SteeringBehaviours(vehicle) {
  this.vehicle = vehicle;
  this.seek = new Seek(this.vehicle);
  this.arrive = new Arrive(this.vehicle);
  this.evade = new Evade(this.vehicle);
}

SteeringBehaviours.prototype.calculate = function(targetPosition, obstacle) {
  steeringForce = new SteeringForce(this.vehicle);

  //steeringForce.add(this.seek.calculate(vehicle, targetPosition));
  steeringForce.add(this.evade.calculate(obstacle));
  steeringForce.add(this.arrive.calculate(targetPosition));

  return steeringForce.force;
};

SteeringBehaviours.prototype.accumulateForce = function(runningTotal, forceToAdd) {
  // implement me
  return forceToAdd;
};
