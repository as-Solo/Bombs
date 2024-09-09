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
        this.width = 1100;
        this.height = 750;
        this.numEnemies = 0;
        // this.enemiesPos = [['x', 'y']]; //deprecated
        // this.puerta = ['x', 'y']; // deprecated
        this.enemies = [];
        this.indexEnemiesDel = new Set();

        this.muros = [];
        this.indexMurosDel = new Set();

        this.map = [
            '11111111111111111',
            '10000000000000001',
            '10101210101010101',
            '100020200e0000001',
            '10101010101010101',
            '10002000000000001',
            '10101010101010101',
            '10002000000000001',
            '10101010101010101',
            '1e000000000000e01',
            '11111111111111111',
        ]
        this.elementosColisionables = [];

        this.tiempo = 3; //342
        this.scores = 0
        this.lives = 3;
        this.gameIsOver = false;
        this.gameIntervalId = null;
        this.gameLoopFrequency = 1000/60

        this.initialPosition = [50, 50]
        this.player = new Bomberman(this.gameBoard, this.initialPosition[0], this.initialPosition[1], "./images/player-stand.png");
        this.crono = new Crono(this.tiempo);
    }


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
                    this.player.inmune = true
                    this.player.vidas--;
                    if (this.player.vidas <= 0){
                        this.numVidas.innerText = this.player.vidas
                        this.gameIsOver = true;
                    }
                    else{
                        this.player.left = this.initialPosition[0]
                        this.player.top = this.initialPosition[1];
                        setTimeout(()=>{
                            this.player.inmune = false
                        }, 1000)
                    }
                }

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

                    if(bomba.explotar && (bomba.explotar) &&
                        (bomba.didCollide(50, 0, 0, 0, enemigo.element) ||
                        bomba.didCollide(0, 50, 0, 0, enemigo.element) ||
                        bomba.didCollide(0, 0, 50, 0, enemigo.element) ||
                        bomba.didCollide(0, 0, 0, 50, enemigo.element) ||
                        bomba.didCollide(0, 0, 0, 0, enemigo.element))){
                            enemigo.dies()
                            this.indexEnemiesDel.add(j);            
                    }
                }
            }
        }
    }


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
                    const enemy = new Enemy(j*50, i*50, this.gameBoard, randomDirection, (1 - randomDirection))
                    this.enemies.push(enemy)
                    this.numEnemies++;
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
            clearInterval(this.gameIntervalId)
           this.gameOverScreen.classList.toggle("show")
           setTimeout(()=>{
               this.gameEndScreen.style.display = "flex"
               this.gameScreen.style.display = "none"
           }, 4000)
        //    let step = 0;
        //    let opacityId =setInterval(() => {
        //         this.gameEndScreen.style.opacity = step;
        //         step += .01;
        //         if (step >= 1){
        //             clearInterval(opacityId);
        //         }
        //    }, 80);
        }
    };

    bombList(){
        if (this.player.bombasPuestas.length > 0){
            for (let i = this.player.bombasPuestas.length - 1; i >= 0; i--){
                if (this.player.bombasPuestas[i].isRemovable){
                    const deleteBomb = this.player.bombasPuestas[i].element;
                    this.player.bombasPuestas.splice(i, 1);
                    setTimeout(()=>{
                        deleteBomb.remove()
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
            }
            this.indexMurosDel.clear();
        }
    }

    removeEnemies(){
        if (this.indexEnemiesDel.size > 0){
            for (let index of this.indexEnemiesDel){
                // console.log(index)
                this.enemies.splice(index, 1)
            }
            this.indexEnemiesDel.clear();
            if (this.enemies.length === 0){
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
        this.bombList();
        this.removeWalls();
        this.removeEnemies();
        // this.checkCollisionsEnemies();
        this.checkCollisionsWalls();
        this.enemies.forEach((enemy)=>{
            enemy.move();
        })
        this.player.move();
        if (this.crono.time <=0){
            this.gameIsOver = true
        }
    };
}

