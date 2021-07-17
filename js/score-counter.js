class ScoreCounter {
  constructor(game) {
    this.game = game;
    this.levelCounter = this.game.activeLevel.score;
    this.offsetX = 50;
    this.offsetY = 50;
    this.player = this.game.player;
    this.ctx = this.game.ctx;
  }

  runLogic() {
    this.levelCounter = this.game.activeLevel.score;
  }

  paint() {
    this.paintAvatar();
    this.paintLevelScore();
    this.paintGlobalScore();
  }
  paintAvatar() {
    this.ctx.save();
    this.ctx.globalAlpha = 0.8;
    this.ctx.fillStyle = `hsl(${this.game.activeLevel.player.color},68%, 32%)`;
    this.ctx.fillRect(
      this.game.canvas.width - SQUARE * 7,
      10,
      SQUARE * 1.8,
      SQUARE * 3
    );
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(
      this.game.canvas.width - SQUARE * 7,
      10,
      SQUARE * 1.8,
      SQUARE * 3
    );
    this.ctx.fillRect(this.game.canvas.width - 107, 15, 9, 9);
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(this.game.canvas.width - 106, 18, 3, 3);
    this.ctx.restore();
  }
  paintLevelScore() {
    this.ctx.save();
    this.ctx.lineWidth = 0.7;

    this.ctx.fillStyle = 'white';
    this.ctx.font = '25px sans-serif';
    this.ctx.fillText(
      `x ${this.levelCounter}`,
      this.game.canvas.width - SQUARE * 4.8,
      SQUARE * 1.8
    );
    this.ctx.strokeStyle = 'black';
    this.ctx.font = '25px sans-serif';
    this.ctx.strokeText(
      `x ${this.levelCounter}`,
      this.game.canvas.width - SQUARE * 4.8,
      SQUARE * 1.8
    );
    this.ctx.restore();
  }
  paintGlobalScore() {
    let globalScore = this.game.globalScore;
    let displayScore;
    switch (true) {
      case globalScore < 10:
        displayScore = `000${globalScore}`
        break;
      case globalScore < 100:
        displayScore = `00${globalScore}`
        break;
      case globalScore < 1000:
        displayScore = `0${globalScore}`
        break;
        default:
          displayScore = `${globalScore}`
    }
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.font = '18px sans-serif';
    this.ctx.fillText(
      ` ${displayScore}`,
      this.game.canvas.width - SQUARE * 5.2,
      SQUARE * 3.3
    );
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = 0.7;

    this.ctx.font = '18px sans-serif';
    this.ctx.strokeText(
      ` ${displayScore}`,
      this.game.canvas.width - SQUARE * 5.2,
      SQUARE * 3.3
    );
    this.ctx.restore();
  }
}
