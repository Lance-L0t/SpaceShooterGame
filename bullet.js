class Bullet{
    constructor(x, y){
        this.x =x;
        this.y = y;
        this.width = 5;
        this.height = 5;
        this.trigger();
        this.fire = false;
        this.bulletSpeed = 10;
    }
    trigger(){
        window.addEventListener('keydown', (e)=>{
            if(e.key === 'ArrowUp'){
                this.fire = true;
            }
        })
        window.addEventListener('keydown', (e)=>{
            if(e.key === 'ArrowUp'){
                this.fire = false;
            }
        })
    }
    drawBullet(){
        ctx.fillStyle='lime';
        ctx.fillRect(this.x ,this.y , this.width ,this.height);
    }
    fireBullet(){
        if(this.fire){
            this.y += -this.bulletSpeed;
        }
    }


}