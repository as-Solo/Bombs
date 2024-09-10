// Solo 06/09/2024

class Crono{
    constructor(time){
        this.time = time;
        this.transcurrido = 0
        this.minutes = Math.floor(this.time / 60).toString().padStart(2, '0');
        this.seconds = (this.time % 60).toString().padStart(2, '0');
        this.minutesT = Math.floor(this.time / 60).toString().padStart(2, '0');
        this.secondsT = (this.time % 60).toString().padStart(2, '0');

        this.timeId = setInterval(()=>{
            this.time--;
            this.transcurrido++;
            this.minutes = Math.floor(this.time / 60).toString().padStart(2, '0');
            this.seconds = (this.time % 60).toString().padStart(2, '0');
            this.minutesT = Math.floor(this.transcurrido / 60).toString().padStart(2, '0');
            this.secondsT = (this.transcurrido % 60).toString().padStart(2, '0');
            if (this.time <= 0){
                clearInterval(this.timeId)
            }
        }, 1000)
    }
}