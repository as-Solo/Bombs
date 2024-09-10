// Solo 06/09/2024

class GameData{
    constructor(){
        this.startScreen = document.querySelector("#inicio");
        this.gameScreen = document.querySelector("#game");
        this.gameBoard = document.querySelector("#game-board");
        this.gameEndScreen = document.querySelector("#ranking");
        this.numBombs = document.querySelector("#bombas span");
        this.speed = document.querySelector("#speed");
        this.numVidas = document.querySelector("#vidas");
        this.minutos = document.querySelector("#crono .minutos");
        this.segundos = document.querySelector("#crono .segundos");
        this.gameOverScreen = document.querySelector("#game-over");
        this.nextLevelScreen = document.querySelector("#next-level");
        this.textoBombas = document.querySelector("#bombas-usadas");
        this.textoTime = document.querySelector("#tiempo-total");
        this.textoMuertos = document.querySelector("#enemigos-eliminados");
        this.textoKillScore = document.querySelector("#kill-score");
        this.textoKillScoreSum = document.querySelector("#kill-score-sum");
        this.textoTitleScore = document.querySelector("#tittle-score");
        this.textoTitleScoreSum = document.querySelector("#tittle-score-sum");
        this.textoTimeScore = document.querySelector("#time-score");
        this.textoTimeScoreSum = document.querySelector("#time-score-sum");
        this.textoTotalScore = document.querySelector("#total-score");
        
        this.enemiesKill = 0;
        this.bombsUsed = 0;
        this.pointsEchKill = 300;
        this.pointsTime = 0;
        this.titlePoints = 550;
        this.wallDestroyed = 0;
        //tiempo de game - tiempo transcurrido de crono * 150
        // ya pensaremos algo para el numero de bombas, los titulos y sus puntuaciones
        //[piromano, francotirador, activista, manco]

        this.width = 1100;
        this.height = 750;
        // this.enemiesPos = [['x', 'y']]; //deprecated
        // this.puerta = ['x', 'y']; // deprecated
        this.numEnemies = 0;
        this.enemies = [];
        this.indexEnemiesDel = new Set();

        this.muros = [];
        this.indexMurosDel = new Set();

        this.map = [
            '11111111111111111',
            '100000000000000e1',
            '10101210101010101',
            '10002020000000001',
            '1e101010101010101',
            '10002000S00000001',
            '10101010101010101',
            '10002000000000001',
            '10101010101010101',
            '1e00000000000e001',
            '11111111111111111',
        ]
        this.elementosColisionables = [];

        this.tiempo = 342; //342
        // this.scores = 0 // deprecated
        this.lives = 3;

        this.gameIsOver = false;
        this.nextStage = false;

        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000/60

        this.initialPosition = [50, 50]
        this.player = new Bomberman(this.gameBoard, this.initialPosition[0], this.initialPosition[1]);
        this.crono = new Crono(this.tiempo);
        this.puerta = null;
    }


