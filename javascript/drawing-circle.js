class DrawingCircle extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    this.contextReal.globalCompositeOperation = "source-over";
  }

  onMouseDown(coord, e) {
    this.contextReal.fillStyle = curFillColor;
    this.origX = coord[0];
    this.origY = coord[1];
  }

  onDragging(coord, e) {
    // for fill
    this.contextDraft.fillStyle = curFillColor;
    // for outline
    this.contextDraft.strokeStyle = curStroke;
    this.contextDraft.lineWidth = strokeWidth;
    // determining size of circle
    var radius = 0;
    var deltaX = this.origX - coord[0];
    var deltaY = this.origY - coord[1];
    radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    // for fill
    this.contextDraft.clearRect(
      0,
      0,
      canvasDraft.clientWidth,
      canvasDraft.height
    );
    this.contextDraft.beginPath();
    this.contextDraft.arc(this.origX, this.origY, radius, 0, Math.PI * 2);
    this.contextDraft.fill();
    // for outline
    this.contextDraft.stroke();
  }

  onMouseMove() {}

  onMouseUp(coord) {
    var radius = 0;
    var deltaX = this.origX - coord[0];
    var deltaY = this.origY - coord[1];
    radius = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
    // for fill
    this.contextDraft.clearRect(
      0,
      0,
      canvasDraft.clientWidth,
      canvasDraft.height
    );
    this.contextReal.beginPath();
    this.contextReal.arc(this.origX, this.origY, radius, 0, Math.PI * 2);
    this.contextReal.fill();
    // for outline
    this.contextReal.strokeStyle = curStroke;
    this.contextReal.lineWidth = strokeWidth;
    this.contextReal.stroke();
    savetosaveCard();
  }

  onMouseLeave() {}
  onMouseEnter() {}
}
