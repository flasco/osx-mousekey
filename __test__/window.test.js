const Window = require('../app/entities/Window');
const { getWindowPositionByPid } = require('../app/util/window');

describe('window test', async () => {
  test('init', async () => {
    const { size, position } = await getWindowPositionByPid('18221');
    const windowX = new Window(size, position);
    windowX.back();
  });

  test('shapeshift', async () => {
    const { size, position } = await getWindowPositionByPid('18221');
    const windowX = new Window(size, position);
    windowX.shapeshift('A');
  })

  test.only('getActionPoint', async () => {
    const { size, position } = await getWindowPositionByPid('18221');
    const windowX = new Window(size, position);
    await windowX.getActionPoint();
  })


});