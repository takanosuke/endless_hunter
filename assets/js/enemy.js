class Enemy extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'enemy');
    this.scene = scene;
    this.enemyHitSound = this.scene.sound.add('enemyHitSound');
  }
  generate(x, y, p) {
    this.enableBody(true, x, y, true, true);
    this.body.setAllowGravity(false);
    this.setCollideWorldBounds(true);
    this.anims.play('turnEnemy', true).setScale(2);
    this.setBounce(1);
    p = Math.min(70, p);
    let xv = Phaser.Math.Between(-100 + (-1 * p * 20), 100 + (p * 20));
    let yv = Phaser.Math.Between(-100 + (-1 * p * 20), 100 + (p * 20));
    let level = Math.abs(xv)+Math.abs(yv);
    if (level > 2000) {
      this.setTint(0xff3333);
    } else if (level > 1600) {
      this.setTint(0xff55ff);
    } else if (level > 1200) {
      this.setTint(0xffaa33);
    } else if (level > 800) {
      this.setTint(0x6699ff);
    } else if (level > 400){
      this.setTint(0xccff99);
    } else {
      this.setTint(0xaaffff);
    }
    this.setVelocityX(xv);
    this.setVelocityY(yv);
  }
  preUpdate(time, delta) {
    super.preUpdate(time, delta);
    if (this.body.velocity.x > 0) { this.anims.play('rightEnemy', true).setScale(2); }
    else if (this.body.velocity.x < -0) { this.anims.play('leftEnemy', true).setScale(2); }
    else {
      // this.anims.play('turnEnemy', true).setScale(2);
      this.anims.stop().setScale(2);
    }
  }
  hitSlash() {
    this.setAlpha(0.5).disableBody();
    let enemyHitEffect = this.scene.add.sprite(this.x, this.y, 'enemyHitEffect').play('enemyHitEffect');
    this.enemyHitSound.play();
    enemyHitEffect.on('animationcomplete', (event) => {
      this.clearTint().setAlpha(1).disableBody(true, true);
      enemyHitEffect.destroy();
    }, this.scene);
  }
}

class Enemies extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      frameQuantity: 20,
      key: 'enemy',
      classType: Enemy,
    });
    this.children.iterate(function (enemy) {
      enemy.disableBody(true, true);
    });
  }
  generateEnemy(x, y, p) {
    let enemy = this.getFirstDead(false);
    if (enemy) {enemy.generate(x, y, p);}
  }
}