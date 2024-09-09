// Solo 06/09/2024

class Bomberman{
    constructor(screen, left, top, imgSrc){
        this.screen = screen;
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        // this.isColide = false; //deprecated
        this.canMoveLeft = true;
        this.canMoveRight = true;
        this.canMoveUp = true;
        this.canMoveDown = true;
        
        this.element =document.createElement("img");
        this.element.src = imgSrc;
        this.element.style.position = "absolute";
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        
        this.screen.appendChild(this.element);
        
        this.leftDirection = 0;
        this.topDirection = 0;
        this.speedBonus = 1;
        this.speedDistance = 10
        this.speed = Math.round(50 / (this.speedDistance - this.speedBonus));
        this.vidas = 3;
        this.numBombs = 3;
        this.distancia = 1;
        this.demolition = false;
        this.bombasPuestas = [];
        this.animation = null;
    }

    move(){
        this.left += this.speed * this.leftDirection;
        this.top += this.speed * this.topDirection;
        this.updatePosition();
        // console.log("alto  " + this.top)
    };
    
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
    // moveLeft(){};
    // moveUp(){};
    // moveDown(){};
    stop(){};
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

    checkCollisionBombs(){
        let respuesta = true
        if (this.bombasPuestas.length > 0){
            this.bombasPuestas.forEach((bomba)=>{
                const playerRect = this.element.getBoundingClientRect();
                const obstacleRect = bomba.element.getBoundingClientRect();
                if (playerRect.left < obstacleRect.right &&
                    playerRect.right > obstacleRect.left &&
                    playerRect.top < obstacleRect.bottom &&
                    playerRect.bottom > obstacleRect.top){
                    respuesta = respuesta && false;
                    // console.log("Encima")
                }
                else {
                    respuesta = respuesta && true;
                    // console.log("no superpuesta")
                }
            })
        }
        return respuesta
    }

    ponerBomba(){
        let bombLeft = this.left;
        let bombTop = this.top;

        if (this.top % 50 <= 25)
            bombTop = this.top - (this.top % 50)
        else{
            bombTop = 50 - (this.top % 50) + this.top
        }

        if (this.left % 50 <= 25)
            bombLeft = this.left - (this.left % 50)
        else{
            bombLeft = 50 - (this.left % 50) + this.left
        }
        if (this.bombasPuestas.length < this.numBombs && this.checkCollisionBombs()){
            const bomba = new Bomba(this.screen, bombLeft, bombTop, this.distancia, this.demolition);
            this.bombasPuestas.push(bomba);
        }
    };
}
