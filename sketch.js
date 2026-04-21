let beads = [];
let hand = { x: -100, y: -100 };
let socket;

function setup() {
  createCanvas(windowWidth, windowHeight);
  socket = io();

  socket.on("handData", (data) => {
    hand.x = data.x * width;
    hand.y = data.y * height;
  });

  for (let i = 0; i < 300; i++) {
    beads.push({
      x: random(width),
      y: random(height),
      vx: 0,
      vy: 0,
      homeX: random(width),
      homeY: random(height),
      r: random(6, 14),
      c: color(random(255), random(255), random(255))
    });
  }
}

function draw() {
  background(0);

  for (let b of beads) {

    let d = dist(b.x, b.y, hand.x, hand.y);

    // 👉 手撥開
    if (d < 120) {
      let a = atan2(b.y - hand.y, b.x - hand.x);
      let f = map(d, 0, 120, 2.5, 0);

      b.vx += cos(a) * f;
      b.vy += sin(a) * f;
    }

    // 👉 回流（像液體回來）
    let homeA = atan2(b.homeY - b.y, b.homeX - b.x);
    b.vx += cos(homeA) * 0.02;
    b.vy += sin(homeA) * 0.02;

    b.x += b.vx;
    b.y += b.vy;

    b.vx *= 0.92;
    b.vy *= 0.92;

    noStroke();
    fill(b.c);
    circle(b.x, b.y, b.r * 2);
  }

  // 手視覺化
  noFill();
  stroke(255, 120);
  circle(hand.x, hand.y, 120);
}
