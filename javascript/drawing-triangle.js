/**********************************************
 * Drawing Rectangle Functionality
 * ==================================
 ***********************************************/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
class DrawingTriangle extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    // this.color = "red"
  }

  // get the coordinates of the user's mouse
  onMouseDown(coord, event) {
    this.contextReal.globalCompositeOperation = "source-over";
    this.contextReal.fillStyle = curFillColor; //after releasing the mouse
    this.origX = coord[0];
    this.origY = coord[1];
  }

  // the actual drawing on the canvas
  onDragging(coord, event) {
    // for fill
    this.contextDraft.fillStyle = curFillColor;
    // for outline
    this.contextDraft.strokeStyle = curStroke;
    this.contextDraft.lineWidth = strokeWidth;
    // for fill
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.contextDraft.beginPath();
    this.contextDraft.moveTo(this.origX, this.origY);
    this.contextDraft.lineTo(coord[0], coord[1]);
    this.contextDraft.lineTo(this.origX + (this.origX - coord[0]), coord[1]);
    this.contextDraft.fill();
    // for outline
    this.contextDraft.closePath();
    this.contextDraft.stroke();
  }

  onMouseMove() {}

  // clear the canvas and move the drawing to the real canvas
  onMouseUp(coord) {
    // for fill
    this.contextReal.fillStyle = curFillColor;
    this.contextReal.shadowBlur = 0;
    this.contextReal.shadowColor = curFillColor;
    // for outline
    this.contextReal.strokeStyle = curStroke;
    this.contextReal.lineWidth = strokeWidth;
    // for fill
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.contextReal.beginPath();
    this.contextReal.moveTo(this.origX, this.origY);
    this.contextReal.lineTo(coord[0], coord[1]);
    this.contextReal.lineTo(this.origX + (this.origX - coord[0]), coord[1]);
    this.contextReal.fill();
    // for outline
    this.contextReal.closePath();
    this.contextReal.stroke();
    savetosaveCard();
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
