// Solo 06/09/2024

class Bomba{
    constructor(screen, left, top, distancia, demolition){
        this.screen = screen
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        this.sprite = ["./images/bomba/bomba_01.png", "./images/bomba/bomba_02.png", "./images/bomba/bomba_03.png", "./images/bomba/bomba_04.png"];
        this.spriteExCenter = ["./images/explosion/ex_01.png", "./images/explosion/ex_02.png", "./images/explosion/ex_03.png", "./images/explosion/ex_04.png", "./images/explosion/ex_05.png", "./images/explosion/ex_06.png", "./images/explosion/ex_07.png", "./images/explosion/ex_08.png", "./images/explosion/ex_09.png", "./images/explosion/ex_10.png", "./images/explosion/ex_11.png", "./images/explosion/ex_12.png", "./images/explosion/ex_13.png", "./images/explosion/ex_14.png"];
        this.distancia = distancia;
        this.atraviesa = demolition;
        this.explotar = false;
        this.isCollide = false

        this.llamaLeft = true;
        this.llamaRight = true;
        this.llamaTop = true;
        this.llamaBottom = true;

        this.llamas = []

        this.element = document.createElement("img");
        this.element.src = this.sprite[0];
        this.element.style.position = "absolute";
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        
        this.screen.appendChild(this.element);
        this.ticTac();
    }

    ticTac(){
        let sec = 0
        const bombId = setInterval(()=>{
            this.element.src = this.sprite[sec % 4];
            sec++;
            if (sec >= 12){
                this.explotar = true;
                clearInterval(bombId);
                // this.boom();
            }
        }, 250)
    }

    boom(){
        let sec = 0
        const bombId = setInterval(()=>{
            this.element.src = this.spriteExCenter[sec % 8];
            sec++;
            if (sec >= 8){
                clearInterval(bombId);
                const bombId2 = setInterval(()=>{
                    if (sec % 2 === 0){
                        this.element.src = this.spriteExCenter[7];
                    }
                    else{
                        this.element.src = this.spriteExCenter[8];
                    }
                    sec++;
                    if (sec >= 18){
                        clearInterval(bombId2);
                        const bombId3 = setInterval(()=>{
                            this.element.src = this.spriteExCenter[8 + sec % 6];
                            sec++;
                            if (sec >= 24){
                                this.element.style.display = "none"
                                clearInterval(bombId3);
                            }
                        }, 70)
                    }
                }, 70)
            }
        }, 70)

    }

    didCollide(left, right, top, bottom, obstacle){
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();

        if (playerRect.left + left < obstacleRect.right &&
            playerRect.right + right > obstacleRect.left &&
            playerRect.top + top < obstacleRect.bottom &&
            playerRect.bottom + bottom > obstacleRect.top){
            return true;
        }
        else {
            return false;
        }
    }
}