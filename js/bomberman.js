class Bomberman{
    constructor(){
        this.x = 50;
        this.y = 50;
        this.w = 50;
        this.h = 50;
        this.speedBonus = 3;
        this.speed = 50 / this.speedBonus;
        this.vidas = 3;
        this.numBombs = 3;
        this.bombasPuestas = [];
        this.animation = null;
    }

    moveRigth(){};
    moveLeft(){};
    moveUp(){};
    moveDown(){};
    stop(){};
}