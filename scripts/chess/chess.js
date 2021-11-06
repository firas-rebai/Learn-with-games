var stage = new createjs.Stage("chess-canvas");
var context = document.getElementById("chess-canvas").getContext("2d");

createjs.Ticker.on("tick", gameLoop);
createjs.Ticker.interval = 25;
createjs.Ticker.framerate = 10;

function drawBoardFromFEN() {
    var x = document.getElementById("input-fen");
    var FEN = x.value;
    console.log("aa");
    let board = [];
    for (let i = 0; i < 8; i++) board.push(["E", "E", "E", "E", "E", "E", "E", "E"]);
    let k = 0;
    let boardNotFinished = true;

}


//drawing the board 
var P = [];

function drawBoard() {
    let square = "B";
    for (let i = 0; i < 8; i++) {
        if (square == "B") square = "W";
        else square = "B";
        for (let j = 0; j < 8; j++) {
            if (square == "B") {
                let rect = new createjs.Shape();
                rect.graphics.beginFill("rgb(105, 45, 17)").drawRect(j * 100, i * 100, 100, 100);
                stage.addChild(rect);
                square = "W";
            } else if (square == "W") {
                let rect = new createjs.Shape();
                rect.graphics.beginFill("rgb(180, 136, 115)").drawRect(j * 100, i * 100, 100, 100);
                stage.addChild(rect);
                square = "B";
            }
        }
    }
}

function drawPieces(board) {
    for (let i = 0; i < P.length; i++) {
        stage.removeChild(P[i]);
    }
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            if (board[i][j] == "E") continue;
            drawPiece(j, i, board[i][j][0], board[i][j][1]);
        }
    }
}

var PiecesMap = [];

function drawPiece(x, y, color, type) {

    let p = new createjs.Bitmap("../resources/chess/" + color + type + ".png")
    p.x = x * 100 + 20;
    p.y = y * 100 + 20;
    stage.addChild(p);
    P.push(p);
    PiecesMap.push({ name: color + type, img: p, cor: { x: x, y: y } });
}

var board = [];
board.push(["BR", "BN", "BB", "BK", "BQ", "BB", "BN", "BR"]);
board.push(["BP", "BP", "BP", "BP", "BP", "BP", "BP", "BP"]);
board.push(["E", "E", "E", "E", "E", "E", "E", "E"]);
board.push(["E", "E", "WQ", "E", "E", "BN", "E", "E"]);
board.push(["E", "E", "E", "E", "WK", "BK", "E", "E"]);
board.push(["E", "E", "E", "BP", "E", "E", "E", "E"]);
board.push(["WPF", "WPF", "WPF", "WPF", "E", "WPF", "WPF", "WPF"]);
board.push(["WR", "WN", "WB", "WK", "WQ", "E", "E", "WR"]);


drawBoard();
drawPieces(board);





var RectArray = [];


function validPosition(x, y) {
    if (y < 8 && y >= 0 && x < 8 && x >= 0) return true;
    else return false;
}


