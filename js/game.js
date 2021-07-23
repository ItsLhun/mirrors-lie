class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d');
    this.running = false;
    this.rightBreakpoint = Math.floor(canvas.width * 0.45);
    this.leftBreakpoint = Math.floor(canvas.width * 0.2);
    this.activeLevel;
    this.globalScore = 0;
    this.squareSize = SQUARE;
    this.currentLevelIndex = 1;
    this.levels = [];
  }

  start() {
    this.running = true;
    this.globalScore = 0;
    
    const tutorialOne = new TutorialOne(this, 'WELCOME', 'A JOURNEY BEGINS');
    this.levels.push(tutorialOne)
    const levelOne = new LevelOne(this, 'NOT ALONE', 'MEETING A FAMILIAR FACE');
    this.levels.push(levelOne)
    
    this.activeLevel = levelOne;
    this.scoreCounter = new ScoreCounter(this, 15, 15);
    this.loop();
  }
  increaseGlobalScore() {
    this.globalScore++;
  }

  loop() {
    switch (this.currentLevelIndex) {
      case 0:
        this.activeLevel = this.levels[0];
        break;
      case 1:
        this.activeLevel = this.levels[1];
        break;
      case 2:
        this.activeLevel = this.levels[2];
        break;
      case 3:
        this.activeLevel = this.levels[3];
        break;
    }
    this.paint();

    if (!this.activeLevel.player.deadTimeout) {
      this.runLogic();
    }
    if (this.running) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    }
  }

  runLogic() {
    this.activeLevel.player.runLogic();
    if (this.globalScore >= 100) {
      this.running = false;
      this.lost = true;
    }
    this.activeLevel.runLogic();
    this.scoreCounter.runLogic();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.clearScreen();
    //  if (this.running) {
  //    console.log(this.activeLevel)
    this.activeLevel.paint();
    //}
    this.scoreCounter.paint();
  }
}
