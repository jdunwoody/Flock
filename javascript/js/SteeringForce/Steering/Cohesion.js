function Cohesion(vehicle, neighbours) {
  var centreOfMass;
  var steeringForce;
  var neighbourCount = 0;

  for (var i=0; i<neighbours.length; ++i) {
    if((neighbours[i] != vehicle) && neighbours[i].IsTagged()) {
      centreOfMass += neighbours[i].position;
      ++neighbourCount;
    }
  }

  if (neighbourCount > 0) {
    centreOfMass = divide(centreOfMass, neighbourCount);

    steeringForce = Seek(centreOfMass);
  }

  return steeringForce;
}
