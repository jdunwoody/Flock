SVector2D SteeringBehaviors::FollowPath()
{
  //move to next target if close enough to current target (working in
  //distance squared space)
  if(Vec2DDistanceSq(m_pPath->CurrentWaypoint(), m_pVehicle->Pos()) < m_WaypointSeekDistSq)
  {
    m_pPath->SetNextWaypoint();
  }
  if (!m_pPath->Finished()) {
    return Seek(m_pPath->CurrentWaypoint());
  } else {
    return Arrive(m_pPath->CurrentWaypoint(), normal);
  }
}
