class Enemy{
    constructor(){
        this.x = 50;
        this.y = 50;
        this.w = 50;
        this.h = 50;
        this.speedBonus = 3;
        this.speed = 50 / this.speedBonus;
        this.isAlive = true;
        this.animation = null;
    }

    moveRigth(){};
    moveLeft(){};
    moveUp(){};
    moveDown(){};
    stop(){};
}