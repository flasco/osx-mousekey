const { ergodicProcess, sleep, rgb2hsv } = require('../app/util');
const fs = require('fs');
describe('util test', () => {

  test('get process list', async () => {
    await ergodicProcess();

  })

  test.only('rgb2hsv', () => {
    const x = rgb2hsv(242, 221, 79);
    console.log(x);
  })
})