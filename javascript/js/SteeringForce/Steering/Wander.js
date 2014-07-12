'use strict'

var wanderRadius = 100;
var wanderDistance = 100;
var wanderJitter = 10;

function Wander(bird) {
  wanderTarget += vec2.fromValues(
      getRandomInt(-1, 1) * wanderJitter,
      getRandomInt(-1, 1) * wanderJitter
      );

  wanderTarget = normalise(wanderTarget);
  wanderTarget = multiply(wanderTarget, wanderRadius);

  var targetLocal = add(wanderTarget, vec2.fromValues(wanderDistance, 0));

  var targetWorld = PointToWorldSpace(targetLocal,
      bird.heading,
      bird->Side(),
      bird.positionVector);

  return subtract(targetWorld, bird.positionVector);
}
