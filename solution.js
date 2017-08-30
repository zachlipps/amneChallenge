var fs = require('fs');

fs.readFile('input.txt', function(err, data) {
  if (err) throw err;

  const array = data.toString().split("\n");

  for (const item in array) {
    console.log(array[item]);
  }
});