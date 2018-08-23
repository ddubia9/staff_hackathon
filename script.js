$('document').ready(initialize);

var $gameBoard;

//calls all function necessary to start gameplay
function initialize(){
    createReferenceToDomElements();
}

function createReferenceToDomElements(){
    $gameBoard = $('#game-area');
}

//function to build board, take this size of the board as a number
function generateGameBoard(boardSize){
    var boarSizeClasses = {
        3: '.three',
        4: '.four',
        5: '.five'
    };
    var currentClass = boarSizeClasses[boardSize];
    var rowArr = [];
    for(var rowNumber = 0; rowNumber < boardSize; rowNumber++){
        var $rowDiv = $('<div>', {
            class: "row " + currentClass
        });
        var tileArr = [];
        for(var tileNumber = 0; tileNumber < boardSize; tileNumber++){
            var $tileDiv = $('<div>',{
                class: "tile clickable " + currentClass
            });
            tileArr.push($tileDiv);
        }
        $rowDiv.append(tileArr);
        rowArr.push($rowDiv);
    }
    $gameBoard.append(rowArr)
    return true;
}