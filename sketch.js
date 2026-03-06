let letters = [];
let rings = [];
let ringsnum = 3;

function setup() {
  createCanvas(400, 400);

  let r = 100; 
  let circumference = 2 * PI * r;
  let fontSize = 10;
  let num = floor(circumference / fontSize);

  for (let i=0; i<num; i++){
    let angle = TWO_PI / num * i; //this will give me the space between each letter and multiplied by i to give me another size each round.// 
    
    // para sacar el angulo necesitamos trigonometria    
    let x = width/2 + r * cos(angle);
    let y = height/2 + r * sin(angle);
    letters.push(new Letter(x, y, 50));

  }

  
}

function draw() {
  background("steelblue");

  for(let i=0; i<letters.length; i++) {
    letters[i].update();
    letters[i].display();
  }
}
