class StarIntro {
  constructor(game, maxDistance) {
    this.x =
      Math.random() * (game.canvas.width + maxDistance) - maxDistance / 2;
    this.y =
      Math.random() * (game.canvas.height + maxDistance) - maxDistance / 2;
    this.z =
      (Math.random() * (SQUARE * 0.9375)) / 150 + (SQUARE * 0.9375) / 120;
    this.fillColor = `rgba(255,230,${255 * Math.random() + 90},${
      0.6 * Math.random() + 0.4
    })`;
    this.diameter =
      (Math.random() * (SQUARE * 0.9375)) / 40 +
      (SQUARE * 0.9375) / 15 +
      this.z;
  }
}

class StarBackgroundIntro extends Background {
  constructor(game, backgroundName) {
    super(game, backgroundName);
    this.stars = [];
    this.started = false;
    this.maxDistance = SQUARE / 3;
    this.playerOne = new Player(this.game, this.game.canvas.width/2-SQUARE*6, SQUARE * 31, 'red');
    this.playerTwo = new Player(this.game, this.game.canvas.width/2+SQUARE*6, SQUARE * 31, 'pink');
    this.playerTwo.facing = 'Left'
    this.playerThree = new Player(this.game, this.game.canvas.width/2+SQUARE*18, SQUARE * 31, 'aqua');
    this.playerThree.facing = 'Left'
    this.playerFour = new Player(this.game, this.game.canvas.width/2-SQUARE*18, SQUARE * 31, 'green');
    this.playersArr = [this.playerOne, this.playerTwo, this.playerThree,this.playerFour];
  }

  start() {
    this.generatePoints(this.game.canvas.width / 4);
    this.started = true;
  }
  paint() {
    if (!this.started) {
      this.start();
    }
    let ctx = this.game.ctx;
    ctx.save();
    ctx.fillStyle = 'black';
    ctx.fillRect(0, 0, this.game.canvas.width, this.game.canvas.height);
    ctx.restore();

    ctx.save();

    for (let i = 0; i < this.stars.length; i++) {
      this.drawPoint(this.stars[i]);
      this.updatePoint(this.stars[i]);
    }
    ctx.restore();
    this.paintTitle();
    this.paintSubTitle();
    this.paintCharacters()
  }

  paintTitle() {
    let ctx = this.game.ctx;
    ctx.save();
    ctx.globalAlpha = this.fadeInAlpha;

    if (!IS_FIREFOX) {
      ctx.shadowColor = 'blue';
      ctx.shadowBlur = SQUARE * 1;
      ctx.shadowOffsetX = SQUARE * 0.02;
      ctx.shadowOffsetY = SQUARE * 0.02;
    }
    ctx.fillStyle = 'white';
    ctx.font = `${SQUARE * 4.5}px Ubuntu Mono`; //STIX Two Math
    ctx.textAlign = 'center';
    ctx.fillText(
      `MIRRORS LIE`,
      this.game.canvas.width / 2,
      this.game.canvas.height * 0.35
    );
    ctx.restore();
  }
  paintCharacters(){
    for (let i = 0; i < this.playersArr.length; i++){
      this.paintPlayer(this.playersArr[i]);
      this.paintMirror(this.playersArr[i]);

    }
  }

