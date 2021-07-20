class SubtitleOverlay extends TitleOverlay {
    constructor(level, subtitle){
        super(level, subtitle);
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
  
        ctx.shadowColor = 'blue';
        ctx.shadowBlur = SQUARE * 1;
        ctx.fillStyle = 'white';
        ctx.font = `${SQUARE * 1.5}px STIX Two Math`;
        ctx.textAlign = 'center';
        ctx.fillText(
          `${this.name}`,
          this.level.game.canvas.width / 2,
          this.level.game.canvas.height * 0.45
        );
        ctx.shadowOffsetX = SQUARE * 0.02;
        ctx.shadowOffsetY = SQUARE * 0.02;
  
        ctx.restore();
      }
    }
  }
  