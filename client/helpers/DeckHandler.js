import Boolean from "./cards/Boolean.js";
import Double from "./cards/Double.js";
import Host from "./cards/Host.js";
import Inactive from "./cards/Inactive.js";
import Ping from "./cards/Ping.js";
import Scrape from "./cards/Scrape.js";

export default class DeckHandler {
    constructor(scene, decker) {
        this.deck = Phaser.Math.RND.shuffle([new Boolean(scene), new Double(scene), new Host(scene), new Ping(scene), new Scrape(scene)]);
        this.drawCard = () => {
            let topCard = this.deck.shift();
            if (this.deck.length === 0) {
                this.deck = Phaser.Math.RND.shuffle([new Boolean(scene), new Double(scene), new Host(scene), new Ping(scene), new Scrape(scene)]);
            };
            return topCard;
        }
    }
}
