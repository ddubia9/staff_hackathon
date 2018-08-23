$('document').ready(initialize);

var $gameBoard;
var currentBoardSize;

//calls all function necessary to start gameplay
function initialize(){
    $("#win-modal").addClass("hide");
    createReferenceToDomElements();
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
    $gameBoard = $('#game-area');
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

