var database,position
var ball,ballimg;
var bg, bgimg;

function preload(){
    ballimg=loadImage("balloon1.png");
    bgimg = loadImage("proc35bgimg.png");
}

function setup(){
    database = firebase.database();
    createCanvas(500,500);
   
   bg = createSprite(250,250,500,500);
    bg.addImage(bgimg);
    bg.scale=0.5;
    ball = createSprite(50,50,30,30);
    ball.shapeColor = "red";
    ball.addImage(ballimg);
    ball.scale=0.1;
    var ballposition = database.ref('ball/position');
    ballposition.on("value",readPosition,showError);

}

function draw(){
    background("white");
   
    if(keyDown(LEFT_ARROW)){
        changePosition(-1,0);
    }
    else if(keyDown(RIGHT_ARROW)){
        changePosition(1,0);
    }
    else if(keyDown(UP_ARROW)){
        changePosition(0,-1);
    }
    else if(keyDown(DOWN_ARROW)){
        changePosition(0,+1);
    }
    drawSprites();
}

function changePosition(x,y){
    database.ref('ball/position').set({
        'x' : position.x+x,
        'y' : position.y+y
    })
   
}

function readPosition(data){
    position = data.val();
    ball.x = position.x;
    ball.y = position.y;
}

function showError(){
    console.log("Error in reading database");
}
