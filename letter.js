class Letter {
  constructor(x, y, fontSize) {
    this.position = createVector(x, y); //vector is a value that can hold 2-3 values
    let alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.letter = random(alphabets);
    this.angle = 0;
    this.angleV = 0.1;
    this.fontSize = fontSize;
  }
  update() {
    this.angle += this.angleV; //updating the angle wich is angle velocity
  }

  display() {
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER); //centers the ellipse around the center of the p
    text(this.letter, 0, 0);
    pop();
  }
}
