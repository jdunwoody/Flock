Vector2D SteeringBehaviors::Interpose(const Vehicle* AgentA, const Vehicle* AgentB)
{
  //first we need to figure out where the two agents are going to be at 
  //time T in the future. This is approximated by determining the time 
  //Taken to reach the midway point at the current time at max speed. 
  Vector2D MidPoint = (AgentA->Pos() + AgentB->Pos()) / 2.0;
  double TimeToReachMidPoint = Vec2DDistance(
      m_pVehicle->Pos(), 
      MidPoint) / m_pVehicle->MaxSpeed();
  //now we have T, we assume that agent A and agent B will continue on a 
  //straight trajectory and extrapolate to get their future positions 
  Vector2D APos = AgentA->Pos() + AgentA->Velocity() * TimeToReachMidPoint; 
  Vector2D BPos = AgentB->Pos() + AgentB->Velocity() * TimeToReachMidPoint;
  //calculate the midpoint of these predicted positions 
  MidPoint = (APos + BPos) / 2.0;
  //then steer to arrive at it
  return Arrive(MidPoint, fast); 
}
