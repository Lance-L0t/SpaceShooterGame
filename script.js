const canvas = document.querySelector("canvas");
canvas.width = 700;
canvas.height = 700;
canvas.style.backgroundColor = "black";

const ctx = canvas.getContext("2d");

class Player {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.health = 3;
    this.handleClickEvents();
    this.movement = {
      left: false,
      right: false,
    };
    this.hasHit = {
      left: false,
      right: false,
    };
    this.speed = 5;
    this.fire = false;
    this.bulletSpeed = 10;
    this.bulletList = [];
    this.enemyList = [];
    this.showEnemy = false;
    this.isGameOver = false;
    this.frames = 0;
    this.framesPerEnemy = 30;
  }
  drawPlayer() {
    ctx.fillStyle = "lime";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  handleClickEvents() {
    window.addEventListener("keydown", (e) => {
      if (e.key === "ArrowLeft") {
        this.movement.left = true;
      }
      if (e.key === "ArrowRight") {
        this.movement.right = true;
      }
      if (e.key === "ArrowUp") {
        this.fire = true;
      }
      this.showEnemy = true;
    });
    window.addEventListener("keyup", (e) => {
      if (e.key === "ArrowLeft") {
        this.movement.left = false;
      }
      if (e.key === "ArrowRight") {
        this.movement.right = false;
      }
      if (e.key === "ArrowUp") {
        this.fire = false;
      }
    });
  }
  movePlayer() {
    if (this.movement.left) {
      this.x += -this.speed;
    }
    if (this.movement.right) {
      this.x += this.speed;
    }
    if (this.hasHit.left) {
      this.x = 0;
      this.hasHit.left = false;
    }
    if (this.hasHit.right) {
      this.x = canvas.width - this.width;
      this.hasHit.right = false;
    }
  }
  wallCollision() {
    if (this.x > canvas.width - this.width) {
      this.hasHit.right = true;
    }
    if (this.x < 0) {
      this.hasHit.left = true;
    }
  }
  fireBullet() {
    if (
      this.fire &&
      this.bulletList.length < 10 &&
      this.bulletList.length != 10
    ) {
      let bulletX = this.x + this.width / 2 - 2.5; // Center of ship
      let bulletY = this.y;
      this.bulletList.push(new Bullet(bulletX, bulletY));
      this.fire = false;
    }
    this.bulletList.forEach((element, index) => {
      element.update();
      if (element.y < 0) {
        this.bulletList.splice(index, 1);
      }
    });
    

  }
  checkEnemyCollision(){
    //Has a problem
    this.enemyList.forEach((enemy)=>{
      if((this.y + this.height) < (enemy.y + enemy.height) && this.y < enemy.y){
        this.isGameOver = true;
        console.log(this.isGameOver);
      }
    })
  }
  enemySpawn() {
    this.frames++;
    if (this.frames >= this.framesPerEnemy){
      this.enemyList.push(new Enemy());
      this.frames = 0;
      this.framesPerEnemy = Math.floor(Math.random() * 30);
    }
    this.enemyList.forEach((enemy)=>{
      enemy.updateEnemy();
    })
  }
  update() {
    this.drawPlayer();
    this.movePlayer();
    this.enemySpawn();
    this.fireBullet();
    this.checkEnemyCollision();
    this.wallCollision();
  }
}

class Bullet {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.width = 5;
    this.height = 5;
  }

  drawBullet() {
    ctx.fillStyle = "red";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  update() {
    this.drawBullet();
    this.y += -5;
  }
}

//Enemy
class Enemy {
  constructor(x, y) {
    this.width = 40;
    this.height = 40;
    this.x = Math.floor(Math.random() * canvas.width - this.width);
    this.y = -this.height;
    this.enemySpeed = 5;
  }
  drawEnemy() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  updateEnemy(){
    this.drawEnemy();
    this.y += this.enemySpeed;
  }
}

let player = new Player(350, 640);


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();

  requestAnimationFrame(animate);
}

animate();
