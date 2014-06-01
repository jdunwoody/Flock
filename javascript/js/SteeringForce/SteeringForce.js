
SteeringForce = function(vehicle) {
  this.vehicle = vehicle;
  this.force = vec2.create();
};

SteeringForce.prototype.add = function(force) {
  //this.force + force;
  this.force = this.truncate(force, this.vehicle.maxSteeringForce);
  //return force;
};

SteeringForce.prototype.truncate = function(vector, scalarLimit) {
  var length = vec2.length(vector);

  if (length > scalarLimit) {
    vec2.normalize(vector, vector);
    vec2.scale(vector, vector, scalarLimit);
  };

  return vector;
};
