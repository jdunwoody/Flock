function Flee(vehicle){
  this.vehicle = vehicle;
};

Flee.prototype.calculate = function(targetVector) {
  desiredVelocity = scale(normalize(subtract(this.vehicle.positionVector(), targetVector)), this.vehicle.maxSpeed);

  return subtract(desiredVelocity, this.vehicle.velocity);
};
