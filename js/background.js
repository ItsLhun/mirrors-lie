const bgImage = new Image();
//collection of all background images
const backgrounds = {
  blueScreen: '/images/background/blue-screen.jpg'
};

class Background {
  constructor(game, backgroundName) {
    this.game = game;
    this.backgroundName = backgroundName;
  }
  paint() {
    this.game.ctx.save();
    // check if the passet image is part of the images object, otherwise default to grey BG.
    if (Object.keys(backgrounds).includes(this.backgroundName)) {
      let imageObject = bgImage;
      imageObject.src = backgrounds[backgroundName];
      this.image = imageObject;
      this.game.ctx.drawImage(
        this.image,
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height
      );
    } else {
      this.game.ctx.fillStyle = 'lightgrey';
      this.game.ctx.fillRect(
        0,
        0,
        this.game.canvas.width,
        this.game.canvas.height
      );
    }

    this.game.ctx.restore();
  }
}
