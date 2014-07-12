Pursuit = function(evader) {
  vectorToEvader = evader.position - bird.position;

  relativeHeading = bird.heading.dot(evader.heading);

  if (vectorToEvader.dot(bird.heading) > 0 && relativeHeading < 0.95) {
    return Seek(evader.position);
  }

  lookAheadTime = vectorToEvader.length / bird.maxSpeed + evader.speed;

  return Seek(evader.position + evader.velocity * lookAheadTime);
};
