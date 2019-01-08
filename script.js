let game = document.getElementById('game');
let text = document.getElementById('text');
let player = document.createElement('DIV');

let ball = document.createElement("DIV");
let speed = 1;
let v_speed = 1;
let game_speed = 3;
let goingRight = true;
let goingDown = true;
let lives = 3;
ball.id = "ball";
ball.style.top ="150px";
ball.style.left ="240px";
player.id = "player";
game.appendChild(player);
let x;
game.addEventListener('mousemove', (event)=>{
    let pos_x = event.clientX;
    let left = game.offsetLeft;
    x = (-(pos_x - left + 1) * 800 / 500 + 400)*1.25;
    // console.log(x);
    player.style.right = x / 5 * 4 + "px";
});

let i = 0;
let blocks = [];
while(i < 20){
    console.log(i + 1);
    blocks[i] = document.createElement("DIV");
    blocks[i].classList.add("block");
    blocks[i].innerHTML = blocks[i].offsetLeft;
    game.appendChild(blocks[i]);
    i++;
}



game.appendChild(ball);

let ball_top = 150;
let ball_left = 240;

function update(){

    //code here
    if (goingDown) {
        ball_top = ball_top + speed;
        ball.style.top = ball_top + "px";
    }
    else{
        ball_top = ball_top - speed;
        ball.style.top = ball_top + "px";
    }

    if (ball_left > 478){
        goingRight = false;
    } else if(ball_left < 2){
        goingRight = true;
    }


    if (goingRight) {
        ball_left = ball_left + v_speed;
        ball.style.left = ball_left + "px";
    }
    else{
        ball_left = ball_left - v_speed;
        ball.style.left = ball_left + "px";
    }

    let ballpos = -(ball_left / 48 * 100 - 500);

    if (ball_top > 460 && ball_top < 480){
        if (ballpos < x + 50 && ballpos > x - 50){
            goingDown = false;
            console.log('test');
        }
    }   else if (ball_top > 480) {
        //    (if player hits the bottom)
        lives--;
        ball.style.left ="240px";
        ball_top =  ball_top - 350;
        ball.style.top = ball_top + "px";
        if (lives == 0){

            text.innerText = "last life";
        } else if (lives < 0){
            alert("you died");
            speed = 0;
            v_speed = 0;
            text.innerText = "refresh page to try again!";
        }

        else {
            text.innerText = "lives:" + lives;
        }
    }

    if (ball_top > -2){
        goingDown = true;
    }



    //code here
    setTimeout(update, 10 * (1 / game_speed));
}

let started = false;
game.addEventListener("click", function(){
    if (started){}else{
        update();
        started = true;
        text.innerHTML = "lives:" + lives;
    }
});

