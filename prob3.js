var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('input3-small.txt');
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
        currentN = parseInt(line);
        return;
    }

    processBatch(line);
    currentN = undefined;
    casenum++;

});
var bffs = {};
var inverseBffs = {};
function processBatch(line) {
    bffs = {};
    inverseBffs = {};
    //console.log('***********' + casenum);

    // Convert to array, and also make a hash for easy lookup
    var bffsArr = convertToArray(line);
    //console.log('bffsArr = ', bffsArr);
    for (var i = 0; i < bffsArr.length; i++) {
        bffs[i] = bffsArr[i] -1;
    }


    for (var i = 0; i < bffsArr.length; i++) {
        if (!inverseBffs[i]) {
            inverseBffs[i] = [];
        }
        inverseBffs[i].push(bffs[i]);
    }

    console.log('inverse BFFs = ', inverseBffs);

    var max = 0;
    for (var i = 0; i < bffsArr.length; i++) {
        // Put each kid first, then recurse. See how many kids we can fit.
        var count = countPossibleKids([i]);
        if (count > max) {
            max = count;
        }
    }
    console.log('Case #' + casenum + ': ' + max);
}

function countPossibleKids(circle) {
    //console.log('considering circle', circle);

    // We have two possibilities here. We can seat another kid at the end,
    // in which case the new kid must be BFFs with circle[0] or circle[circle.length-1].
    // var opt1 = countPossibleKids(circle.push(bffs[circle[0]]));
    // circle.pop();
    // //var opt2 = countPossibleKids(circle.push(bffs[circle[circle.length - 1]]));
    // var opt2 = 1;
    //return Match.max(opt1, opt2);

    var a = 0;
    var b = 0;
    // if (circle.indexOf(bffs[circle[0]]) === -1 ) {
    //     //console.log('Adding bbf of the first kid to array, that new BFF is ' + bffs[circle[0]]);
    //     a = countPossibleKids(_.flatten([circle,bffs[circle[0]]]));
    // }
    //
    // if (circle.indexOf(bffs[circle[circle.length - 1]]) === -1) {
    //     //console.log('adding bff of last kid to array, that new bff is ' + bffs[circle[circle.length - 1]]);
    //     b = countPossibleKids(_.flatten([circle,bffs[circle[circle.length - 1]]]));
    // }
    var max = 0;
    if (inverseBffs[circle[circle.length-1]]) {
        for (var i = 0; i < inverseBffs[circle[circle.length-1]].length; i++ ) {
            if (circle.indexOf(inverseBffs[circle[circle.length-1]][i]) === -1) {
                var x = countPossibleKids(_.flatten([circle, inverseBffs[circle[circle.length-1]][i]]));
                if (x > max)  {
                    max = x;
                }
            }
        }
    }

    //var max = Math.max(a, b);
    // if circle is valid, might need to return its length too.
    if (isValid(circle)) {
        return Math.max(circle.length, max);
    } else {
        return max;
    }


    // AND circle[0] must be BFFs with circle[1] or with the new kid
    // AND circle[circle.length-1] must be BFFs with circle[circle.length-2] or with the new kid
    // or else we've hit the maximum with this circle.

}

function isValid(circle) {
    // Kids by themselves always happy.
    if (circle.length === 1) {
        return true;
    }

    for(var i = 1; i < circle.length - 1; i++) {
        // Is circle[i] happy?
        if (bffs[circle[i]] !== circle[i - 1] && bffs[circle[i]] !== circle[i + 1]) {
            return false;
        }
    }

    // Check to make sure circle[0] is happy.
    if (bffs[circle[0]] !== circle[1] &&  bffs[circle[0]] !== circle[circle.length-1]) {
        return false;
    }

    // Check to make sure circle[circle.length -1] is happy
    if (bffs[circle[circle.length-1]] !== circle[0] && bffs[circle[circle.length-1]] !== circle[circle.length-2]) {
        return false;
    }

    // Guess everyone is happy. Make sure we've only used each kid once.
    //return _.uniq(circle).length === circle.length;
    var uniq = _.uniq(circle).length === circle.length;
    if (!uniq) {
        //console.log('circle is not unique: ', circle)
    }
    return uniq;
    //return true;
}

function convertToArray(line) {
    var ret = [];
    for (var i = 0; i < line.length; i++ ) {
        if (line.charAt(i) !== ' ') {
            ret.push(parseInt(line.charAt(i)));
        }
    }
    return ret;
}
