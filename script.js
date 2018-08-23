$('document').ready(initialize);

var $gameBoard;

//function to build borad, take this size of the board as a number
function generateGameBoard(boardSize){

}

//calls all function necessary to start gameplay
function initialize(){
    createReferenceToDomElements();
}

function createReferenceToDomElements(){
    $gameBoard = $('#game-area');
}

function generateGameBoard(boardSize){
    var boarSizeClasses = {
        3: '.three',
        4: '.four',
        5: '.five'
    };
}