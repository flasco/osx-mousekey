const { runScript } = require('./index');

exports.initWindowPositionByPid = async (pid) => {
  const script = `
  tell application "System Events"
    set proc to item 1 of (processes whose unix id is ${pid})
    tell proc
      set position of front window to {0, 0}
    end tell
  end tell
  `;
  return await runScript(script);
}

exports.initWindowPositionByName = async (processName) => {
  const script = `
  tell application "System Events"
    tell process "${processName}"
      set position of front window to {0, 0}
    end tell
  end tell
  `;
  return await runScript(script);
}


// 效率高
exports.getWindowPositionByPid = async (pid) => {
  const script = `
  tell application "System Events"
    set proc to item 1 of (processes whose unix id is ${pid})
    tell proc
      set _size to size of front window
      set _position to position of front window
      return {_size, _position}
    end tell
  end tell
  `;
  const result = await runScript(script);
  return result !== '' ? formatToObj(result) : '';
}

// 效率低
exports.getWindowPositionByName = async (processName) => {
  const script = `
  tell application "System Events"
    tell process "${processName}"
      set _size to size of front window
      set _position to position of front window
      return {_size, _position}
    end tell
  end tell
  `;
  const result = await runScript(script);
  return result !== '' ? formatToObj(result) : '';
}

exports.setLeastWindow = async (pid) => {
  const script = `
  tell application "System Events"
    set proc to item 1 of (processes whose unix id is ${pid})
    tell proc
        set size of front window to {803, 531}
    end tell
  end tell
`;
  await runScript(script);
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