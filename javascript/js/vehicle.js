function buildBunny(width, height) {
  var texture = new PIXI.Texture.fromImage("img/bunny.png");
  var bunny = new PIXI.Sprite(texture);

  bunny.anchor.x = 0.5;
  bunny.anchor.y = 0.5;

  bunny.position.x = width/2;
  bunny.position.y = height/2;

  return bunny;
};

function moveBunny(bunny) {
  bunny.rotation += 0.01;
};


function Heading() {
  this.value = vec2.create();
};

function Steering() {
  this.value = vec2.create();

  this.calculate = function() {
    return vec2.create();
  };
};

function buildMovableObject() {
  var moveableObject = new PIXI.Graphics();
  var x = 350;
  var y = 150;

  moveableObject.setupPhysics = function() {
    this.position.x = 100;// = vec2.create(100,100);
    this.position.y = 100;
    this.mass = 100;
    this.heading = new Heading();
    this.steering = new Steering();
  };

  //moveableObject.setupPhysics();

  moveableObject.setupAppearance = function() {
    var backgroundColor = 0xFFAA33;
    var borderColor = 0xBB77AA;

    this.beginFill(backgroundColor);
    //this.x = x;
    //this.y = y;
    this.lineStyle(1, borderColor, 1);
    this.moveTo(x, y);
    this.pivot.x = x;
    this.pivot.y = y;

    this.lineTo(x - 10, y - 10);
    this.lineTo(x + 10, y - 10);
    this.lineTo(x, y);

    this.endFill();
  };
  //moveableObject.setupAppearance();

  moveableObject.hitArea = new PIXI.Rectangle(-150, -150, 300, 300);

  moveableObject.setupPhysics();
  moveableObject.setupAppearance();

  moveableObject.setInteractive(true);

  moveableObject.targetPosition = [];
  moveableObject.targetPosition.x = x;
  moveableObject.targetPosition.y = y;

  moveableObject.mousemove = function(mouseData) {
    debugger;
    // this line will get the mouse coords relative to the sprites..
    //var localCoordsPosition = mouseData.getLocalPosition(moveableObject);
    // this line will get the mouse coords relative to the sprites parent..
    var parentCoordsPosition = mouseData.getLocalPosition(this.parent);

    this.targetPosition.x = parentCoordsPosition.x;
    this.targetPosition.y = parentCoordsPosition.y;

    //this.position.x = parentCoordsPosition.x;
    //this.position.y = parentCoordsPosition.y;
  };

  moveableObject.acceleration = function() {
    debugger;
    this.steering.value / this.mass;
  };

  moveableObject.rotate = function(horiz, vert) {
    debugger;
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
  };

  moveableObject.updatePosition = function(timeElapsed) {
    debugger;
    var currentX = this.position.x;
    var currentY = this.position.y;

    var targetX = this.targetPosition.x;
    var targetY = this.targetPosition.y;

    var horiz = targetX - currentX;
    var vert = targetY - currentY;

    //vec2.set(this.steering.value, horiz, vert);
    //this.rotate(horiz, vert);

    //this.velocity += this.acceleration() * timeElapsed;
    //position += this.velocity() * timeElapsed;
    this.position.x = this.targetPosition.x;
    this.position.y = this.targetPosition.y;
  };

  return moveableObject;
};



//function updateVehicle2(moveableObject, timeElapsed) {

////update the time elapsed
////m_dTimeElapsed = time_elapsed;

////keep a record of its old position so we can update its cell later in this method
////var oldPos = vec2.fromValues(vehicle.x, vehicle.y);
////Vector2D OldPos = Pos();

////Vector2D SteeringForce;

//////calculate the combined force from each steering behavior in the
//////vehicle's list
////SteeringForce = m_pSteering->Calculate();
////var steeringForce = steering.calculate();

//////Acceleration = Force/Mass
////Vector2D acceleration = SteeringForce / m_dMass;
////var acceleration = steeringForce / vehicle.mass;

//////update velocity
////m_vVelocity += acceleration * time_elapsed;
//vehicle.velocity += acceleration * timeElapsed;

//////make sure vehicle does not exceed maximum velocity
////m_vVelocity.Truncate(m_dMaxSpeed);
//vehicle.velocity.truncate(maxSpeed);

//////update the position
////m_vPos += m_vVelocity * time_elapsed;
//position += vehicle.velocity * timeElapsed;

//////update the heading if the vehicle has a non zero velocity
//if (vehicle.velocity.lengthSquared() > 0.00000001)
//{
//vehicle.heading = vec.normalize(vec2.create(), vehicle.velocity());
//vehicle.side = vehicle.heading.perpendicular();
//}

//////EnforceNonPenetrationConstraint(this, World()->Agents());

//////treat the screen as a toroid
////WrapAround(m_vPos, m_pWorld->cxClient(), m_pWorld->cyClient());

//////update the vehicle's current cell if space partitioning is turned on
////if (Steering()->isSpacePartitioningOn())
////{
////World()->CellSpace()->UpdateEntity(this, OldPos);
//vehicle.position = position;
////}

////if (isSmoothingOn())
////{
////m_vSmoothedHeading = m_pHeadingSmoother->Update(Heading());
//vehicle.heading.smooth();
////}
//};
//};
