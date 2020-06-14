class SceneOpening extends Phaser.Scene {
    constructor() {
        super('SceneOpening');
    }
    create() {
        document.getElementById('scoreForm').innerHTML = '';
        this.add.image((width / 2), (height / 2), 'openingBack').setDisplaySize(width, height);
        let bgm = this.sound.add('openingBGM');
        let systemSound = this.sound.add('systemSound');
        bgm.setLoop(true).setVolume(0.4).play();
        this.add.sprite(200, height-100, 'player').play('turnPlayer').setScale(5);
        this.add.sprite(width-200, height-100, 'enemy').play('turnEnemy').setScale(5);
        this.add.text((width / 2), (height / 2) -50, 'Endless Hunter', { fontSize: '100px', fill: '#333', strokeThickness: 5}).setOrigin(0.5);
        this.add.text((width / 2), (height / 2) + 50, 'Press the [SPACE] to start', { fontSize: '28px', fill: '#555' }).setOrigin(0.5);
        this.add.text(width, height, 'version.1.0 provided by Takanosuke', { fontSize: '15px', fill: '#aaa' }).setOrigin(1);

        this.input.keyboard.once('keydown_SPACE', function (event) {
            systemSound.play();
            bgm.stop();
            this.scene.start('SceneMain', { mode: 0 }); 
        }, this);
        let mode1 = this.input.keyboard.createCombo('MODE1');
        this.input.keyboard.on('keycombomatch', function (event) {
            if (mode1.matched) {
                alert("無敵モードで開始します。ランキングには反映されません。")
                systemSound.play();
                bgm.stop();
                this.scene.start('SceneMain', { mode: 1 });
            }
        }, this);
        let mode2 = this.input.keyboard.createCombo('MODE2');
        this.input.keyboard.on('keycombomatch', function (event) {
            if (mode2.matched) {
                alert("魔王モードで開始します。ランキングには反映されません。")
                systemSound.play();
                bgm.stop();
                this.scene.start('SceneMain', { mode: 2 });
            }
        }, this);
    }
}