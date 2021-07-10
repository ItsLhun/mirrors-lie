class LevelsComposite {
  constructor(game, gameMap) {
    this.game = game;
    this.gameMap = gameMap;
    this.spikes = [];
    this.platforms = [];
    this.parseMap();
  }

  parseMap() {
    for (let row = 0; row < this.gameMap.length; row++) {
      for (let column = 0; column < this.gameMap[row].length; column++) {
        switch (this.gameMap[row][column]) {
            //we do -1 on each column to allow hidden walls on the left side, otherwise they'd stick out
          case 1: //floor
            this.platforms.push(
              new FloorTile(this.game, SQUARE * (column-1), SQUARE * (row-1))
            );
            break;
          case 2:
            this.platforms.push(
              new Spike(
                this.game,
                SQUARE * (column-1),
                SQUARE * (row-1),
                SQUARE,
                SQUARE
              )
            );
            break;
          case 3:
            this.platforms.push(
              new Platform(
                this.game,
                SQUARE * (column-1),
                SQUARE * (row-1),
                SQUARE,
                SQUARE
              )
            );
            break;
            case 4: //left wall
            this.platforms.push(
              new LeftWall(this.game, SQUARE * (column-1), SQUARE * (row-1))
            );
            break;
        }
      }
    }
  }
}
