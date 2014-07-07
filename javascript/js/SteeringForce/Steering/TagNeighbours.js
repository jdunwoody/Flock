function TagNeighbours(entity, entities, radius) {

  for(int i=0; i<entities.size; i++) {
    var curEntity = entities[i];

    curEntity.untag();
    var toVector = subtract(curEntity.position, entity.position);

    //the bounding radius of the other is taken into account by adding it //to the range
    var range = addition(radius, curEntity.radius);

    //if entity within range, tag for further consideration. (working in //distance-squared space to avoid sqrts)
    if ( (curEntity != entity) && (lengthSquared(toVector) < range*range)) {
      curEntity.tag();
    }
  }
}
