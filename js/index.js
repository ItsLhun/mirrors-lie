const canvasElement = document.querySelector('canvas');

canvasElement.isFullScreen = false;
canvasElement.width = 1920 / (canvasElement.isFullScreen ? 1 : 2);
canvasElement.height = 1080 / (canvasElement.isFullScreen ? 1 : 2);

const game = new Game(canvasElement);

game.start();
