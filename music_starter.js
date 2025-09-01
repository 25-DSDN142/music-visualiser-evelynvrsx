var col = 0;
let numberOfFlowers = 5;
let flowerDiameter = 70;
let soundWaveRect = 30;
let colors = [];
let midFlowerX = 200;
let midFlowerY = 300;
let lerpAmount = 0;
let lerpSpeed = 0.02;
let angle = 0;
let r = 100;
let radius = 150;
let gap = 10;

// vocal, drum, bass, and other are volumes ranging from 0 to 100

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  let pink = color(230, 94, 225);
  let yellow = color(254,214,123);

  randomSeed(3);

  // Draw line for the sound wave
  stroke(255);
  strokeWeight(2);
  lineXStart = width/5;
  lineYPoint = height/2;
  lineXEnd = 4*(width/5);
  line(lineXStart, lineYPoint, lineXEnd-gap*2, lineYPoint);

  // Vocal parameters (not used as shifting starts anymore)
  // We'll layout groups of 4 columns (vocal, drum, bass, other) next to each other

  // Update lerp amount for smooth color transition
  lerpAmount += lerpSpeed;
  if (lerpAmount > 1) {
    lerpAmount = 0;
  }
  
  // Map volumes to bar heights
  let maxBarHeight = height * 0.4;
  let mappedVocal = map(vocal, 0, 100, 10, maxBarHeight);
  let mappedDrum = map(drum, 0, 100, 10, maxBarHeight);
  let mappedBass = map(bass, 0, 100, 10, maxBarHeight);
  let mappedOther = map(other, 0, 100, 10, maxBarHeight);

  // compute how many groups of 4 columns fit between lineXStart and lineXEnd
  let groupWidth = 4 * (soundWaveRect + gap);
  let availableWidth = lineXEnd - lineXStart;
  let maxGroups = floor(availableWidth / groupWidth);
  let groups = min(17, maxGroups);

  for (let i = 0; i < groups; i++) {
    // base x for this group
    let baseX = lineXStart + i * groupWidth + (soundWaveRect / 2);

    let vocalX = baseX;
    let drumX = baseX + (soundWaveRect + gap);
    let bassX = baseX + 2 * (soundWaveRect + gap);
    let otherX = baseX + 3 * (soundWaveRect + gap);

    // draw each track in this group
    // Vocal
    fill(100, 100, 200);
    rect(vocalX, lineYPoint, soundWaveRect, mappedVocal);

    // Drum
    fill(100, 200, 100);
    rect(drumX, lineYPoint, soundWaveRect, mappedDrum);

    // Bass
    fill(200, 100, 100);
    rect(bassX, lineYPoint, soundWaveRect, mappedBass);

    // Other
    fill(200, 200, 100);
    rect(otherX, lineYPoint, soundWaveRect, mappedOther);
  }

  
  //draw_one_flower(mappedDrum, 200);
  //rect(mappedDrum, 200, flowerDiameter, flowerDiameter);

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
  //noFill();
  fill(currentColor);
  
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
