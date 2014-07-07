SVector2D SteeringBehaviors::GetHidingPosition(const SVector2D& posOb, const double radiusOb, const SVector2D& posTarget) {
  //calculate how far away the agent is to be from the chosen obstacle’s
  //bounding radius
  const double DistanceFromBoundary = 30.0;
  double DistAway = radiusOb + DistanceFromBoundary;
  //calculate the heading toward the object from the target
  SVector2D ToOb = Vec2DNormalize(posOb - posTarget);
  //scale it to size and add to the obstacle's position to get the hiding spot.
  return (ToOb * DistAway) + posOb;
}

SVector2D SteeringBehaviors::Hide(const Vehicle* target, vector<BaseGameEntity*>& obstacles)
{
  double DistToClosest = MaxDouble SVector2D BestHidingSpot;
  std::vector<BaseGameEntity*>::iterator curOb = obstacles.begin();

  while(curOb != obstacles.end())
  {
    //calculate the position of the hiding spot for this obstacle
    SVector2D HidingSpot = GetHidingPosition(
        (*curOb)->Pos(),
        (*curOb)->BRadius(),
        target->Pos());

    //work in distance-squared space to find the closest hiding
    //spot to the agent
    double dist = Vec2DDistanceSq(HidingSpot, m_pVehicle->Pos());
    if (dist < DistToClosest) {
      DistToClosest = dist;
      BestHidingSpot = HidingSpot; }
    ++curOb; }
  //if no suitable obstacles found then evade the target
  if (DistToClosest == MaxDouble)
  {
    return Evade(target);
  }
  //else use Arrive on the hiding spot
  return Arrive(BestHidingSpot, fast);
}