    // muros vs jugador. muro vs enemigos.
    checkCollisionsWalls(){
        for (let i = this.muros.length - 1; i >= 0 ; i--) {
           
            // BLOQUEAR EL MOVIMIENTO DEL JUGADOR CONTRA LOS MUROS
            // --------------------------------------------------------------------------------------------------
            const obstacle = this.muros[i];

            if (this.player.willCollide(obstacle.element, -1, 0)) {
                this.player.canMoveLeft = false;
            }
            else{
                this.player.canMoveLeft = true
            }
            if (this.player.willCollide(obstacle.element, 1, 0)) {
                this.player.canMoveRight = false;
            }
            else{
                this.player.canMoveRight = true
            }
            if (this.player.willCollide(obstacle.element, 0, -1)) {
                this.player.canMoveUp = false;
            }
            else{
                this.player.canMoveUp = true
            }
            if (this.player.willCollide(obstacle.element, 0, 1)) {
                this.player.canMoveDown = false;
            }
            else{
                this.player.canMoveDown = true
            }

            if (!this.player.canMoveLeft && this.player.leftDirection === -1) {
                this.player.leftDirection = 0;
            }
            if (!this.player.canMoveRight && this.player.leftDirection === 1) {
                this.player.leftDirection = 0;
            }
            if (!this.player.canMoveUp && this.player.topDirection === -1) {
                this.player.topDirection = 0;
            }
            if (!this.player.canMoveDown && this.player.topDirection === 1) {
                this.player.topDirection = 0;
            }
            // ------------------------------   HASTA AQUI JUGADOR MUROS   --------------------------------------
            // --------------------------------------------------------------------------------------------------
            // ------------------------------    EMPIEZA LOOP ENEMIGOS     --------------------------------------
            for (let j = this.enemies.length - 1; j >= 0; j--){
                const enemigo = this.enemies[j];
                if (!this.player.inmune && enemigo.didCollide(this.player.element)){
                    this.player.dies(this.initialPosition[0], this.initialPosition[1])
                }//sacar de este bucle

                if (enemigo.willCollide(obstacle.element, -1, 0)) {
                    enemigo.canMoveLeft = false;
                }
                else{
                    enemigo.canMoveLeft = true
                }
                if (enemigo.willCollide(obstacle.element, 1, 0)) {
                    enemigo.canMoveRight = false;
                }
                else{
                    enemigo.canMoveRight = true
                }
                if (enemigo.willCollide(obstacle.element, 0, -1)) {
                    enemigo.canMoveUp = false;
                }
                else{
                    enemigo.canMoveUp = true
                }
                if (enemigo.willCollide(obstacle.element, 0, 1)) {
                    enemigo.canMoveDown = false;
                }
                else{
                    enemigo.canMoveDown = true
                }
                if (!enemigo.canMoveLeft && enemigo.leftDirection !== 0) {
                    enemigo.leftDirection *= -1;
                }
                if (!enemigo.canMoveRight && enemigo.leftDirection !== 0) {
                    enemigo.leftDirection *= -1;
                }
                if (!enemigo.canMoveUp && enemigo.topDirection !== 0) {
                    enemigo.topDirection *= -1;
                }
                if (!enemigo.canMoveDown && enemigo.topDirection !== 0) {
                    enemigo.topDirection *= -1;
                }
                if (enemigo.didCollide(obstacle.element)){
                    // console.log('ding')
                    enemigo.topDirection = 0;
                    enemigo.leftDirection = 0;
                    enemigo.ajustarLeft();
                    enemigo.ajustarAlto();
                    setTimeout(()=>{
                        if (enemigo.willCollide(obstacle.element, 0, 1) && enemigo.willCollide(obstacle.element, 0, -1)){
                            enemigo.topDirection = 0;
                        }
                        if (enemigo.willCollide(obstacle.element, 1, 0) && enemigo.willCollide(obstacle.element, -1, 0)){
                            enemigo.leftDirection = 0;
                        }
                        if (!enemigo.willCollide(obstacle.element, 0, -1)){
                            enemigo.topDirection = 1;
                        }
                        else if (!enemigo.willCollide(obstacle.element, 0, 1)){
                            enemigo.topDirection = -1;
                        }
                        else if (!enemigo.willCollide(obstacle.element, 1, 0)){
                            enemigo.leftDirection = -1;
                        }
                        else if (!enemigo.willCollide(obstacle.element, -1, 0)){
                            enemigo.leftDirection = 1;
                        }
                    }, 100)
                }
                // --------------------------   HASTA AQUI ENEMIGOS MUROS/JUGADOR   ---------------------------------
                // --------------------------------------------------------------------------------------------------
                // ------------------------------    EMPIEZA LOOP BOMBAS     --------------------------------------
                for (let k = this.player.bombasPuestas.length - 1; k >= 0; k--){
                    
                    const bomba = this.player.bombasPuestas[k];
                    
                    // -----------------------     DESTRUCCION DE MUROS    -------------------------
                    if ((obstacle instanceof Muro) && (bomba.didCollide(50, 0, 0, 0, obstacle.element))){
                        bomba.llamaLeft = false;
                        // console.log("left")
                    }
                    else if(bomba.explotar && (obstacle instanceof Ladrillo) && (bomba.didCollide(50, 0, 0, 0, obstacle.element))){
                        this.indexMurosDel.add(i);
                        // this.muros.splice(i, 1)
                        setTimeout(()=>{
                            obstacle.element.remove()
                            obstacle.element.style.display = "none"
                        }, 500)
                    }
                    if ((obstacle instanceof Muro) && (bomba.didCollide(0, 50, 0, 0, obstacle.element))){
                        bomba.llamaRight = false;
                        // console.log("right")
        
                    }
                    else if(bomba.explotar && (obstacle instanceof Ladrillo) && (bomba.didCollide(0, 50, 0, 0, obstacle.element))){
                        this.indexMurosDel.add(i);
                        // this.muros.splice(i, 1)
                        setTimeout(()=>{
                            obstacle.element.remove()
                            obstacle.element.style.display = "none"
                        }, 500)
                    }
                    if ((obstacle instanceof Muro) && (bomba.didCollide(0, 0, 50, 0, obstacle.element))){
                        bomba.llamaTop = false;
                        // console.log("top")
        
                    }
                    else if(bomba.explotar && (obstacle instanceof Ladrillo) && (bomba.didCollide(0, 0, 50, 0, obstacle.element))){
                        this.indexMurosDel.add(i);
                        // this.muros.splice(i, 1)
                        setTimeout(()=>{
                            obstacle.element.remove()
                            obstacle.element.style.display = "none"
                        }, 500)
                    }
                    if ((obstacle instanceof Muro) && (bomba.didCollide(0, 0, 0, 50, obstacle.element))){
                        bomba.llamaBottom = false;
                        // console.log("bottom")
        
                    }
                    else if(bomba.explotar && (obstacle instanceof Ladrillo) && (bomba.didCollide(0, 0, 0, 50, obstacle.element))){
                        this.indexMurosDel.add(i);
                        // this.muros.splice(i, 1)
                        setTimeout(()=>{
                            obstacle.element.remove()
                            obstacle.element.style.display = "none"
                        }, 500)
                    }

                    // =================    MUERTE DE ENEMIGOS Y DE PLAYER    ==========================

                    if(bomba.explotar && (bomba.explotar) &&
                        (bomba.didCollide(50, 0, 0, 0, enemigo.element) ||
                        bomba.didCollide(0, 50, 0, 0, enemigo.element) ||
                        bomba.didCollide(0, 0, 50, 0, enemigo.element) ||
                        bomba.didCollide(0, 0, 0, 50, enemigo.element) ||
                        bomba.didCollide(0, 0, 0, 0, enemigo.element))){
                            enemigo.dies()
                            this.indexEnemiesDel.add(j);            
                    }
                    if(!this.player.inmune && bomba.explotar && (bomba.explotar) &&
                        (bomba.didCollide(50, 0, 0, 0, this.player.element) ||
                        bomba.didCollide(0, 50, 0, 0, this.player.element) ||
                        bomba.didCollide(0, 0, 50, 0, this.player.element) ||
                        bomba.didCollide(0, 0, 0, 50, this.player.element) ||
                        bomba.didCollide(0, 0, 0, 0, this.player.element))){
                            this.player.dies(this.initialPosition[0], this.initialPosition[1])    
                    }
                    if (!bomba.didCollide(0, 0, 0, 0, this.player.element)){
                        bomba.isCollide = true;
                    }

                    // ---------------------- COLISIONES CON ENEMIGOS Y BOMBAS PUESTAS ---------------------
                    if (bomba.isCollide && enemigo.willCollide(bomba.element, -1, 0)) {
                        enemigo.canMoveLeft = false;
                        // console.log("colisiono", enemigo.canMoveLeft)
                    }
                    else{
                        enemigo.canMoveLeft = true
                    }
                    if (bomba.isCollide && enemigo.willCollide(bomba.element, 1, 0)) {
                        enemigo.canMoveRight = false;
                        // console.log("colisiono", enemigo.canMoveRight)
                        
                    }
                    else{
                        enemigo.canMoveRight = true
                    }
                    if (bomba.isCollide && enemigo.willCollide(bomba.element, 0, -1)) {
                        enemigo.canMoveUp = false;
                        console.log("colisiono", enemigo.canMoveUp)

                    }
                    else{
                        enemigo.canMoveUp = true
                    }
                    if (bomba.isCollide && enemigo.willCollide(bomba.element, 0, 1)) {
                        enemigo.canMoveDown = false;
                        console.log("colisiono  ", enemigo.canMoveDown)

                    }
                    else{
                        enemigo.canMoveDown = true
                    }
                    if (!enemigo.canMoveLeft && enemigo.leftDirection !== 0) {
                        enemigo.leftDirection *= -1;
                    }
                    if (!enemigo.canMoveRight && enemigo.leftDirection !== 0) {
                        enemigo.leftDirection *= -1;
                    }
                    if (!enemigo.canMoveUp && enemigo.topDirection !== 0) {
                        enemigo.topDirection *= -1;
                    }
                    if (!enemigo.canMoveDown && enemigo.topDirection !== 0) {
                        enemigo.topDirection *= -1;
                    }
                    // ==================   COLISIONES DE JUGADOR Y BOMBA   ====================
                    if (bomba.isCollide && this.player.willCollide(bomba.element, -1, 0)) {
                        this.player.canMoveLeft = false;
                    }
                    else{
                        this.player.canMoveLeft = true
                    }
                    if (bomba.isCollide && this.player.willCollide(bomba.element, 1, 0)) {
                        this.player.canMoveRight = false;
                    }
                    else{
                        this.player.canMoveRight = true
                    }
                    if (bomba.isCollide && this.player.willCollide(bomba.element, 0, -1)) {
                        this.player.canMoveUp = false;
                    }
                    else{
                        this.player.canMoveUp = true
                    }
                    if (bomba.isCollide && this.player.willCollide(bomba.element, 0, 1)) {
                        this.player.canMoveDown = false;
                    }
                    else{
                        this.player.canMoveDown = true
                    }
        
                    if (!this.player.canMoveLeft && this.player.leftDirection === -1) {
                        this.player.leftDirection = 0;
                    }
                    if (!this.player.canMoveRight && this.player.leftDirection === 1) {
                        this.player.leftDirection = 0;
                    }
                    if (!this.player.canMoveUp && this.player.topDirection === -1) {
                        this.player.topDirection = 0;
                    }
                    if (!this.player.canMoveDown && this.player.topDirection === 1) {
                        this.player.topDirection = 0;
                    }
                }
            }
        }
    }

