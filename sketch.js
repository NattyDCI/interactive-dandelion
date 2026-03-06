let rings = [];
let numRing = 3;
let letters = [];

function setup() {
  createCanvas(400, 400);
  
  for (let i=0; i<numRing; i++) {
    rings[i] = [];
    let r = 30 + i * 15; 
    let circumference = 2 * PI * r;
    let fontSize = 10 + i * 3;
    let num = floor(circumference / fontSize); // el numero de espacios que queda entre letras disponible
    
    
    for (let j=0; j<num; j++){
      let angle = TWO_PI / num * j; //this will give me the space between each letter and multiplied by i to give me another size each round.// 
      // para sacar el angulo necesitamos trigonometria    
      let x = width/2 + r * cos(angle);
      let y = height/2 + r * sin(angle);          
      rings[i].push(new Letter(x, y, fontSize));
    }
  }
}

function draw() {

  background("steelblue");

  for(let i=0; i<rings.length; i++) {
    for ( let j=0; j<rings[i].length; j++) {
      rings[i][j].update();
      rings[i][j].display();   
    }
  }
}
