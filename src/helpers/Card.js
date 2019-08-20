export default class Card {

  constructor (name, description, bp, variables, scene) {

    this.name = name;
    this.description = description;
    this.bp = bp,
    this.variables = variables;

    this.render = (x, y, type, spritesheet, frame) => {

      let card = scene.add.image(x, y, spritesheet, frame).setScale(0.25, 0.25).setInteractive();

      scene.input.setDraggable(card);

      card.setData({

        name: name,
        description: description,
        bp: bp,
        variables: variables,
        type: type,
        active: true,
        played: false

      });

      /*let cardContent = [

        card.data.values.name,
        "",
        "",
        "",
        "",
        "",
        "BP: " + card.data.values.bp,
        "Variables: " + card.data.values.variables

      ]

      let text = scene.add.text(x - 50, y - 50, cardContent).setFontSize(14).setFontFamily('Trebuchet MS');*/

    }

  }

}
