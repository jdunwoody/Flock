Vector2D SteeringBehaviors::ObstacleAvoidance(const std::vector<BaseGameEntity*> &obstacles)
{
  //the detection box length is proportional to the agent's velocity
  m_dDBoxLength = Prm.MinDetectionBoxLength + (m_pVehicle->Speed()/m_pVehicle->MaxSpeed()) * Prm.MinDetectionBoxLength;
  //All the parameters used by the project are read from an initialization file called Params.ini and stored in the singleton class ParamLoader. All the data in this class is public and is easily accessible through the #definition of Prm (#define Prm (*ParamLoader::Instance())). If further clarification is needed, see the ParamLoader.h file.
  //tag all obstacles within range of the box for processing
  m_pVehicle->World()->TagObstaclesWithinViewRange(m_pVehicle, m_dDBoxLength);
  //this will keep track of the closest intersecting obstacle (CIB)
  BaseGameEntity* ClosestIntersectingObstacle = NULL;

  ￼//this will be used to track the distance to the CIB double DistToClosestIP = MaxDouble;
  //this will record the transformed local coordinates Vector2D LocalPosOfClosestObstacle;
  std::vector<BaseGameEntity*>::const_iterator curOb = obstacles.begin();

  while(curOb != obstacles.end()) {
    //of the CIB
    ￼￼￼￼￼￼￼￼￼￼//if the obstacle has been tagged within range proceed
      if ((*curOb)->IsTagged())
      {
        //calculate this obstacle's position in local space
        Vector2D LocalPos = PointToLocalSpace(
            (*curOb)->Pos(),
            m_pVehicle->Heading(),
            m_pVehicle->Side(),
            m_pVehicle->Pos());

        //if the local position has a negative x value then it must lay
        //behind the agent. (in which case it can be ignored)
        if (LocalPos.x >= 0)
        {
          //if the distance from the x axis to the object's position is less
          //than its radius + half the width of the detection box then there
          //is a potential intersection.
          double ExpandedRadius = (*curOb)->BRadius() + m_pVehicle->BRadius();
          if (fabs(LocalPos.y) < ExpandedRadius) {
            //now to do a line/circle intersection test. The center of the
            //circle is represented by (cX, cY). The intersection points are
            //given by the formula x = cX +/-sqrt(r^2-cY^2) for y=0.
            //We only need to look at the smallest positive value of x because
            //that will be the closest point of intersection.
            double cX = LocalPos.x; double cY = LocalPos.y;
            //we only need to calculate the sqrt part of the above equation once
            double SqrtPart = sqrt(ExpandedRadius*ExpandedRadius - cY*cY);
            double ip = A - SqrtPart;
            if (ip <= 0) {
              ip = A + SqrtPart;
            }
            //test to see if this is the closest so far. If it is, keep a
            //record of the obstacle and its local coordinates
            if (ip < DistToClosestIP)
            {
              DistToClosestIP = ip;
              ClosestIntersectingObstacle = *curOb;
              ￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼
                ￼LocalPosOfClosestObstacle = LocalPos;
            }
          }
        }
      }
    ++curOb;
  }
  ￼￼￼￼￼￼￼￼￼￼￼￼￼//if we have found an intersecting obstacle, calculate a steering
    //force away from it
    Vector2D SteeringForce;
  if (ClosestIntersectingObstacle) {
    //the closer the agent is to an object, the stronger the steering force￼
    ￼//should be
      double multiplier = 1.0 + (m_dDBoxLength - LocalPosOfClosestObstacle.x) / m_dDBoxLength;
    //calculate the lateral force
    SteeringForce.y = (ClosestIntersectingObstacle->BRadius()- LocalPosOfClosestObstacle.y) * multiplier;
    //apply a braking force proportional to the obstacle’s distance from //the vehicle.
    const double BrakingWeight = 0.2;
    SteeringForce.x = (ClosestIntersectingObstacle->BRadius() - LocalPosOfClosestObstacle.x) * BrakingWeight;
  }
  //finally, convert the steering vector from local to world space return VectorToWorldSpace(SteeringForce,
  m_pVehicle->Heading(), m_pVehicle->Side());
}
