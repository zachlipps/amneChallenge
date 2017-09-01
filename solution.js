const fs = require('fs');

fs.readFile('input.txt', (err, data) => {
  if (err) throw err;

  const array = data.toString().trim().split('\n');
  const k = Number(array[0].split(' ')[1]);
  const housePrices = array[1].split(' ');
  const n = housePrices.length;

  let currentSubrangeTotal = 0;
  let currentRun = 1;
  let runDirection;
  let result = '';
  let currentQueueIndex = 0;
  const runQueue = [];

  
  const addToRun = () => {
    runQueue[currentQueueIndex] = {
      direction: runDirection,
      magnitude: currentRun,
    };
  };
  
  const dequeueRun = () => {
    const { direction, magnitude } = runQueue[0];

    if (currentQueueIndex === 0) {
      currentRun -= 1;
    }

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
      currentQueueIndex -= 1;
    }
  };
  
  const findTrend = (index) => {
    const currentPrice = Number(housePrices[index]);
    const previousPrice = Number(housePrices[index - 1]);
    
    if (currentPrice > previousPrice) {
      if (runDirection === 'inc') {
        currentRun += 1;
      } else if (runDirection) {
        currentRun = 1;
        currentQueueIndex += 1;
      }
      runDirection = 'inc';
      addToRun();
      currentSubrangeTotal += currentRun;
    } else if (currentPrice < previousPrice) {
      if (runDirection === 'dec') {
        currentRun += 1;
      } else if (runDirection) {
        currentRun = 1;
        currentQueueIndex += 1;
      }
      runDirection = 'dec';
      addToRun();
      currentSubrangeTotal -= currentRun;
    } else if (currentPrice === previousPrice) {
      if (runDirection === 'flat') {
        currentRun += 1;
      } else if (runDirection) {
        currentRun = 1;
        currentQueueIndex += 1;
      }
      runDirection = 'flat';
      addToRun();
    }
  };

  const writeOutput = (output) => {
    fs.writeFile('./output.txt', output, (error) => {
      if (error) throw error;
      console.log('output saved to output.txt');
    });
  };

  for (let i = 1; i < n; i += 1) {
    if (i < k) {
      // need to sum first window and queue all of the "runs"
      findTrend(i);
    } else {
      result += `${currentSubrangeTotal}\n`;
      findTrend(i);
      dequeueRun();
    }
  }

  // add this for last output which is found after last trend is found
  result += `${currentSubrangeTotal}`;
  writeOutput(result);
});
