class gameData{
    constructor(){
        this.mapW;
        this.mapH;
        this.numEnemies = 1;
        this.enemies = [];
        this.enemiesPos = [[x, y]];
        this.puerta = [x, y];
        this.muros = [];
        this.muroPosition = [[x, y], [x, y], [x, y]]
    }
}