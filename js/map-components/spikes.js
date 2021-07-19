const processDirection = (direction) => {
  switch (direction) {
    case 5: //'upright':
      return 'upright';
    case 6: //'point-right':
      return 'pointRight';
    case 7: //'reverse':
      return 'reverse';
    case 8: //'point-left':
      return 'pointLeft';
  }
};

class Spike extends Platform {
  constructor(game, x, y, direction) {
    super(game, x, y, 'black');
    this.direction = processDirection(direction);
    this.deathColoringPhase = 0;
  }

  increasePhase() {
    this.deathColoringPhase++;
  }

  paint(player) {
    this.playerBaseColor = this.game.activeLevel.player.color;
    let playerDistance = 0;
    if (player.x >= this.game.rightBreakpoint) {
      playerDistance =
        this.game.rightBreakpoint - player.x - player.accelerationX;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      this.x -= player.accelerationX;
    }
    const ctx = this.game.ctx;
    ctx.save();
    this.x += playerDistance;

    switch (this.direction) {
      case 'upright': //'upright':
        break;
      case 'pointRight': //'point-right':
        ctx.translate(this.x + this.width, this.y);
        ctx.rotate((90 * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
        break;
      case 'reverse': //'reverse':
        ctx.translate(this.x + this.width, this.y + this.height);
        ctx.rotate((180 * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
        break;
      case 'pointLeft': //'point-left':
        ctx.translate(this.x, this.y + this.height);
        ctx.rotate((270 * Math.PI) / 180);
        ctx.translate(-this.x, -this.y);
        break;
    }

    //vertical gradient
    let gradient = ctx.createLinearGradient(
      this.x + this.width / 2,
      this.y,
      this.x + this.width / 2,
      this.y + this.height
    );
    const gradientColors = {
      0.1: `hsl(0,0%,18%)`,
      0.25: 'hsl(0, 0%, 30%)',
      0.5: 'hsl(0, 0%, 35%)',
      0.75: 'hsl(0, 0%, 40%)',
      1: 'hsl(0, 0%, 42%)'
    };
    switch (this.deathColoringPhase) {
      case 1:
        gradientColors['0.1'] = `hsl(${this.playerBaseColor},73%,18%)`;
        break;
      case 2:
        gradientColors[
          '0.1'
        ] = `hsl(${this.game.activeLevel.player.color},73%,14%)`;
        gradientColors[
          '0.25'
        ] = `hsl(${this.game.activeLevel.player.color},73%,18%)`;
        break;
      case 3:
        gradientColors[
          '0.1'
        ] = `hsl(${this.game.activeLevel.player.color},73%,14%)`;
        gradientColors[
          '0.25'
        ] = `hsl(${this.game.activeLevel.player.color},73%,18%)`;
        gradientColors[
          '0.5'
        ] = `hsl(${this.game.activeLevel.player.color},73%,22%)`;
        break;
      case 4:
        gradientColors[
          '0.1'
        ] = `hsl(${this.game.activeLevel.player.color},73%,14%)`;
        gradientColors[
          '0.25'
        ] = `hsl(${this.game.activeLevel.player.color},73%,18%)`;
        gradientColors[
          '0.5'
        ] = `hsl(${this.game.activeLevel.player.color},73%,22%)`;
        gradientColors[
          '0.75'
        ] = `hsl(${this.game.activeLevel.player.color},73%,30%)`;
    }
    if (this.deathColoringPhase > 4) {
      gradientColors[
        '0.1'
      ] = `hsl(${this.game.activeLevel.player.color},73%,14%)`;
      gradientColors[
        '0.25'
      ] = `hsl(${this.game.activeLevel.player.color},73%,18%)`;
      gradientColors[
        '0.5'
      ] = `hsl(${this.game.activeLevel.player.color},73%,22%)`;
      gradientColors[
        '0.75'
      ] = `hsl(${this.game.activeLevel.player.color},73%,30%)`;
    }

    gradient.addColorStop(0, gradientColors['0.1']);
    gradient.addColorStop(0.25, gradientColors['0.25']);
    gradient.addColorStop(0.5, gradientColors['0.5']);
    gradient.addColorStop(0.75, gradientColors['0.75']);
    gradient.addColorStop(1, gradientColors['1']);

    ctx.fillStyle = gradient;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y + this.height);
    ctx.lineTo(this.x + this.width * 0.5, this.y);
    ctx.lineTo(this.x + this.width, this.y + this.height);

    //ctx.lineTo(this.x+this.width,this.y-this.height);
    //ctx.lineTo(this.x-this.width/2,this.y+this.height);
    ctx.fill();

    ctx.restore();
  }
}
