
function Seek(bird) {
  this.bird = bird;
}

Seek.prototype.calculate = function(targetPosition) {
  desiredVelocity = scale(
      normalize(
        subtract(targetPosition, this.bird.positionVector)
        ),
      this.bird.maxSpeed);

  var result = subtract(desiredVelocity, this.bird.velocity);
  //console.log(result);
  return result;
};
