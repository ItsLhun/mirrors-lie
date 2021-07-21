const processStyle = (style) => {
  switch (style) {
    case 'red':
      return 'red';
    case 'transparent':
      return 'rgba(0,0,0,0.0)';
    default:
      return 'green';
  }
};

class Platform {
  constructor(game, x, y, style, strokeStyle = 'transparent') {
    this.game = game;
    this.x = x;
    this.y = y;
    this.width = SQUARE;
    this.height = SQUARE;
    this.style = style;
    this.strokeStyle = strokeStyle;
    this.initialPosition = { x: x, y: y };
    this.pastStart = false;
  }

  checkIntersection(playerPosition) {
    const checkCollision = (first, second) => {
      return (
        first.bottom > second.top &&
        first.top < second.bottom &&
        first.right > second.left &&
        first.left < second.right
      );
    };
    const getCoordinates = (object) => ({
      top: object.y,
      right: object.x + object.width,
      bottom: object.y + object.height,
      left: object.x
    });
    const platformOutline = getCoordinates(this);
    const playerOutline = getCoordinates(playerPosition);
    const intersection = checkCollision(playerOutline, platformOutline);
    return intersection;
  }

  paint(player) {
    let playerDistance = 0;
    playerDistance =
      this.game.rightBreakpoint - player.x - player.accelerationX;
    if (player.x >= this.game.rightBreakpoint) {
      this.x += playerDistance;
    } else if (player.pastStart && player.x <= this.game.leftBreakpoint) {
      this.x -= player.accelerationX;
    }
    const ctx = this.game.ctx;
    ctx.save();
    ctx.fillStyle = this.style;
    ctx.fillRect(this.x-1, this.y-1, this.width+2, this.height+2);
    ctx.lineWidth = 4;
    ctx.strokeStyle = this.strokeStyle;
    ctx.strokeRect(this.x-1, this.y-1, this.width+2, this.height+2);
    
    ctx.restore();
  }
  strokeTop(){
    const ctx = this.game.ctx;
    context.save();
    context.lineWidth = 4;
    context.strokeStyle = this.strokeStyle;
    context.strokeRect(this.x-1, this.y-1, this.width+2, this.height+2);
    context.restore();
  }
  strokeRight(){

  }
  strokeBottom(){

  }
  strokeLeft(){

  }


  reset() {
    this.x = this.initialPosition.x;
    this.y = this.initialPosition.y;
  }
}
