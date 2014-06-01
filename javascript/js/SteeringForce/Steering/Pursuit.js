Pursuit = function(evader) {
  vectorToEvader = evader.position - vehicle.position;

  relativeHeading = vehicle.heading.dot(evader.heading);

  if (vectorToEvader.dot(vehicle.heading) > 0 && relativeHeading < 0.95) {
    return Seek(evader.position);
  }

  lookAheadTime = vectorToEvader.length / vehicle.maxSpeed + evader.speed;

  return Seek(evader.position + evader.velocity * lookAheadTime);
};
