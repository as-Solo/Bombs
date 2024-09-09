// Solo 06/09/2024

class Enemy{
    constructor(left, top, screen, leftDirection, topDirection){
        this.screen = screen;
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        this.leftDirection = leftDirection;
        this.topDirection = topDirection;
        this.speedBonus = 1;
        this.speedDistance = 30
        this.speed = Math.round(50 / (this.speedDistance - this.speedBonus));
        this.isAlive = true;

        this.path = "./images/enemy/bottom/"
        this.sprite = ['en_01.png', 'en_02.png', 'en_03.png', 'en_04.png']

        this.element =document.createElement("img");
        this.element.src = `${this.path}${this.sprite[0]}`;
        this.element.style.position = "absolute";
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        
        this.screen.appendChild(this.element);

        this.animationId = null;
        this.movementId = null;

        this.animation();
        this.move()
        
    }
    animation(){

        let i = 0;
        this.animationId = setInterval(()=>{
            if (this.topDirection === 1){
                this.path = "./images/enemy/bottom/"
            }
            if (this.topDirection === -1){
                this.path = "./images/enemy/top/"
            }
            if (this.leftDirection === -1){
                this.path = "./images/enemy/left/"
            }
            if (this.leftDirection === 1){
                this.path = "./images/enemy/right/"
            }
            i++;
            this.element.src = `${this.path}${this.sprite[i%4]}`;
        }, 200)
    }
    move(){
        this.movementId = setInterval(()=>{
            this.left += this.speed * this.leftDirection;
            this.top += this.speed * this.topDirection;
            this.updatePosition();
        }, 1000/60)
        // console.log("alto  " + this.top)
    };
    updatePosition(){
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;   
    }
    didCollide(obstacle){
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (playerRect.left < obstacleRect.right &&
            playerRect.right > obstacleRect.left &&
            playerRect.top < obstacleRect.bottom &&
            playerRect.bottom > obstacleRect.top){
            return true;
        }
        else {
            return false;
        }
    }

    willCollide(obstacle, leftDirection, topDirection){
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
        if (playerRect.left + (this.speed * leftDirection) < obstacleRect.right &&
            playerRect.right + (this.speed * leftDirection) > obstacleRect.left &&
            playerRect.top + (this.speed * topDirection) < obstacleRect.bottom &&
            playerRect.bottom + (this.speed * topDirection) > obstacleRect.top){
            return true;
        }
        else {
            return false;
        }
    }

    ajustarAlto(){
        let resultado = this.top;
        let decenas = this.top % 100

        if (decenas < 30){
            resultado = (this.top - decenas)
        }

        else if (decenas >= 40 && decenas <= 65){
            resultado = (this.top - decenas + 50)
        }
        else if (decenas > 70){
            resultado = (this.top - decenas + 100)
        }
        if (resultado <= 50){
            resultado = 50;
        }
        if (resultado >= this.screen.offsetHeight - 50){
            resultado = this.screen.offsetHeight - 50;
        }
        this.top = resultado;
    }

    ajustarLeft(){
        let resultado = this.left;
        let decenas = this.left % 100

        if (decenas < 30){
            resultado = (this.left - decenas)
        }

        else if (decenas >= 40 && decenas <= 65){
            resultado = (this.left - decenas + 50)
        }
        else if (decenas > 70){
            resultado = (this.left - decenas + 100)
        }
        if (resultado <= 50){
            resultado = 50;
        }
        if (resultado >= this.screen.offsetWidth){
            resultado = this.screen.offsetWidth;
        }
        this.left = resultado;
    }
    // moveRigth(){};
    // moveLeft(){};
    // moveUp(){};
    // moveDown(){};
    stop(){};
}