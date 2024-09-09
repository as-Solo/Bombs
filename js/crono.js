// Solo 06/09/2024

class Crono{
    constructor(time){
        this.time = time;
        this.minutes = Math.floor(this.time / 60).toString().padStart(2, '0');
        this.seconds = (this.time % 60).toString().padStart(2, '0');

        this.timeId = setInterval(()=>{
            this.time--
            this.minutes = Math.floor(this.time / 60).toString().padStart(2, '0');
            this.seconds = (this.time % 60).toString().padStart(2, '0');
            if (this.time <= 0){
                clearInterval(this.timeId)
            }
        }, 1000)
    }
}