const sprites = new Image()
sprites.crossOrigin = 'anonymous';
sprites.src = './images/sprites.png';
const fly = new Audio('./assets/sounds/pulo.wav')
const hit = new Audio('./assets/sounds/hit.wav')
const point = new Audio('./assets/sounds/ponto.wav')
const tela = document.querySelector('canvas')
export const contexto = tela.getContext('2d')
let newScreen = {}
let frames = 0
const globais ={}
let pontos = 0
const meuFinalScore = finalScore();


import{background,start,gameOver,medals} from './sprites.js'
const telas = {
    INICIO:{
        inicializa(){
            globais.flappyBird = newFlappyBird()
            globais.floor = newFloor()
            globais.pipes = newPipes()

        },
        desenhar(){
            background.desenhar()
            globais.flappyBird.desenhar()
            globais.floor.desenhar()
            start.desenhar()

        },
        click() {
            screenChange(telas.GAME);
        },
        atualizar(){
            globais.floor.atualizar()
        }
    },
    GAME:{
        inicializa(){
            globais.placar = score()
        },
        desenhar(){
            background.desenhar()
            globais.pipes.desenhar()
            globais.floor.desenhar()
            globais.flappyBird.desenhar()
            globais.placar.desenhar()
        },
        click() {
            globais.flappyBird.jump()
            fly.volume = 0.02
            fly.play();
        },
        atualizar(){
            globais.pipes.atualizar()
            globais.floor.atualizar()
            globais.flappyBird.atualizar()
        }
    },
    GAME_OVER:{
        desenhar(){
            contexto.clearRect(0, 0, tela.width, tela.height);
            background.desenhar()
            globais.pipes.desenhar()
            globais.floor.desenhar()
            globais.flappyBird.desenhar()
            gameOver.desenhar()
            medals.desenhar()
            meuFinalScore.desenhar()
            salvarMaiorPontuacao(pontos);
        },
        atualizar(){
    
        },
        click(){
            if(confirm("deseja reiniciar o jogo?")){
                location.reload()
            }
    
        }
    }
}

export function newFlappyBird(){
    const flappyBird = {
        spriteX: 0,
        spriteY:0,
        width: 33,
        height: 24,
        x: 10,
        y: 50,
        velocidade: 0,
        gravidade: 0.15,
        pulo: 5.2,
        jump(){
            flappyBird.velocidade= - flappyBird.pulo
        },
        atualizar(){
            if(fazColisao(flappyBird, globais.floor)){
                return
            }
            flappyBird.velocidade += flappyBird.gravidade
            flappyBird.y += flappyBird.velocidade
        },
        movimentos:[{spriteX: 0, spriteY:0},
                    {spriteX: 0, spriteY:26},
                    {spriteX: 0, spriteY:52},
                    {spriteX: 0, spriteY:26}
                    ],
        frameAtual:0,
        frameUpdate(){
            const frameInterval = 10
            const interval = frames % frameInterval ===0
            if(interval){
                const base = 1
                const increase = base + flappyBird.frameAtual
                const repeat = flappyBird.movimentos.length
                flappyBird.frameAtual = increase % repeat
            }

            
        },
        desenhar(){
            flappyBird.frameUpdate()
            const {spriteX, spriteY} = flappyBird.movimentos[flappyBird.frameAtual]
            contexto.drawImage(
                sprites,
                spriteX,spriteY,
                flappyBird.width,flappyBird.height,
                flappyBird.x, flappyBird.y,
                flappyBird.width,flappyBird.height,
            )
        }
    }

    return flappyBird
}

