class Level {
  constructor(game, background, platformsArr, spikesArr, player) {
    this.game = game;
    this.background = background;
    this.platformsArr = platformsArr;
    this.spikesArr = spikesArr;
    this.player = player;
    this.score = 0;
    this.GRAVITY;
  }

  start() {
    // place obstacles, player at beginning
    //differente for every extension
  }
  increaseScore(){
    this.score++;
  }

  paint() {
    // if (this.player.deadTimeout) {
    //   console.log('dead');
    //   this.preShakeprep(Date.now());
    // }
    this.background.paint();
    this.player.paint();
    this.player.paintMirror();
    for (let platform of this.platformsArr) {
      platform.paint(this.player);
    }
    for (let spike of this.spikesArr) {
      spike.paint(this.player);
    }
    /* if (this.player.deadTimeout) {
      this.game.ctx.restore();
    }*/
  }
  reset() {
    for (const platformTile of [...this.platformsArr, ...this.spikesArr]) {
      platformTile.reset();
    }
  }
  flipGravity() {
    this.GRAVITY *= -1;
  }
  // preShakeprep(shakeStartTime) {
    // let shakeDuration = 1500;
    // if (shakeStartTime == -1) return;
    // var dt = Date.now() - shakeStartTime;
    // if (dt > shakeDuration) {
      // shakeStartTime = -1;
      // return;
    // }
    // var easingCoef = dt / shakeDuration;
    // var easing = Math.pow(easingCoef - 1, 3) + 1;
    // this.game.ctx.save();
    // let dx = easing * (Math.cos(dt * 0.1) + Math.cos(dt * 0.3115)) * 15;
    // let dy = easing * (Math.sin(dt * 0.05) + Math.sin(dt * 0.057113)) * 15;
    // this.game.ctx.translate(dx, dy);
  // }

}
