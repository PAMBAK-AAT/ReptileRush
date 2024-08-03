/// Game Constants

let inputDir = {x:0 , y:0};// inputDir is an object that represents the direction of user input for controlling the movement of an entity.
let moveSound = new Audio('move.mp3');   // it creates an audio element that loads and prepares to play the specified audio file.   
let foodSound = new Audio('food.mp3');
let gameoverSound = new Audio('gameover.mp3');
let musicSound = new Audio('NaatZaifaThii.mp3');

            /// Methods of audio object...
                            // // Play the move sound
                            // moveSound.play();

                            // // Pause the move sound
                            // moveSound.pause();

                            // // Stop the move sound (reset to beginning)
                            // moveSound.currentTime = 0;

                            // // Adjust volume (value ranges from 0 to 1)
                            // moveSound.volume = 0.5; // Set volume to 50%



let speed = 8;
let score = 0;
let lastPaintTime = 0;// This variable stores the timestamp (in milliseconds) of the last frame update or paint operation.
let snakeArr = [
    {x:6 , y:8}// Location of head(as an object) and other parts we add on moving
]

food = {x:13 , y:15};// It;s an food object

/// game Functions
function main(currTime){
                            /// Article on window.requestAnimationFrame ,,,

                    // 1. window.requestAnimationFrame() is a method provided by the browser's window object. It's commonly used for running animations and performing updates in sync with the browser's repaint cycle.

                    // 2. provide a callback function (in this case, main) that the browser will call before the next repaint.
                    // 3. main function will be called by the browser just before it repaints the screen.

                    // 4. requestAnimationFrame runs updates just before the browser repaints, ensuring smoother animations and reducing unnecessary CPU usage when the tab is not visible.

    window.requestAnimationFrame(main);
    // console.log(currTime);

    // It ensures that the game engine (gameEngine) is only called when a certain amount of time has passed, based on the desired speed of the game (speed).
    if((currTime-lastPaintTime)/1000 < 1/speed){
        return;
    }
                        //  1.  currTime - lastPaintTime calculates the time elapsed since the last frame update.
                        // 2. (currTime - lastPaintTime) / 1000 converts the elapsed time from milliseconds to seconds.
                        // 3.  (1 / speed) calculates the time interval between frames based on the desired speed of the game.
    lastPaintTime = currTime
    gameEngine();// It's a function that run the game and update our game...
}

function isCollide(snakeArr){

    // If you bump into yourself
    for(let i = 1 ; i<snakeArr.length ; i++){
        if(snakeArr[i].x === snakeArr[0].x && snakeArr[i].y === snakeArr[0].y){
            return true;
        }
    }
    // If you bump in the wall
    if(snakeArr[0].x >=18 || snakeArr[0].x <=0 || snakeArr[0].y <=0 || snakeArr[0].y >=18){
        return true;
    }
}

function gameEngine(){

        // Part-1 Update the snakeArray and the food
        
                // If Collide ...
    if(isCollide(snakeArr)){
        musicSound.pause();
        gameoverSound.play();
        inputDir = {x:0 , y:0};
        alert(`Game Over , Your Score : ${score}`);
        snakeArr = [{x:6 , y:8}];
        score = 0;
        musicSound.play();
    }

                // If snake eaten the food then regenerate the score , food , and snake 

                // It will happen , when the x and y coordinate of the snake and food will meet

    //  After food eaten...
    if(snakeArr[0].x===food.x && snakeArr[0].y==food.y){
        foodSound.play();
        score += 1;
        
        /// Setting our High Score if  score crosses your previous HScore
        if(score>hiScoreVal){
            hiScoreVal = score;
            localStorage.setItem("hiScore", hiScoreVal);
            hiScoreBox.innerHTML = "High Score :" + hiScoreVal;
            // hiScoreVal = this value comes from local storage that is updated

        }

        scoreBox.innerHTML = "Score :" + score;
        snakeArr.unshift({x: snakeArr[0].x + inputDir.x , y:snakeArr[0].y + inputDir.y});
        let a = 2;
        let b = 16;
        // Because , we have 18 rows and 18 columns , and we want , our food do not comes on the border
            // It will generate a random no. b/w 'a' & 'b'
        food = {x:Math.round(a+(b-a)*Math.random()) , y:Math.round(a+(b-a)*Math.random())};
    }

    // Moving of snake...
            /// Here we iterate on the body of snake and we put every segment on it's next previous segment
    for(let i = snakeArr.length-2 ; i>=0 ; i--){
        snakeArr[i+1] = snakeArr[i];// Since objects in JavaScript are passed by reference, this assignment results in all segments pointing to the same object in memory.
        // So we use this...
        snakeArr[i+1] = {...snakeArr[i]};// Destructuring of object
    }
    // Now we set it's head
    snakeArr[0].x += inputDir.x;
    snakeArr[0].y += inputDir.y;


        // Part-2 Display the snake 
    board.innerHTML = "";
    snakeArr.forEach( (e,index)=> {
        let snakeElement = document.createElement('div');
        snakeElement.style.gridRowStart = e.y;
        snakeElement.style.gridColumnStart = e.x;
        if(index==0){
            snakeElement.classList.add('head');
        }
        else{
            snakeElement.classList.add('snake');
        }
        board.appendChild(snakeElement);
    })

        // Part-3 Display the food
    let foodElement = document.createElement('div');
    foodElement.style.gridRowStart = food.y;
    foodElement.style.gridColumnStart = food.x;
    foodElement.classList.add('food');
    board.appendChild(foodElement);

}

///  Logic to set our high score
let hiScore = localStorage.getItem("hiScore");// By this we can get the value of our high score that is stored in our local storage variable
if(hiScore===null){
    hiScoreVal = 0;
    localStorage.setItem("hiScore", JSON.stringify(hiScoreVal));
}
else{
    hiScoreVal = JSON.parse(hiScore);
    hiScoreBox.innerHTML = "High Score :" + hiScore;
}

/// Game Logic
window.requestAnimationFrame(main);
document.getElementById('startBtn').addEventListener('click' , startGame);
function startGame(){
    musicSound.play();
    window.removeEventListener('click',startGame);
    window.addEventListener('keydown' , (ele)=>{
        inputDir = {x:0 , y:1};// Game start
        moveSound.play();
        switch (ele.key){
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
    })
}


