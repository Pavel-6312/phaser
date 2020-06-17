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
        if (cursors.down.isDown){
            player.setVelocityY(400);
        }
    }