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

    var player;
    var stars;
    var bombs;
    var platforms;
    var cursors;
    var score = 0;
    var gameOver = false;
    var scoreText;

//PRELOAD
    function preload ()
    {
        this.load.image('grave-bg', 'assets/graveyard/png/BG.png');
        this.load.image('ground', 'assets/platform.png');
        this.load.image('star', 'assets/star.png');
        this.load.image('bomb', 'assets/bomb.png');
        this.load.spritesheet('dude', 'assets/dude.png',
            { frameWidth: 32, frameHeight: 48 }
            
        );   
    }

//CREATE
    function create ()
    {

    //Sprites        
        this.add.image(400, 300, 'grave-bg').setScale(0.5);

        platforms = this.physics.add.staticGroup();
        platforms.create(162, 584, 'ground');
        platforms.create(384, 584, 'ground');
        platforms.create(546, 584, 'ground');
        platforms.create(708, 584, 'ground');

        platforms.create(500, 450, 'ground');
        platforms.create(50, 300, 'ground');
        platforms.create(650, 200, 'ground');

    //Score
        scoreText = this.add.text(16, 16, 'Score:0', { fontSize: '16px', fill: '#fff' });

    //Stars
        stars = this.physics.add.group({
            key: 'star',
            repeat: 11,
            setXY: { x: 12, y: 0, stepX: 70 }
        });

        stars.children.iterate(function (child) {
            child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
        });

    //Bombs
        bombs = this.physics.add.group();

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
        this.physics.add.collider(stars, platforms);
        this.physics.add.collider(bombs, platforms);

    //See if collides
        this.physics.add.overlap(player, stars, collectStar, null, this);
        this.physics.add.collider(player, bombs, hitBomb, null, this);

    //Keyboard control
        cursors = this.input.keyboard.createCursorKeys();
    }

//UPDATE
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

//Disable body on collision
    function collectStar (player, star)
    {
        star.disableBody(true, true);

        //  Add and update the score
        score += 1;
        scoreText.setText('Score: ' + score);

        if (stars.countActive(true) === 0)
        {
            //  A new batch of stars to collect
            stars.children.iterate(function (child) {
                child.enableBody(true, child.x, 0, true, true);
            });

            var x = (player.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

            var bomb = bombs.create(x, 16, 'bomb');
            bomb.setBounce(1);
            bomb.setCollideWorldBounds(true);
            bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
            bomb.allowGravity = false;

        }
    }

// End game on bomb collision
    function hitBomb (player, bomb)
    {
        this.physics.pause();

        player.setTint(0xff0000);

        player.anims.play('turn');

        gameOver = true;
    };
