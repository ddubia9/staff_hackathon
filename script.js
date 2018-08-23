$('document').ready(initialize);

var $gameBoard;

//calls all function necessary to start gameplay
function initialize(){
    $("#win-modal").addClass("hide");
    createReferenceToDomElements();
}

function createReferenceToDomElements(){
    $gameBoard = $('#game-area');
}


function modalShowHide () {
    if ($("#win-modal").hasClass("hide")) {
        $("#win-modal").removeClass("hide");
    } else {
        $("#win-modal").addClass("hide");
    }

}