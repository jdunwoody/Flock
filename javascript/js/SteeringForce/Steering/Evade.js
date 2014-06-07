function Evade() {
}

Evade.prototype.calculate = function(pursuer) {
  var vectorToPursuer = subtract(pursuer.position, vehicle.positionVector());

  var lookAheadTime = vectorToPursuer.length / (vehicle.maxSpeed + pursuer.speed);

  return Flee(add(pursuer.position, scale(pursuer.velocity, lookAheadTime)));
};
