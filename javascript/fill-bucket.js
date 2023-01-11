class FillBucket extends PaintFunction {
  constructor(contextReal) {
    super();
    this.contextReal = contextReal;
  }

  onMouseDown(coord) {
    let canvasWidth = canvasReal.width;
    let canvasHeight = canvasReal.height;
    // Paint Bucket Fill
    function fillBucket(coord, context) {
      let imgData = context.getImageData(0, 0, canvasWidth, canvasHeight);
      let pixelData = context.getImageData(coord[0], coord[1], 1, 1);
      let pixelStack = [coord];

      let startR = pixelData.data[0];
      let startG = pixelData.data[1];
      let startB = pixelData.data[2];
      let curFillRGBA = curFillColor
        .replace(/\s+/g, "")
        .split("(")[1]
        .split(")")[0]
        .split(",");

      while (pixelStack.length) {
        let newPos, x, y, pixelPos, reachLeft, reachRight;
        newPos = pixelStack.pop();
        x = newPos[0];
        y = newPos[1];

        // Get current pixel position
        pixelPos = (y * canvasWidth + x) * 4;
        // Go up the page as long as the colour matches
        while (
          y-- >= 0 &&
          matchStartColour(pixelPos, startR, startG, startB, imgData)
        ) {
          pixelPos -= canvasWidth * 4;
        }
        pixelPos += canvasWidth * 4;
        y++;
        reachLeft = false;
        reachRight = false;
        // Go down the page as long as the colour matches and is in the canvas
        while (
          y++ <= canvasHeight - 1 &&
          matchStartColour(pixelPos, startR, startG, startB, imgData)
        ) {
          colorPixel(pixelPos, imgData, curFillRGBA);

          if (x > 0) {
            if (
              matchStartColour(pixelPos - 4, startR, startG, startB, imgData)
            ) {
              if (!reachLeft) {
                // Add pixel to stack
                pixelStack.push([x - 1, y]);
                reachLeft = true;
              }
            } else if (reachLeft) {
              reachLeft = false;
            }
          }
          if (x < canvasWidth - 1) {
            if (
              matchStartColour(pixelPos + 4, startR, startG, startB, imgData)
            ) {
              if (!reachRight) {
                // Add pixed to stack
                pixelStack.push([x + 1, y]);
                reachRight = true;
              }
            } else if (reachRight) {
              reachRight = false;
            }
          }
          pixelPos += canvasWidth * 4;
        }
      }
      context.putImageData(imgData, 0, 0);
    }
    fillBucket(coord, contextReal);

    function matchStartColour(pixelPos, startR, startG, startB, imgData) {
      var red = imgData.data[pixelPos];
      var green = imgData.data[pixelPos + 1];
      var blue = imgData.data[pixelPos + 2];

      return red == startR && green == startG && blue == startB;
    }
    // Change the colour of the pixel
    function colorPixel(pixelPos, imgData, curFillRGBA) {
      imgData.data[pixelPos] = curFillRGBA[0];
      imgData.data[pixelPos + 1] = curFillRGBA[1];
      imgData.data[pixelPos + 2] = curFillRGBA[2];
      imgData.data[pixelPos + 3] = 255;
    }
  }
  onMouseUp() {
    savetosaveCard ();
  }
}

