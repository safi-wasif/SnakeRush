let direction ={  x: 0 , y:0};
let foodSound=new Audio('audio/food.mp3');
let gameOverSound=new Audio('audio/gameover.mp3');
let moveSound=new Audio('audio/move.mp3');
let musicSound=new Audio('audio/music.mp3');
let frequency = 10;
let lastRender=0;
let snakeArr=[{x: 5 , y: 5}];
let food = {x:10 , y:5};
let inputDir = {x:0 , y:0};
let score =0;
let hi=0;

function main(ctime){
    window.requestAnimationFrame(main);
    if((ctime - lastRender)/1000  <=  1/frequency){
        return;
    }
    else{
        lastRender = ctime;
    }
    // console.log(ctime);
    gameEngine();
}

function isCollide(sarr){
    //self bump
    for(let i= 1 ; i <sarr.length ; i++){
       if(sarr[0].x===sarr[i].x && sarr[0].y===sarr[i].y){
            return true;
        }
        
    }
    // wall bump
    if((sarr[0].x>20 || sarr[0].x<=0) || (sarr[0].y>20 || sarr[0].y<=0)){
        return true;
    }

    return false;
}

function gameEngine(){
    //updating arr
    if(isCollide(snakeArr)){
        frequency=10;
        gameOverSound.play();
        musicSound.pause();
        inputDir = {x:0 , y:0};
        alert("GAME OVER. Press any key to continue");
        snakeArr=[{x: 5 , y: 5}];
        musicSound.play();
        score=0;
        hiScore.innerHTML="Hi-Score: "+hi;
        scoreBox.innerHTML="Score: "+score;


    }

    //ate the food
    if(snakeArr[0].x==food.x && snakeArr[0].y==food.y){
        frequency=frequency+1/4;

        score+=1;
        scoreBox.innerHTML="Score: "+score;

        if(score>hi){
            hi+=1;
            hiScore.innerHTML="Hi-Score: "+hi;
        }
        foodSound.play();
        //unshift for push_front
        snakeArr.unshift({x: snakeArr[0].x+ inputDir.x , y:snakeArr[0].y+ inputDir.y});
        //food generator
        let a=3;
        let b=15;
        food = {x:Math.round(a + (b-a)*Math.random()) , y:Math.round(a + (b-a)*Math.random())};
    }

    //movement
    for(let i=snakeArr.length -2 ; i>=0 ; i--){
        snakeArr[i+1]={...snakeArr[i]};
    }
    snakeArr[0].x+=inputDir.x;
    snakeArr[0].y+=inputDir.y;


    //display the snake

    board.innerHTML = "";//doesn't work if board is class !!
    snakeArr.forEach((ele , index) => {
        snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = ele.y;
        snakeElement.style.gridColumnStart = ele.x;
        

        if(index == 0){
            snakeElement.classList.add('head');

        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    });

    //display the food

    foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);
}


//main code


//windows
window.requestAnimationFrame(main);
window.addEventListener('keydown' , e=> {
    
    hiScore.innerHTML="Hi-Score: "+hi;
    scoreBox.innerHTML="Score: "+score;
    musicSound.play();
    inputDir = {x:0 , y:1} //start game
    moveSound.play();
    switch(e.key){
        case "ArrowUp":
            console.log("ArrowUp");
            inputDir.x = 0;
            inputDir.y = -1;
            break;
        case "ArrowDown":
            console.log("ArrowDown");
            inputDir.x = 0;
            inputDir.y = 1;
            break;

        case "ArrowLeft":
            console.log("ArrowLeft");
            inputDir.x = -1;
            inputDir.y = 0;
            break;

        case "ArrowRight":
            console.log("ArrowRight");
            inputDir.x = 1;
            inputDir.y = 0;
            break;

        default:
            break;


    }
});
