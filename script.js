$('document').ready(initialize);

var $gameBoard;

//calls all function necessary to start gameplay
function initialize(){
    createReferenceToDomElements();
}

function createReferenceToDomElements(){
    $gameBoard = $('#game-area');
}