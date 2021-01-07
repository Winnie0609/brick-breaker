var bar, bricks

let playerScore = 0

function setup () {
  createCanvas(window.innerWidth, window.innerHeight)
  bar = createSprite(width / 2, height - 100, 150, 15)
  bar.shapeColor = color(255)
  bar.immovable = true

  wallTop = createSprite(1, +40, 5000, 1) 
  wallTop.shapeColor = color(0)
  wallTop.immovable = true
  wallRight = createSprite(-1, -1, 1, 5000 )
  wallRight.shapeColor = color(0)
  wallRight.immovable = true;
  wallLeft = createSprite(width, -100, 10, 5000 )
  wallLeft.shapeColor = color(0)
  wallLeft.immovable = true
  wallbottom = createSprite(width/2,height,width,10)
  wallbottom.immovable=true
  wallbottom.shapeColor = color(0)

  generatebricks()

  ball = createSprite(width / 2, height - 150, 15, 15)
  ball.shapeColor = color(198, 190, 250)
}

function generatebricks (){
bricks = new Group()
  let x = 8, y = 8, margin = 80, gap = 10
  let size = {
    x: (width - margin * 2 - gap * (x - 1)) / x,
    y: 25
  }
  for (var i = 0; i < x; i++) {
    for (var j = 0; j < y; j++) {
      let position = {
        x: margin + (size.x + gap) * i + size.x / 2,
        y: margin + (size.y + gap) * j + size.y / 2
      }
      let brick = createSprite(position.x, position.y, size.x, size.y)
      brick.shapeColor = color(255)
      brick.immovable = true
      bricks.add(brick)
    }
  }
}
var bar, bricks, fire = false
function draw () {
  background(0)

  bar.position.x = mouseX
  if (!fire) {
    ball.position.x = mouseX
  }

  ball.bounce(bar,hitbar)

  ball.bounce(bricks, hitBrick)
  ball.bounce(wallTop)
  ball.bounce(wallRight)
  ball.bounce(wallLeft)
  ball.bounce(wallbottom, hitonwallbottom )

  let c = color(0, 0, 100); 
  fill(c)
  noStroke()
  rect(0, 0, window.innerWidth,40 );
  
  fill(198, 190, 250);
  textSize(20);
  text(`Score:${playerScore}`, width/2, 30);
   
  drawSprites()
}

function hitbar(){
    ball.setSpeed(10, ball.getDirection() + (ball.position.x-bar.position.x)*0.5)
} 

function mousePressed () {
  if (!fire) {
    fire = true
    ball.setSpeed(10, -70)
  }
}

function hitBrick (ball, brick) {
  brick.remove()
  playerScore += 100
}

function hitonwallbottom(ball, wallbottom){
    bricks.removeSprites()
    generatebricks()
    fire = false
    ball.setSpeed(0)
    ball.position.y = height - 150
    playerScore = 0
}
