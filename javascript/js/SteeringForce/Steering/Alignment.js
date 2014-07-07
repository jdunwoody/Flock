function Alignment(vehicle, neighbors) {
  var averageHeading;

  int neighbourCount = 0;

  for (int i=0; i<neighbors.size(); ++i) {
    if((neighbors[i] != vehicle) && neighbors[i].IsTagged()) {
      averageHeading += neighbors[i].heading();
      ++neighbourCount;
    }
  }

  if (neighbourCount > 0) {
    averageHeading = divide(averageHeading, neighbourCount);
    averageHeading = subtract(averageHeading, vehicle.heading);
  }

  return averageHeading;
}
