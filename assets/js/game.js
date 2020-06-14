var config = {
  type: Phaser.AUTO,
  width: 800,
  height: 600,
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 500 },
      debug: false
    }
  },
  scene: {
    preload: preload,
    create: create,
    update: update
  }
};

var player;
var stars;
var bombs;
var platforms;
var cursors;
var xkey;
var score = 0;
var jflag = false;
var gameOver = false;
var scoreText;

var game = new Phaser.Game(config);

function preload() {
  this.load.image('back', '/assets/images/back.jpg');
  this.load.image('ground', '/assets/images/platform.png');
  this.load.image('star', '/assets/images/star.png');
  this.load.image('slashing', '/assets/images/star.png');
  this.load.image('bomb', '/assets/images/bomb.png');
  this.load.spritesheet('p1', '/assets/images/player_1.png', { 
    frameWidth: 32, frameHeight: 32, startFrame: 0,endFrame: 12
  });
}

function create() {
  //  A simple background for our game
  this.add.image(400, 300, 'back');
  platforms = this.physics.add.staticGroup();
  platforms.create(400, 568, 'ground').setScale(2).refreshBody();
  platforms.create(600, 400, 'ground');
  platforms.create(50, 250, 'ground');
  platforms.create(750, 220, 'ground');

  // The player and its settings
  player = new Player(this);
  player.create();

  this.anims.create({
    key: 'left',
    frames: this.anims.generateFrameNumbers('p1', { start: 3, end: 5 }),
    frameRate: 10,
    repeat: -1
  });
  this.anims.create({
    key: 'turn',
    frames: [{ key: 'p1', frame: 1 }],
    frameRate: 20
  });
  this.anims.create({
    key: 'right',
    frames: this.anims.generateFrameNumbers('p1', { start: 6, end: 8 }),
    frameRate: 10,
    repeat: -1
  });

  //  Some stars to collect, 12 in total, evenly spaced 70 pixels apart along the x axis
  stars = this.physics.add.group({
    key: 'star',
    repeat: 11,
    setXY: { x: 12, y: 0, stepX: 70 }
  });
  stars.children.iterate(function (child) {
    //  Give each star a slightly different bounce
    child.setBounceY(Phaser.Math.FloatBetween(0.4, 0.8));
  });
  bombs = this.physics.add.group();
  //  The score
  scoreText = this.add.text(16, 16, 'score: 0', { fontSize: '32px', fill: '#000' });
  velocityTextX = this.add.text(16, 48, 'velocityX: 0', { fontSize: '32px', fill: '#000' });
  velocityTextY = this.add.text(16, 80, 'velocityY: 0', { fontSize: '32px', fill: '#000' });
  //  Collide the player and the stars with the platforms
  this.physics.add.collider(player.sprite, platforms);
  this.physics.add.collider(stars, platforms);
  this.physics.add.collider(bombs, platforms);

  //  Checks to see if the player overlaps with any of the stars, if he does call the collectStar function
  this.physics.add.overlap(player.sprite, stars, collectStar, null, this);
  this.physics.add.collider(player.sprite, bombs, hitBomb, null, this);

  player.attack();
}

function update() {
  player.move();

}
function collectStar(player, star) {
  star.disableBody(true, true);

  //  Add and update the score
  score += 10;
  scoreText.setText('Score: ' + score);

  if (stars.countActive(true) === 0) {
    //  A new batch of stars to collect
    stars.children.iterate(function (child) {

      child.enableBody(true, child.x, 0, true, true);

    });

    var x = (player.sprite.x < 400) ? Phaser.Math.Between(400, 800) : Phaser.Math.Between(0, 400);

    var bomb = bombs.create(x, 16, 'bomb');
    bomb.setBounce(1);
    bomb.setCollideWorldBounds(true);
    bomb.setVelocity(Phaser.Math.Between(-200, 200), 20);
    bomb.allowGravity = false;

  }
}

function hitBomb(player, bomb) {
  this.physics.pause();

  player.setTint(0xff0000);

  player.anims.play('turn');

  gameOver = true;
}

