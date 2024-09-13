// Solo 06/09/2024

class Bomba{
    constructor(screen, left, top, distancia, demolition){
        this.screen = screen
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        this.sprite = ["./images/bomba/bomba_01.png", "./images/bomba/bomba_02.png", "./images/bomba/bomba_03.png", "./images/bomba/bomba_04.png"];
        this.pathCenter = "./images/explosion/center/"
        this.spriteExCenter = ["01.png", "02.png", "03.png", "04.png", "05.png", "06.png", "07.png", "08.png", "09.png", "10.png", "11.png", "12.png", "13.png", "14.png", "15.png"];
        
        this.distancia = distancia;
        
        this.atraviesa = demolition;
        
        this.explotar = false;

        this.isCollide = false;

        this.isRemovable = false;

        this.llamaLeft = 0;
        this.llamaRight = 0;
        this.llamaTop = 0;
        this.llamaBottom = 0;

        this.llamas = []

        this.element = document.createElement("img");
        this.element.src = this.sprite[0];
        this.element.style.position = "absolute";
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        
        this.screen.appendChild(this.element);

        this.audioExplosion = document.createElement('audio');
        this.audioExplosion.src = "./audio/Explosion.mp3";
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
            for (let i = 1; i<= this.llamaLeft; i++){
                let exploLeft = new Explosion(this.screen, (this.left - 50 * i), this.top, "left", this.distancia, i);
                this.llamas.push(exploLeft)
                console.log(this.distancia, i);

            }
        }
        if (this.llamaRight){
            for (let i = 1; i<= this.llamaRight; i++){
                let exploRight = new Explosion(this.screen, (this.left + 50 * i), this.top, "right", this.distancia, i);
                this.llamas.push(exploRight)
                console.log(this.distancia, i);

            }
        }
        if (this.llamaTop){
            for (let i = 1; i<= this.llamaTop; i++){
                let exploTop = new Explosion(this.screen, this.left, (this.top  - 50 * i), "top", this.distancia, i);
                this.llamas.push(exploTop)
                console.log(this.distancia, i);

            }
        }
        if (this.llamaBottom){
            for (let i = 1; i<= this.llamaBottom; i++){
                let exploBottom = new Explosion(this.screen, this.left, (this.top  + 50 * i), "bottom", this.distancia, i);
                this.llamas.push(exploBottom)
                console.log(this.distancia, i);
            }
        }

        this.audioExplosion.play()
        let sec = 0
        const bombId = setInterval(()=>{
            this.element.src = `${this.pathCenter}${this.spriteExCenter[sec]}`;
            sec++;
            if (sec >= 15){
                this.element.style.display = "none"
                this.llamas.forEach((llama)=>{
                    llama.element.remove()
                })
                this.llamas = []
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