class Devil extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, "devil",9);
    this.scene = scene;
    scene.add.existing(this);
    scene.physics.world.enable(this);

    this.setCollideWorldBounds(true);
    this.jflag = true;
    this.direction = 1; //1:right, -1:left
    this.life = 9999999;
    this.xKey = scene.input.keyboard.addKey('X');
    this.cursors = scene.input.keyboard.createCursorKeys();
    this.slashes = new Slashes(scene)
    this.setScale(2);
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
      this.slashes.slashAttack(this.x, this.y, this.direction, 2, 4, 600, 0x9900ff);
    }
    if (this.cursors.left.isDown) {
      this.setVelocityX(-250);
      this.anims.play('turnDevil', true);
      this.direction = -1;
    }
    else if (this.cursors.right.isDown) {
      this.setVelocityX(250);
      this.anims.play('turnDevil', true);
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
  }
}