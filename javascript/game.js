let canvas = canvasReal;
let ctx = contextReal;
let ballRadius = 10;
let x = Math.floor(Math.random() * canvas.width);
let y = canvas.height - 30;
let dx = 4;
let dy = -4;
let paddleHeight = 10;
let paddleWidth = 80;
let paddleX = (canvas.width - paddleWidth) / 2;
let rightPressed = false;
let leftPressed = false;
let brickRowCount = 9;
let brickColumnCount = 4;
let brickWidth = 65;
let brickHeight = 20;
let brickPadding = 10;
let brickOffsetTop = 30;
let brickOffsetLeft = 15;
let score = 0;
let lives = 1;

class Game {
  constructor(contextReal, canvasReal) {
    this.contextReal = contextReal;
    this.canvasReal = canvasReal;
  }

  onMouseDown() {
    let bricks = [];
    for (let column = 0; column < brickColumnCount; column++) {
      bricks[column] = [];
      for (let row = 0; row < brickRowCount; row++) {
        bricks[column][row] = { x: 0, y: 0, status: 1 };
      }
    }

    document.addEventListener("keydown", keyDownHandler, false);
    document.addEventListener("keyup", keyUpHandler, false);
    document.addEventListener("mousemove", mouseMoveHandler, false);

    function keyDownHandler(e) {
      if (e.keyCode == 39) {
        rightPressed = true;
      } else if (e.keyCode == 37) {
        leftPressed = true;
      }
    }
    function keyUpHandler(e) {
      if (e.keyCode == 39) {
        rightPressed = false;
      } else if (e.keyCode == 37) {
        leftPressed = false;
      }
    }
    function mouseMoveHandler(e) {
      let relativeX = e.clientX - canvas.offsetLeft;
      if (relativeX > 0 && relativeX < canvas.width) {
        paddleX = relativeX - paddleWidth / 2;
      }
    }
    function collisionDetection() {
      for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
          let b = bricks[column][row];
          if (b.status == 1) {
            if (
              x + ballRadius > b.x &&
              x - ballRadius < b.x + brickWidth &&
              y + ballRadius > b.y &&
              y - ballRadius < b.y + brickHeight
            ) {
              dy = -dy;
              b.status = 0;
              score++;
              if (score == brickRowCount * brickColumnCount) {
                setTimeout(() => {
                  alert("YOU WIN, CONGRATS!");
                }, 50);
                document.location.pause();
              }
            }
          }
        }
      }
    }

    function drawBall() {
      ctx.beginPath();
      ctx.arc(x, y, ballRadius, 0, Math.PI * 2);
      ctx.fillStyle = "#144552";
      ctx.fill();
      ctx.closePath();
    }
    function drawPaddle() {
      ctx.beginPath();
      ctx.rect(
        paddleX,
        canvas.height - paddleHeight,
        paddleWidth,
        paddleHeight
      );
      ctx.fillStyle = "#9d8189";
      ctx.fill();
      ctx.closePath();
    }
    function drawBricks() {
      for (let column = 0; column < brickColumnCount; column++) {
        for (let row = 0; row < brickRowCount; row++) {
          if (bricks[column][row].status == 1) {
            let brickX = row * (brickWidth + brickPadding) + brickOffsetLeft;
            let brickY = column * (brickHeight + brickPadding) + brickOffsetTop;
            bricks[column][row].x = brickX;
            bricks[column][row].y = brickY;
            ctx.beginPath();
            ctx.rect(brickX, brickY, brickWidth, brickHeight);
            ctx.fillStyle = "#0095DD";
            ctx.fill();
            ctx.closePath();
          }
        }
      }
    }
    function drawScore() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Score: " + score, 8, 20);
    }
    function drawLives() {
      ctx.font = "16px Arial";
      ctx.fillStyle = "#0095DD";
      ctx.fillText("Lives: " + lives, canvas.width - 65, 20);
    }

    function draw() {
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      drawBricks();
      drawBall();
      drawPaddle();
      drawScore();
      drawLives();
      collisionDetection();

      if (x + dx > canvas.width - ballRadius || x + dx < ballRadius) {
        dx = -dx;
      }
      if (y + dy < ballRadius) {
        dy = -dy;
      } else if (y + dy > canvas.height - ballRadius - paddleHeight) {
        if (
          x + ballRadius > paddleX &&
          x - ballRadius < paddleX + paddleWidth
        ) {
          dy = -dy;
        } else {
          lives--;
          if (!lives) {
            setTimeout(() => {
              alert("GAME OVER");
            }, 50);
            document.location.pause();
          } else {
            x = canvas.width / 2;
            y = canvas.height - 30;
            dx = 4;
            dy = -4;
            paddleX = (canvas.width - paddleWidth) / 2;
          }
        }
      }

      if (rightPressed && paddleX < canvas.width - paddleWidth) {
        paddleX += 7;
      } else if (leftPressed && paddleX > 0) {
        paddleX -= 7;
      }

      x += dx;
      y += dy;
      requestAnimationFrame(draw);
    }

    draw();
  }
}
