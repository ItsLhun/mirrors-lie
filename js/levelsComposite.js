class LevelsComposite {
  constructor(game, gameMap, tilesColor, helperTextsArray) {
    this.game = game;
    this.gameMap = gameMap;
    this.tilesColor = tilesColor;
    this.spikes = [];
    this.platforms = [];
    this.collectibles = [];
    this.helpers = [];
    this.others = [];
    this.helperTextsArray = [...helperTextsArray];
    this.parseMap();
  }

  parseMap() {
    for (let row = 0; row < this.gameMap.length; row++) {
      for (let column = 0; column < this.gameMap[row].length; column++) {
        switch (this.gameMap[row][column]) {
          //we do -1 on each column and rows to allow hidden walls, otherwise they'd stick out
          //tiles overflow the canvas on every direction
          case 1: //floor
            this.platforms.push(
              new FloorTile(
                this.game,
                SQUARE * (column - 1),
                SQUARE * (row - 1)
              )
            );
            break;

          case 3:
            this.platforms.push(
              new Platform(
                this.game,
                Math.round((SQUARE * (column - 1) * 10) / 10),
                Math.round(SQUARE * (row - 1) * 10) / 10,
                this.tilesColor
              )
            );
            break;
          case 4: // wall
            this.platforms.push(
              new WallTile(this.game, SQUARE * (column - 1), SQUARE * (row - 1))
            );
            break;
          case 5:
          case 6:
          case 7:
          case 8:
            this.spikes.push(
              new Spike(
                this.game,
                SQUARE * (column - 1),
                SQUARE * (row - 1),
                this.gameMap[row][column]
              )
            );
            break;
          case 'C':
            this.collectibles.push(
              new Collectible(
                this.game,
                SQUARE * (column - 1),
                SQUARE * (row - 1)
              )
            );
            break;
          case 'H':
            this.helpers.push(
              new HelperText(
                this.game,
                SQUARE * (column - 1),
                SQUARE * (row - 1),
                this.helperTextsArray[this.helpers.length]
              )
            );
            break;
          case 'P':
            this.others.push(
              new EndPortal(
                this.game,
                SQUARE * (column - 1),
                SQUARE * (row - 1)
              )
            );
            break;
        }
      }
    }
  }
}
