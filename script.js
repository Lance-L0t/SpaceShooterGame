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
  enemySpawn() {
    if (this.enemyList.length < 10) 
      {
      this.enemyList.push(new Enemy(Math.floor(Math.random() * canvas.width), -40));
      console.log(this.enemyList.length);
    }
    this.enemyList.forEach((en ,index) => {
      en.updateEnemy();
    });
  }
  update() {
    this.drawPlayer();
    this.movePlayer();
    this.enemySpawn();
    this.fireBullet();
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
    this.x = x;
    this.y = y;
    this.width = 40;
    this.height = 40;
    this.enemySpeed = 5;
  }
  drawEnemy() {
    ctx.fillStyle = "blue";
    ctx.fillRect(this.x, this.y, this.width, this.height);
  }
  updateEnemy(){
    this.drawEnemy();
    this.y += this.enemySpeed
  }
}

let player = new Player(350, 640);


function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  player.update();

  requestAnimationFrame(animate);
}

animate();
