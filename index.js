const boxes = document.querySelectorAll('.box');
const gameInfo = document.querySelector('.player');
const newGame = document.querySelector('.newGame');

let player = "";
let gameGrid;
const winGrid = [
    [0,1,2],
    [3,4,5],
    [6,7,8],
    [0,3,6],
    [1,4,7],
    [2,5,8],
    [0,4,8],
    [2,4,6]
];

initGame();

function initGame(){
    player = "X";
    gameGrid = ["", "", "", "", "", "", "", "", ""];
    boxes.forEach((box, index)=>{
        box.style.cursor = "pointer";
        box.classList.remove('win');
        newGame.classList.remove('active');
        box.innerText = "";
    });
    gameInfo.innerText = `Current Player - ${player}`;
}

function checkWin(){
    let answer = "";
    winGrid.forEach((position)=>{
        if(gameGrid[position[0]] !== "" || gameGrid[position[1]] !== "" || gameGrid[position[2]] !== ""){
            if(gameGrid[position[0]] === gameGrid[position[1]] && gameGrid[position[1]] === gameGrid[position[2]]){
                answer = gameGrid[position[0]];
                //making boxes green
                position.forEach((ind)=>{
                    boxes[ind].classList.add('win');
                });
            }
        }
    });

    if(answer !== ""){
        gameInfo.innerText = `Player ${answer} Wins`;
        newGame.classList.add('active');
        return ;
    }
    else{
        let filledCount = 0;
        gameGrid.forEach((el)=>{
            if(el !== ""){
                filledCount++;
            }
        });
        if(filledCount===9){
            gameInfo.innerText = `DRAW`;
            newGame.classList.add('active');
            return ;
        }
    }
}

function swapTurn(){
    if(player==="X"){
        player = "O";
    }
    else{
        player = "X";
    }
    gameInfo.innerText = `Current Player - ${player}`;
}

function handleClick(index){
    if(gameGrid[index] === ''){
        gameGrid[index] = player;
        boxes[index].innerText = player;
        boxes[index].style.cursor = "default";
        swapTurn();
        checkWin();
    }
}

boxes.forEach((element, index) => {
    element.addEventListener('click', () => {
        handleClick(index);
    });
});

newGame.addEventListener('click', initGame);