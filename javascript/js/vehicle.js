function Steering() {
  this.seek = function(maxSpeed, targetPosition, currentPosition, currentVelocity) {
    var newVelocity = vec2.create();
    var result = vec2.create();

    vec2.normalize(newVelocity, vec2.sub(newVelocity, targetPosition, currentPosition));
    vec2.scale(newVelocity, newVelocity, maxSpeed);
    vec2.sub(result, newVelocity, currentVelocity);

    return result;
  }

  this.calculate = function(vehicle) {
    var targetPosition = vehicle.target; //vec2.fromValues(100,100); // this.targetPosition;
    var maxSpeed = vehicle.maxSpeed;
    var currentVelocity = vehicle.velocity;
    var currentPosition = vehicle.position;

    return this.seek(maxSpeed, targetPosition, currentPosition, currentVelocity);
  };
};

truncate = function(vector, scalarLimit) {
  var length = vec2.length(vector);

  if (length > scalarLimit) {
    vec2.normalize(vector, vector);
    vec2.scale(vector, vector, scalarLimit);
  }

  return vector;
};


function Vehicle() {
  this.steering = new Steering();
  this.position = vec2.create();
  this.mass = 1;
  this.maxSpeed = 1;
  this.velocity = vec2.create();
  this.target = vec2.create();

  this.update = function(timeElapsed) {
    timeElapsed = 1;

    var steeringForce = this.steering.calculate(this);

    var acceleration = vec2.create();
    vec2.scale(acceleration, steeringForce, 1/this.mass);

    var velocityChange = vec2.create();
    vec2.scale(velocityChange, acceleration, timeElapsed);
    vec2.add(this.velocity, this.velocity, velocityChange);

    truncate(this.velocity, this.maxSpeed);
//debugger;
    //this.velocity[0] = 1;
    //this.velocity[1] = 1;

    var accByTime = vec2.create();
    vec2.scale(accByTime, this.velocity, timeElapsed);
    vec2.add(this.position, this.position, accByTime);

  }
}
