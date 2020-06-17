var config = {
        type: Phaser.AUTO,
        width: 1200,
        height: 600,
        backgroundColor: 0x444444,
        physics: {
            default: "arcade",
            arcade: {
                gravity: {
                    y: 300
                }
            }
        },
        scene: {
            preload: preload,
            create: create,
            update: update
        }
    };

// Variables
    var game = new Phaser.Game(config);

    var player;
    var platforms;
    var cursors;
    var level;
    var layer;

//CREATE
    function create ()
    {

    //Tile map
        // creation of "level" tilemap
        this.map = this.make.tilemap({
            key: "level"
        });

        // adding tiles to tilemap
        let tile = this.map.addTilesetImage("tileset01", "tile");

        // which layers should we render? That's right, "layer01"
        this.layer = this.map.createStaticLayer("layer01", tile);

        // which tiles will collide? Tiles from 1 to 3
        this.layer.setCollisionBetween(1, 3);

        tile = this.physics.add.staticGroup();

        platforms = this.physics.add.staticGroup();
        platforms.create(162, 584, 'ground');


    //Player
        player = this.physics.add.sprite(100, 450, 'dude');
        player.setCollideWorldBounds(true);
        player.body.setGravityY(500);

        this.anims.create({
            key: 'left',
            frames: this.anims.generateFrameNumbers('dude', { start: 0, end: 3 }),
            frameRate: 10,
            repeat: -1
        });

        this.anims.create({
            key: 'turn',
            frames: [ { key: 'dude', frame: 4 } ],
            frameRate: 20
        });

        this.anims.create({
            key: 'right',
            frames: this.anims.generateFrameNumbers('dude', { start: 5, end: 8 }),
            frameRate: 10,
            repeat: -1
        });

    //Collider
        // this.physics.add.collider(player, platforms);
        this.physics.add.collider(player, tile);


    // Keyboard controls
        cursors = this.input.keyboard.createCursorKeys();     
    }