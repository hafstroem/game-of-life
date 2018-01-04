var assert = require('assert');
var Board = require('../life.js').Board;

var b1;

before(function () {

    // Setup a board like this for the tests
    //
    // 0000111000
    // 0010100000
    // 0000111000
    // 0000000000
    // 0000000000   

    b1 = new Board(10, 5);
    b1.clear();
    b1.cell[6][0] = 1;
    b1.cell[5][0] = 1;
    b1.cell[4][0] = 1;
    b1.cell[4][1] = 1;
    b1.cell[4][2] = 1;
    b1.cell[5][2] = 1;
    b1.cell[6][2] = 1;
    b1.cell[2][1] = 1;
})

describe('Life Game Board', function () {
    describe('Checking width and height', function () {
        it('width should be 10 and height 5', function () {
            assert.equal(b1.width, 10);
            assert.equal(b1.height, 5);
        });
    });
    describe('get Cell Values', function () {
        it('cell 1,1 should return 0', function () {
            assert.equal(b1.getCellVal(1, 1), 0);
        });
        it('cell 2,1 should return 1', function () {
            assert.equal(b1.getCellVal(2, 1), 1);
        });
        it('cell 6,0 should return 1', function () {
            assert.equal(b1.getCellVal(6, 0), 1);
        });
    });
    describe('get Neighbouring cell values', function () {
        it('neighbbours of cell 5,1 should amount to 7', function () {
            assert.equal(b1.getNeighbourVal(5, 1), 7);
        });
        it('neighbbours of cell 3,1 should amount to 4', function () {
            assert.equal(b1.getNeighbourVal(3, 1), 4);
        });
        it('neighbbours of cell 3,4 should amount to 1', function () {
            assert.equal(b1.getNeighbourVal(3, 4), 1);
        });
        it('neighbbours of cell 4,4 should amount to 2', function () {
            assert.equal(b1.getNeighbourVal(4, 4), 2);
        });
        it('neighbbours of cell 5,4 should amount to 3', function () {
            assert.equal(b1.getNeighbourVal(5, 4), 3);
        });
    });
});


