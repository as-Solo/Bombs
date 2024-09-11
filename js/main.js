// Solo 06/09/2024

let jugador = null;
let levelIndex = 0;
    let levels = [
        [   '11111111111111111',
            '10000000000000001',
            '1010101010101e101',
            '10002000002000201',
            '10101010101010101',
            '1000200eS02222201',
            '10101010101010101',
            '100e2000002000201',
            '10101010101010101',
            '1e000000000000001',
            '11111111111111111'    ],

        [   '11111111111111111',
            '10000000000000001',
            '1000000000000e001',
            '10020ee0000002001',
            '1e00000e000000001',
            '100000000000e0001',
            '1000e000000e00001',
            '1002000000e002001',
            '100000e00000e0001',
            '100000e000000S001',
            '11111111111111111'   ],

        [   '11111111111111111',
            '100000e0000e000e1',
            '10101212121210101',
            '1000222222222e001',
            '10101212121210101',
            '10002222s22220001',
            '1e101212121210101',
            '10002222222220001',
            '10101212121210101',
            '1e0000000000000e1',
            '11111111111111111'   ],
    ]
window.onload = function () {
    audioInicio = document.querySelector('#audio-inicio');
    audioInicio.volume = .1
    const startButton = document.querySelector("#start-button");
    const restartButton = document.getElementById("restart-button");
    const nextLeveltButton = document.getElementById("next-level-button");
    const nextLevelButtonPanel = document.querySelector(".container-boton-NL");
    const nextLevelScreen = document.querySelector("#next-level");
    let game;
    
    const form = document.getElementById('enter-name');

    form.addEventListener('submit', function(event) {
        event.preventDefault();
        const nombreJugador = document.getElementById('nombre').value
        if (nombreJugador){
            if (nombreJugador){
                jugador = new Jugador(nombreJugador);
                
                if (localStorage.getItem(jugador.name)){
                    console.log("existe")
                    jugador.puntuaciones = JSON.parse(localStorage.getItem(jugador.name))
                    // localStorage.setItem(jugador.name, JSON.stringify([]))  // resetear jugador
                    console.log(jugador)
                }
                else{
                    localStorage.setItem(jugador.name, JSON.stringify(jugador.puntuaciones));
                    console.log("no existe")
                }
            }
        }
    });


    startButton.addEventListener("click", function () {
        if (document.getElementById('nombre').value){
            if (!jugador){
                const nombreJugador = document.getElementById('nombre').value
                jugador = new Jugador(nombreJugador);
                if (localStorage.getItem(jugador.name)){
                    console.log("existe")
                    jugador.puntuaciones = JSON.parse(localStorage.getItem(jugador.name))
                    // localStorage.setItem(jugador.name, JSON.stringify([]))  // resetear jugador
                    console.log(jugador)
                }
                else{
                    localStorage.setItem(jugador.name, JSON.stringify(jugador.puntuaciones));
                    console.log("no existe")
                }
            }
            startGame();
        }
    });
    
    startButton.addEventListener("mouseenter", ()=>{
        if (!document.getElementById('nombre').value){
            startButton.innerText = "Your Name!!!"
        }
    })
    startButton.addEventListener("mouseleave", ()=>{
        startButton.innerText = "Start Game"
    })
    
    nextLeveltButton.addEventListener("click", ()=>{
        nextLevelScreen.classList.toggle("show2")
        nextLevelButtonPanel.classList.toggle('show2')
        
        game.gameBoard.removeChild(game.player.element);
        game.player = null;
        game.gameBoard.innerHTML = '';
        game.muros = [];
        game.player = null;
        game.crono = null;
        game.puerta = null;
        game.map = [];
        startGame()
    })

    restartButton.addEventListener("click", function () {
        location.reload();
      });

    function startGame() {
        game = null;
        game = new GameData();
        game.start();
        window.addEventListener("keydown", presionarKey);
        window.addEventListener("keyup", soltarKey);
    }

    function presionarKey(event) {
        const key = event.key;
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
            " ",
            "q",
        ];

        if (possibleKeystrokes.includes(key)) {
            event.preventDefault();
            switch (key) {
            case "ArrowLeft":
                game.player.ajustarAlto()
                game.player.leftDirection = -1;
                break;
            case "ArrowUp":
                game.player.ajustarLeft()
                game.player.topDirection = -1;
                break;
            case "ArrowRight":
                game.player.ajustarAlto()
                game.player.leftDirection = 1;
                break;
            case "ArrowDown":
                game.player.ajustarLeft()
                game.player.topDirection = 1;
                break;
            case " ":
                // game.player.ajustarLeft()
                game.player.ponerBomba();
                // console.log(game.player.bombasPuestas)
                // console.log(game.player.bombasPuestas[0].explotar)q
                break;
            case "q":
                // game.player.ajustarLeft()
                // let explosion = new Explosion(game.gameBoard, 150, 100);
                // console.log(explosion)
                // console.log(game.player.bombasPuestas[0].isCollide)
                // console.log(game.player.bombasPuestas[0].isRemovable)
                // console.log(game.player.bombasPuestas[0].explotar)
                // console.log(game.enemies)
                // console.log(game.indexMurosDel)
                // console.log(game.muros)
                // console.log(game.player)
                // console.log(localStorage.getItem('Solo'))

                console.log("Limpiando hitorial")
                localStorage.clear();  // LIMPIA EL STORAGE
                game.gameIsOver = true;
                
                break;
            }
        }
        // console.log('-' + event.key + '-')
    }
    function soltarKey(event) {
        const key = event.key;
        const possibleKeystrokes = [
            "ArrowLeft",
            "ArrowUp",
            "ArrowRight",
            "ArrowDown",
        ];

        if (possibleKeystrokes.includes(key)) {
            event.preventDefault();
            switch (key) {
            case "ArrowLeft":
            case "ArrowRight":
                // console.log("Soltando L/R")
                // game.player.ajustarAlto()
                game.player.leftDirection = 0;
                break;
            case "ArrowUp":
            case "ArrowDown":
                // console.log("Soltando T/B")
                // game.player.ajustarLeft()
                game.player.topDirection = 0;
                break;
            }
        }
    }
}  