let selectorDashLength = 6;
let selectorLineWidth = 1;
let minSizeNecessary = 3;

class Selection extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
    this.objX;
    this.objY;
    // this.objDraft = null;
    // this.obj = null;
    this.selectionMade = false;
    this.originalMove = false;
  }

  onMouseDown(coord, event) {
    this.contextDraft.fillStyle = curFillColor;
    if (this.selectionMade == false) {
      // this.contextReal.setLineDash([selectorDashLength]);
      // this.contextDraft.setLineDash([selectorDashLength]);
      this.contextReal.lineWidth = this.contextDraft.lineWidth =
        selectorLineWidth;
      this.origX = coord[0];
      this.origY = coord[1];
    } else {
      this.adjustPoints();

      if (
        coord[0] > this.origX &&
        coord[0] < this.objX &&
        coord[1] > this.origY &&
        coord[1] < this.objY
      ) {
        if (this.originalMove == true) {
          // this.contextReal.fillStyle = "#fff";
          this.contextReal.clearRect(
            this.origX,
            this.origY,
            this.obj.width,
            this.obj.height
          );
          this.originalMove = false;
        }
        this.putImage(
          [this.objDraft, this.origX, this.origY],
          [this.obj, this.origX, this.origY]
        );
      } else {
        this.contextDraft.clearRect(
          0,
          0,
          canvasDraft.width,
          canvasDraft.height
        );
        this.contextReal.putImageData(this.obj, this.origX, this.origY);
        this.origX = coord[0];
        this.origY = coord[1];
        this.selectionMade = false;
        this.objDraft = null;
        this.obj = null;
        this.originalMove = false;
      }
    }
  }

  onDragging(coord, event) {
    if (this.selectionMade == false) {
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.contextDraft.beginPath();
      this.contextDraft.rect(
        this.origX,
        this.origY,
        coord[0] - this.origX,
        coord[1] - this.origY
      );
      this.contextDraft.stroke();
    } else {
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.putImage(
        [
          this.objDraft,
          coord[0] - this.objDraft.width / 2,
          coord[1] - this.objDraft.height / 2,
        ],
        [
          this.obj,
          coord[0] - this.obj.width / 2,
          coord[1] - this.obj.height / 2,
        ]
      );
    }
  }

  onMouseUp(coord) {
    if (this.selectionMade == false) {
      this.objX = coord[0];
      this.objY = coord[1];
      if (this.checkSize() == true) {
        this.getDraftImage(coord);
        this.obj = this.contextReal.getImageData(
          this.origX,
          this.origY,
          coord[0] - this.origX,
          coord[1] - this.origY
        );
        this.selectionMade = true;
        this.originalMove = true;
        // this.contextReal.fillStyle = '#ebe0df';
        // this.contextReal.fillRect(this.origX,this.origY, this.objX, this.objY);
      } else this.selectionMade = false;
    } else {
      this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
      this.putImage(
        [
          this.objDraft,
          coord[0] - this.objDraft.width / 2,
          coord[1] - this.objDraft.height / 2,
        ],
        [
          this.obj,
          coord[0] - this.obj.width / 2,
          coord[1] - this.obj.height / 2,
        ]
      );
      this.origX = coord[0] - this.obj.width / 2;
      this.origY = coord[1] - this.obj.height / 2;
      this.objX = coord[0] + this.obj.width / 2;
      this.objY = coord[1] + this.obj.height / 2;
      savetosaveCard();
    }
  }

  onMouseMove(coord, event) {
    if (this.selectionMade == true) {
      {
        event.target.style.cursor = "move";
      }
    } else {
      event.target.style.cursor = "default";
    }
  }
  putImage(obj1, obj2) {
    this.contextDraft.putImageData(obj1[0], obj1[1], obj1[2]);
    this.contextDraft.putImageData(obj2[0], obj2[1], obj2[2]);
  }

  onMouseLeave() {
    this.contextDraft.clearRect(0, 0, canvasDraft.width, canvasDraft.height);
    // this.contextReal.putImageData(this.obj, this.origX, this.origY);
    this.selectionMade = false;
    this.objDraft = null;
    this.obj = null;
    this.origX = null;
    this.origY = null;
    this.originalMove = false;
  }
  onMouseEnter() {}
  checkCursorInSelection(coord) {
    let minX = Math.min(this.origX, this.objX);
    let minY = Math.min(this.origY, this.objY);

    if (
      coord[0] < minX + Math.abs(this.origX - this.objX) &&
      coord[0] >= minX &&
      coord[1] < minY + Math.abs(this.origY - this.objY) &&
      coord[1] >= minY
    )
      return true;
    else return false;
  }
  checkSize() {
    if (
      Math.abs(this.origX - this.objX) > minSizeNecessary &&
      Math.abs(this.origY - this.objY) > minSizeNecessary
    )
      return true;
    else return false;
  }
  getDraftImage(coord) {
    if (this.objX < this.origX && this.objY > this.origY) {
      this.objDraft = this.contextDraft.getImageData(
        this.origX + 2,
        this.origY - 2,
        coord[0] - this.origX - 4,
        coord[1] - this.origY + 4
      );
    } else if (this.objX < this.origX && this.objY < this.origY) {
      this.objDraft = this.contextDraft.getImageData(
        this.origX + 2,
        this.origY + 2,
        coord[0] - this.origX - 4,
        coord[1] - this.origY - 4
      );
    } else if (this.objX > this.origX && this.objY < this.origY) {
      this.objDraft = this.contextDraft.getImageData(
        this.origX - 2,
        this.origY + 2,
        coord[0] - this.origX + 4,
        coord[1] - this.origY - 4
      );
    } else {
      this.objDraft = this.contextDraft.getImageData(
        this.origX - 2,
        this.origY - 2,
        coord[0] - this.origX + 4,
        coord[1] - this.origY + 4
      );
    }
  }
  adjustPoints() {
    if (this.objX < this.origX && this.objY > this.origY) {
      //drag from right top
      this.origX -= this.obj.width;
      this.objX += this.obj.width;
    } else if (this.objX < this.origX && this.objY < this.origY) {
      //drag from right bottom
      this.origX -= this.obj.width;
      this.origY -= this.obj.height;
      this.objX += this.obj.width;
      this.objY += this.obj.height;
    } else if (this.objX > this.origX && this.objY < this.origY) {
      //drag from left bottom
      this.origY -= this.obj.height;
      this.objY += this.obj.height;
    }
  }
}
