export default class Slots {

  constructor (scene) {

    this.drawSlot = (x, y, type, turn, socket) => {

      //create dropzone slots for cards to be played into, assigning data and outlines

      let slot = scene.add.zone(x, y, 108, 150).setRectangleDropZone(108, 150);

      let slotOutline = scene.add.graphics();

      slotOutline.lineStyle(4, 0xff69b4);

      slotOutline.strokeRect(slot.x - slot.input.hitArea.width / 2, slot.y - slot.input.hitArea.height / 2, slot.input.hitArea.width, slot.input.hitArea.height);

      slotOutline.setData('turn', turn);

      //initialize function to create empty data for slots

      slot.setData({

        type: type,

        turn: turn,

        socket: socket,

        value: "",

        name: "",

        description: "",

        bp: "",

        variables: ""
        
      });

    }

  }
}
