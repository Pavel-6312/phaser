//PRELOAD
    function preload ()
    {
        this.load.image('grave-bg', 'assets/graveyard/png/BG.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/graveyard/png/Tiles/Bone (2).png');
        this.load.image('stone', 'assets/graveyard/png/Objects/TombStone.png');
        this.load.image('stone2', 'assets/graveyard/png/Objects/TombStone (2).png');
        this.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
            
        );   

        this.load.tilemapTiledJSON("level", "assets/level.json");
        this.load.image("tile", "assets/tile.png");
    }