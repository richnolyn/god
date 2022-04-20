const Event = require('../../Structures/Event.js');
const { MessageEmbed, Options } = require('discord.js');

module.exports = class extends Event {
    async run(message) {
        const mentionRegexPrefix = new RegExp(`^<@!?${this.client.user.id}> `);
        
        const prefix = message.content.match(mentionRegexPrefix) ? message.content.match(mentionRegexPrefix)[0] : this.client.prefix;
        if (!message.guild) return;
        if (!message.content.startsWith(prefix)) return;
        
		const [cmd, ...args] = message.content.slice(prefix.length).trim().split(/ +/g);
        const command = this.client.commands.get(cmd.toLowerCase()) || this.client.commands.get(this.client.aliases.get(cmd.toLowerCase()));
        if (command) {
            if (command.nsfw && !message.channel.nsfw) return message.channel.send(`This command is NSFW! Please go to a NSFW channel to use this command!`);
            if (command.owner && !this.client.owner.includes(message.author.id)) return message.channel.send(`This command is owner only!`);
            if (command.enabled === false) return message.channel.send(`This command is disabled!`);
            if (command.permissions && !message.member.permissions.has(command.permissions)) return message.channel.send(`You don't have the required permissions to use this command!`);
            
            await command.run(message, args);
        }
    }
}