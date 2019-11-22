class Snake {

  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  display() {
    if (!this.isAlive) return; // snake is dead so do not display

    // iterate through each point on the body excluding the tips
    for (var index = this.trail.length-2; index > 0; index--) {
      let point = this.trail[index];                    // get current point
      let prevPoint = this.trail[index-1] || undefined; // get point before (closer to head)
      let nextPoint = this.trail[index+1] || undefined; // get point after (closer to tail)

      // calculate grid position for plotting current point
      let X = getPlotX(point[0])+currentOffset.x;
      let Y = getPlotY(point[1])+currentOffset.y;

      // determine the shape and angle that the current point should be
      let cellCurve = getBodyCurve(prevPoint, point, nextPoint);

      // get the image of the shape
      let skin = skins[3*(this.skinIndex-1) + cellCurve.shape];

      // draw the image at the appropriate angle
      skin.display(X*TILE_SIZE, Y*TILE_SIZE, cellCurve.angle); // draws cell
    }

    // draw head and tail of snake
    this.displayHead();
    this.displayTail();
  }

  displayHead() {
    if (!this.isAlive) return; // snake is dead so do not display

    /* Display the head of the snake */
    let skin = skins[3*(this.skinIndex-1) + 2];           // get the image of the head
    let headBearing = this.getDirectionNumber();          // determine the bearing the snake is facing
    let X = getPlotX(this.x);                             // calculate horizontal grid position of head
    let Y = getPlotY(this.y);                             // calculate vertical grid position of head
    skin.display(X*TILE_SIZE, Y*TILE_SIZE, 90*headAngle); // draw head
  }

  displayTail() {
    if (!this.isAlive) return; // snake is dead so do not display

    /* Display the tip of the snake's tail */
    let index = this.trail.length - 1;
    let point = this.trail[index];
    drawRect(getPlotX(point[0])+currentOffset.x, getPlotY(point[1])+currentOffset.y, 1, 1, this.colors[1]);
    ctx.stroke();
  }

  getDirectionNumber() {
    /* Returns direction index of direction that player is moving */
    if (this.direction.x == 0) {
      if (this.direction.y == -1) return 0; // player heading up
      else return 2;                        // player heading down
    }
    else {
      if (this.direction.x == -1) return 3; // player heading left
      else return 1;                        // player heading right
    }
  }

}
