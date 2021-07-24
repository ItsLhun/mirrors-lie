class StartScreen {
    constructor(canvas) {
      this.canvas = canvas;
      this.ctx = canvas.getContext('2d');
      this.background = new StarBackgroundIntro(this,'ews')
      
    }
  
    start() {
        this.running = true;
        this.loop();
    }

    loop() {
      this.paint();
      if (this.running) {
        window.requestAnimationFrame(() => {
          this.loop();
        });
      }
    }
  
    runLogic() {
        if (this.running){

        }
    }
  
    clearScreen() {
      this.ctx.clearRect(0, 0, this.canvas.width, this.canvas.height);
    }
  
    paint() {
      this.clearScreen();
      this.background.paint();
    }
  }