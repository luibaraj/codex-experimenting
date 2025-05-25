const assert = require('assert');
const { randomPosition } = require('./script.js');

for (let i = 0; i < 100; i++) {
  const pos = randomPosition(10);
  assert(pos >= 0 && pos < 10, `randomPosition out of range: ${pos}`);
}
console.log('All tests passed');