export function newFloor(){
    const floor = {
        spriteX: 0,
        spriteY: 610,
        width:224,
        height: 112,
        x:0,
        y:tela.height-112,
        atualizar(){
            const floorMove = 1
            const repeat = floor.width/3
            floor.x -= floorMove
            floor.x = (floor.x -= floorMove)%repeat

        },
        desenhar(){
            contexto.drawImage(
                sprites,
                floor.spriteX,floor.spriteY,
                floor.width,floor.height,
                floor.x, floor.y,
                floor.width,floor.height,
            )
            contexto.drawImage(
                sprites,
                floor.spriteX,floor.spriteY,
                floor.width,floor.height,
                (floor.x + floor.width), floor.y,
                floor.width,floor.height,
            )
            contexto.drawImage(
                sprites,
                floor.spriteX,floor.spriteY,
                floor.width,floor.height,
                (floor.x+(floor.width)*2), floor.y,
                floor.width,floor.height,
            )
        }
        
    }
    return floor
}
export function newPipes(){
    const pipes = {
        chao:{
            spriteX: 0,
            spriteY: 169,
        },
        teto:{
            spriteX: 52,
            spriteY: 169,
        },
        width:52,
        height: 400,
        desenhar(){
            pipes.pares.forEach(function(par){
                const random = -par.y
                const pipeCeuX = par.x
                const pipeCeuY = random
                const space = 120
                contexto.drawImage(
                    sprites,
                    pipes.teto.spriteX,pipes.teto.spriteY,
                    pipes.width,pipes.height,
                    pipeCeuX, pipeCeuY,
                    pipes.width,pipes.height,
                )
                const pipeChaoX = par.x
                const pipeChaoY = pipes.height+ space  +random
                contexto.drawImage(
                    sprites,
                    pipes.chao.spriteX,pipes.chao.spriteY,
                    pipes.width,pipes.height,
                    pipeChaoX, pipeChaoY,
                    pipes.width,pipes.height,
                )
                par.pipeCeu ={
                    x:pipeCeuX,
                    y:pipes.height + pipeCeuY
                }
                par.pipeChao ={
                    x: pipeChaoX,
                    y: pipeChaoY,

                }
            })
            
        },
        colisaoFlappyCano(par){
            const flappyHead = globais.flappyBird.y
            const flappyFeet = globais.flappyBird.y+globais.flappyBird.height

            if (globais.flappyBird.x + globais.flappyBird.width >= par.x) {

                if (flappyHead <= par.pipeCeu.y) {
                    return true;
                }
                if (flappyFeet >= par.pipeChao.y) {
                    return true;
                }
                if (par.pontosContados === undefined) {
                    pontos += 1;
                    par.pontosContados = true;
                    point.volume = 0.02
                    point.play()
                }
            }
            return false;  
        },
        pares:[],
        atualizar(){
            const passou100frames = frames % 130 === 0;
            if(passou100frames){
                pipes.pares.push({
                    x:tela.width,
                    y:150*(Math.random()+1),
                })
            }
            pipes.pares.forEach(function(par){
                par.x -= 2

                if(pipes.colisaoFlappyCano(par)){
                    hit.volume = 0.02
                    hit.play();
                    screenChange(telas.GAME_OVER)
                }

                if(par.x + pipes.width <= 0){
                    pipes.pares.shift()
                }
            })
        }
    }
    return pipes
}

export function score(){
    const score = {
        desenhar(){
            contexto.font = "50px 'Jersey 10', sans-serif";
            contexto.fillStyle = "white";
            contexto.textAlign = "left";
            contexto.textBaseline = "top";
            contexto.strokeStyle = 'black';
            contexto.lineWidth = 3
            contexto.strokeText(pontos, 10, 10);
            contexto.fillText(pontos, 10, 10);
        },
    }

    return score
}
export function finalScore(){
    const finalScore = {
        desenhar(){
            const maiorPontuacao = obterMaiorPontuacao();
            contexto.textAlign = "right";
            contexto.font = "30px 'Jersey 10', sans-serif";
            contexto.fillStyle = "white";
            contexto.strokeStyle = 'black';
            contexto.lineWidth = 4
            contexto.strokeText(pontos, 290, 123);
            contexto.fillText(pontos, 290, 123);
            contexto.strokeText(maiorPontuacao, 290, 166);
            contexto.fillText(maiorPontuacao, 290, 166);
        },
    }
    return finalScore
}
function fazColisao(flappyBird, floor){
    const colisaoFlappyChao = flappyBird.y + flappyBird.height

    if(colisaoFlappyChao >= floor.y){
        hit.volume = 0.02
        hit.play();
        screenChange(telas.GAME_OVER)

        return true
    }
    return false
}

export function screenChange(screenOn) {
    newScreen = screenOn
    if(newScreen.inicializa){
        newScreen.inicializa()
    }
}

export function salvarMaiorPontuacao(pontos) {
    const maiorPontuacao = localStorage.getItem('maiorPontuacao');
    if (!maiorPontuacao || pontos > parseInt(maiorPontuacao)) {
        localStorage.setItem('maiorPontuacao', pontos);
    }
}
export function obterMaiorPontuacao() {
    const maiorPontuacao = localStorage.getItem('maiorPontuacao');
    return maiorPontuacao ? parseInt(maiorPontuacao) : 0;
}
function loop(){
    newScreen.desenhar()
    newScreen.atualizar()
    frames++
    requestAnimationFrame(loop)
}

window.addEventListener('click', () => {
    if(newScreen.click) {
        newScreen.click();
    }
});
screenChange(telas.INICIO)
loop()
