import Boolean from "./cards/Boolean.js";
import Double from "./cards/Double.js";
import Host from "./cards/Host.js";
import Ping from "./cards/Ping.js";

export default class DeckHandler {

  constructor (scene) {

    this.deck = Phaser.Math.RND.shuffle([new Boolean(scene), new Double(scene), new Host(scene), new Ping(scene)]);

    this.drawCard = () => {

      let topCard = this.deck.shift();

      if (this.deck.length === 0) {

        this.deck = Phaser.Math.RND.shuffle([new Boolean(scene), new Double(scene), new Host(scene), new Ping(scene)]);

      };

      return topCard;

    }

  }

}
