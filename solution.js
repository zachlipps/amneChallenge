var fs = require('fs');

fs.readFile('input.txt', function(err, data) {
  if (err) throw err;

  const array = data.toString().split("\n");
  const k = Number(array[0].split(' ')[1]);
  const housePrices = array[1].split(' ');
  const n = housePrices.length;

  let currentSubrangeTotal = 0;
  let currentRun;
  let runDirection;
  let runQueue = [];

  for (let i = 1; i < n; i += 1) {
    if (i < k) {
      // need to sum first window and queue all of the "runs"
    } else {
      // write current answer to outout file
      // find trend at next index
      // decrement the first run
    }
  }
});