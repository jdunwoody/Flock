
toDegrees = function(radian) {
  //var deg2rad = Math.PI/180;
  //var rad2deg = 180/Math.PI;

  return radian * 360.0 / (2.0 * Math.PI);
};

toRotation = function(vector) {
  var horiz = vector[0];
  var vert = vector[1];

  var newRotation = 0;

  if (vert >= 0) {
    newRotation = -Math.atan(horiz, vert);
  } else {
    //newRotation = Math.PI + Math.atan(horiz, vert);
  }

  //if (horiz >= 0) {
  //if (vert >= 0) {
  //console.log("Rotation quadrant 1");
  ////newRotation = Math.PI - Math.atan(horiz, vert);
  //newRotation = -Math.atan(horiz, vert);
  //} else {
  //console.log("Rotation quadrant 4");
  //newRotation = Math.PI + Math.atan(horiz, vert);
  //}
  //} else {
  //if (vert >= 0) {
  //console.log("Rotation quadrant 2");
  //newRotation = Math.atan(horiz, vert);
  //} else {
  //console.log("Rotation quadrant 3");
  //newRotation = Math.PI - Math.atan(horiz, vert);
  //}
  //}

  return newRotation;// % (2 *Math.PI);
};

toVector = function(pixiPosition) {
  return vec2.fromValues(pixiPosition.x, pixiPosition.y);
};

getRandomInt = function(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
};

subtract = function(a, b) {
  var newValue = vec2.create();
  vec2.sub(newValue, a, b);
  return newValue;
};

normalize = function(vector) {
  var newValue = vec2.create();
  vec2.normalize(newValue, vector);

  return newValue;
};

multiply = function(a, b) {
  var newValue = vec2.create();
  vec2.multiply(newValue, a, b);

  return newValue;
};

scale = function(a, b) {
  var newValue = vec2.create();
  vec2.scale(newValue, a, b);

  return newValue;
};

length = function(vector) {
  return vec2.length(vector)
};

zero = function() {
  return vec2.create();
};

add = function(a, b) {
  var newValue = vec2.create();
  vec2.add(newValue, a, b);
  return newValue;
};

squaredDistance = function(a, b) {
  return vec2.squaredDistance(a, b);
};

truncate = function(vector, scalarLimit) {
  var length = vec2.length(vector);

  if (length > scalarLimit) {
    vector = scale(normalize(vector), scalarLimit);
  };

  return vector;
};

//function SteeringForce() {
//this.seek = function(maxSpeed, targetPosition, currentPosition, currentVelocity) {
//var newVelocity = vec2.create();

//vec2.normalize(newVelocity, vec2.sub(newVelocity, targetPosition, currentPosition));
//vec2.scale(newVelocity, newVelocity, maxSpeed);

//var result = vec2.create();
//vec2.sub(result, newVelocity, currentVelocity);

//return result;
//};
//};

