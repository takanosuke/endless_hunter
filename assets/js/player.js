class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene,x,y) {
    super(scene, x, y, "player");
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setCollideWorldBounds(true);
    this.jflag = true;
    this.direction = 1; //1:right, -1:left
    this.life = 3;
    this.xKey = scene.input.keyboard.addKey('X');
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.slashes = new Slashes(scene)
    this.playerHitSound = this.scene.sound.add('playerHitSound');
  }
  resetKey() {
    this.cursors.up.reset();
    this.cursors.down.reset();
    this.cursors.left.reset();
    this.cursors.right.reset();
    this.xkey.reset();
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.body.touching.down) { this.jflag = true; }
    if (Phaser.Input.Keyboard.JustDown(this.xKey)) {
      this.slashes.slashAttack(this.x, this.y, this.direction, 0.2, 0.4, 100, 0xff6600);
    }
    if (this.cursors.left.isDown) {
      this.setVelocityX(-250);
      this.anims.play('leftPlayer', true);
      this.direction = -1;
    }
    else if (this.cursors.right.isDown) {
      this.setVelocityX(250);
      this.anims.play('rightPlayer', true);
      this.direction = 1;
    }
    else {
      this.setVelocityX(0);
      this.anims.stop()
    }
    if (this.cursors.up.isDown) {
      this.setVelocityY(-200);
    }
    if (this.cursors.down.isDown && !this.body.touching.down) {
      this.setVelocityY(600);
    }
  }
  hitEnemy() {
    this.life -= 1;
    let playerHitEffect = this.scene.add.sprite(this.x, this.y, 'playerHitEffect').play('playerHitEffect').setScale(0.8);
    this.playerHitSound.play();
    playerHitEffect.on('animationcomplete', (event) => {
      playerHitEffect.destroy()
    }, this.scene);
    if (this.life > 0) {
      this.setAlpha(0.5);
      this.scene.physics.world.removeCollider(this.scene.playerHitEnemyCollider);
      this.scene.time.delayedCall(1500, (event) => {
        this.setAlpha(1);
        this.scene.physics.world.colliders.add(this.scene.playerHitEnemyCollider)
      }, [], this.scene);
      return false;
    }
    else {
      this.setTint(0xff0000);
      return true;
    }
  }
}