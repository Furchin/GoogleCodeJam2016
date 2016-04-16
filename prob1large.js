var LineByLineReader = require('line-by-line'),
    lr = new LineByLineReader('input1-large.txt');

var numCases;
var casenum = 1;
var currentLine;
var choices = [];


lr.on('line', function(line) {
    if (!numCases) {
        numCases = parseInt(line);
        return;
    }

    currentLine = line;
    produceChoices(1, line.charAt(0));

    choices.sort();
    console.log('Case #' + casenum++ + ': ' + choices[choices.length-1]);
    choices = [];

    // Sort choices, and pick last, output, reset choices
});

function produceChoices(i, word) {
    if (i === currentLine.length) {
        choices.push(word);
    } else {
        if (currentLine.charAt(i) < word.charAt(0)) {
            produceChoices(i+1, word + currentLine.charAt(i));
        } else {
            produceChoices(i+1, currentLine.charAt(i) + word);
        }
    }
}
