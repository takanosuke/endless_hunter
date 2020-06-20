class Slash extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'slash');
    this.scene = scene
  }
  attack(x, y, d, w, h, v, color) {
    this.enableBody(true, x + (35 * d), y, true, true);
    this.body.setAllowGravity(false)
    this.setVelocityX(v * d);
    this.flipX = (d == 1) ? true : false;
    this.on('animationcomplete', (event) => {
      this.disableBody(true,true);
    }, this.scene);
    this.anims.play('slashAttack', true).setTint(color).setScale(w, h);
  }
}

class Slashes extends Phaser.Physics.Arcade.Group {
  constructor(scene) {
    super(scene.physics.world, scene);
    this.createMultiple({
      frameQuantity: 1,
      key: 'slash',
      classType: Slash,
    });
    this.children.iterate(function (slash) {
      slash.disableBody(true, true);
    });
  }
  slashAttack(x, y, d, w, h, v, color) {
    let slash = this.getFirstDead(false);
    if (slash) {
      slash.attack(x, y, d, w, h, v, color);
    }
  }
}