$('document').ready(initialize);

var $gameBoard;

//calls all function necessary to start gameplay
function initialize(){
    console.log('running init')
    createReferenceToDomElements();
    generateGameBoard(5);
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