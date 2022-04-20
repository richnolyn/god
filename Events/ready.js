const Event = require('../Structures/Event.js');

module.exports = class extends Event {
    constructor(...args) {
        super(...args, {
            once: true
        });
    }

    async run(...args) {        
        console.log(`Logged in as ${this.client.user.tag}!`);
        console.log(`Loaded ${this.client.commands.size} commands!`);
        console.log(`Loaded ${this.client.events.size} events!`);
        console.log(`Current prefix: ${this.client.prefix}`);

        let MemberCount = 0;
        let GuildCount = 0;
         
        this.client.guilds.cache.forEach(guild => {
            MemberCount += guild.memberCount;
            GuildCount++;
        });

       // this.client.user.setActivity(`${this.client.prefix}help | ${MemberCount}m/${GuildCount}s`, { type: 'WATCHING' }); if you want to set activity use this

    }
}