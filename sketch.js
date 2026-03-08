

//ml5 variables
let faceMesh;
let video;
let faces = [];
let options = { maxFaces: 1, refineLandmarks: false, flipped: true };
let previousLipDistance;

//letter variables
let rings = [];
let numRing = 5;
let fonts = [];

function preload() {
  // load FaceMesh model (p5 v2 method)
  faceMesh =  ml5.faceMesh(options);

}

function loadsomeFonts() {
  fonts[0] = "Orbitron";
  fonts[1] = "Cascadia";
  fonts[2] = "Buenard";
}

 function setup() {
  createCanvas(640, 480);

  
  // Create the webcam video and hide it
  video = createCapture(VIDEO, {flipped: true});
  video.size(640, 480);
  video.hide();

  
  // Start detecting faces from the webcam video
  faceMesh.detectStart(video, gotFaces);

  //font loading
  loadsomeFonts();
  let font;
  
  for (let i=0; i<numRing; i++) {
    rings[i] = []; // declaro que en ese Array en ese index haya un array
    let r = 30 + i * 15; // el radio del círculo que tiene que cambiar según esta fórmula incrementarse
    let circumference = 2 * PI * r;
    let fontSize = 10 + i * 3;
    font = fonts[i % fonts.length]; // a modulus expresion to make sure that the remainer between the two.. helps you loop throught the array
    let num = floor(circumference / fontSize); // el número de espacios que queda entre letras disponible
    
    
    for (let j=0; j<num; j++){
      let angle = TWO_PI / num * j; //this will give me the space between each letter and multiplied by i to give me another size each round.// 
      // para sacar el angulo necesitamos trigonometria    
      let x = width/2 + r * cos(angle);
      let y = height/2 + r * sin(angle);          
      rings[i].push(new Letter(x, y, fontSize, font)); // fonti tiene que ser un string
    }
  }
}

function draw() {

  //background("steelblue");
  // Draw the webcam video
  image(video, 0, 0, width, height);
  
  if (faces.length > 0 && faces[0].lips) {
    let topLeftLip = createVector(faces[0].lips.x,
      faces[0].lips.y);
    let bottomRightLip = createVector(faces[0].lips.x + faces[0].lips.width,
        faces[0].lips.y + + faces[0].lips.height);
    let centerLip = createVector(faces[0].lips.centerX, faces[0].lips.centerY);
    noFill();
    stroke(0, 255, 0);
    // ellipse(topLeftLip.x, topLeftLip.y, 10, 10);
    // ellipse(bottomRightLip.x, bottomRightLip.y, 10, 10);
    // ellipse(centerLip.x, centerLip.y, 10, 10);
    
    let lipDistance = dist(topLeftLip.x,topLeftLip.y, bottomRightLip.x, bottomRightLip.y);
    print(lipDistance);
    

    if (previousLipDistance > 90 && (previousLipDistance - lipDistance > 5)) {
      for(let i=0; i<rings.length; i++) {
        for ( let j=0; j<rings[i].length; j++) {
          let mouth = createVector(centerLip.x, centerLip.y);
          trigger(rings[i][j], mouth);
        }
      } 
      console.log("triggered")  
    }
    previousLipDistance = lipDistance;


  }


  for(let i=0; i<rings.length; i++) {
    for ( let j=0; j<rings[i].length; j++) {
     
      rings[i][j].update();
      rings[i][j].display();   
    }
  }
}


function trigger(letter, mouth){
  let force = p5.Vector.sub(letter.position, mouth);
  let distance = force.mag();
  force.normalize();

  let magnitude = map(distance, 0, width, 0.1, 1) * random(0.5, 2);
  force.mult(magnitude);
  letter.applyForce(force);

  letter.angleV = map(distance, 0, width, 0.01, 0.1) * random(0.5, 2);

}


// Callback function for when faceMesh outputs data
function gotFaces(results) {
  // Save the output to the faces variable
  faces = results;
}