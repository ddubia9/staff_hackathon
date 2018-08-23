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


