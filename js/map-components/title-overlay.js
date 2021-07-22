class TitleOverlay {
  constructor(level, name) {
    this.level = level;
    this.name = name;
    this.duration = 3900;
    this.fadeInAlpha = 0;
    this.ongoing = false;
  }

  start() {
    let startTimeout = setTimeout((e) => {
      this.level.started = true;
    }, this.duration);
    if (this.fadeInAlpha < 1 && this.ongoing === false) {
      this.fadeInAlpha = this.fadeInAlpha + 0.011;
    } else if (this.fadeInAlpha > 0.995) {
      this.ongoing = true;
      this.fadeInAlpha = 0.994;
      setTimeout((e) => {
        this.fadeInAlpha -= 0.005;
      }, 2100);
    } else if (this.fadeInAlpha <= 0.993) {
      this.fadeInAlpha = this.fadeInAlpha - 0.016;
    }
  }

  paint() {
    if (!this.level.started) {
      this.start();

      let ctx = this.level.game.ctx;
      ctx.save();
      ctx.globalAlpha = this.fadeInAlpha;

      ctx.fillStyle = `rgba(255,255,255,${0.12})`;
      ctx.fillRect(
        0,
        0,
        this.level.game.canvas.width,
        this.level.game.canvas.height
      );
      if( !IS_FIREFOX){
        ctx.shadowColor = 'blue';
        ctx.shadowBlur = SQUARE * 1;
        ctx.shadowOffsetX = SQUARE * 0.02;
        ctx.shadowOffsetY = SQUARE * 0.02;
    
      }
      ctx.fillStyle = 'white';
      ctx.font = `${SQUARE * 2.5}px Ubuntu Mono`;//STIX Two Math
      ctx.textAlign = 'center';
      ctx.fillText(
        `${this.name}`,
        this.level.game.canvas.width / 2,
        this.level.game.canvas.height * 0.35
      );
      
      ctx.restore();
    }
  }
}
