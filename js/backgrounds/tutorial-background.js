class TutorialOneBackground extends Background {
  constructor(game, backgroundName) {
    super(game, backgroundName);
  }
  paint() {
    let ctx = this.game.ctx;
    ctx.save();
    // check if the passet image is part of the images object, otherwise default to grey BG.
    let linearGradient = ctx.createLinearGradient(
      this.game.canvas.width,
      0,
      this.game.canvas.width,
      this.game.canvas.height
    );
    // linearGradient.addColorStop(0, "darkblue");
    linearGradient.addColorStop(0, 'white');
//    linearGradient.addColorStop(0.25, 'lightblue');
    linearGradient.addColorStop(0.5, 'black');

   // linearGradient.addColorStop(0.75, 'lightblue');
    linearGradient.addColorStop(1, 'white');
    ctx.fillStyle = linearGradient;
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.restore();
  }
}
