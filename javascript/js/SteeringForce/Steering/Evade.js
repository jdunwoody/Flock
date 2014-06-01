Evade = function(pursuer) {

  vectorToPursuer = pursuer.position - vehicle.position;


  lookAheadTime = vectorToPursuer.length / (vehicle.maxSpeed + pursuer.speed);

  return Flee(pursuer.position + pursuer.velocity * lookAheadTime);
};
