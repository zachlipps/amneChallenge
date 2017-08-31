const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const array = data.toString().split('\n');
  const k = Number(array[0].split(' ')[1]);
  const housePrices = array[1].split(' ');
  const n = housePrices.length;

  let currentSubrangeTotal = 0;
  let currentRun;
  let runDirection;
  let result = '';
  const runQueue = [];


  const enqueueRun = () => {
    if (runDirection) {
      runQueue.push({
        direction: runDirection,
        magnitude: currentRun,
      });
    }
  };

  const dequeueRun = () => {
    const { direction, magnitude } = runQueue[0];

    if (direction === 'inc') {
      currentSubrangeTotal -= magnitude;
      runQueue[0].magnitude -= 1;
    } else if (direction === 'dec') {
      currentSubrangeTotal += magnitude;
      runQueue[0].magnitude -= 1;
    } else {
      runQueue[0].magnitude -= 1;
    }

    if (runQueue[0].magnitude === 0) {
      runQueue.shift();
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

  const writeOutput = (output) => {
    fs.writeFile('./output.txt', output, (error) => {
      if (error) throw error;
      console.log('The file was saved!');
    });
  };
  
  for (let i = 1; i < n; i += 1) {
    if (i < k) {
      // need to sum first window and queue all of the "runs"
      findTrend(i);
    } else {
      // write current answer to outout file
      result += `${currentSubrangeTotal}\n`;
      // find trend at next index
      findTrend(i);
      // decrement the first run
      dequeueRun();
    }
  }
  // add this for last output which is found after last trend is found
  result += `${currentSubrangeTotal}`;
  writeOutput(result);
});
