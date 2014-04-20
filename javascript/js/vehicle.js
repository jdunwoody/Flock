function updateVehicle(vehicle, timeElapsed) {
  //update the time elapsed
  //m_dTimeElapsed = time_elapsed;

  //keep a record of its old position so we can update its cell later in this method
  var oldPos = vec2.fromValues(vehicle.x, vehicle.y);
  //Vector2D OldPos = Pos();

  //Vector2D SteeringForce;

  ////calculate the combined force from each steering behavior in the
  ////vehicle's list
  //SteeringForce = m_pSteering->Calculate();
  var steeringForce = steering.calculate();

  ////Acceleration = Force/Mass
  //Vector2D acceleration = SteeringForce / m_dMass;
  var acceleration = steeringForce / vehicle.mass;

  ////update velocity
  //m_vVelocity += acceleration * time_elapsed;
  vehicle.velocity += acceleration * timeElapsed;

  ////make sure vehicle does not exceed maximum velocity
  //m_vVelocity.Truncate(m_dMaxSpeed);
  vehicle.velocity.truncate(maxSpeed);

  ////update the position
  //m_vPos += m_vVelocity * time_elapsed;
  position += vehicle.velocity * timeElapsed;

  ////update the heading if the vehicle has a non zero velocity
  if (vehicle.velocity.lengthSquared() > 0.00000001)
  {
    vehicle.heading = vec.normalize(vec2.create(), vehicle.velocity());
    vehicle.side = vehicle.heading.perpendicular();
  }

  ////EnforceNonPenetrationConstraint(this, World()->Agents());

  ////treat the screen as a toroid
  //WrapAround(m_vPos, m_pWorld->cxClient(), m_pWorld->cyClient());

  ////update the vehicle's current cell if space partitioning is turned on
  //if (Steering()->isSpacePartitioningOn())
  //{
  //World()->CellSpace()->UpdateEntity(this, OldPos);
  vehicle.position = position;
  //}

  //if (isSmoothingOn())
  //{
  //m_vSmoothedHeading = m_pHeadingSmoother->Update(Heading());
  vehicle.heading.smooth();
  //}
};
