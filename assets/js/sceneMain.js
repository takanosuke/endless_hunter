class SceneMain extends Phaser.Scene {
    constructor() {
        super('SceneMain');
    }
    init() {
        this.gameOver = false;
        this.score = 0;
        let bgmKeys = ['mainBGM1', 'mainBGM2', 'mainBGM3'];
        this.bgm = this.sound.add(bgmKeys[Phaser.Math.Between(0, 2)]);
        this.bgm.setLoop(true).setVolume(0.4).play();
        this.popEnemySound = this.sound.add('popEnemySound');
    }
    create(data) {
        // Create Stage Object
        this.add.image((width / 2), (height / 2), 'mainBack').setDisplaySize(width, height);
        let blackHole = this.physics.add.staticGroup();
        blackHole.create(800, 100, 'blackHole').play('blackHole');
        blackHole.create(800, 400, 'blackHole').play('blackHole');
        let platforms = this.physics.add.staticGroup();
        platforms.create(400, 500, 'ground').setScale(3, 2).refreshBody();
        platforms.create(500, 350, 'ground').setScale(0.5, 1).refreshBody();
        platforms.create(50, 250, 'ground');
        platforms.create(750, 220, 'ground');

        let player
        if (data.mode == 2) {
            player = new Devil(this, 100, 100);  
        }
        else {
            player = new Player(this, 100, 100);
        }
        let enemies = new Enemies(this);
        this.physics.add.collider(enemies, platforms);
        this.physics.add.collider(player, platforms);

        if (data.mode == 0) {
            this.playerHitEnemyCollider = this.physics.add.overlap(player, enemies, this.playerHitEnemy, null, this);
        }
        this.enemyHitSlashCollider = this.physics.add.overlap(enemies, player.slashes, this.enemyHitSlash, null, this);

        this.popEnemyTimer = this.time.addEvent({ delay: 2000, callback: this.popEnemy, args: [enemies], callbackScope: this, loop: true });

        this.scoreText = this.add.text(16, 16, 'Score: ' + this.score, { fontSize: '32px', fill: '#000' });
        this.lifeText = this.add.text(16, 48, 'Life : ' + player.life, { fontSize: '32px', fill: '#000' });
        this.input.keyboard.on('keydown_SPACE', (event)=> {
            this.bgm.pause();
            this.scene.pause();
            this.scene.launch('ScenePause');
        }, this);
        this.events.on('resume', (event) => {
            this.bgm.resume();
            player.resetKey();
        }, this);
    }
    update() {
        if (this.gameOver) {
            this.bgm.stop();
            this.physics.pause();
            this.scene.pause();
            this.scene.launch('SceneEnding', { score: this.score });
        }
    }
    popEnemy(enemies) {
        let flag = Phaser.Math.Between(0, 1);
        this.popEnemySound.play();
        enemies.generateEnemy(800, 400 - 300*flag, this.score);
    }
    playerHitEnemy(player, enemy) {
        this.gameOver = player.hitEnemy()
        this.lifeText.setText('Life: ' + player.life);
    }
    enemyHitSlash(enemy, slash) {
        enemy.hitSlash()
        this.score += 1;
        this.scoreText.setText('Score: ' + this.score);
        this.popEnemyTimer.timeScale = 1 + this.score * 0.02;
    }
}