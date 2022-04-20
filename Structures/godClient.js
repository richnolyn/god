const { Discord, Client, Collection, Permissions, Intents, Message } = require('discord.js');
const Utils = require('./utils.js');
const allIntents =  new Intents(32767)

module.exports = class godClient extends Client {
    constructor(options = {}) {
        super({
            intents: [allIntents]
        })

        this.validate(options); // options = config.json

        this.commands = new Collection();
        this.events = new Collection();
        this.aliases = new Collection();
        this.utils = new Utils(this);
        this.owner = options.owner;
    }

    validate(options) {
        if (!options.owner || options.owner == "YOUR ID") throw new Error('No owner specified!');
        if (!options.token || options.token == "TOKEN") throw new Error('No token specified!');
        this.token = options.token;
        if (!options.prefix || options.prefix == "PREFIX") throw new Error('No prefix specified!');
        this.prefix = options.prefix;
    }

    async start(token = this.token) {
        this.utils.loadCommands();
        this.utils.loadEvents();
        await super.login(token).catch(err => console.log(err));
    }
}