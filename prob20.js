var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('input2-small.txt');
var _ = require('underscore');
var createTrie = require('array-trie');
var numCases;
var casenum = 1;
var currentN;
var n = 0;
var lines = [];
var origLines;


lr.on('line', function(line) {
    if (!numCases) {
        numCases = parseInt(line);
        return;
    }

    if (!currentN) {
        currentN = 2 * parseInt(line) - 1;
        return;
    }

    if (n++ < currentN) {
        lines.push(line)
    } else {
        processBatch();

        // Reset everything
        lines = [];
        n = 0;
        currentN = undefined;
        casenum++;
    }

});

lr.on('end', function() {
    // process the last batch
    processBatch();
})

function processBatch() {
    console.log('***********' + casenum);

    // Sort all the lines.
    lines.sort();

    // Store a copy of the lines.
    origLines = _.clone(lines);

    // var trie = createTrie();
    //
    // for (var i = 0; i < lines.length; i++ ){
    //     trie.set(convertToArray(lines[i]), 1);
    // }
    //
    // console.log(trie.get([1, 2, 3]));
    // console.log(trie.get('1 2 3'));
    // Great, start filling in an array.
    // First line goes across.

    // populate arr with first row and column of 0's, then pick lines recursively to fit.
    var arr = [];
    arr.push(convertToArray(lines.shift()));

    // Fill in the column; consider all potential matches
    for (var i = 0; lines[i].charAt(0) === '' + arr[0][0]; i++ ) {

    }


}

function convertToArray(line) {
    var ret = [0];
    for (var i = 0; i < line.length; i++ ) {
        if (line.charAt(i) !== ' ') {
            ret.push(parseInt(line.charAt(i)));
        }
    }
    return ret;
}
