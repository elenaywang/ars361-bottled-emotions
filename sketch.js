// VARIABLES

var bottleImg, bottleWidth, bottleHeight;                // variables for bottle image
var capImg, capWidth, capHeight, capY;                   // variables for bottle cap image
var bottleRectWidth, bottleRectHeight, bottleRectY;      // variables for blue background inside bottle
var emotionWidth, emotionHeight, emotionY;               // variables for liquid representing emotions
var emotionSurfaceImg;                                   // variable for bubbling emotion surface
var explosionHeight, explosionY;                         // variables for the exploding liquid after the bottle overflows
var bottleButton, releaseButton;                         // variables for buttons that change emotion level
var mediumBlue, darkBlue;                                // variables for specific colors


// ~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~

// FUNCTIONS

function preload() {
  // bottleImg = loadImage("bottle_nocap.png");           // no reflections on bottle
  bottleImg = loadImage("bottle_nocap_wreflection.png");  // includes reflections
  capImg = loadImage("bottle_cap.png");
  emotionSurfaceImg = loadImage("wave_animation.gif");
} // ~~END of preload()~~


function setup() {
  createCanvas(1000, 1000);
  background(255);
  noStroke();
  textFont("Ubuntu");
  
  // set values of variables
  bottleWidth = height*0.64;
  bottleHeight = height;
  capWidth = bottleWidth*0.18;
  capHeight = capWidth*0.47;
  capY = bottleHeight*0.158;
  bottleRectWidth = bottleWidth*0.625;
  bottleRectHeight = bottleHeight*0.69;
  bottleRectY = height*0.145;
  emotionWidth = bottleRectWidth;
  emotionHeight = 1;
  emotionY = bottleRectY+bottleRectHeight-1;
  explosionHeight = 1;
  explosionY = bottleHeight*0.2;
  mediumBlue = color(123,200,250);
  darkBlue = color(0,57,175);
  
  // print statements
  print("bottle width: " + bottleWidth);
  print("bottle height: " + bottleHeight);
  print("cap width: " + capWidth);
  print("cap height: " + capHeight);
  print("cap Y position: " + capY);
  print("rectangle width: " + bottleRectWidth);
  print("rectangle height: " + bottleRectHeight);
  
  // set up buttons
  bottleButton = createButton('bottle');
  bottleButton.position(width/2-170,900);
  bottleButton.size(150,50);
  bottleButton.style("font-family", "Ubuntu");
  bottleButton.style("font-size", "30px");
  bottleButton.style("background-color", mediumBlue);
  bottleButton.style("border-color", darkBlue);
  bottleButton.style("border-radius", "6px");
  bottleButton.mousePressed(bottleEmotions);
  releaseButton = createButton('release');
  releaseButton.position(width/2+40,900);
  releaseButton.size(150,50);
  releaseButton.style("font-family", "Ubuntu");
  releaseButton.style("font-size", "30px");
  releaseButton.style("background-color", mediumBlue);
  releaseButton.style("border-color", darkBlue);
  releaseButton.style("border-radius", "6px");
  releaseButton.mousePressed(releaseEmotions);
} // ~~END of setup()~~


function draw() {
  // background inside bottle created by rectangle
  fill(220,252,255);      // light blue color
  rect(width/2-bottleRectWidth/2, bottleRectY, bottleRectWidth, bottleRectHeight);
  
  // emotion liquid  
  fill(darkBlue);                // dark blue color
  image(emotionSurfaceImg, width/2-bottleRectWidth/2, emotionY-20, emotionWidth, 30);      // moving surface
  rect(width/2-bottleRectWidth/2, emotionY, emotionWidth, emotionHeight);
  
  // bottle and cap
  image(bottleImg, width/2-bottleWidth/2, 0, bottleWidth, bottleHeight);
  image(capImg, width/2-capWidth/2, capY, capWidth, capHeight);
  
  // title text
  textSize(50);
  text("bottled emotions", 300, 100);
  
  // animation
  if (emotionY > bottleHeight*0.18) {
    autoGrow();
  } else {
    explode();
  }
} // ~~END of draw()~~


/** automatically increases the water level */
function autoGrow() {
  if (emotionHeight > 1) {      // checks if emotions have been bottled
    if (emotionY < bottleHeight*0.37) {    // fast uniform speed in neck of bottle
      emotionHeight += 0.37;
      emotionY -= 0.37;
    } else if (emotionY < bottleHeight*0.48) {    // speeds up gradually as bottle width shrinks
      let change = map(emotionY, bottleHeight*0.48, bottleHeight*0.37, 0.17, 0.33, true);
      emotionHeight += change;
      emotionY -= change;
    } else {    // slow uniform speed in bottom part of bottle
      emotionHeight += 0.15;
      emotionY -= 0.15;
    }
  }
} // ~~END of autoGrow()~~


/** increases water level when bottle button is presssed */
function bottleEmotions() {
  if (emotionY > bottleHeight*0.18) {
    emotionHeight += 15;
    emotionY -= 15;
  }
} // ~~END of bottleEmotions()~~


/** decreases water level when release button is presssed */
function releaseEmotions() {
  if ((emotionHeight > 1) && (emotionY > bottleHeight*0.18)) {
    emotionHeight -= 15;
    emotionY += 15;
  }
} // ~~END of releaseEmotions()~~


/** animates the bottle exploding when it overflows */
function explode() {
  fill(darkBlue);
  rect(465, explosionY, 70, explosionHeight);
  explosionHeight += 30;
  explosionY -= 30;
  capY -= 30;
  if (explosionY < -500) {
    remove();      // deletes canvas
  }
} // ~~END of explode()~~
