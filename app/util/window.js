const { runScript } = require('./index');

async function runScriptByPid(pid, innerScript) {
  const script = `
    tell application "System Events"
      set proc to item 1 of (processes whose unix id is ${pid})
      tell proc
        ${innerScript}
      end tell
    end tell
  `;
  return await runScript(script);
}

async function runScriptByName(processName, innerScript) {
  const script = `
    tell application "System Events"
      tell process "${processName}"
        ${innerScript}
      end tell
    end tell
  `;
  return await runScript(script);
}
// 初始化窗口位置 （其实没必要）
exports.initWindowPositionByPid = async (pid) => {
  const script = `set position of front window to {0, 0}`;
  return await runScriptByPid(pid, script);
}

exports.initWindowPositionByName = async (processName) => {
  const script = `set position of front window to {0, 0}`;
  return await runScriptByName(processName, script);
}

exports.initWindowByPid = async (pid) => {
  const script = `
    set frontmost to true
    if windows is not {} then perform action "AXRaise" of item 1 of windows
    delay 0.4
    set size of front window to {806, 533}
    set _size to size of front window
    set _position to position of front window
    return {_size, _position}
  `;
  const result = await runScriptByPid(pid, script);
  return result !== '' ? formatToObj(result) : '';
}

// 激活窗口
exports.activateWindowByPid = async (pid) => {
  const script = `
    set frontmost to true
    if windows is not {} then perform action "AXRaise" of item 1 of windows
  `;
  return await runScriptByPid(pid, script);
}

exports.activateWindowByName = async (processName) => {
  const script = `
    set frontmost to true
    if windows is not {} then perform action "AXRaise" of item 1 of windows
  `;
  return await runScriptByName(processName, script);
}

// 获取窗口信息
exports.getWindowPositionByPid = async (pid) => {
  const script = `
    set _size to size of front window
    set _position to position of front window
    return {_size, _position}
  `;
  const result = await runScriptByPid(pid, script);
  return result !== '' ? formatToObj(result) : '';
}

exports.getWindowPositionByName = async (processName) => {
  const script = `
    set _size to size of front window
    set _position to position of front window
    return {_size, _position}
  `;
  const result = await runScriptByName(processName, script);
  return result !== '' ? formatToObj(result) : '';
}
// 最小化游戏窗口
exports.setLeastWindow = async (pid) => {
  const script = `
    tell application "System Events"
      tell process "NemuPlayer"
        tell front window
          set size to {806, 533}
        end tell
      end tell
    end tell
  `;
  return await runScript(script);
}

function formatToObj(result) {
  const arr = result.split(', ');
  return {
    size: {
      width: +arr[0],
      height: +arr[1]
    },
    position: {
      x: +arr[2],
      y: +arr[3]
    }
  };
}