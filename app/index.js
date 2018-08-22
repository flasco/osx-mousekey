const App = require('./app');

new App().start();

// new App().ergodic();


// getWindowPositionByPid('65021').then(result => {
//   console.log(result);
// });

// initWindowPositionByName(processName);




// robot.setMouseDelay(2);

// const twoPI = Math.PI * 2.0;
// const screenSize = robot.getScreenSize();
// const height = (screenSize.height / 2) - 10;
// const width = screenSize.width;

// for (let x = 0; x < width; x++)
// {
// 	y = height * Math.sin((twoPI * x) / width) + height;
// 	robot.moveMouse(x, y);
// }

/*    

set pid to "65021"
tell application "System Events"
	set proc to item 1 of (processes whose unix id is pid)
	tell proc
		set position of front window to {1, 1}
	end tell
end tell


tell application "System Events"
	repeat with proc in (processes where background only is false)
		set pname to name of proc
		log pname
	end repeat
end tell

*/