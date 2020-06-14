var isMobile;
var game;
var width = 1000;
var height = 500;
window.onload = function () {
    isMobile = navigator.userAgent.indexOf("Mobile");
    if (isMobile == -1) {
        isMobile = navigator.userAgent.indexOf("Tablet");
    }
    if (isMobile == -1) {
        // PC版
        var config = {
            type: Phaser.AUTO,
            width: 1000,
            height: 500,
            parent: 'phaser-game',
            physics: {
                default: 'arcade',
                arcade: {
                    gravity: { y: 500 },
                    debug: false
                }
            },
            scene: [SceneLoading, SceneOpening, SceneMain, ScenePause,SceneEnding]
        };
    } else {
        var config = {
            type: Phaser.AUTO,
            width: 800,
            height: 600,
            parent: 'phaser-game',
            scene: [SceneLoading, SceneOpening, SceneMain, ScenePause, SceneEnding]
        };
    }
    game = new Phaser.Game(config);
}
