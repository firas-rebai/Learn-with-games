import piece from "/scripts/chess/piece.js"




function drawBoard(context) {
    let square = "B";
    for (let i = 0; i < 8; i++) {
        if (square == "B") square = "W";
        else square = "B";
        for (let j = 0; j < 8; j++) {
            //console.log(square + " " + i * 100 + " " + j * 100);
            if (square == "B") {
                context.fillStyle = "rgb(105, 45, 17)";
                context.fillRect(j * 100, i * 100, 100, 100);
                square = "W";
            } else if (square == "W") {
                context.fillStyle = "rgb(180, 136, 115)";
                context.fillRect(j * 100, i * 100, 100, 100);
                square = "B";
            }
        }
    }
}


function drawPiecesFromFEN(FEN) {

}

function drawPieces(board, context) {
    let A = new piece(0, 0, "B", "B");
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] == "E") continue;
            //console.log(i + " " + j);
            A.x = i;
            A.y = j;
            A.color = board[i][j][0];
            A.type = board[i][j][1];
            console.log(A.x + " " + A.y + " " + A.color);
            A.draw(context);
        }
    }
}

var board = [];
board.push(["BR", "BN", "BB", "BK", "BQ", "BB", "BN", "BR"]);
board.push(["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"]);
board.push(["E", "E", "E", "E", "E", "E", "E", "E"]);
board.push(["E", "E", "E", "E", "E", "E", "E", "E"]);
board.push(["E", "E", "E", "E", "E", "E", "E", "E"]);
board.push(["E", "E", "E", "E", "E", "E", "E", "E"]);
board.push(["WP", "WP", "WP", "WP", "WP", "WP", "WP", "WP"]);
board.push(["WR", "WN", "WB", "WK", "WQ", "WB", "WN", "WR"]);


let canvas = document.getElementById("chess-canvas");
let context = canvas.getContext("2d");


drawBoard(context);

drawPieces(board, context);