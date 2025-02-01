document.addEventListener("DOMContentLoaded", function () {
  const canvas = document.getElementById("bubblesCanvas");
  const ctx = canvas.getContext("2d");
  const resetButton = document.getElementById("resetButton");

  let bubbles = [
    { color: "gray", y: 80, hit: false, arrowX: canvas.width - 50 },
    { color: "blue", y: 160, hit: false, arrowX: canvas.width - 50 },
    { color: "red", y: 240, hit: false, arrowX: canvas.width - 50 },
    { color: "green", y: 320, hit: false, arrowX: canvas.width - 50 },
  ];

  function draw() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    bubbles.forEach((bubble) => {
      const circleX = 70;

      ctx.beginPath();
      ctx.arc(circleX, bubble.y, 30, 0, Math.PI * 2);
      ctx.fillStyle = bubble.hit ? "yellow" : bubble.color;
      ctx.fill();
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bubble.arrowX, bubble.y);
      ctx.lineTo(bubble.arrowX - 30, bubble.y);
      ctx.strokeStyle = "black";
      ctx.lineWidth = 3;
      ctx.stroke();

      ctx.beginPath();
      ctx.moveTo(bubble.arrowX - 30, bubble.y);
      ctx.lineTo(bubble.arrowX - 20, bubble.y - 10);
      ctx.lineTo(bubble.arrowX - 20, bubble.y + 10);
      ctx.closePath();
      ctx.fillStyle = "black";
      ctx.fill();
    });
  }

  function animateArrow(index) {
    const bubble = bubbles[index];

    function step() {
      if (bubble.arrowX > 100) {
        bubble.arrowX -= 5;
        draw();
        requestAnimationFrame(step);
      } else {
        bubble.hit = true;
        draw();
      }
    }

    step();
  }

  canvas.addEventListener("click", function (event) {
    const rect = canvas.getBoundingClientRect();
    const mouseX = event.clientX - rect.left;
    const mouseY = event.clientY - rect.top;

    bubbles.forEach((bubble, index) => {
      const distance = Math.sqrt((70 - mouseX) ** 2 + (bubble.y - mouseY) ** 2);
      if (distance < 30) {
        animateArrow(index);
      }
    });
  });

  resetButton.addEventListener("click", function () {
    bubbles = bubbles.map((bubble) => ({
      ...bubble,
      hit: false,
      arrowX: canvas.width - 50,
    }));
    draw();
  });

  draw();
});
