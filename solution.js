var fs = require('fs');

fs.readFile('input.txt', function(err, data) {
  if (err) throw err;

  const array = data.toString().split("\n");
  const k = Number(array[0].split(' ')[1]);
  const housePrices = array[1].split(' ');
  const n = housePrices.length;

});