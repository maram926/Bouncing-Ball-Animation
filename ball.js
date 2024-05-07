
let c ;
let cw = 500;
let ch = 500;
let context;

let re;
// player
let playerw = 80;
let playerh = 10;
let playervelocityx = 10;

let player = {
    x : cw/2 - playerw/2,
    y : ch - playerh - 5 ,
    width : playerw,
    height : playerh ,
    velocityx : playervelocityx
}

// ball
let ballwidth = 10;
let ballheight = 10;
let ballvelocityX = 3;
let ballvelocityY = 2;

let ball = {
    x : cw/2,
    y : ch/2,
    width : ballwidth,
    height : ballheight,
    velocityX : ballvelocityX,
    velocityY : ballvelocityY
}

// blocks
let blockArray = [];
let blockWidth = 50;
let blockHeight = 10;
let blockColums = 8;
let blockRows = 3;
let blockMaxRows = 10;
let blockCount = 0;

let my = blockRows * blockColums;

let colori = 1
let blockX = 15;
let blockY = 45; 
let scoar = 0; 
let gameOver = false;

window.onload = function (){
   c = document.getElementById('c')
   c.width = cw;
   c.height = ch;
   context = c.getContext('2d')

   context.fillStyle = "lightgreen"
   context.fillRect(player.x , player.y , player.width , player.height)

   re = requestAnimationFrame(update)
   document.addEventListener("keydown" , moveplayer)

   createBloks()
  
}

function update(){

    requestAnimationFrame(update)
    if(gameOver){
        return;
    }
    context.clearRect(0 ,0,cw,ch)
    context.fillStyle = "lightgreen"
    context.fillRect(player.x , player.y, player.width , player.height)

    context.fillStyle = "white"
    ball.x += ball.velocityX
    ball.y += ball.velocityY
    context.fillRect(ball.x , ball.y, ball.width , ball.height)
   
    if(ball.x + ball.width >= cw){
        ball.velocityX *= -1
    }else if(ball.x  <= 0 ){
             ball.velocityX *= -1
    }else if(ball.y <= 0){
             ball.velocityY *= -1
}else if(ball.y + ball.height >= ch){
    context.font = "20px sans-serif"
    context.fillText("game over : press 'space' to restart" , 80 , 400 )
    gameOver = true
}


    if( TheTop(ball,player) || TheBottom(ball,player) ){
        ball.velocityY *= -1
    }else if( TheLeft(ball,player) || TheRight(ball,player) ){
        ball.velocityX *= -1
    }

    context.fillStyle = "skyblue"
    for(let i=0; i<blockArray.length; i++){
        let block = blockArray[i];
       
        if(block.break){      
            if( TheTop(ball,block) || TheBottom(ball,block) ){
                block.break = false
                ball.velocityY *= -1
                my -= 1
                scoar += 100
            }else if( TheLeft(ball,block) || TheRight(ball,block) ){
                block.break = false
                ball.velocityX *= -1
                my -= 1
                scoar += 100 
            }    
                context.fillRect(block.x,block.y,block.width,block.height)
        }
        
    }

    // next level
    if(my == 0){
    scoar += 100*blockRows*blockColums
    blockRows = Math.min(blockRows+1,blockMaxRows)
    createBloks()
    my = blockRows * blockColums
    colori += 1
    }
    
  
    // score
    context.font = "20px sans-serif"
    context.fillText(scoar,10,25)

   
}

function outOfBouns(xpostion){
    return(xpostion < 0 || xpostion + playerw > cw)  
}



function moveplayer (e){

    if(gameOver){
        if(e.code == "Space"){
            reset()            
        }
    }
    
    if(e.code == "ArrowLeft"){
   let nextPlayerX = player.x - player.velocityx
         if(!outOfBouns(nextPlayerX)){
            player.x = nextPlayerX
         }
    }

   if(e.code == "ArrowRight"){
        let nextPlayerX = player.x + player.velocityx
         if(!outOfBouns(nextPlayerX)){
            player.x = nextPlayerX
         }
    }
}


function detect(a,b){
    return a.x + a.width >= b.x && 
           b.y + b.height >= a.y &&
           a.y + a.height >= b.y  &&
           b.x + b.width >= a.x
}

function TheTop(ball,block){
    return detect(ball,block) && ball.y <= block.y + block.height
}
function TheBottom(ball,block){
    return detect(ball,block) && ball.y + ball.height <= block.y 
}
function TheLeft(ball,block){
    return detect(ball,block) && ball.x + ball.width <= block.x
}
function TheRight(ball,block){
    return detect(ball,block) && ball.x <= block.x + block.width
}



function createBloks(){

    for(let s=0; s<blockColums; s++){
        for(let r=0; r<blockRows; r++){
               let  block = {
                x : blockX + s*blockWidth + s*10,
                y : blockY + r*blockHeight + r*10 ,
                width : blockWidth,
                height : blockHeight,
                break : true,
                level : colori
            }
            blockArray.push(block)
        }
    }
    blockCount = blockArray.length
}

 

function reset(){

    gameOver = false

    player = {
        x : cw/2 - playerw/2,
        y : ch - playerh - 5 ,
        width : playerw,
        height : playerh ,
        velocityx : playervelocityx
    }


    ball = {
        x : cw/2,
        y : ch/2,
        width : ballwidth,
        height : ballheight,
        velocityX : ballvelocityX,
        velocityY : ballvelocityY
    }

    
    blockRows = 3;
    blockArray = [];
    scoar = 0;
    createBloks()
    
    
}




