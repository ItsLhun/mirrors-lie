class ScoreCounter {
  constructor(game) {
    this.game = game;
    this.levelCounter = this.game.activeLevel.score;
    this.offsetX = 50;
    this.offsetY = 50;
    this.player = this.game.player;
  }

  runLogic() {
    this.levelCounter = this.game.activeLevel.score;
  }

  paint() {
    let ctx = this.game.ctx;
    //levelScore
    ctx.save();
    ctx.globalAlpha = 0.8;
    ctx.fillStyle = `hsl(${this.game.activeLevel.player.color},68%, 32%)`;
    ctx.fillRect(
      this.game.canvas.width - SQUARE * 7,
      10,
      SQUARE * 1.8,
      SQUARE * 3
    );
    ctx.fillStyle = 'black';
    ctx.strokeRect(
      this.game.canvas.width - SQUARE * 7,
      10,
      SQUARE * 1.8,
      SQUARE * 3
    );
    ctx.fillRect(this.game.canvas.width - 107, 15, 9, 9);
    ctx.fillStyle = 'white';
    ctx.fillRect(this.game.canvas.width - 106, 18, 3, 3);
    ctx.fillStyle = 'white';
    ctx.font = '25px sans-serif';
    ctx.fillText(
      `x ${this.levelCounter}`,
      this.game.canvas.width - SQUARE * 4.8,
      SQUARE * 1.8
    );
    ctx.strokeStyle = 'black';
    ctx.font = '25px sans-serif';
    ctx.strokeText(
      `x ${this.levelCounter}`,
      this.game.canvas.width - SQUARE * 4.8,
      SQUARE * 1.8
    );
    ctx.restore();
    //globalScore
  }
}
