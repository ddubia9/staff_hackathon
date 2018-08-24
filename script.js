$('document').ready(initialize);

var $gameBoard,
    $winModal,
    $resetBttn,
    $winModalWinner,
    $p1WinCount,
    $p2WinCount;

var currentBoardSize = 3;
var currentPlayer = 0;
var boardArray = [];
var playerWinCount = {
    player1Wins: 0,
    player2Wins: 0
}

// Grouped directions for us to loop over and check for wins
const directions = [
    {
        up: { y: -1, x: 0 },
        down: { y: 1, x: 0 }
    },
    {
        left: { y: 0, x: -1 },
        right: { y: 0, x: 1 }
    },
    {
        upLeft: { y: -1, x: -1 },
        downRight: { y: 1, x: 1 }
    },
    {
        upRight: { y: -1, x: 1 },
        downLeft: { y: 1, x: -1 },
    }
]

//calls all function necessary to start gameplay
function initialize(){
    createReferenceToDomElements();
    generateGameBoard(currentBoardSize);
    boardArray = generateBoardArray(currentBoardSize);
    applyEventHandlers();
}

function applyEventHandlers(){
    $gameBoard.on("click", ".clickable", placePiece);
    $(".board-size-3").on("click", ()=>{
        reset(3);
    })
    $(".board-size-4").on("click", ()=>{
        reset(4);
    })
    $(".board-size-5").on("click", ()=>{
        reset(5);
    })
    $resetBttn.on("click", ()=>{
        reset(currentBoardSize);
    })
}

function createReferenceToDomElements(){
    console.log("running reference")
    $gameBoard = $('#game-area');
    $winModal = $("#win-modal");
    $resetBttn = $('#reset-bttn')
    $winModalWinner = $('#win-modal-winner');
    $p1WinCount = $('.p1wins');
    $p2WinCount = $('.p2wins');
}

//function to build board, take this size of the board as a number
function generateGameBoard(boardSize){
    clearBoard();
    console.log('generating board')
    var boardSizeClasses = {
        3: 'three',
        4: 'four',
        5: 'five'
    };
    var currentClass = boardSizeClasses[boardSize];
    var rowArr = [];
    for(var rowNumber = 0; rowNumber < boardSize; rowNumber++){
        var $rowDiv = $('<div>', {
            class: "row " + currentClass
        });
        var tileArr = [];
        for(var tileNumber = 0; tileNumber < boardSize; tileNumber++){
            var $tileDiv = $('<div>',{
                class: "tile clickable " + currentClass,
                row: rowNumber,
                column: tileNumber
            });
            tileArr.push($tileDiv);
        }
        $rowDiv.append(tileArr);
        rowArr.push($rowDiv);
    }
    $gameBoard.append(rowArr)
    return true;
}

function generateBoardArray(boardSize) {
    currentBoardSize = boardSize;
    return new Array(boardSize).fill(new Array(boardSize).fill(0));
}

function updateStats(obj){
    $p1WinCount.text(obj.player1Wins);
    $p2WinCount.text(obj.player1Wins);
}


function clearBoard(){
    $gameBoard.empty();
}

function placePiece(event){
    let positionY = parseInt($(event.target).attr('row'));
    let positionX = parseInt($(event.target).attr('column'));

    checkWin(currentPlayer, positionY, positionX);
}

function reset(boardSize){
    generateBoardArray(boardSize);
    generateGameBoard(boardArray);
}

function togglePlayer(){
    currentPlayer = 1 - currentPlayer;
    $(".player1, .player2").removeClass("highlight");
    $(`.player${currentPlayer}`).addClass("highlight");
}

function modalShowHide () {
    $winModal.toggleClass("hide");
}

function updateModal (winningPlayer) {
    var modalText = {
        "undefined": 'Draw!',
        0: 'Player 1 wins!',
        1: 'Player 2 wins!'
    }
    $winModalWinner.text(modalText[winningPlayer]);
    modalShowHide();
}

function checkWin(playerPiece, positionY, positionX) {
    let thereIsAWin = null;

    // Grabs a set of directions to check for
    for (let directionGrouping of directions) {
        console.log("Our groupings", directionGrouping);
        var currentCount = 1;

        // Grabs a specific direction for us to check for
        for (let vector in directionGrouping) {
            console.log("Our currentVector", vector);
            let currentVector = directionGrouping[vector];

            thereIsAWin = countPiecesInCurrentDirection(playerPiece, currentVector, positionY, positionX, vector);

            // Exits our win check if our current directional check produces a win that is determined by true
            if (thereIsAWin) {
                currentPlayer ? playerWinCount.player2Wins++ : playerWinCount.player1Wins++;
                updateStats(playerWinCount);
            }
        }
    }

    togglePlayer();

    function countPiecesInCurrentDirection(playerPiece, currentVector, currentY, currentX, directionName) {
        let { y, x } = currentVector; // Determines the direction we're checking for our pieces

        while(boardArray[currentY + y] !== undefined && boardArray[currentY + y][currentX + x] !== undefined) { // Will allow us to check if we're not outside our bounds
            // Allows us to increment forward or backwards depending on the vector we're moving in
            currentY += y;
            currentX += x;

            // Collects a running total of our count of pieces in grouped direction
            if (boardArray[currentY][currentX] === playerPiece) {
                console.log("Found a consecutive piece");
                currentCount++;
            }
        }

        // Returns true to determine our win within the loop of our grouped directions
        if (currentCount === currentBoardSize) {
            console.log("we found a win in this direction", directionName);
            return true;
        }
    }
}
