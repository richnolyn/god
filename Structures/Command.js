const { Permissions } = require('discord.js');
const { Intents } = require('discord.js');

module.exports = class Command {
    constructor(client, name, options = {}) {
        this.client = client;
        this.name = options.name || name;
        this.aliases = options.aliases || [];
        this.description = options.description || 'No description provided.';
        this.usage = options.usage || 'No usage provided.';
        this.permissions = options.permissions || Intents.FLAGS.GUILD_MESSAGE;
        this.cooldown = options.cooldown || 1000;
        this.hidden = options.hidden || false;
        this.owner = options.owner || false;
        this.enabled = options.enabled || true;
        this.nsfw = options.nsfw || false;
        this.category = options.category || 'Miscellaneous';
    }

    async run(message, args) {
        throw new Error('Command not implemented!');
    }
}