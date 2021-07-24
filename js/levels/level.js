class Level {
  constructor(
    game,
    background,
    platformsArr,
    spikesArr,
    collectiblesArr,
    helpersArr,
    othersArr,
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
    this.othersArr = othersArr;

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
    this.gravityFlipSound = new Audio('/sounds/Flip.wav');
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
      let chance = Math.random()*5;
      if (chance > 4){
        this.preShakeprep();
        this.shakingCounter++;
      }
    }
    this.background.paint();
    this.player.paint();
    let elementsArr = [...this.platformsArr, ...this.spikesArr, ...this.collectiblesArr, ...this.helpersArr, ...this.othersArr];
    for (let i = 0; i < elementsArr.length; i++ ){
      if (elementsArr[i].x < this.game.canvas.width && elementsArr[i].x > 0-SQUARE){
          elementsArr[i].paint(this.player);
      }
    }
    this.title.paint();
    this.subtitle.paint();
    this.game.ctx.restore();
  }

  runLogic() {
    let elementsArr = [...this.platformsArr, ...this.spikesArr, ...this.collectiblesArr, ...this.helpersArr, ...this.othersArr];
    for (let i = 0; i < elementsArr.length; i++ ){
          elementsArr[i].runMovementLogic(this.player);
    }
    this.checkCollectibles();
    this.checkEnd();
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
  checkEnd(){
    for (const endPortal of this.othersArr) {
      if (endPortal.checkFinished(this.player)) {

        }
      }
  }
  reset() {
    for (const platformTile of [
      ...this.platformsArr,
      ...this.spikesArr,
      ...this.collectiblesArr,
      ...this.helpersArr,
      ...this.othersArr

    ]) {
      platformTile.reset();
    }
    this.resetGravity();
  }
  flipGravity() {
    if (this.player.flipGravity){
      this.gravityFlipSound.currentTime = 0;
      this.gravityFlipSound.volume = 0.30;
      this.gravityFlipSound.play();
      this.GRAVITY *= -1;
    }
    
  }
  resetGravity() {
    this.GRAVITY = this.initialGravity;
  }
  preShakeprep() {
    let shakeOffsetX = (Math.random()*SQUARE*0.4)-SQUARE*0.1;
    let shakeOffsetY = (Math.random()*SQUARE*0.4)-SQUARE*0.1;
    this.game.ctx.save();
    this.game.ctx.translate(shakeOffsetX,shakeOffsetY);
  }
}
