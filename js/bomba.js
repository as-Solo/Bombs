// Solo 06/09/2024

class Bomba{
    constructor(screen, left, top, distancia, demolition){
        this.screen = screen
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        this.sprite = ["./images/bomba/bomba_01.png", "./images/bomba/bomba_02.png", "./images/bomba/bomba_03.png", "./images/bomba/bomba_04.png"];
        this.spriteExCenter = ["./images/Explosion/ex_01.png", "./images/Explosion/ex_02.png", "./images/Explosion/ex_03.png", "./images/Explosion/ex_04.png", "./images/Explosion/ex_05.png", "./images/Explosion/ex_06.png", "./images/Explosion/ex_07.png", "./images/Explosion/ex_08.png", "./images/Explosion/ex_09.png", "./images/Explosion/ex_10.png", "./images/Explosion/ex_11.png", "./images/Explosion/ex_12.png", "./images/Explosion/ex_13.png", "./images/Explosion/ex_14.png", "./images/Explosion/ex_15.png", "./images/Explosion/ex_16.png", "./images/Explosion/ex_17.png", "./images/Explosion/ex_18.png", "./images/Explosion/ex_19.png"];
        this.distancia = distancia;
        this.atraviesa = demolition;
        this.explotar = false;

        this.isCollide = false;

        this.isRemovable = false;

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
                this.boom();
            }
        }, 250)
    }

    boom(){
        if (this.llamaLeft){
            let llamaLeft = new Explosion(this.screen, this.left - 50, this.top, "left");
            this.llamas.push(llamaLeft)
        }
        if (this.llamaRight){
            let llamaRight = new Explosion(this.screen, this.left + 50, this.top, "right");
            this.llamas.push(llamaRight)
        }
        if (this.llamaTop){
            let llamaTop = new Explosion(this.screen, this.left, this.top  - 50, "top");
            this.llamas.push(llamaTop)
        }
        if (this.llamaBottom){
            let llamaBottom = new Explosion(this.screen, this.left, this.top  + 50, "bottom");
            this.llamas.push(llamaBottom)
        }
        let sec = 0
        const bombId = setInterval(()=>{
            this.element.src = this.spriteExCenter[sec];
            sec++;
            if (sec >= 19){
                this.element.style.display = "none"
                this.llamas.forEach((llama)=>{
                    llama.element.remove()
                })
                this.isRemovable = true; 
                clearInterval(bombId);
            }
        }, 70)
    }

    didCollide(left, right, top, bottom, obstacle){
        const playerRect = this.element.getBoundingClientRect();
        const obstacleRect = obstacle.getBoundingClientRect();
       
        if (playerRect.left - left < obstacleRect.right &&
            playerRect.right + right > obstacleRect.left &&
            playerRect.top - top < obstacleRect.bottom &&
            playerRect.bottom + bottom > obstacleRect.top){
            return true;
        }
        else {
            return false;
        }
    }
}