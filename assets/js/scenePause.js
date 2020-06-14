class ScenePause extends Phaser.Scene {
  constructor() {
    super('ScenePause');
  }
  create(data) {
    this.add.text(width - 20, 40, 'Press the [R] to Restart', { fontSize: '20px', fill: '#EEE' }).setOrigin(1);;
    this.add.text(width - 20, 60, 'Press the [T] to   Title', { fontSize: '20px', fill: '#EEE' }).setOrigin(1);;

    this.add.text((width / 2), (height / 2), 'Pause', { fontSize: '90px', fill: '#EEE' }).setOrigin(0.5);
    this.add.text((width / 2), (height / 2) + 90, 'Press the [SPACE] to Resume', { fontSize: '30px', fill: '#EEE' }).setOrigin(0.5);
    this.input.keyboard.on('keydown_R', (event) => {
      this.scene.stop();
      this.scene.start('SceneMain');
    }, this);
    this.input.keyboard.on('keydown_T', (event) => {
      this.scene.stop();
      this.scene.stop('SceneMain');
      this.scene.start('SceneOpening');
    }, this);
    this.input.keyboard.on('keydown_SPACE', (event) => {
      this.scene.stop();
      this.scene.resume('SceneMain');
    }, this);
  }
}