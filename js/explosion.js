class Explosion{
    constructor(screen, left, top){
        this.screen = screen
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        this.sprite = ["./images/explosion/ex_01.png", "./images/explosion/ex_02.png", "./images/explosion/ex_03.png", "./images/explosion/ex_04.png", "./images/explosion/ex_05.png", "./images/explosion/ex_06.png", "./images/explosion/ex_07.png", "./images/explosion/ex_08.png", "./images/explosion/ex_09.png", "./images/explosion/ex_10.png", "./images/explosion/ex_11.png", "./images/explosion/ex_12.png", "./images/explosion/ex_13.png", "./images/explosion/ex_14.png"];
    
        this.element =document.createElement("img");
        this.element.src = this.sprite[0];
        this.element.style.position = "absolute";
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        
        this.screen.appendChild(this.element);
        this.boom();
    }

    boom(){
        let sec = 0
        const bombId = setInterval(()=>{
            this.element.src = this.sprite[sec % 8];
            sec++;
            if (sec >= 8){
                clearInterval(bombId);
                const bombId2 = setInterval(()=>{
                    if (sec % 2 === 0){
                        this.element.src = this.sprite[7];
                    }
                    else{
                        this.element.src = this.sprite[8];
                    }
                    sec++;
                    if (sec >= 18){
                        clearInterval(bombId2);
                        const bombId3 = setInterval(()=>{
                            this.element.src = this.sprite[8 + sec % 6];
                            sec++;
                            if (sec >= 24){
                                clearInterval(bombId3);
                                this.element.style.display = "none";
                            }
                        }, 70)
                    }
                }, 70)
            }
        }, 70)

    }
}