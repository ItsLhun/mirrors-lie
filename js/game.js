class Game {
  constructor(canvas) {
    this.canvas = canvas;
    this.ctx = canvas.getContext('2d', { alpha: false });
    this.running = false;
    this.rightBreakpoint = Math.floor(canvas.width * 0.45);
    this.leftBreakpoint = Math.floor(canvas.width * 0.2);
    this.activeLevel;
    this.globalScore = 0;
    this.squareSize = SQUARE;
    this.currentLevelIndex = 0;
    this.levels = [];
  }

  start() {
    this.running = true;
    this.globalScore = 0;
    const tutorialZero = new TutorialOne(this, 'WELCOME', 'A JOURNEY BEGINS');
    this.levels.push(tutorialZero);
    const levelTwo = new LevelTwo(this, 'NOT ALONE', 'MEETING A FAMILIAR FACE');
    this.levels.push(levelTwo);
    const levelThree = new LevelThree(this, 'HOP HOP', 'A BLOCK WITH NO LEGS');
    this.levels.push(levelThree);
    const levelFour = new LevelFour(
      this,
      'TWITCHY FINGERS',
      "EVERYBODY'S GONE FLAPPY"
    );
    this.levels.push(levelFour);
    // const scoreLevel = new LevelScore(this, 'CONGRATULATIONS', 'YOU COMPLETED THE CHAlLENGES');
    // this.levels.push(scoreLevel)

    this.activeLevel = tutorialZero;
    this.scoreCounter = new ScoreCounter(this, 15, 15);

    this.startLogicInterval();
    this.loop();
  }
  increaseGlobalScore() {
    this.globalScore++;
  }

  startLogicInterval(){
    this.logicID = setInterval(() => {
      if (!this.activeLevel.player.deadTimeout) {
      this.runLogic();
      }
    }, 15);
  }

  loop() {
    switch (this.currentLevelIndex) {
      case 0:
        if (!this.levels[0].musicRunning) {
          this.levels[0].start();
          const levelOne = new LevelTwo(
            this,
            'NOT ALONE',
            'MEETING A FAMILIAR FACE'
          );
          this.levels.push(levelOne);
        }
        this.activeLevel = this.levels[0];
        break;
      case 1:
        if (!this.levels[1].musicRunning) {
          this.levels[1].start();
          // const levelTwo = new LevelThree(this, 'HOP HOP', 'A BLOCK WITH NO LEGS');
          // this.levels.push(levelTwo)
        }
        this.activeLevel = this.levels[1];
        break;
      case 2:
        if (!this.levels[2].musicRunning) {
          this.levels[2].start();
          // const levelThree = new LevelFour(this, 'TWITCHY FINGERS', 'EVERYBODY\'S GONE FLAPPY');
          // this.levels.push(levelThree)
        }
        this.activeLevel = this.levels[2];
        break;
      case 3:
        if (!this.levels[3].musicRunning) {
          this.levels[3].start();
        }
        this.activeLevel = this.levels[3];
        break;
      case 4:
        const scoreLevel = new LevelScore(this, 'CONGRATULATIONS', 'YOU COMPLETED THE CHAlLENGES');
        this.levels.push(scoreLevel)
        if (!this.levels[4].musicRunning) {
          this.levels[4].start();
        }
        this.activeLevel = this.levels[4];
        break;
    }
    this.paint();


    if (this.running) {
      window.requestAnimationFrame(() => {
        this.loop();
      });
    } else {
      clearInterval(this.logicID);
    }
  }

  runLogic() {
    this.activeLevel.player.runLogic();
    this.activeLevel.runLogic();
    this.scoreCounter.runLogic();
  }

  clearScreen() {
    this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
  }

  paint() {
    this.clearScreen();
    this.activeLevel.paint();
    this.scoreCounter.paint();
  }
}