    // explosion vs muros. explosion vs enemigos. explosion vs jugador.
    checkCollisionExplosion() {}

    // enemigos vs jugador
    checkCollisionEnemyPlayer() {}
    
    // bombs vs jugador. bomb vs enemigo
    checkCollisionBomb() {}


    start(){
        this.gameScreen.style.height = `${this.height}px`;
        this.gameScreen.style.width = `${this.width}px`;
        for (let i = 0; i<this.map.length; i++){
            for (let j = 0; j<this.map[i].length; j++){
                if (this.map[i][j] === '1'){
                    const muro = new Muro(j*50, i*50, this.gameBoard)
                    this.muros.push(muro)
                }
                else if (this.map[i][j] === '2'){
                    const ladrillo = new Ladrillo(j*50, i*50, this.gameBoard)
                    this.muros.push(ladrillo)
                }
                else if (this.map[i][j] === 'e'){
                    let randomDirection = (Math.floor(Math.random()* 2))
                    // console.log(randomDirection)
                    const enemy = new Enemy(j*50, i*50, this.gameBoard, 0, 1)
                    this.enemies.push(enemy)
                    this.numEnemies++;
                }
                else if (this.map[i][j] === 'S'){
                    this.puerta = new Puerta(j*50, i*50, this.gameBoard)
                }
            }
        }
        this.startScreen.style.display = "none";
        this.gameScreen.style.display = "flex";

        this.gameIntervalId = setInterval(() => {this.gameLoop()}, this.gameLoopFrequency)
    };

    
    gameLoop(){
        this.update();
        if (this.gameIsOver) {
            this.updateScores()
            this.removeWalls();
            clearInterval(this.gameIntervalId)
            this.gameOverScreen.classList.toggle("show")
            setTimeout(()=>{
                this.gameEndScreen.style.display = "flex"
                this.gameScreen.style.display = "none"
            }, 4000)
        }
        if (this.nextStage){
            this.updateScores()
            this.removeWalls()
            clearInterval(this.gameIntervalId)
            this.nextLevelScreen.classList.toggle("show")
            setTimeout(()=>{
                this.gameEndScreen.style.display = "flex"
                this.gameScreen.style.display = "none"
            }, 4000)

        }
    };

