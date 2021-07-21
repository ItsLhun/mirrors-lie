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
    this.shaking = false;
    this.shakingCounter = 0;
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
    if (this.player.deadTimeout) {
      console.log('dead');
      let chance = Math.random()*5;
      if (chance > 4){
        this.preShakeprep();
        this.shakingCounter++;
      }
     // if (!this.shaking){
    //    this.shaking = true;
    //  }
    }

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
    this.title.paint();
    this.subtitle.paint();

    this.game.ctx.restore();
 /*   if (this.shakingCounter === 5){
      this.shaking = false;
    }*/
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
      ...this.collectiblesArr,
      ...this.helpersArr
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
  preShakeprep() {
    console.log("in prep")
    
    let shakeOffsetX = (Math.random()*SQUARE*0.4)-SQUARE*0.1;
    let shakeOffsetY = (Math.random()*SQUARE*0.4)-SQUARE*0.1;
    
    this.game.ctx.save();
    this.game.ctx.translate(shakeOffsetX,shakeOffsetY);
  }
}
