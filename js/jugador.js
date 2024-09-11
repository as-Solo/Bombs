class Jugador{
    constructor(name){
        this.name = name;
        this.puntuaciones = [];
    }
    addPoints(points){
        this.puntuaciones.push(points);
    }
}