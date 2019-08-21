export default class Card {

  constructor (scene) {

    this.render = (x, y, type) => {

      let card = scene.add.image(x, y, this.sprite).setScale(0.3, 0.3).setInteractive();

      scene.input.setDraggable(card);

      card.setData({

        name: this.name,
        description: this.description,
        bp: this.bp,
        variables: this.variables,
        type: type,
        active: true,
        played: false,
        onInitialize: function () {

        },
        onCompile: function (dropZone, gameObject) {

            scene.turnOrder += 1;

            if (dropZone.data.values.type === "playerASlot") {
              scene.playerAVariables += gameObject.data.values.variables;
            } else if (dropZone.data.values.type === "playerBSlot") {
              scene.playerBVariables += gameObject.data.values.variables;
            }

        },
        onExecute: function () {

        }
      });
      return card;
    }

  }

}
