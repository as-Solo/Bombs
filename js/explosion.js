class Explosion{
    constructor(screen, left, top, imgSrc){
        this.screen = screen
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;
        this.path = `./images/explosion/puntas/`
        this.sprite = [`${this.path}ex_01.png`, `${this.path}ex_02.png`, `${this.path}ex_03.png`, `${this.path}ex_04.png`, `${this.path}ex_05.png`, `${this.path}ex_06.png`, `${this.path}ex_07.png`, `${this.path}ex_08.png`, `${this.path}ex_09.png`, `${this.path}ex_10.png`, `${this.path}ex_11.png`, `${this.path}ex_12.png` , `${this.path}ex_13.png` , `${this.path}ex_14.png` , `${this.path}ex_15.png` , `${this.path}ex_16.png` , `${this.path}ex_17.png` , `${this.path}ex_18.png` , `${this.path}ex_19.png`];
    
        this.element =document.createElement("img");
        this.element.src = this.sprite[0];
        this.element.style.position = "absolute";
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.display = this.sprite[0];
        if (imgSrc == "bottom"){
            this.element.style.transform = "rotate(90deg)"
        }
        else if (imgSrc == "top"){
            this.element.style.transform = "rotate(-90deg)"
        }
        else if (imgSrc == "left"){
            this.element.style.transform = "rotate(180deg)"
        }
        this.screen.appendChild(this.element);
        this.boom();
    }

    boom(){
        
        let sec = 0
        const bombId = setInterval(()=>{
            this.element.src = this.sprite[sec];
            sec++;    
            if (sec >=19){
                this.element.style.display = "none"
                clearInterval(bombId);
            }
        }, 70)
    }
}