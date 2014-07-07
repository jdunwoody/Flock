
function Separation(vehicle, neighbours) {
  var steeringForce;
  for (int i=0; i<neighbours.size(); ++i) {
    //make sure this agent isn't included in the calculations and that //the agent being examined is close enough.
    if((neighbours[i] != vehicle) && neighbours[i].isTagged()) {
      var toAgent = vehicle.position - neighbours[i].position();
      //scale the force inversely proportional to the agent's distance //from its neighbor.
      steeringForce = add(steeringForce, divide(normalize(toAgent), length(toAgent)));
    }
  }

  return steeringForce;
}