  paintPlayer(player) {
    let eyeBlackWidth = SQUARE * 0.25;
    let eyeWhiteWidth = SQUARE * 0.0625;
    
    const ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = `hsl(${player.color},68%,32%)`;
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.restore();
    ctx.save();
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'burgundy';
    let yOffset = 0;

    if (player.facing === 'right') {
      yOffset = !player.mirrorEnabled
        ? 0
        : player.y < this.game.canvas.height / 2
        ? SQUARE * 1.25
        : 0;
      ctx.fillRect(
        player.x + SQUARE * 0.5,
        player.y + SQUARE * 0.1875 + yOffset,
        eyeBlackWidth,
        SQUARE * 0.25
      ); //eyes
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.fillRect(
        player.x + SQUARE * 0.6875,
        player.y + SQUARE * 0.25 + yOffset,
        eyeWhiteWidth,
        SQUARE * 0.125
      );
      ctx.restore();
    } else {
      yOffset = !player.mirrorEnabled
        ? 0
        : player.y < this.game.canvas.height / 2
        ? SQUARE * 1.25
        : 0;
      ctx.fillRect(
        player.x + SQUARE * 0.1875,
        player.y + SQUARE * 0.1875 + yOffset,
        eyeBlackWidth,
        SQUARE * 0.25
      );
      ctx.save();
      ctx.fillStyle = 'white';
      ctx.fillRect(
        player.x + SQUARE * 0.1875,
        player.y + SQUARE * 0.25 + yOffset,
        eyeWhiteWidth,
        SQUARE * 0.125
      );
      ctx.restore();
    }
    ctx.restore();
    if (this.activeHat){
      this.activeHat.processPicked(this);
    }
  }
  paintMirror(player) {
    let eyeWhiteWidth = SQUARE * 0.25;

    const ctx = this.game.ctx;
    ctx.save();
    ctx.beginPath();
    ctx.fillStyle = `hsl(${player.color},40%,50%)`;
    ctx.globalAlpha = 0.8
    ctx.translate(0, this.game.canvas.height);
    ctx.scale(1, -1);
    ctx.fillRect(player.x, player.y, player.width, player.height);
    ctx.beginPath();
    ctx.globalCompositeOperation = 'source-atop';
    ctx.fillStyle = 'white';
    let yOffset = 0;
    if (player.facing === 'right') {
      yOffset = player.y < this.game.canvas.height / 2 ? SQUARE * 1.25 : 0;
      ctx.fillRect(
        player.x + SQUARE * 0.5,
        player.y + SQUARE * 0.1875 + yOffset,
        eyeWhiteWidth,
        SQUARE * 0.25
      ); //eyes
    } else {
      yOffset = player.y < this.game.canvas.height / 2 ? SQUARE * 1.25 : 0;
      ctx.fillRect(
        player.x + SQUARE * 0.1875,
        player.y + SQUARE * 0.1875 + yOffset,
        eyeWhiteWidth,
        SQUARE * 0.25
      );
    }

    ctx.restore();
  }


  paintSubTitle() {
    let ctx = this.game.ctx;
    ctx.save();
    ctx.globalAlpha = this.fadeInAlpha;

    if (!IS_FIREFOX) {
      ctx.shadowColor = 'blue';
      ctx.shadowBlur = SQUARE * 1;
      ctx.shadowOffsetX = SQUARE * 0.02;
      ctx.shadowOffsetY = SQUARE * 0.02;
    }
    ctx.fillStyle = 'white';
    ctx.font = `${SQUARE * 1.5}px Ubuntu Mono`; //STIX Two Math
    ctx.textAlign = 'center';
    ctx.fillText(
      `CLICK ANYWHERE TO START`,
      this.game.canvas.width / 2,
      this.game.canvas.height * 0.65
    );

    ctx.restore();
  }

  generatePoints(quantity) {
    for (let i = 0; i < quantity; i++) {
      let star = new StarIntro(this.game, this.maxDistance);
      this.stars.push(star);
    }
  }
  drawPoint(star) {
    let ctx = this.game.ctx;
    ctx.beginPath();
    ctx.strokeStyle = 'transparent';
    ctx.fillStyle = star.fillColor;
    ctx.arc(star.x, star.y, star.diameter, 0, 2 * Math.PI);
    ctx.closePath();
    ctx.stroke();
    ctx.fill();
  }
  updatePoint(star) {
    let updateChange = Math.floor(Math.random() * 1000);
    if (updateChange === 3) {
      star.diameter = (Math.random() * 2.5 + 3) * star.z;
    }
  }
}
