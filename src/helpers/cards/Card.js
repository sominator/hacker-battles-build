export default class Card {

  constructor (scene) {

    this.render = (x, y, type) => {

      let card = scene.add.image(x, y, this.sprite).setScale(0.25, 0.25).setInteractive();

      scene.input.setDraggable(card);

      let self = this;

      card.setData({

        name: this.name,
        description: this.description,
        bp: this.bp,
        variables: this.variables,
        type: type,
        active: true,
        played: false,
        socket: 0,
        onInitialize: function () {

        },
        onCompile: function (dropZone, gameObject) {

          self.compileEffect(gameObject);

          scene.turnOrder += 1;

          if (dropZone.data.values.type === "playerASlot" && scene.variablesActive) {

            scene.playerAVariables += gameObject.data.values.variables;

          } else if (dropZone.data.values.type === "playerBSlot" && scene.variablesActive) {

            scene.playerBVariables += gameObject.data.values.variables;

          }

          if (gameObject.data.values.type === 'playerACard') {

            scene.playerAProgram.push(scene.playerAHand.shift());

          } else {

            scene.playerBProgram.push(scene.playerBHand.shift());

          }

        },
        onExecute: function (gameObject) {

          self.executeEffect(gameObject);

        /*  if (this.type === "playerACard" && scene.playerABPActive) {

            scene.playerABP += this.bp;

          } else if (this.type === "playerBCard" && scene.playerBBPActive) {

            scene.playerBBP += this.bp;

          } */

        }
      });
      return card;
    }

  }

}
