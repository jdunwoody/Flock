function Heading() {
  this.value = vec2.create();
};

function Steering() {
  this.value = vec2.create();

  this.calculate = function() {
    return vec2.create();
  };
};

function TriangleShape(x, y) {
  var triangle = new PIXI.Graphics();
  var backgroundColor = 0xFFAA33;
  var borderColor = 0xBB77AA;

  triangle.beginFill(backgroundColor);
  triangle.x = x;
  triangle.y = y;
  triangle.lineStyle(1, borderColor, 1);
  triangle.moveTo(x, y);
  triangle.pivot.x = x;
  triangle.pivot.y = y;

  triangle.lineTo(x + 10, y + 10);
  triangle.lineTo(x - 10, y + 10);
  triangle.lineTo(x, y);

  triangle.endFill();

  triangle.hitArea = new PIXI.Rectangle(-150, -150, 300, 300);

  triangle.setInteractive(true);

  triangle.targetPosition = [];
  triangle.targetPosition.x = x;
  triangle.targetPosition.y = y;

  triangle.mousemove = function(mouseData){
    // this line will get the mouse coords relative to the sprites..
    //var localCoordsPosition = mouseData.getLocalPosition(triangle);

    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(triangle.parent);

    this.targetPosition.x = parentCoordsPosition.x;
    this.targetPosition.y = parentCoordsPosition.y;

    //this.position.x = parentCoordsPosition.x;
    //this.position.y = parentCoordsPosition.y;
  }

  return triangle;
};

function MoveableObject() {
  this.position = vec2.create(0, 0);
  this.mass = 100;
  //this.velocity = new Velocity();
  this.heading = new Heading();
  this.steering = new Steering();
  this.shape = new TriangleShape(50, 50);

  this.acceleration = function() {
    this.steering.value / this.mass;
  };

  this.updatePosition = function() {
    this.shape.position.x = this.shape.targetPosition.x;
    this.shape.position.y = this.shape.targetPosition.y;

    //this.position.x = this.targetPosition.x;
    //this.position.y = this.targetPosition.y;
  };
};

function updateVehicle(movableObject, timeElapsed) {
  //vehicle.position =
};

function updateVehicle2(movableObject, timeElapsed) {

  //update the time elapsed
  //m_dTimeElapsed = time_elapsed;

  //keep a record of its old position so we can update its cell later in this method
  //var oldPos = vec2.fromValues(vehicle.x, vehicle.y);
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
