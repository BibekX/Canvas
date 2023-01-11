/**********************************************
 * Drawing Rectangle Functionality
 * ==================================
 ***********************************************/
// https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/clearRect
class DrawingRectangle extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
  }

  // get the coordinates of the user's mouse
  onMouseDown(coord, event) {
    this.contextReal.globalCompositeOperation = "source-over";
    this.contextReal.lineWidth = strokeWidth;
    this.contextDraft.lineWidth = strokeWidth;
    this.contextReal.strokeStyle = curStroke;
    this.contextDraft.strokeStyle = curStroke;
    this.contextReal.fillStyle = curFillColor; //after releasing the mouse
    // this.contextReal.strokeStyle = curStroke; curStroke doesn't work yet T_T
    this.origX = coord[0];
    this.origY = coord[1];
  }

  // the actual drawing on the canvas
  onDragging(coord, event) {
    this.contextDraft.fillStyle = curFillColor;
    // this.contextDraft.strokeStyle = curStroke; curStroke doesn't work yet T_T
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.contextDraft.strokeRect(
      this.origX,
      this.origY,
      coord[0] - this.origX,
      coord[1] - this.origY
    );
    this.contextDraft.fillRect(
      this.origX,
      this.origY,
      coord[0] - this.origX,
      coord[1] - this.origY
    );
  }

  onMouseMove() {}

  // clear the canvas and move the drawing to the real canvas
  onMouseUp(coord) {
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    this.contextReal.strokeRect(
      this.origX,
      this.origY,
      coord[0] - this.origX,
      coord[1] - this.origY
    );
    this.contextReal.fillRect(
      this.origX,
      this.origY,
      coord[0] - this.origX,
      coord[1] - this.origY
    );
    savetosaveCard();
  }
  onMouseLeave() {}
  onMouseEnter() {}
}
