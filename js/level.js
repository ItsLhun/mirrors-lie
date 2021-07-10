class Level {
  constructor(game, background, platformsArr, spikesArr, player) {
    this.game = game;
    this.background = background;
    this.platformsArr = platformsArr;
    this.spikesArr = spikesArr;
    this.player = player;
  }

  start() {
    // place obstacles, player at beginning
    //differente for every extension
  }

  paint() {
    this.background.paint();
    this.player.paint();
    for (let platform of this.platformsArr) {
      platform.paint();
    }
    for (let spike of this.spikesArr) {
      spike.paint();
    }
  }
}
