function Cohesion(vehicle, neighbours) {
  var centreOfMass;
  var steeringForce;
  int neighbourCount = 0;

  for (int i=0; i<neighbours.size(); ++i) {
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