    bombList(){
        if (this.player.bombasPuestas.length > 0){
            for (let i = this.player.bombasPuestas.length - 1; i >= 0; i--){
                if (this.player.bombasPuestas[i].isRemovable){
                    const deleteBomb = this.player.bombasPuestas[i].element;
                    this.player.bombasPuestas.splice(i, 1);
                    this.bombsUsed++;
                    setTimeout(()=>{
                        deleteBomb.remove();
                    }, 4000)
                }
            }
        }
    }

    removeWalls(){
        if (this.indexMurosDel.size > 0){
            for (let index of this.indexMurosDel){
                // console.log(index)
                this.muros.splice(index, 1)
                this.wallDestroyed++;
            }
            this.indexMurosDel.clear();
        }
    }

    removeEnemies(){
        if (this.indexEnemiesDel.size > 0){
            for (let index of this.indexEnemiesDel){
                // console.log(index)
                this.enemies.splice(index, 1)
                this.numEnemies--;
                this.enemiesKill++;
            }
            this.indexEnemiesDel.clear();
            if (this.enemies.length === 0){
                this.removeWalls();
                this.enemies.push(new Enemy(-50, -50, this.gameBoard,  0, 0))
            }
        }
    }

    update(){
        this.numVidas.innerText = this.player.vidas
        this.speed.innerText = `x${this.player.speedBonus}`
        this.minutos.innerText = this.crono.minutes
        this.segundos.innerText = this.crono.seconds
        this.numBombs.innerText = this.player.numBombs - this.player.bombasPuestas.length
        if (this.puerta){
            // console.log(this.numEnemies);
            if(this.numEnemies === 0){
                this.puerta.isOpen = true
            }
            if (this.puerta.isOpen && !this.puerta.isCollide){
                this.puerta.open()
            }
        }
        this.bombList();
        this.removeEnemies();
        // this.removeWalls();
        this.checkCollisionsWalls();
        this.enemies.forEach((enemy)=>{
            enemy.move();
        })
        this.player.move();
        if (this.player.didCollide(this.puerta.element) && this.puerta.isCollide){
            this.nextStage = true;
        }
        if (this.crono.time <=0 || this.player.vidas <= 0){
            this.numVidas.innerText = this.player.vidas
            this.gameIsOver = true
        }
    };

    updateScores(){
        this.textoBombas.innerText = this.bombsUsed;
        this.textoMuertos.innerText = this.enemiesKill;
        this.textoTime.innerText = `${this.crono.minutesT}:${this.crono.secondsT}`;
        this.textoKillScore.innerText = `${this.enemiesKill} x ${this.pointsEchKill}`;
        this.textoKillScoreSum.innerText = `${this.enemiesKill * this.pointsEchKill}pts.`;
        this.pointsTime = (this.crono.time * 20)
        this.textoTimeScore.innerText = `${this.crono.minutes}:${this.crono.seconds}`;
        this.textoTimeScoreSum.innerText = `${this.pointsTime}pts.`;
        this.textoTitleScore.innerText = `'piromano'`;
        this.textoTitleScoreSum.innerText = `${this.titlePoints}pts.`;
        this.textoTotalScore.innerText = `${this.pointsTime + (this.enemiesKill * this.pointsEchKill) + this.titlePoints}pts.`
    }
}

 