var PossibleMoves = [];
PossibleMoves.push(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
PossibleMoves.push(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
PossibleMoves.push(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
PossibleMoves.push(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
PossibleMoves.push(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
PossibleMoves.push(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
PossibleMoves.push(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);
PossibleMoves.push(['E', 'E', 'E', 'E', 'E', 'E', 'E', 'E']);


function createPossMove(x, y) {
    let color = "rgba(38, 15, 121, 0.644)";
    let width = 30;
    let height = 30;
    let pad = 35;
    let r = new createjs.Shape();
    r.graphics.beginFill(color).drawRect(x * 100 + pad, (y - 1) * 100 + pad, height, width);
    RectArray.push(r);
    stage.addChild(r);
    PossibleMoves[y][x] = "P";
}



function possibleMoves(x, y, type, c) { //colors the possible moves that the selected piece can make
    //clear posssible moves array
    for (let i = 0; i < 8; i++) {
        for (let j = 0; j < 8; j++) {
            PossibleMoves[i][j] = "E";
        }
    }
    for (let i = 0; i < RectArray.length; i++) {
        stage.removeChild(RectArray[i]);
    }

    if (c == "W") { // WHITE
        //pawn 
        if (type == "P") {
            if ((board[y - 1][x] == "E" && board[y - 2][x] == "E") && y == 6) {
                //draw 2 squares  y-1  y-2
                createPossMove(x, y - 1);
                createPossMove(x, y - 2);
            } else if (board[y - 1][x][0] == "E") {
                //draw 1 square y-1
                createPossMove(x, y - 1);
            }
            if (board[y - 1][x + 1][0] == "B") {
                //draw x+1 y-1
                createPossMove(x + 1, y - 1);
            }
            if (board[y - 1][x - 1][0] == "B") {
                //draw x-1 y-1
                createPossMove(y - 1, x - 1);
            }

        }
        //  QUEEN
        else if (type == "Q") {
            //check left
            for (let i = x - 1; i >= 0; i--) {
                if (board[y][i][0] == "W") break;
                //draw square 
                createPossMove(i, y);
                if (board[y][i][0] == "B") break;
            }
            //check right
            for (let i = x + 1; i < 8; i++) {
                if (board[y][i][0] == "W") break;
                //draw square
                createPossMove(i, y);
                if (board[y][i][0] == "B") break;
            }
            //check right
            for (let i = y + 1; i < 8; i++) {
                if (board[i][x][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(x * 100 + pad, i * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[i][x][0] == "B") break;
            }
            //check left
            for (let i = y - 1; i >= 0; i--) {
                if (board[i][x][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(x * 100 + pad, i * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[i][x][0] == "B") break;
            }
            //check diag
            // RIGHT BOTTOM
            for (let i = 1; i < Math.min(7 - x, 7 - y) + 1; i++) {
                if (board[y + i][x + i][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect((x + i) * 100 + pad, (y + i) * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[y + i][x + i][0] == "B") break;
            }
            // RIGHT TOP
            for (let i = 1; i < Math.min(7 - x, 7 - y) + 1; i++) {
                if (board[y - i][x + i][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect((x + i) * 100 + pad, (y - i) * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[y - i][x + i][0] == "B") break;
            }
            // LEFT TOP
            for (let i = 1; i < Math.min(x, y) + 1; i++) {
                if (board[y - i][x - i][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect((x - i) * 100 + pad, (y - i) * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[y - i][x - i][0] == "B") break;
            }
            // LEFT BOTTOM
            if (y != 7) {
                for (let i = 1; i < Math.min(x, y) + 1; i++) {
                    if (board[y + i][x - i][0] == "W") break;
                    //draw square
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - i) * 100 + pad, (y + i) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    if (board[y + i][x - i][0] == "B") break;
                }
            }
            // BISHOP
        } else if (type == "B") {
            //check diag
            // RIGHT BOTTOM
            for (let i = 1; i < Math.min(7 - x, 7 - y) + 1; i++) {
                if (board[y + i][x + i][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect((x + i) * 100 + pad, (y + i) * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[y + i][x + i][0] == "B") break;
            }
            // RIGHT TOP
            for (let i = 1; i < Math.min(7 - x, 7 - y) + 1; i++) {
                if (board[y - i][x + i][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect((x + i) * 100 + pad, (y - i) * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[y - i][x + i][0] == "B") break;
            }
            // LEFT TOP
            for (let i = 1; i < Math.min(x, y) + 1; i++) {
                if (board[y - i][x - i][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect((x - i) * 100 + pad, (y - i) * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[y - i][x - i][0] == "B") break;
            }
            // LEFT BOTTOM
            if (y != 7)
                for (let i = 1; i < Math.min(x, y) + 1; i++) {
                    if (board[y + i][x - i][0] == "W") break;
                    //draw square
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - i) * 100 + pad, (y + i) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    if (board[y + i][x - i][0] == "B") break;
                }
                // ROOK
        } else if (type == "R") {
            //check left
            for (let i = x - 1; i >= 0; i--) {
                if (board[y][i][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(i * 100 + pad, y * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[y][i][0] == "B") break;
            }
            //check right
            for (let i = x + 1; i < 8; i++) {
                if (board[y][i][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(i * 100 + pad, y * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[y][i][0] == "B") break;
            }
            //check right
            for (let i = y + 1; i < 8; i++) {
                if (board[i][x][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(x * 100 + pad, i * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[i][x][0] == "B") break;
            }
            //check left
            for (let i = y - 1; i >= 0; i--) {
                if (board[i][x][0] == "W") break;
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(x * 100 + pad, i * 100 + pad, height, width);
                RectArray.push(r);
                stage.addChild(r);
                if (board[i][x][0] == "B") break;
            }
        }
        // KNIGHT
        else if (type == "N") {
            if (validPosition(x + 1, y + 2))
                if ((board[y + 2][x + 1][0] == "E" || board[y + 2][x + 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x + 1) * 100 + pad, (y + 2) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                }

            if (validPosition(x - 1, y + 2))
                if ((board[y + 2][x - 1][0] == "E" || board[y + 2][x - 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - 1) * 100 + pad, (y + 2) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                }

            if (validPosition(x + 1, y - 2))
                if ((board[y - 2][x + 1][0] == "E" || board[y - 2][x + 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x + 1) * 100 + pad, (y - 2) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                }

            if (validPosition(x - 1, y - 2))
                if ((board[y - 2][x - 1][0] == "E" || board[y - 2][x - 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - 1) * 100 + pad, (y - 2) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                }

            if (validPosition(x + 2, y + 1))
                if ((board[y + 1][x + 2][0] == "E" || board[y + 1][x + 2][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x + 2) * 100 + pad, (y + 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                }
            if (validPosition(x - 2, y + 1))
                if ((board[y + 1][x - 2][0] == "E" || board[y + 1][x - 2][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - 2) * 100 + pad, (y + 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                }

            if (validPosition(x + 2, y - 1))
                if ((board[y - 1][x + 2][0] == "E" || board[y - 1][x + 2][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x + 2) * 100 + pad, (y - 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                }

            if (validPosition(x - 2, y - 1))
                if ((board[y - 1][x - 2][0] == "E" || board[y - 1][x - 2][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - 2) * 100 + pad, (y - 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                }


        } else if (type == "K") {
            if (validPosition(x - 1, y - 1))
                if ((board[y - 1][x - 1][0] == "E" || board[y - 1][x - 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - 1) * 100 + pad, (y - 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    PossibleMoves[x - 1][y - 1] = 'P';
                }
            if (validPosition(x + 1, y - 1))
                if ((board[y - 1][x + 1][0] == "E" || board[y - 1][x + 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x + 1) * 100 + pad, (y - 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    PossibleMoves[x + 1][y - 1] = 'P';

                }
            if (validPosition(x - 1, y + 1))
                if ((board[y + 1][x - 1][0] == "E" || board[y + 1][x - 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - 1) * 100 + pad, (y + 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    PossibleMoves[x - 1][y + 1] = 'P';

                }
            if (validPosition(x + 1, y + 1))
                if ((board[y + 1][x + 1][0] == "E" || board[y + 1][x + 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x + 1) * 100 + pad, (y + 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    PossibleMoves[x + 1][y + 1] = 'P';
                }
            if (validPosition(x, y + 1))
                if ((board[y + 1][x][0] == "E" || board[y + 1][x][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect(x * 100 + pad, (y + 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    PossibleMoves[x][y + 1] = 'P';
                }
            if (validPosition(x, y - 1))
                if ((board[y - 1][x][0] == "E" || board[y - 1][x][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect(x * 100 + pad, (y - 1) * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    PossibleMoves[x][y - 1] = 'P';
                }
            if (validPosition(x + 1, y))
                if ((board[y][x + 1][0] == "E" || board[y][x + 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x + 1) * 100 + pad, y * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    PossibleMoves[x + 1][y] = 'P';
                }
            if (validPosition(x - 1, y))
                if ((board[y][x - 1][0] == "E" || board[y][x - 1][0] == "B") && validPosition(x, y)) {
                    let r = new createjs.Shape();
                    r.graphics.beginFill(color).drawRect((x - 1) * 100 + pad, y * 100 + pad, height, width);
                    RectArray.push(r);
                    stage.addChild(r);
                    PossibleMoves[x - 1][y] = 'P';
                }
        }

    } else if (c == "B") {}
}


var caseSelected = { x: -1, y: -1, type: "E" };
var rect = new createjs.Shape();
rect.graphics.beginFill("rgba(11, 253, 23, 0.322)").drawRect(0, 0, 100, 100);
stage.addChild(rect);

//button press

stage.on("stagemousedown", MouseButtonDown);

function MouseButtonDown(event) { //colors the selected piece and its possible moves
    let x = Math.floor(event.rawX / 100);
    let y = Math.floor(event.rawY / 100);
    if (PossibleMoves[x][y] == "P") {
        for (let i = 0; i < PiecesMap.length; i++) {
            if (PiecesMap[i].cor.x == x && PiecesMap[i].cor.y == y) {
                board[x][y] = caseSelected.type;
                //drawPieces(board);
            }
        }
    } else if ((caseSelected[0] == x && caseSelected[1] == y) || board[y][x] == "E") {
        for (let i = 0; i < RectArray.length; i++) {
            stage.removeChild(RectArray[i]);
        }
        return;
    } else {
        console.log(x + " " + y)
        rect.x = x * 100;
        rect.y = y * 100;
        caseSelected.x = x;
        caseSelected.y = y;
        caseSelected.type = board[y][x][0] + board[y][x][1];
        possibleMoves(x, y, board[y][x][1], board[y][x][0]);
    }
}

//game loop ->
function gameLoop(event) {
    stage.update();
}
createjs.Ticker.on("tick", gameLoop);
createjs.Ticker.interval = 25;
createjs.Ticker.framerate = 10;