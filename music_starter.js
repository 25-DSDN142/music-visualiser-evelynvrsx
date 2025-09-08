var col = 0;
let soundWaveRect = 30;
let colors = [];
let lerpAmount = 0;
let lerpSpeed = 0.02;
let gap = 5;
let roundedRectRadius = 20;
let starSize = 0.2;
let starX = 200;
let starY = 200;
let starSpeed = 0.5;
let starCircularMotionAngle = 0;
let starRadius = 80;
let firstRun = true;
let myImage;
let imageSize = 90;
let vinylSize = 180;

// vocal, drum, bass, and other are volumes ranging from 0 to 100

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);
  let pink = color(230, 94, 225);
  let yellow = color(254,214,123);

  randomSeed(3);

  // Show image
  if (firstRun) {
    myImage = loadImage('song_cover.png')
    firstRun = false;
  }

  // Draw line for the sound wave
  lineXStart = width/5;
  lineYPoint = height/2;
  lineXEnd = 4*(width/5);
  //line(lineXStart, lineYPoint, lineXEnd-gap*2, lineYPoint);

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
    noStroke();
    rect(vocalX, lineYPoint, soundWaveRect, mappedVocal, roundedRectRadius);

    // Drum
    fill(100, 200, 100);
    rect(drumX, lineYPoint, soundWaveRect, mappedDrum, roundedRectRadius);

    // Bass
    fill(200, 100, 100);
    rect(bassX, lineYPoint, soundWaveRect, mappedBass, roundedRectRadius);

    // Other
    fill(200, 200, 100);
    rect(otherX, lineYPoint, soundWaveRect, mappedOther, roundedRectRadius);
  }

  star(starX, starY, 100*starSize, 40*starSize, 5);
  starMotion(starX, starY, starRadius, starSpeed);

  // Draw vinyl record
  drawVinyl();

  // Draw image
  image(myImage, width/2 - imageSize/2, height/2 - imageSize/2, imageSize, imageSize);

  

  text(words, width / 2, height * 0.85);
  if (vocal < 90) {
    textFont('Helvetica');
  }
}

function star(x, y, outerRadius, innerRadius, points) {
  // Star colour
  let pink = color(230, 94, 225);
  let yellow = color(254,214,123);
  let currentColor = lerpColor(pink, yellow, lerpAmount);
  fill(currentColor)

  // Draw star shape
  let angleStep = 360 / (points * 2);
  beginShape();
  for (let i = 0; i < points * 2; i++) {
    let angle = i * angleStep - 90; // start pointing upwards
    let r = (i % 2 === 0) ? outerRadius : innerRadius;
    let sx = x + cos(angle) * r;
    let sy = y + sin(angle) * r;
    vertex(sx, sy);
  }
  endShape(CLOSE);
}

// Star circular motion
// This function is inspired by: https://youtu.be/uRd5iKBpsUA?si=Zeqfcreynf0DOPXj
function starMotion(centerX, centerY, radius, speed) {
  starCircularMotionAngle += speed;
  let x = centerX + cos(starCircularMotionAngle) * radius;
  let y = centerY + sin(starCircularMotionAngle) * radius;
  noStroke();
  star(x, y, 100*starSize, 40*starSize, 5);
}

function drawVinyl() {
  fill(64, 59, 60);
  noStroke();
  ellipse(width/2, height/2, vinylSize, vinylSize);
  fill(24, 20, 21);
  noStroke();
  ellipse(width/2, height/2, vinylSize/1.8, vinylSize/1.8);
}