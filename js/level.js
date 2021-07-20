class Level {
  constructor(
    game,
    background,
    platformsArr,
    spikesArr,
    collectiblesArr,
    helpersArr,
    player,
    title,
    subtitle
  ) {
    this.game = game;
    this.background = background;
    this.platformsArr = platformsArr;
    this.spikesArr = spikesArr;
    this.collectiblesArr = collectiblesArr;
    this.helpersArr = helpersArr;

    this.collected = [];
    this.player = player;
    this.score = 0;
    this.title = new TitleOverlay(this, title);
    this.subtitle = new SubtitleOverlay(this, subtitle);

    this.GRAVITY = SQUARE * 0.655;
    this.initialGravity = this.GRAVITY;
    this.started = false;
  }

  start() {
    // place obstacles, player at beginning
    //differente for every extension
  }
  increaseScore() {
    this.score++;
    this.game.increaseGlobalScore();
  }

  paint() {
    // if (this.player.deadTimeout) {
    //   console.log('dead');
    //   this.preShakeprep(Date.now());
    // }
    this.background.paint();
    this.player.paint();
    for (let platform of this.platformsArr) {
      platform.paint(this.player);
    }
    for (let spike of this.spikesArr) {
      spike.paint(this.player);
    }
    for (let collectible of this.collectiblesArr) {
      collectible.paint(this.player);
    }
    for (let helperText of this.helpersArr) {
      helperText.paint(this.player);
    }
    /* if (this.player.deadTimeout) {
      this.game.ctx.restore();
    }*/
    this.title.paint();
    this.subtitle.paint();

  }
  runLogic() {
    this.checkCollectibles();
  }
  checkCollectibles() {
    for (const collectible of this.collectiblesArr) {
      if (collectible.checkPickup(this.player)) {
        this.collected.push(
          this.collectiblesArr.splice(
            this.collectiblesArr.indexOf(collectible),
            1
          )
        );
      }
    }
  }
  reset() {
    for (const platformTile of [
      ...this.platformsArr,
      ...this.spikesArr,
      ...this.collectiblesArr
    ]) {
      platformTile.reset();
    }
    this.resetGravity();
  }
  flipGravity() {
    this.GRAVITY *= -1;
  }
  resetGravity() {
    this.GRAVITY = this.initialGravity;
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
