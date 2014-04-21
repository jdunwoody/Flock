function Heading() {
  this.value = vec2.create();
};

function Steering() {
  this.value = vec2.create();

  this.calculate = function() {
    return vec2.create();
  };
};

var x = 350;
var y = 150;
var moveableObject = new PIXI.Graphics();

moveableObject.position = vec2.create(0, 0);
moveableObject.mass = 100;
moveableObject.heading = new Heading();
moveableObject.steering = new Steering();

var backgroundColor = 0xFFAA33;
var borderColor = 0xBB77AA;

moveableObject.beginFill(backgroundColor);
moveableObject.x = x;
moveableObject.y = y;
moveableObject.lineStyle(1, borderColor, 1);
moveableObject.moveTo(x, y);
moveableObject.pivot.x = x;
moveableObject.pivot.y = y;

moveableObject.lineTo(x - 10, y - 10);
moveableObject.lineTo(x + 10, y - 10);
moveableObject.lineTo(x, y);

moveableObject.endFill();

moveableObject.hitArea = new PIXI.Rectangle(-150, -150, 300, 300);

moveableObject.setInteractive(true);

moveableObject.targetPosition = [];
moveableObject.targetPosition.x = x;
moveableObject.targetPosition.y = y;

moveableObject.mousemove = function(mouseData){
  // this line will get the mouse coords relative to the sprites..
  //var localCoordsPosition = mouseData.getLocalPosition(moveableObject);

  // this line will get the mouse coords relative to the sprites parent..
  var parentCoordsPosition = mouseData.getLocalPosition(moveableObject.parent);

  moveableObject.targetPosition.x = parentCoordsPosition.x;
  moveableObject.targetPosition.y = parentCoordsPosition.y;

  //this.position.x = parentCoordsPosition.x;
  //this.position.y = parentCoordsPosition.y;
};

moveableObject.acceleration = function() {
  moveableObject.steering.value / moveableObject.mass;
};

moveableObject.updatePosition = function() {
  currentX = this.position.x;
  currentY = this.position.y;

  targetX = this.targetPosition.x;
  targetY = this.targetPosition.y;

  horiz = targetX - currentX;
  vert = targetY - currentY;

  if (horiz >= 0) {
    if (vert >= 0) {
      this.rotation = Math.atan( - horiz / vert );
    } else{
      this.rotation = Math.PI + Math.atan( -horiz / vert );
    }
  } else {
    if (vert >= 0) {
      this.rotation = Math.atan( -horiz / vert );
    } else{
      this.rotation = Math.PI / 2 + Math.atan( vert / horiz );
    }
  }

  //this.rotation = 0;//Math.PI / 2;

  //this.position.x = this.targetPosition.x;
  //this.position.y = this.targetPosition.y;
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
