// Constants and variables

const FRAMES_PER_SECOND = 30;
const BACKGROUND_COLOR = '#313639';
const BALL_COLOR = '#6abef0';
const PADDLE_COLOR = '#f5f5f5';
const TEXT_COLOR = '#ec88e8';
const PADDLE_WIDTH = 10;
const PADDLE_HEIGHT = 100;

let canvas; 
let canvasContext;
let paddle1Y = 250;
let paddle2Y = 250;
let ballX = 75;
let ballY = 75;
let ballSpeedX = 5;
let ballSpeedY = 7;
let paddle1Score = 0;
let paddle2Score = 0;



// Execution
window.onload = function() {

    canvas = document.getElementById('canvas');
    canvasContext = canvas.getContext('2d');
    
    setInterval(gameLoop, 1000/FRAMES_PER_SECOND);

    canvas.addEventListener('mousemove', updateMousePos); 
}



// Functions
function gameLoop() {    
    
    drawEverything();
    moveEverything();
}

function drawEverything() {
    
    // Draw background
    colorRect(0, 0, canvas.width, canvas.height, BACKGROUND_COLOR);
    
    // Draw the net.
    drawNet();

    // Draw ball
    colorCircle(ballX,ballY, 10, BALL_COLOR);
    
    // Draw paddles
    colorRect(0, paddle1Y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOR);
    colorRect(canvas.width - PADDLE_WIDTH, paddle2Y, PADDLE_WIDTH, PADDLE_HEIGHT, PADDLE_COLOR);

    printText(paddle1Score.toString(), 200, 80, "60px", "Arial", TEXT_COLOR);
    printText(paddle2Score.toString(), canvas.width - 235, 80, "60px", "Arial", TEXT_COLOR);
}

function moveEverything() {
    
    ballX += ballSpeedX;
    ballY += ballSpeedY;

    checkBallXCollisions();
    checkBallYCollisions();

    paddle2Movement();
}

function colorRect(topLeftX,topLeftY, boxWidth,boxHeight, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.fillRect(topLeftX,topLeftY, boxWidth,boxHeight);
}

function colorCircle(centerX,centerY, radius, fillColor) {
    canvasContext.fillStyle = fillColor;
    canvasContext.beginPath();
    canvasContext.arc(centerX,centerY, 10, 0,Math.PI*2, true);
    canvasContext.fill();
}

function printText(text, xPos, yPos, size, font, color) {
    canvasContext.fillStyle = color;
    canvasContext.font = `${size} ${font}`;
    canvasContext.fillText(text, xPos, yPos);
}

function updateMousePos(evt) {
            
    let rect = canvas.getBoundingClientRect();
    let root = document.documentElement;
    let mouseX = evt.clientX - rect.left - root.scrollLeft;
    let mouseY = evt.clientY - rect.top - root.scrollTop;
    paddle1Y = mouseY - (PADDLE_HEIGHT / 2);
}

function ballReset() {
    ballX = canvas.width/2;
    ballY = canvas.height/2;
}

function paddle2Movement() {
    
    let paddle2YCenter = paddle2Y + ( PADDLE_HEIGHT / 2 )
    
    if ( paddle2YCenter < ballY - 35 )
    {
        paddle2Y += 6;
    }
    else if ( paddle2YCenter > ballY + 35 )
    {
        paddle2Y -= 6;
    }
}

function checkBallXCollisions() {

    if (ballX < 0)
    {
        if ( ballY > paddle1Y && ballY < paddle1Y + PADDLE_HEIGHT )
        {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - ( paddle1Y + PADDLE_HEIGHT /2 );
            ballSpeedY = deltaY * 0.35;
        }
        else
        {
            paddle2Score ++;
            ballReset();
        }
    }

    if (ballX > canvas.width - PADDLE_WIDTH)
    {
        if ( ballY > paddle2Y && ballY < paddle2Y + PADDLE_HEIGHT )
        {
            ballSpeedX = -ballSpeedX;
            let deltaY = ballY - ( paddle2Y + PADDLE_HEIGHT /2 );
            ballSpeedY = deltaY * 0.35;
        }
        else
        {
            paddle1Score ++;
            ballReset();
        }
    }
}

function checkBallYCollisions() {

    if (ballY < 0 || ballY > canvas.height - PADDLE_WIDTH) {
        ballSpeedY = -ballSpeedY;
    }
}

function drawNet() {

    for ( let i = 0; i < canvas.height; i += 40 ) {
        colorRect(canvas.width / 2 - 1, i, 2, 20, PADDLE_COLOR, canvasContext);
    }
}