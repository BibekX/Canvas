class DrawingBezierCurve extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    this.variable = 0;
    this.contextReal.globalCompositeOperation = "source-over";
  }

  onMouseDown(coord, event) {
    // 1. first click to get start point
    if (this.variable === 0) {
      this.origX = coord[0];
      this.origY = coord[1];
    }
  }

  onDragging(coord, event) {
    // 2. after first click, drag to end point of real curve
    if (this.variable === 0) {
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.beginPath();
      this.contextDraft.moveTo(this.origX, this.origY);
      this.contextDraft.lineTo(coord[0], coord[1]);
      this.contextDraft.stroke();
    } else if (this.variable === 1) {
      // 5. second drag to 1st controlpoint of real curve
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.beginPath();
      this.contextDraft.moveTo(this.origX, this.origY);
      this.contextDraft.quadraticCurveTo(
        coord[0],
        coord[1],
        this.endX,
        this.endY
      );
      this.contextDraft.stroke();
      // circle for use to drag to control point
      this.contextDraft.fillStyle = "red";
      this.contextDraft.beginPath();
      this.contextDraft.arc(coord[0], coord[1], 8, 0, 2 * Math.PI);
      this.contextDraft.fill();
    } else if (this.variable === 2) {
      // 7. third drag to 2nd control point of real curve
      this.secondX = coord[0];
      this.secondY = coord[1];
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.beginPath();
      this.contextDraft.moveTo(this.origX, this.origY);
      this.contextDraft.bezierCurveTo(
        this.firstX,
        this.firstY,
        this.secondX,
        this.secondY,
        this.endX,
        this.endY
      );
      this.contextDraft.stroke();

      // circle on 1st control point
      this.contextDraft.fillStyle = "red";
      this.contextDraft.beginPath();
      this.contextDraft.arc(this.firstX, this.firstY, 8, 0, 2 * Math.PI);
      this.contextDraft.fill();
      this.variable = 2;

      // circle for use to drag to control point
      this.contextDraft.fillStyle = "red";
      this.contextDraft.beginPath();
      this.contextDraft.arc(this.secondX, this.secondY, 8, 0, 2 * Math.PI);
      this.contextDraft.fill();
    }
  }

  onMouseMove(coord, event) {}
  onMouseUp(coord, event) {
    if (this.variable === 0) {
      // 3. after first dragging, mouseup to get the end point of real curve
      this.endX = coord[0];
      this.endY = coord[1];
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.beginPath();
      this.contextDraft.moveTo(this.origX, this.origY);
      this.contextDraft.lineTo(this.endX, this.endY);
      this.contextDraft.stroke();
      // circle for user to drag to 1st control point
      this.contextDraft.fillStyle = "red";
      this.contextDraft.beginPath();
      this.contextDraft.arc(coord[0], coord[1], 8, 0, 2 * Math.PI);
      this.contextDraft.fill();
      // 4. initiate second dragging to find the 1st control point
      this.variable = 1;
    } else if (this.variable === 1) {
      // 6. draw the draft quadratic curve
      this.firstX = coord[0];
      this.firstY = coord[1];
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.strokeStyle = curStroke;
      this.contextDraft.lineWidth = strokeWidth;
      this.contextDraft.beginPath();
      this.contextDraft.moveTo(this.origX, this.origY);
      this.contextDraft.quadraticCurveTo(
        this.firstX,
        this.firstY,
        this.endX,
        this.endY
      );
      this.contextDraft.stroke();
      // circle for use to drag to 2nd control point
      this.contextDraft.fillStyle = "red";
      this.contextDraft.beginPath();
      this.contextDraft.arc(this.endX, this.endY, 8, 0, 2 * Math.PI);
      this.contextDraft.fill();
      // circle on 1st control point
      this.contextDraft.fillStyle = "red";
      this.contextDraft.beginPath();
      this.contextDraft.arc(this.firstX, this.firstY, 8, 0, 2 * Math.PI);
      this.contextDraft.fill();
      this.variable = 2;
    } else if ((this.variable = 2)) {
      // 8. draw the real curve
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextReal.strokeStyle = curStroke;
      this.contextReal.lineWidth = strokeWidth;
      this.contextReal.beginPath();
      this.contextReal.moveTo(this.origX, this.origY);
      this.contextReal.bezierCurveTo(
        this.firstX,
        this.firstY,
        this.secondX,
        this.secondY,
        this.endX,
        this.endY
      );
      this.contextReal.stroke();
      this.variable = 0;
    }
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
