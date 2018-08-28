const { ergodicProcess, sleep } = require('../app/util');

describe('util test', () => {

  test.only('get process list', async () => {
    await ergodicProcess();

  })

  test('test sleep', async () => {
    console.log('123');
    await sleep(1000);
    console.log('456');
  })
})