const Window = require('../app/entities/Window');
const { getWindowPositionByPid, setLeastWindow } = require('../app/util/window');
const currentPid = '39073';
describe('window test', async () => {
  test('init', async () => {
    const { size, position } = await getWindowPositionByPid(currentPid);
    const windowX = new Window(size, position);
    windowX.back();
  });

  test('shapeshift', async () => {
    const { size, position } = await getWindowPositionByPid(currentPid);
    const windowX = new Window(size, position);
    windowX.shapeshift('A');
  })

  test('getActionPoint', async () => {
    await setLeastWindow(currentPid);
    const { size, position } = await getWindowPositionByPid(currentPid);

    const windowX = new Window(size, position);
    await windowX.getActionPoint();
  })

  test.only('inShapeshift', async ()=> {
    const { size, position } = await getWindowPositionByPid(currentPid);
    const windowX = new Window(size, position);
    await windowX.isInShapeShift('S');
  })

  test.only('shapeShift', async () => {
    const { size, position } = await getWindowPositionByPid(currentPid);
    const windowX = new Window(size, position);
    await windowX.shapeshift('S');
  })

  // test.only('isWarEnd', async ()=> {
  //   const { size, position } = await getWindowPositionByPid(currentPid);
  //   const windowX = new Window(size, position);
  //   await windowX.isWarEnd();
  // })


});