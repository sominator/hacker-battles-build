export default class DeckHandler {

  constructor () {

    this.playerDeck = Phaser.Math.RND.shuffle(["boolean", "boolean", "double", "double", "host", "host", "ping", "ping", "scrape", "scrape", "firewall", "firewall", "echo", "echo", "float", "float", "probe", "probe", "turnkey", "turnkey", "defrag", "defrag", "glitch", "glitch", "handshake", "handshake", "reinitialize", "reinitialize", "splice", "splice"]);
    this.opponentDeck = Phaser.Math.RND.shuffle(["boolean", "boolean", "double", "double", "host", "host", "ping", "ping", "scrape", "scrape", "firewall", "firewall", "echo", "echo", "float", "float", "probe", "probe", "turnkey", "turnkey", "defrag", "defrag", "glitch", "glitch", "handshake", "handshake", "reinitialize", "reinitialize", "splice", "splice"]);

    this.cards = {
      boolean: {
        name: "Boolean ()",
        description: "If there is another Boolean () in play during the Execute {} phase, lose 2 BP. If there isn’t, gain 4 BP.",
        bp: 0,
        variables: 1
      },
      double: {
        name: "Double ()",
        description: "Double the amount of BP that you earn this round.",
        bp: 0,
        variables: 1
      },
      host: {
        name: "Host ()",
        description: "Gain a number of BP equal to the slot this function is played in.",
        bp: 0,
        variables: 1
      },
      ping: {
        name: "Ping ()",
        description: "Gain 2 BP. All of your opponents lose 1 BP.",
        bp: 2,
        variables: 1
      },
      scrape: {
        name: "Scrape ()",
        description: "Negate any variables that would be gained after this function is played. Gain 4 BP.",
        bp: 4,
        variables: 0
      },
      firewall: {
        name: "Firewall ()",
        description: "Prevent one of your opponents from gaining BP this round.",
        bp: 0,
        variables: 1
      },
      echo: {
        name: "Echo ()",
        description: "Reveal the top 3 functions of a deck of your choice. Gain 1 BP.",
        bp: 1,
        variables: 1
      },
      float: {
        name: "Float ()",
        description: "Gain a number of variables equal to the number of the socket in which this function is played.",
        bp: 0,
        variables: 0
      },
      probe: {
        name: "Probe ()",
        description: "Reveal one function at random from one of your opponents' hands. Gain 1 BP.",
        bp: 1,
        variables: 3
      },
      turnkey: {
        name: "Turnkey ()",
        description: "If another Turnkey () is in play during the Execute {} phase, gain 4 BP.",
        bp: 0,
        variables: 1
      },
      defrag: {
        name: "Defrag ()",
        description: "Search the discard pile for a function of your choice, or select the top function from your deck.  Replace this function with it.",
        bp: 0,
        variables: 1
      },
      glitch: {
        name: "Glitch ()",
        description: "::Function under construction::",
        bp: 0,
        variables: 1
      },
      handshake: {
        name: "Handshake ()",
        description: "::Function under construction::",
        bp: 0,
        variables: 1
      },
      reinitialize: {
        name: "Re-Initialize ()",
        description: "::Function under construction::",
        bp: 0,
        variables: 1
      },
      splice: {
        name: "Splice ()",
        description: "::Function under construction::",
        bp: 0,
        variables: 3
      }
    }

  }

}
