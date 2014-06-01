
function SteeringBehaviours() {
  this.seek = new Seek();
  this.arrive = new Arrive();
}

SteeringBehaviours.prototype.calculate = function(vehicle, targetPosition) {
  steeringForce = new SteeringForce(vehicle);

  //steeringForce.add(this.seek.calculate(vehicle, targetPosition));
  steeringForce.add(this.arrive.calculate(vehicle, targetPosition));

  return steeringForce.force;
};

SteeringBehaviours.prototype.accumulateForce = function(runningTotal, forceToAdd) {
  // implement me
  return forceToAdd;
};
