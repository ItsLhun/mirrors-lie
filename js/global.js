//let GRAVITY = SQUARE*0.625;
//const canvasElement = document.querySelector('canvas');
const bodyElement = document.querySelector('body');
const mainCanvasElement = document.createElement('canvas');

const startScreenCanvas = document.createElement('canvas');

const soundZero = document.createElement('audio');
soundZero.src = '/sounds/Level 0 Tutorial (Loop)_compressed.wav';

const soundOne = document.createElement('audio');
soundOne.src = '/sounds/Level 2 (Loop)_compressed.wav';

const startClick = document.createElement('audio');
startClick.src = '/sounds/startClick.wav';

const flipSound = document.createElement('audio');
flipSound.src = '/sounds/Flip.wav';

const deathSound = document.createElement('audio');
deathSound.src = '/sounds/deathSound.wav';
const jumpSound = document.createElement('audio');
jumpSound.src = '/sounds/jump.wav';
const collectibleSound = document.createElement('audio');
collectibleSound.src = '/sounds/collectible.wav';

const victorySound = document.createElement('audio');
victorySound.src = '/sounds/Victory Jingle_compressed.wav';

bodyElement.insertBefore(startScreenCanvas, bodyElement.firstChild);

//detect BROWSER * 0.95
const IS_FIREFOX = navigator.userAgent.includes('Firefox');

mainCanvasElement.isFullScreen = true;
startScreenCanvas.isFullScreen = true;

let windowWidth = window.innerWidth;
let windowHeight = window.innerHeight;

let keepProportion = true;
let proportion = 1920 / 1056;

startScreenCanvas.width =
  windowWidth / (startScreenCanvas.isFullScreen ? 1 : 2);
startScreenCanvas.height =
  windowHeight / (startScreenCanvas.isFullScreen ? 1 : 2);

mainCanvasElement.width =
  windowWidth / (mainCanvasElement.isFullScreen ? 1 : 2);
mainCanvasElement.height =
  windowHeight / (mainCanvasElement.isFullScreen ? 1 : 2);
var SQUARE = windowHeight / 33;
console.log('SQUARE: ', SQUARE);

function isEpsilon(number) {
  return Math.abs(number) < 1e-2;
}

let baseMapLevel = []; 