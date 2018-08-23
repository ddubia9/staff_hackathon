$('document').ready(initialize);

var $gameBoard,
    $winModal,

var currentBoardSize;


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
    generateGameBoard(5);
    applyEventHandlers();
    $winModal.addClass("hide");
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
}

//function to build board, take this size of the board as a number
function generateGameBoard(boardSize){
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

function updateStats(){

}

function updateModal(){

}

function showModal(){

}

function clearBoard(){

}

function placePiece(){

}

function reset(boardSize){
    clearBoard();
    generateBoardArray(boardSize);
    generateGameBoard(boardArray);
}

function togglePlayer(){

}

function modalShowHide () {
    if ($("#win-modal").hasClass("hide")) {
        $("#win-modal").removeClass("hide");
    } else {
        $("#win-modal").addClass("hide");
    }

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
                return "YOUUUUU WIN";
            }
        }
    }

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
        if (currentCount === 3) { // TODO change this to be dynamic with board size
            console.log("we found a win in this direction", directionName);
            return true;
        }
    }
}
