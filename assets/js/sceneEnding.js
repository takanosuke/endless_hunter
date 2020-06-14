class SceneEnding extends Phaser.Scene {
    constructor() {
        super('SceneEnding');
    }
    create(data) {
        let bgm = this.sound.add('endingBGM')
        let systemSound = this.sound.add('systemSound');
        bgm.setLoop(true).setVolume(0.4).play()
        var graphics = this.add.graphics();
        graphics.fillStyle(0x000000, 0.7);
        graphics.fillRect(0, 0, 1000, 500);
        this.add.text((width / 2), (height / 2) - 120, 'GAME OVER', { fontSize: '120px', fill: '#DDD' }).setOrigin(0.5);
        this.add.text((width / 2), (height / 2) + 40, 'Your score : ' + data.score, { fontSize: '35px', fill: '#EEE' }).setOrigin(0.5);
        this.add.text((width / 2), (height / 2) + 90, 'Press the [SPACE] to Title', { fontSize: '30px', fill: '#EEE' }).setOrigin(0.5);

        this.input.keyboard.once('keydown_SPACE', function (event) {
            systemSound.play();
            bgm.stop();
            this.scene.stop('SceneMain');
            this.scene.start('SceneOpening');
        }, this);
        if (data.score >= 30) {
            document.getElementById('scoreForm').innerHTML = `
                <div class="alert alert-primary alert-dismissible fade show" role="alert">
                  <h4 class="alert-heading">ハイスコア(30点以上)おめでとうございます！！！</h4>
                  <p>スコアをランキングに登録しましょう。</p>
                  <button type="button" class="close" data-dismiss="alert" aria-label="Close">
                    <span aria-hidden="true">&times;</span>
                  </button>
                  <hr>
                  <form onsubmit="alert('スコアを登録しました！');" action="/registerScore" method="POST">
                    <div class="form-group row">
                      <div class="col-sm-7">
                        <input type="text" name="name" class="form-control" placeholder="名前を入力してください" required maxlength="25">
                        <input type="hidden" name="score" value=${data.score}>
                      </div>
                      <div class="col-sm-5">
                        <button type="submit" class="btn btn-primary">スコアを登録</button>
                      </div>
                    </div>
                  </form>
                </div>`;
        }
    }
}