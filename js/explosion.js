class Explosion{
    constructor(screen, left, top, imgSrc, distance, end){
        this.screen = screen
        this.left = left;
        this.top = top;
        this.w = 50;
        this.h = 50;

        this.distance= distance
        this.end = end;

        this.pathMid = `./images/explosion/mid/`
        this.pathEnd = `./images/explosion/end/`
        this.sprite = ['01.png', '02.png', '03.png', '04.png', '05.png', '06.png', '07.png', '08.png', '09.png', '10.png', '11.png', '12.png' , '13.png' , '14.png' , '15.png' ];
    
        this.element =document.createElement("img");
        this.element.style.display = "none"
        this.element.style.position = "absolute";
        this.element.style.width = `${this.w}px`;
        this.element.style.height = `${this.h}px`;
        this.element.style.left = `${this.left}px`;
        this.element.style.top = `${this.top}px`;
        this.element.style.display = this.sprite[0];
        if (imgSrc == "bottom"){
            this.element.style.transform = "rotate(90deg) scaleY(-1)"
        }
        else if (imgSrc == "top"){
            this.element.style.transform = "rotate(-90deg)"

        }
        else if (imgSrc == "left"){
            // this.element.style.transform = "scaleX(-1) scaleY(-1"
            this.element.style.transform = "rotate(180deg)"

        }
        this.screen.appendChild(this.element);
        this.boom();
    }

    boom(){
        
        let sec = 0
        const bombId = setInterval(()=>{
            this.element.src = `${this.pathEnd}${this.sprite[sec]}`;
            if (this.end === 1){
                this.element.style.display = "block"
            }
            sec++;
            if (sec >= 5){
                this.element.style.display = "block"
                if (this.distance !== this.end){
                    this.element.src = `${this.pathMid}${this.sprite[sec]}`;
                }
                else{
                    this.element.src = `${this.pathEnd}${this.sprite[sec]}`;
                }
            }
            if (sec >=14){
                this.element.style.display = "none"
                clearInterval(bombId);
            }
        }, 70)
    }

    didCollide(obstacle){
       
        if (
            this.left < obstacle.left + obstacle.w &&
            this.left + this.w > obstacle.left &&
            this.top < obstacle.top + obstacle.h &&
            this.h + this.top > obstacle.top
          ){
            return true
          }
        else {
            return false;
        }
    }
}