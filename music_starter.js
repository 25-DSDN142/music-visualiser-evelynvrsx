var col = 0;
let numberOfFlowers = 5;
let flowerDiameter = 100;
let colors = [];
let midFlowerX = 300;
let midFlowerY = 300;
let lerpAmount = 0;
let lerpSpeed = 0.02;



// vocal, drum, bass, and other are volumes ranging from 0 to 100

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);

  randomSeed(30);

  // Update lerp amount for smooth color transition
  lerpAmount += lerpSpeed;
  if (lerpAmount > 1) {
    lerpAmount = 0;
  }

  draw_one_flower();
  draw_multiple_flowers();
  // for (let i = 3; i < 10; i++) {
  //   // let x = random(width);
  //   // let y = random(height);
  //   // let x = 20;
  //   // let y = 40*i;
  //   // draw_one_flower(x*i, y);
  //   ellipse(10*i,100,50);
  // }
}

function draw_multiple_flowers() {
  for (let i = 1; i <= 5; i++) {
    let x = random(width);
    let y = random(height);
    draw_one_flower(x, y);
  }
}

function draw_one_flower(midFlowerX, midFlowerY) {
  // Define colors once
  let pink = color(238,186,198);
  let yellow = color(254,214,123);
  // Create smooth color transition
  let currentColor = lerpColor(pink, yellow, lerpAmount);

  let petalRotation = 360 / 5;
  noFill();
  
  for (let i = 0; i < 5; i++) {
    stroke(currentColor);
    push();
        translate(midFlowerX, midFlowerY);
        rotate(petalRotation*i);
        arc(0, 0-(flowerDiameter/5), flowerDiameter, flowerDiameter/2, 45, 360);
    pop();
  }

}
