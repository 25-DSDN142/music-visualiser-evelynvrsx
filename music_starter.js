var col = 0;
let numberOfFlowers = 5;
let flowerDiameter = 100;
let colors = [];

// vocal, drum, bass, and other are volumes ranging from 0 to 100

function draw_one_frame(words, vocal, drum, bass, other, counter) {
  background(20);
  textFont('Verdana'); // please use CSS safe fonts
  rectMode(CENTER)
  textSize(24);

  draw_one_flower(200, 200);
  draw_multiple_flowers();
}

function draw_multiple_flowers() {
  for (let i = 0; i < numberOfFlowers; i++) {
    let x = random(width);
    let y = random(height);
    draw_one_flower(x, y);
  }
}


function draw_one_flower(midX, midY) {
  // Push colours into the color array 
  let gold = color(161, 141, 103);
  let pink = color(238,186,198);
  let red = color(169, 67, 69);
  let yellow = color(254,214,123);
  let blue = color(173, 216, 230);

  // Push colors to the array
  colors.push(gold);
  colors.push(pink);
  colors.push(red);
  colors.push(yellow);
  colors.push(blue);

  let defaultColor = random(colors);

  let petalRotation = 360 / 5;
  noFill();
  
  for (let i = 0; i < 5; i++) {
    stroke(defaultColor);
    push();
        translate(midX, midY);
        rotate(petalRotation*i);

        arc(0, 0-(flowerDiameter/5), flowerDiameter, flowerDiameter/2, 45, 360);

      pop();
  }

}
