let hasInput = false;

class DrawingText extends PaintFunction {
  constructor(contextReal, contextDraft) {
    super();
    this.contextReal = contextReal;
    this.contextDraft = contextDraft;
  }
  onMouseDown(coord, event) {
    if (hasInput === false) {
      this.origX = coord[0];
      this.origY = coord[1];
      let mouseX = this.origX;
      let mouseY = this.origY;

      this.contextReal.fillStyle = curStroke;
      var input = document.createElement("input");
      input.type = "text";
      input.style.position = "fixed";
      input.style.border = "none";
      input.style.outline = "none";
      input.style.backgroundColor = "transparent";
      input.style.height = "30px";
      input.style.width = "300px";
      input.placeholder = "Type & hit 'Enter'. 'Esc' to delete";
      input.style.font = "Arial"; // font-family for placeholder

      input.style.left = mouseX + 560 + "px"; //the position of input when you click mouse//
      input.style.top = mouseY + 240 + "px";
      document.body.appendChild(input);
      input.focus();
      hasInput = true;

      input.onkeydown = function handleEnter(input) {
        if (input.key === "Enter") {
          drawText(this.value);
          document.body.removeChild(this);
          savetosaveCard ();
          hasInput = false;
        }
        if (input.key === "Escape") {
          document.body.removeChild(this);
          hasInput = false;
        }
      };
      function drawText(txt) {
        contextReal.textBaseline = "middle";
        contextReal.textAlign = "left";
        contextReal.font = "normal 300 2rem times";
        contextReal.fillText(txt, mouseX, mouseY);
      }
    }
  }
}
