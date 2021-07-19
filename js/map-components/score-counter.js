class ScoreCounter {
  constructor(game) {
    this.game = game;
    this.levelCounter = this.game.activeLevel.score;
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
      SQUARE / 1.6,
      SQUARE * 1.8,
      SQUARE * 3
    );
    this.ctx.fillStyle = 'black';
    this.ctx.strokeRect(
      this.game.canvas.width - SQUARE * 7,
      SQUARE / 1.6,
      SQUARE * 1.8,
      SQUARE * 3
    );
    this.ctx.fillRect(
      this.game.canvas.width - SQUARE * 6.6875,
      SQUARE * 0.9375,
      SQUARE * 0.6,
      SQUARE * 0.6
    );
    this.ctx.fillStyle = 'white';
    this.ctx.fillRect(
      this.game.canvas.width - SQUARE * 6.625,
      SQUARE * 1.125,
      SQUARE * 0.1875,
      SQUARE * 0.1875
    );
    this.ctx.restore();
  }
  paintLevelScore() {
    this.ctx.save();
    this.ctx.lineWidth = SQUARE / 22.857142857;

    this.ctx.fillStyle = 'white';
    this.ctx.font = `${SQUARE * 1.5625}px sans-serif`;
    this.ctx.fillText(
      `x ${this.levelCounter}`,
      this.game.canvas.width - SQUARE * 4.8,
      SQUARE * 1.8
    );
    this.ctx.strokeStyle = 'black';
    this.ctx.font = `${SQUARE * 1.5625}px sans-serif`;
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
        displayScore = `000${globalScore}`;
        break;
      case globalScore < 100:
        displayScore = `00${globalScore}`;
        break;
      case globalScore < 1000:
        displayScore = `0${globalScore}`;
        break;
      default:
        displayScore = `${globalScore}`;
    }
    this.ctx.save();
    this.ctx.fillStyle = 'white';
    this.ctx.font = `${SQUARE * 1.125}px sans-serif`;
    this.ctx.fillText(
      ` ${displayScore}`,
      this.game.canvas.width - SQUARE * 5.2,
      SQUARE * 3.3
    );
    this.ctx.strokeStyle = 'black';
    this.ctx.lineWidth = SQUARE / 22.857142857;

    this.ctx.font = `${SQUARE * 1.125}px sans-serif`;
    this.ctx.strokeText(
      ` ${displayScore}`,
      this.game.canvas.width - SQUARE * 5.2,
      SQUARE * 3.3
    );
    this.ctx.restore();
  }
}
