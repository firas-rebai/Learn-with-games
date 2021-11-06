function possibleMoves(x, y, type, c) { //colors the possible moves that the selected piece can make
    let color = "rgba(11, 200, 22, 0.3)";
    for (let i = 0; i < possMoves.length; i++) {
        stage.removeChild(possMoves[i]);
    }
    if (c == "W") { // WHITE
        //pawn 
        if (type == "P") {
            if (((board[y - 1][x] == "E" && board[y - 2][x] == "E") || (board[y - 1][x] == "E" && board[y - 2][x][0] == "B")) && y == 6) {
                //draw 2 squares
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(x * 100, (y - 1) * 100, 100, 100);
                possMoves.push(r);
                stage.addChild(r);
                let r1 = new createjs.Shape();
                r1.graphics.beginFill(color).drawRect(x * 100, (y - 2) * 100, 100, 100);
                possMoves.push(r1);
                stage.addChild(r1);
            } else if (board[y - 1][x][0] == "E") {
                //draw 1 square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(x * 100, (y - 1) * 100, 100, 100);
                possMoves.push(r);
                stage.addChild(r);
            }
            if (board[y - 1][x + 1][0] == "B") {
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect((x + 1) * 100, (y - 1) * 100, 100, 100);
                possMoves.push(r);
                stage.addChild(r);
            }
            if (board[y - 1][x - 1][0] == "B") {
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect((x - 1) * 100, (y - 1) * 100, 100, 100);
                possMoves.push(r);
                stage.addChild(r);
            }

        }
        //queen
        if (type = "Q") {
            //check top
            for (let i = y; i >= 0; i--) {
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(y * 100, i * 100, 100, 100);
                possMoves.push(r);
                stage.addChild(r);
                if (board[i][x][0] == "B") break;
            }
            //check bottom
            for (let i = y; i < 8; i++) {
                //draw square
                let r = new createjs.Shape();
                r.graphics.beginFill(color).drawRect(y * 100, i * 100, 100, 100);
                possMoves.push(r);
                stage.addChild(r);
                if (board[i][x][0] == "B") break;
            }
            //check right
            for (let i = x; i < 8; i++) {
                //draw square
                if (board[y][i][0] == "B") break;
            }
            //check left
            for (let i = x; i >= 0; i--) {
                //draw square
                if (board[y][i][0] == "B") break;
            }
        }

    } else if (c == "B") {
        //pawn 
        if (type == "P" && y == 6) {
            if ((board[y + 1][x] == "E" && board[y + 2][x] == "E") || (board[y + 1][x] == "E" && board[y + 2][x][0] == "W")) {
                //draw 2 squares
            } else if (board[y + 1][x][0] == "W") {
                //draw 1 square
            }
        }
        //queen

    }
}



export function AAAA() {
    console.log("AAAA")
}