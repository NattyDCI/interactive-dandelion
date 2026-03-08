class Letter {
  constructor(x, y, fontSize, font) {
    let alphabets = ["A","B","C","D","E","F","G","H","I","J","K","L","M","N","O","P","Q","R","S","T","U","V","W","X","Y","Z"];
    this.letter = random(alphabets);
    this.font = font;
    this.angle = 0;
    this.position = createVector(x, y); //vector is a value that can hold 2-3 values
    this.velocity = createVector(0, 0)
    this.acceleration = createVector(0, 0);
    this.fontSize = fontSize;
    this.angleV = 0;  // angle velocity
  }
  update() {
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.acceleration.mult(0);
    this.angle += this.angleV; //updating the angle wich is angle velocity

  }

  applyForce(force) {
    this.acceleration.add(force);

  }

  display() {
    fill(255);
    noStroke();
    push();
    translate(this.position.x, this.position.y);
    rotate(this.angle);
    textFont(this.font);
    textSize(this.fontSize);
    textAlign(CENTER, CENTER); //centers the ellipse around the center of the p
    text(this.letter, 0, 0);
    pop();
  }
}
