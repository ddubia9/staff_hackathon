$('document').ready(initialize);

var $gameBoard;
var currentBoardSize;

//calls all function necessary to start gameplay
function initialize(){
    console.log('running init')
    createReferenceToDomElements();
    generateGameBoard(5);
    $("#win-modal").addClass("hide");
    applyEventHandlers();
}

function applyEventHandlers(){
    $("#game-area").on("click", ".clickable", placePiece);
    $(".board-size-3").on("click", ()=>{
        reset(3);
    })
    $(".board-size-4").on("click", ()=>{
        reset(4);
    })
    $(".board-size-5").on("click", ()=>{
        reset(5);
    })
    $(".reset").on("click", ()=>{
        reset(currentBoardSize);
    })
}

function createReferenceToDomElements(){
    console.log("running reference")
    $gameBoard = $('#game-area');
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

