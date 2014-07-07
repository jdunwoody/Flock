Vector2D SteeringBehaviors::OffsetPursuit(const Vehicle* leader,￼const SVector2D offset)
  //The Steering Behaviors
  ￼{
    ￼￼//calculate the offset’s position in world space
      SVector2D WorldOffsetPos = PointToWorldSpace(
          offset,
          leader->Heading(),
          leader->Side(),
          leader->Pos());

    SVector2D ToOffset = WorldOffsetPos - m_pVehicle->Pos();
    //the look-ahead time is proportional to the distance between the leader
    //and the pursuer; and is inversely proportional to the sum of both
    //agents’ velocities

    double LookAheadTime = ToOffset.Length() / (m_pVehicle->MaxSpeed() + leader->Speed());
    //now arrive at the predicted future position of the offset
    ￼￼￼￼￼￼￼￼￼￼￼￼￼￼￼return Arrive(WorldOffsetPos + leader->Velocity() * LookAheadTime, fast);
  }
