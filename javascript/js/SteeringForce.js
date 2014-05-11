
function SteeringForce() {
  this.seek = function(maxSpeed, targetPosition, currentPosition, currentVelocity) {
    var newVelocity = vec2.create();

    vec2.normalize(newVelocity, vec2.sub(newVelocity, targetPosition, currentPosition));
    vec2.scale(newVelocity, newVelocity, maxSpeed);

    var result = vec2.create();
    vec2.sub(result, newVelocity, currentVelocity);

    return result;
  };
};
