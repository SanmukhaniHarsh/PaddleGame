var PLAY = 1;
var END = 0;

var paddle, paddleImg, ball, ballImg, bricks, bricksImg; 
var wallTop, wallBottom, wallLeft, wallRight;

var gameOver,gameOverImg, win, winImg, backgroundImg;
var scoreSprite, scoreImg;

var MAX_SPEED = 9;
var score = 0;

var BRICK_W = 100;
var BRICK_H = 40;
var BRICK_MARGIN = 4;
var ROWS = 4;
var COLUMNS = 10;

var colors = ["#3E2723","#5D4037","#795548", "#A1887F"];

var hitSound, brick_hit;

var gameState = "PLAY";

function preload(){
  backgroundImg = loadImage("background.jpg");

  gameOverImg = loadImage("gameOver.png");
  winImg = loadImage("win.png");

  ballImg = loadImage("ball.png");
  paddleImg = loadImage("paddle.png");
  brickImg =  loadImage("bricks.png");

  scoreImg = loadImage("score.png");

  hitSound = loadSound("./hit.mp3");
  brick_hit = loadSound("brick.mp3");
}

function setup() {
  createCanvas(windowWidth, windowHeight);

  wallTop = createSprite(width/2, 5, width , 10);
  wallTop.visible = false;
  wallTop.immovable = true;

  wallBottom = createSprite(width/2, height-5, width, 10);
  wallBottom. visible = false;
  wallBottom.immovable = true;

  wallLeft = createSprite(5, height/2, 10, height);
  wallLeft.visible = false;
  wallLeft.immovable = true;

  wallRight = createSprite(width-5, height/2, 10, height);
  wallRight.visible = false;
  wallRight.immovable = true;

  paddle = createSprite(width/2, height-20, 10, 10);
  paddle.scale = 0.4;
  paddle.addImage(paddleImg);
  paddle.immovable = true;

  ball = createSprite(width/2-20, height/2, 20, 20);
  ball.addImage(ballImg);
  ball.scale = 0.1;
  ball.maxSpeed = MAX_SPEED;
  paddle.shapeColor = color(0, 0, 255);

  bricks = new Group();

  var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
  var offsetY = 92;

  for(var r = 0; r<ROWS; r++)
    for(var c = 0; c<COLUMNS; c++) {
      var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
      brick.shapeColor = colors[r];
      bricks.add(brick);
      //brick.addImage(bricksImg);
      brick.immovable = true;
    }

  gameOver = createSprite(width/2,height/2+50,40,40);
  gameOver.addImage(gameOverImg);
  gameOver.visible = false;

  scoreSprite = createSprite(80,60,30,20);
  scoreSprite.addImage(scoreImg);
  scoreSprite.scale= 0.3;
}
function draw() {
  background(backgroundImg);

  if(gameState=== "PLAY"){

    paddle.position.x = constrain(mouseX, paddle.width/2, width-paddle.width/2);
    ball.bounce(wallTop);
    ball.bounce(wallLeft);
    ball.bounce(wallRight); 

    if(ball.bounce(paddle))
    {
      hitSound.play();

      var swing = (ball.position.x-paddle.position.x)/3;
      ball.setSpeed(MAX_SPEED, ball.getDirection()+swing);
      hitSound.setVolume(1);
    }
    
    ball.bounce(bricks, brickHit);

    if(bricks.length === 0){
      paddle.visible = false;
      ball.visible = false;
      win = createSprite(width/2, height/2+80,20,20);
      win.addImage(winImg);
      win.scale = 0.7;
    }

    if(ball.collide(wallBottom)){
      bricks.visible = false; 
      gameState = "END";
    }
  }

  if(gameState === "END"){
    gameOver.visible = true;
  }


  drawSprites();
  fill("white");
  textSize(40);
  text(score,70,95);
  
}

function brickHit(ball, brick) {
  brick.remove();
  brick_hit.play();
  score = score + 5;
}

function mousePressed() {
  if(ball.velocity.x == 0 && ball.velocity.y == 0){
    ball.setSpeed(MAX_SPEED, random(90-10, 90+10));
  }
}

function keyPressed(){
  if(keyCode == 82){
    score = 0;
    gameState = "PLAY";
    gameOver.visible = false;
    if(win)win.visible = false;
    paddle.visible = true;
    // ball.visible = true;
    // ball.x = 400;
    // ball.y = 400;

      ball = createSprite(width/2-20, height/2, 20, 20);
      ball.visible = true;
      ball.addImage(ballImg);
      ball.scale = 0.1;
      ball.maxSpeed = MAX_SPEED;
      paddle.shapeColor = color(0, 0, 255);
    

bricks.removeSprites();
      var offsetX = width/2-(COLUMNS-1)*(BRICK_MARGIN+BRICK_W)/2;
      var offsetY = 92;
    
      for(var r = 0; r<ROWS; r++)
        for(var c = 0; c<COLUMNS; c++) {
          var brick = createSprite(offsetX+c*(BRICK_W+BRICK_MARGIN), offsetY+r*(BRICK_H+BRICK_MARGIN), BRICK_W, BRICK_H);
          brick.shapeColor = colors[r];
          bricks.add(brick);
          //brick.addImage(bricksImg);
          brick.immovable = true;
        }
    
      // ball.x = 400;
      // ball.y = 400;
  alert(ball.visible)
  }
  
}