export default class Title extends Phaser.Scene{

  constructor () {

    super ({

      key: "Title"

    })

  }

  preload () {

    this.load.image('logo', './src/assets/EntromancyHB_Logo_White.png');

  }

  create() {

    this.logo = this.add.sprite(675, 100, 'logo').setScale(0.25, 0.25).setTint(0x00ffff);

    this.add.text(450, 300, ["Welcome to the Entromancy: Hacker Battles Demo.", "", "Click anywhere to continue."]).setFontSize(20).setFontFamily('Trebuchet MS').setColor('#00ffff').setAlign('center');

    this.input.on('pointerdown', function(pointer) {
      this.scene.start('Game');
    }, this);

  }

}
