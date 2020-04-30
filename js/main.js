var config = {
        type: Phaser.AUTO,
        width: 800,
        height: 600,
        physics: {
            default: 'arcade',
            arcade: {
                gravity: { y: 300 },
                debug: false
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
    var platforms;
    var player;

//Preload
    function preload ()
    {
        this.load.image('sky', 'assets/sky.png');
        this.load.image('bg1', 'assets/bg1.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
            
        );
        this.load.spritesheet('rat', 'assets/rat.png',
            { frameWidth: 100, frameHeight: 100 }
            
        );

        this.load.image('grave-bg', 'assets/graveyard/png/BG.png');
    }

//Create
    function create ()
    {

//Sprites        
        this.add.image(400, 300, 'grave-bg').setScale(0.5);


//Platforms
        platforms = this.physics.add.staticGroup();
        platforms.create(162, 584, 'ground');
        platforms.create(384, 584, 'ground');
        platforms.create(546, 584, 'ground');
        platforms.create(708, 584, 'ground');

        platforms.create(500, 450, 'ground');
        platforms.create(50, 300, 'ground');
        platforms.create(650, 200, 'ground');


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
        this.physics.add.collider(player, platforms);

//Keyboard control
        cursors = this.input.keyboard.createCursorKeys();
    }

//Update
    function update ()
    {
        if (cursors.left.isDown){
            player.setVelocityX(-240);
            player.anims.play('left', true);
        } 
        else if (cursors.right.isDown){
            player.setVelocityX(240);
            player.anims.play('right', true);
        } 
        else{
            player.setVelocityX(0);
            player.anims.play('turn');
        }
        if (cursors.up.isDown && player.body.touching.down){
            player.setVelocityY(-550);
        }
    }
