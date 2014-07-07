Vector2D SteeringBehaviors::WallAvoidance(const std::vector<Wall2D>& walls)
{
  //the feelers are contained in a std::vector, m_Feelers
  CreateFeelers();
  double DistToThisIP = 0.0;
  double DistToClosestIP = MaxDouble;
  //this will hold an index into the vector of walls
  int ClosestWall = -1;
  Vector2D SteeringForce, point, ClosestPoint;
  //used for storing temporary info
  ////holds the closest intersection point
  //examine each feeler in turn
  for (int flr=0; flr<m_Feelers.size(); ++flr) {
    //run through each wall checking for any intersection points
    for (int w=0; w<walls.size(); ++w)
    {
      if (LineIntersection2D(
            m_pVehicle->Pos(),
            m_Feelers[flr],
            walls[w].From(),
            walls[w].To(),
            DistToThisIP,
            point))
      {
        //is this the closest found so far? If so keep a record
        if (DistToThisIP < DistToClosestIP)
        {
          DistToClosestIP = DistToThisIP;
          ClosestWall = w;
          ClosestPoint = point;
        }
      }
    }//next wall
    //if an intersection point has been detected, calculate a force
    //that will direct the agent away
    if (ClosestWall >=0)
    {
      //calculate by what distance the projected position of the agent
      //will overshoot the wall
      Vector2D OverShoot = m_Feelers[flr] - ClosestPoint;
      ￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼//create a force in the direction of the wall normal, with a￼
        //magnitude of the overshoot
        SteeringForce = walls[ClosestWall].Normal() * OverShoot.Length(); }
  }//next feeler
  return SteeringForce; }
