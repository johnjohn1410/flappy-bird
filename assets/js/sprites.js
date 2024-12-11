const sprites = new Image()
sprites.src = './images/sprites.png';
sprites.crossOrigin = 'anonymous';
const tela = document.querySelector('canvas')
const contexto = tela.getContext('2d')
let pontos = 0

export const background ={
    spriteX: 390,
    spriteY: 0,
    width: 275,
    height: 284,
    x: 0,
    y: tela.height - 204,
    desenhar(){
        contexto.fillStyle= '#70c5ce'
        contexto.fillRect(0,0, tela.width, tela.height)
        contexto.drawImage(
            sprites,
            background.spriteX,background.spriteY,
            background.width,background.height,
            background.x, background.y,
            background.width,background.height,
        )
        contexto.drawImage(
            sprites,
            background.spriteX,background.spriteY,
            background.width,background.height,
            (background.x+background.width), background.y,
            background.width,background.height,
        )
        contexto.drawImage(
            sprites,
            background.spriteX,background.spriteY,
            background.width,background.height,
            (background.x+(background.width)*2), background.y,
            background.width,background.height,
        )
    }
}
export const start = {
    spriteX: 134,
    spriteY: 0,
    width: 174,
    height: 152,
    x: (tela.width/2) - 174/2,
    y:50,
    desenhar(){
        contexto.drawImage(
            sprites,
            start.spriteX,start.spriteY,
            start.width,start.height,
            start.x,start.y,
            start.width,start.height,
        )
    }
}
export const gameOver = {
    spriteX: 134,
    spriteY: 152,
    width: 226,
    height: 200,
    x: (tela.width/2) - 226/2,
    y:50,
    desenhar(){
        contexto.drawImage(
            sprites,
            gameOver.spriteX,gameOver.spriteY,
            gameOver.width,gameOver.height,
            gameOver.x,gameOver.y,
            gameOver.width,gameOver.height,
        )
    }
}

export const medals ={
    bronze:{
        spriteX: 48,
        spriteY: 124,
        width: 44,
        height: 44,
        x: 113,
        y:138,
    },
    silver:{
        spriteX: 48,
        spriteY: 78,
        width: 44,
        height: 44,
        x: 113,
        y:138,
    },
    gold:{
        spriteX: 0,
        spriteY: 124,
        width: 44,
        height: 44,
        x: 113,
        y:138,
    },
    platinum:{
        spriteX: 0,
        spriteY: 78,
        width: 44,
        height: 44,
        x: 113,
        y:138,
    },
    desenhar(){
        if (pontos >= 10 && pontos <= 20){
            contexto.drawImage(
                sprites,
                medals.bronze.spriteX,medals.bronze.spriteY,
                medals.bronze.width,medals.bronze.height,
                medals.bronze.x,medals.bronze.y,
                medals.bronze.width,medals.bronze.height,
            )
        }else if (pontos >= 20 && pontos <= 30){
            contexto.drawImage(
                sprites,
                medals.silver.spriteX,medals.silver.spriteY,
                medals.silver.width,medals.silver.height,
                medals.silver.x,medals.silver.y,
                medals.silver.width,medals.silver.height,
            )
        }else if (pontos >= 30 && pontos <= 40){
            contexto.drawImage(
                sprites,
                medals.gold.spriteX,medals.gold.spriteY,
                medals.gold.width,medals.gold.height,
                medals.gold.x,medals.gold.y,
                medals.gold.width,medals.gold.height,
            )
        }else if (pontos >= 40){
            contexto.drawImage(
                sprites,
                medals.platinum.spriteX,medals.platinum.spriteY,
                medals.platinum.width,medals.platinum.height,
                medals.platinum.x,medals.platinum.y,
                medals.platinum.width,medals.platinum.height,
            )
        }
    }
}
