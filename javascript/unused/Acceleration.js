
//function Forces(initialPosition, mass, maxSpeed) {
//this.steering = new SteeringForce();
//this.position = initialPosition;
//this.mass = mass;
//this.maxSpeed = maxSpeed;

//this.velocity = vec2.create();
//this.target = vec2.create();

acceleration = function(timeElapsed, velocity, target) {
  this.steering = new SteeringForce();
  this.position = vec2.create();
  this.mass = 3;
  this.maxSpeed = 10;

  this.velocity = velocity;
  this.target = target;//vec2.create();

  this.truncate = function(vector, scalarLimit) {
    var length = vec2.length(vector);

    if (length > scalarLimit) {
      vec2.normalize(vector, vector);
      vec2.scale(vector, vector, scalarLimit);
    };

    return vector;
  };

  this.steeringForce = this.steering.seek(
      this.maxSpeed,
      this.target,
      this.position,
      this.velocity);

  var acceleration = vec2.create();
  vec2.scale(acceleration, this.steeringForce, 1/this.mass);

  var velocityChange = vec2.create();
  vec2.scale(velocityChange, acceleration, timeElapsed);
  vec2.add(this.velocity, this.velocity, velocityChange);

  truncate(this.velocity, this.maxSpeed);

  var accByTime = vec2.create();
  vec2.scale(accByTime, this.velocity, timeElapsed);

  return accByTime;
};

//this.update = function(timeElapsed) {
//timeElapsed = 1;

//vec2.add(this.position, this.position, this.calculateAcceleration(timeElapsed));
//};
//};

