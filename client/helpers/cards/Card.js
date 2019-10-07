export default class Card {

  constructor (scene) {

    this.render = (x, y, type) => {

      let self = this;

      let sprite;

      if (type === "playerACard") {

        sprite = self.spriteA;

      } else {

        sprite = self.spriteB;

      }

      let card = scene.add.image(x, y, sprite).setScale(0.3, 0.3).setInteractive();

      scene.input.setDraggable(card);

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

        },
        onFlip: function () {

          console.log("Flipped!");

        }

      });

      return card;

    }

  }

}
