var col = 0;
let numberOfFlowers = 5;
let flowerDiameter = 100;
let colors = [];
let midFlowerX = 200;
let midFlowerY = 300;
let lerpAmount = 0;
let lerpSpeed = 0.02;

// vocal, drum, bass, and other are volumes ranging from 0 to 100

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);

  randomSeed(3);

  // Update lerp amount for smooth color transition
  lerpAmount += lerpSpeed;
  if (lerpAmount > 1) {
    lerpAmount = 0;
  }
  
  let mappedVocal = map(vocal, 0, 100, 250, width-flowerDiameter/2);
  draw_one_flower(mappedVocal, 100);

 draw_multiple_flowers();
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
  let pink = color(230, 94, 225);
  let yellow = color(254,214,123);

  // Create smooth color transition
  let currentColor = lerpColor(pink, yellow, lerpAmount);

  let petalRotation = 360 / 5;
  noFill();
  
  for (let i = 0; i < 5; i++) {
    strokeWeight(3);
    stroke(currentColor);
    push();
        translate(midFlowerX, midFlowerY);
        rotate(petalRotation*i);
        arc(0, 0-(flowerDiameter/5), flowerDiameter, flowerDiameter/2, 45, 360);
    pop();
  }
}
