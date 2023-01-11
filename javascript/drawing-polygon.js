class DrawingPolygon extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    this.variable = false;
  }

  onMouseDown(coord, event) {
    if (this.variable === false) {
      this.contextReal.fillStyle = curFillColor;
      this.origX = coord[0];
      this.origY = coord[1];
    }
  }
  onDragging(coord, e) {
    if (this.variable === false) {
      this.sides = 10;
      this.radius = 0;
      this.deltaX = this.origX - coord[0];
      this.deltaY = this.origY - coord[1];
      this.radius = Math.sqrt(
        this.deltaX * this.deltaX + this.deltaY * this.deltaY
      );
      this.startAngle = 0;
      this.angle = (2 * Math.PI) / this.sides;

      // for outline
      this.contextDraft.beginPath();
      this.contextDraft.strokeStyle = curStroke;
      this.contextDraft.lineWidth = strokeWidth;
      this.contextDraft.lineJoin = "round";
      // for fill
      this.contextDraft.fillStyle = curFillColor;

      this.beginX = this.origX + this.radius * Math.cos(this.startAngle);
      this.beginY = this.origY - this.radius * Math.sin(this.startAngle);
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.moveTo(this.beginX, this.beginY);

      for (let i = 1; i <= this.sides; i++) {
        //current points
        var currentAngle = this.startAngle + i * this.angle;
        var currentPointX = this.origX + this.radius * Math.cos(currentAngle);
        var currentPointY = this.origY - this.radius * Math.sin(currentAngle);
        //draw the line
        this.contextDraft.lineTo(currentPointX, currentPointY);
      }

      // for outline
      this.contextDraft.closePath();
      this.contextDraft.stroke();
      // for fill
      this.contextDraft.fill();
    }
  }
  onMouseMove(coord) {
    if (this.variable) {
      this.sides = 8;
      this.radius = 0;
      // this.deltaX = this.origX - coord[0];
      // this.deltaY = this.origY - coord[1];
      this.radius = Math.sqrt(
        this.deltaX * this.deltaX + this.deltaY * this.deltaY
      );
      this.startAngle = coord[1] * 0.007;
      this.angle = (2 * Math.PI) / this.sides;

      // for outline
      this.contextDraft.beginPath();
      this.contextDraft.strokeStyle = curStroke;
      this.contextDraft.lineWidth = strokeWidth;
      this.contextDraft.lineJoin = "round";

      // for fill
      this.contextDraft.fillStyle = curFillColor;

      this.beginX = this.origX + this.radius * Math.cos(this.startAngle);
      this.beginY = this.origY - this.radius * Math.sin(this.startAngle);
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.moveTo(this.beginX, this.beginY);

      for (let i = 1; i <= this.sides; i++) {
        //current points
        var currentAngle = this.startAngle + i * this.angle;
        var currentPointX = this.origX + this.radius * Math.cos(currentAngle);
        var currentPointY = this.origY - this.radius * Math.sin(currentAngle);
        //draw the line
        this.contextDraft.lineTo(currentPointX, currentPointY);
      }

      // for outline
      this.contextDraft.closePath();
      this.contextDraft.stroke();
      // for fill
      this.contextDraft.fill();
    }
  }

  onMouseUp(coord) {
    if (this.variable === false) {
      // for outline
      this.contextDraft.beginPath();
      this.contextDraft.strokeStyle = curStroke;
      this.contextDraft.lineWidth = strokeWidth;
      this.contextDraft.lineJoin = "round";
      // for fill
      this.contextDraft.fillStyle = curFillColor;

      // transparent so that curve won't join, circle and triangle won't have outline and fill
      this.contextReal.strokeStyle = "transparent";
      this.contextReal.fillStyle = "transparent";

      this.beginX = this.origX + this.radius * Math.cos(this.startAngle);
      this.beginY = this.origY - this.radius * Math.sin(this.startAngle);
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.moveTo(this.beginX, this.beginY);

      for (let i = 1; i <= this.sides; i++) {
        //current points
        var currentAngle = this.startAngle + i * this.angle;
        var currentPointX = this.origX + this.radius * Math.cos(currentAngle);
        var currentPointY = this.origY - this.radius * Math.sin(currentAngle);
        //draw the line

        this.contextDraft.strokeStyle = curStroke;
        this.contextDraft.lineTo(currentPointX, currentPointY);
      }

      // for outline
      this.contextDraft.closePath();
      this.contextDraft.stroke();
      // for fill
      this.contextDraft.fill();

      this.variable = true;
    } else if (this.variable) {
      // for outline
      this.contextReal.beginPath();
      this.contextReal.strokeStyle = curStroke;
      this.contextReal.lineWidth = strokeWidth;
      this.contextReal.lineJoin = "round";
      // for fill
      this.contextReal.fillStyle = curFillColor;

      this.beginX = this.origX + this.radius * Math.cos(this.startAngle);
      this.beginY = this.origY - this.radius * Math.sin(this.startAngle);
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.moveTo(this.beginX, this.beginY);

      for (let i = 1; i <= this.sides; i++) {
        //current points
        var currentAngle = this.startAngle + i * this.angle;
        var currentPointX = this.origX + this.radius * Math.cos(currentAngle);
        var currentPointY = this.origY - this.radius * Math.sin(currentAngle);
        //draw the line

        this.contextReal.strokeStyle = curStroke;
        this.contextReal.lineTo(currentPointX, currentPointY);
      }
      this.contextReal.globalCompositeOperation = "source-over";
      this.contextReal.closePath();
      this.contextReal.stroke();
      this.contextReal.fillStyle = curFillColor;
      this.contextReal.fill();
      savetosaveCard();
      this.variable = false;
    }
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
