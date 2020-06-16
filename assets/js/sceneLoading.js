class SceneLoading extends Phaser.Scene {
  constructor() {
    super('SceneLoading');
  }
  preload() {
    let progressBar = this.add.graphics();
    let progressBox = this.add.graphics();
    let progressWidth = 400;
    let progressHeight = 30;
    progressBox.fillStyle(0x222222, 0.8);
    progressBox.fillRect((width/2)-((progressWidth/2)+5), (height/2)-((progressHeight/2)+5), progressWidth+10, progressHeight+10);

    let loadingText = this.make.text({
      x: width / 2,
      y: height / 2 - 50,
      text: 'Loading...',
      style: {font: '30px monospace',fill: '#ffffff'}
    });
    loadingText.setOrigin(0.5, 0.5);

    let loadingText2 = this.make.text({
      x: width / 2,
      y: height / 2 + 70,
      text: 'ゲーム画面を一度クリックしてください',
      style: { font: '15px monospace', fill: '#ffffff' }
    });
    loadingText2.setOrigin(0.5, 0.5);

    let percentText = this.make.text({
      x: width / 2,
      y: height / 2,
      text: '0%',
      style: {font: '18px monospace',fill: '#ffffff'}
    });
    percentText.setOrigin(0.5, 0.5);
    let value = 0;
    this.load.on('filecomplete', function () {
      value += 1 / 19
      percentText.setText(parseInt(value * 100) + '%');
      progressBar.clear();
      progressBar.fillStyle(0xffffff, 1);
      progressBar.fillRect((width / 2) - (progressWidth / 2), (height / 2) - (progressHeight / 2), progressWidth * value, progressHeight);
    });

    this.load.on('complete', function () {
      progressBar.destroy();
      progressBox.destroy();
      loadingText.destroy();
      loadingText2.destroy();
      percentText.destroy();
    });

    this.load.spritesheet('player', '/assets/images/player_1.png', {
      frameWidth: 32, frameHeight: 32
    });
    this.load.spritesheet('enemy', '/assets/images/enemy.png', {
      frameWidth: 32, frameHeight: 32
    });
    this.load.spritesheet('devil', '/assets/images/devil.png', {
      frameWidth: 96, frameHeight: 96
    });
    this.load.image('openingBack', '/assets/images/openingBack.jpg');
    this.load.image('mainBack', '/assets/images/mainBack.jpg');
    this.load.image('ground', '/assets/images/platform.png');
    this.load.image('life', 'assets/images/life.png');
    this.load.spritesheet('slash', '/assets/images/slash.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('blackHole', '/assets/images/blackHole.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('enemyHitEffect', '/assets/images/enemyHitEffect.png', { frameWidth: 192, frameHeight: 192 });
    this.load.spritesheet('playerHitEffect', '/assets/images/playerHitEffect.png', { frameWidth: 192, frameHeight: 192 });
    this.load.audio('openingBGM', ['/assets/sounds/openingBGM.mp3', 'assets/sounds/openingBGM.ogg']);
    this.load.audio('mainBGM1', ['/assets/sounds/mainBGM_1.mp3', 'assets/sounds/mainBGM_1.ogg']);
    this.load.audio('mainBGM2', ['/assets/sounds/mainBGM_2.mp3', 'assets/sounds/mainBGM_2.ogg']);
    this.load.audio('mainBGM3', ['/assets/sounds/mainBGM_3.mp3', 'assets/sounds/mainBGM_3.ogg']);
    this.load.audio('endingBGM', ['/assets/sounds/endingBGM.mp3', 'assets/sounds/endingBGM.ogg']);
    this.load.audio('enemyHitSound', ['/assets/sounds/enemyHitSound.mp3', 'assets/sounds/enemyHitSound.ogg']);
    this.load.audio('popEnemySound', ['/assets/sounds/popEnemySound.mp3', 'assets/sounds/popEnemySound.ogg']);
    this.load.audio('playerHitSound', ['/assets/sounds/playerHitSound.mp3', 'assets/sounds/playerHitSound.ogg']);
    this.load.audio('systemSound', ['/assets/sounds/systemSound.mp3', 'assets/sounds/systemSound.ogg']);    
  }
  create(score) {
    this.anims.create({
      key: 'blackHole',
      frames: this.anims.generateFrameNumbers('blackHole', { start: 0, end: 10 }),
      frameRate: 5,
      repeat: -1
    });

    this.anims.create({
      key: 'enemyHitEffect',
      frames: this.anims.generateFrameNumbers('enemyHitEffect', { start: 0, end: 4 }),
      frameRate: 40,
      hideOnComplete: true
    });

    this.anims.create({
      key: 'leftPlayer',
      frames: this.anims.generateFrameNumbers('player', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'rightPlayer',
      frames: this.anims.generateFrameNumbers('player', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'turnPlayer',
      frames: [{ key: 'player', frame: 0 }, { key: 'player', frame: 2 }],
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key: 'playerHitEffect',
      frames: this.anims.generateFrameNumbers('playerHitEffect', { start: 0, end: 4 }),
      frameRate: 40,
      hideOnComplete: true
    });
    this.anims.create({
      key: 'slashAttack',
      frames: this.anims.generateFrameNumbers('slash', { start: 0, end: 4 }),
      frameRate: 10,
    });
    this.anims.create({
      key: 'leftEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 3, end: 5 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'rightEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 6, end: 8 }),
      frameRate: 10,
      repeat: -1
    });
    this.anims.create({
      key: 'turnEnemy',
      frames: this.anims.generateFrameNumbers('enemy', { start: 0, end: 2 }),
      frameRate: 2,
      repeat: -1
    });
    this.anims.create({
      key: 'turnDevil',
      frames: this.anims.generateFrameNumbers('devil', { start: 9, end: 11 }),
      frameRate: 10,
      repeat: -1
    });
    this.scene.start('SceneOpening');
  }
}