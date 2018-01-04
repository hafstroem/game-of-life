
//#####################################################################################################################
/**
 * Represents a Game Board. A board in this sense is comparable to a table of cells organized rows and columns 
 * @constructor
 * @param {number} width - The width of the board. 
 * @param {number} height - The height of the board.
 */
function Board(width, height) {
    this.width = width;
    this.height = height;

    this.cell = new Array(height);
    for (var c = 0; c < width; c++) {
        this.cell[c] = new Array(height);
    }
};
//---------------------------------------------------------------------------------------------------------------------
/** Fills the board with zeroes */
Board.prototype.clear = function () {
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            this.cell[x][y] = 0;
        }
    }
}
//---------------------------------------------------------------------------------------------------------------------
/** returns a string representation of rthe board (note - returns one line for each row in the board) */
Board.prototype.toString = function () {
    var result = "";
    for (var y = 0; y < this.height; y++) {
        var line = "";
        for (var x = 0; x < this.width; x++) {
            line += this.cell[x][y];
        }
        result += line + "\n";
    }
    return result;
}
//---------------------------------------------------------------------------------------------------------------------
/** returns a new board as a clone */
Board.prototype.clone = function () {
    var resultBoard = new Board(this.width, this.height);
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            resultBoard.cell[x][y] = this.cell[x][y];
        }
    }
    return resultBoard;
}
//---------------------------------------------------------------------------------------------------------------------
/** returns a new evolved board as a clone. The new board represents the next step
 * according to the rules in game of life
*/
Board.prototype.evolve = function () {
    var resultBoard = new Board(this.width, this.height);
    for (var y = 0; y < this.height; y++) {
        for (var x = 0; x < this.width; x++) {
            // count number of live neighbours
            var neighbourVal = this.getNeighbourVal(x, y);
            // Checking if current cell is alive
            if (this.cell[x][y] == 1) {
                if (neighbourVal < 2) {
                    // alive but will die because of too few live neighbours
                    resultBoard.cell[x][y] = 0;
                } else if (neighbourVal > 1 && neighbourVal < 4) {
                    // alive and will survive - has 2 or 3 live neighbours
                    resultBoard.cell[x][y] = 1;
                } else {
                    // alive but dies of overpopulation
                    resultBoard.cell[x][y] = 0;
                }
            } else {
                // the cell is dead - check if it comes alive because of exactly 3 live neighbours
                if (neighbourVal == 3) {
                    resultBoard.cell[x][y] = 1;
                } else {
                    resultBoard.cell[x][y] = 0;
                }
            }
        }
    }
    return resultBoard;
}
//---------------------------------------------------------------------------------------------------------------------
/**
 * Returns value of the cell given as parameters (context cell). if requested coordinates are one less or more than 
 * inside the bounds - it is rolled to the other side. 
 * @param {number} x - x parameter of the context cell. 
 * @param {number} y - y parameter of the context cell.
 */
Board.prototype.getCellVal = function (x, y) {
    if (x < 0) x = this.width - 1;
    if (x > this.width - 1) x = 0;
    if (y < 0) y = this.height - 1;
    if (y > this.height - 1) y = 0;
    return this.cell[x][y];
}
//---------------------------------------------------------------------------------------------------------------------
/**
 * Returns value of the sum of all neighbours of a cell given as parameters (context cell). 
 * @param {number} x - x parameter of the context cell. 
 * @param {number} y - y parameter of the context cell.
 */
Board.prototype.getNeighbourVal = function (x, y) {
    return this.getCellVal(x - 1, y - 1) +   // northwest
        this.getCellVal(x, y - 1) +          // north
        this.getCellVal(x + 1, y - 1) +        // northeast
        this.getCellVal(x + 1, y) +          // east
        this.getCellVal(x + 1, y + 1) +        // southeast
        this.getCellVal(x, y + 1) +          // south
        this.getCellVal(x - 1, y + 1) +        // southwest
        this.getCellVal(x - 1, y);           // west     
}
//---------------------------------------------------------------------------------------------------------------------
if (typeof module !== 'undefined' ) {
    module.exports.Board = Board;
} 
//#####################################################################################################################


var b1 = new Board(20, 10);
b1.clear();
var timerId = 0;

//---------------------------------------------------------------------------
function createTable() {

    var tb1 = document.getElementById("gameTable");

    var cols = b1.width;
    var rows = b1.height;

    for (var y = 0; y < rows; y++) {
        var row = document.createElement("tr");

        for (var x = 0; x < cols; x++) {

            var cell = document.createElement("td");
            
            // Create class attribute for table cell
            var attClass = document.createAttribute("class");
            if (b1.getCellVal(x, y) == 1) {
                attClass.value = "alive";
            } else {
                attClass.value = "dead";
            }

            // Create id attribute for table cell
            var attId = document.createAttribute("id");
            attId.value = "cell_" + x + "_" + y;

            // Create onClick attribute for table cell
            var attOnClick = document.createAttribute("onClick");
            attOnClick.value = "toggleCell(" + x + "," + y +")";
            
            
            cell.setAttributeNode(attClass);
            cell.setAttributeNode(attId);
            cell.setAttributeNode(attOnClick);
            
            row.appendChild(cell);
        }
        tb1.appendChild(row);
    }
}
//---------------------------------------------------------------------------
function toggleCell(x, y) {
    var cellStr = "cell_" + x + "_" + y;
    var cellvalue = b1.getCellVal(x, y);
    if (cellvalue == 0) {
        b1.cell[x][y] = 1; 
        document.getElementById(cellStr).setAttribute("class", "alive");
    } else {
        b1.cell[x][y] = 0; 
        document.getElementById(cellStr).setAttribute("class", "dead");
    }
}
//---------------------------------------------------------------------------
function evolve() {
    var b_new = b1.evolve();
    b1 = null;
    b1 = b_new;

    for (var y = 0; y < b1.height; y++) {
        for (var x = 0; x < b1.width; x++) {
            var cellId = "cell_" + x + "_" + y;
            var cellvalue = b1.getCellVal(x, y);
            if (cellvalue == 1) {
                document.getElementById(cellId).setAttribute("class", "alive");
            } else {
                document.getElementById(cellId).setAttribute("class", "dead");
            }
        }
    }
}
//---------------------------------------------------------------------------
function startTimer() {
    console.log('Starting Timer');
    timerId = window.setInterval(function() {
        evolve();
    }, 500);
}
//---------------------------------------------------------------------------
function stopTimer() {
    console.log('Stopping Timer');
     window.clearInterval(timerId);
}
//---------------------------------------------------------------------------

