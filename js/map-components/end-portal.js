class Square  {
    constructor(game, basePosition, maxDistance) {
      this.x =
        Math.random() * (basePosition + maxDistance) - maxDistance / 2;
      this.y =
        Math.random() * (basePosition + maxDistance) - maxDistance / 2;
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

class EndPortal extends Platform{
    constructor(game, positionX, positionY){
        super(game, positionX, positionY, "transparent", 'transparent');
        this.touched = false;
    }

    checkFinished(player) {
        const horizontalIntersection = this.checkIntersection({
          x: player.x,
          y: player.y,
          width: player.width,
          height: player.height
        });
        const verticalIntersection = this.checkIntersection({
          x: player.x,
          y: player.y,
          width: player.width,
          height: player.height
        });
        if (horizontalIntersection) {
          this.touched = true;
          console.log('Touched the Portal');
          return true;
        }
        if (verticalIntersection) {
          console.log('Touched the Portal!');
          this.touched = true;
          return true;
        }
      }
      playSound() {}
      paint() {
          const ctx = this.game.ctx;
          ctx.save();
          ctx.fillStyle = 'black';
          ctx.fillRect(this.x, this.y, SQUARE, SQUARE);
          ctx.lineWidth = SQUARE*0.0125
          ctx.strokeStyle = 'white';
          ctx.strokeRect(this.x, this.y, SQUARE, SQUARE);
          ctx.restore();
      }
      updateSquares(){

      }
}