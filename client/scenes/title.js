export default class Title extends Phaser.Scene {
    constructor() {
        super({
            key: "Title"
        })
    }
    preload() {
        this.load.image('logo', '/assets/EntromancyHB_Logo_White.png');
    }
    create() {
        this.logo = this.add.sprite(875, 200, 'logo').setScale(0.25, 0.25).setTint(0x00ffff);
        this.add.text(650, 400, ["Welcome to the Entromancy: Hacker Battles Demo.", "", "Click anywhere to continue."]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#00ffff').setAlign('center');
        this.input.on('pointerdown', function (pointer) {
            this.scene.start('Game');
        }, this);
    }
}
