let letter = "P";


function setup() {
    createCanvas(400, 400);
}

function draw() {
    background(220);
    angle = map(mouseX, 0, width, 0, TWO_PI); //two pi is one revolution. we are mapping the mouse movement in x only to make the p move one revolution
    translate(width/2, height/2);
    rotate(angle);
    textSize(40);
    textAlign(CENTER, CENTER); //centers the ellipse around the center of the p
    text(letter, 0, 0);
    ellipse(width/2, height/2, 10, 10);
}
