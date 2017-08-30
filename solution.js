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

  const enqueueRun = () => {
    if (runDirection) {
      runQueue.push({
        direction: runDirection,
        magnitude: currentRun,
      });
    }
  };

  const findTrend = (index) => {
    const currentPrice = housePrices[index];
    const previousPrice = housePrices[index - 1];
  
    if (currentPrice > previousPrice) {
      if (runDirection === 'inc') {
        currentRun += 1;
      } else {
        enqueueRun();
        currentRun = 1;
      }
      runDirection = 'inc';
      currentSubrangeTotal += currentRun;
    } else if (currentPrice < previousPrice) {
      if (runDirection === 'dec') {
        currentRun += 1;
      } else {
        enqueueRun();
        currentRun = 1;
      }
      runDirection = 'dec';
      currentSubrangeTotal -= currentRun;
    } else if (currentPrice === previousPrice) {
      if (runDirection === 'flat') {
        currentRun += 1;
      } else {
        enqueueRun();
        currentRun = 1;
      }
      runDirection = 'flat';
    }

    // this is unnecesary beacuse dont need to queue last element as it can never be dequeued
    if (index === n - 1) {
      enqueueRun();
    }
  };

  
  for (let i = 1; i < n; i += 1) {
    if (i < k) {
      // need to sum first window and queue all of the "runs"
      findTrend(i);
    } else {
      // write current answer to outout file
      // find trend at next index
      // decrement the first run
      findTrend(i);
    }
  }

  console.log(runQueue);
});
