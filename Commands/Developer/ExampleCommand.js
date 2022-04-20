const Command = require('../../Structures/Command.js');
const { MessageEmbed, Intents } = require('discord.js');

module.exports = class extends Command {
    constructor(...args) {
        super(...args, {
            name: 'CommandName',
            aliases: ['CommandAliases'], // like "!cmd"
            description: 'Invite the bot to your server.',
            usage: 'CommandUsage',
            owner: false, // owner only?
            enabled: true, // enabled?
            nsfw: false, // nsfw?
            category: 'Developer', // category
            cooldown: 1000, // cooldown in ms
            hidden: false, // hide from help?
            permissions: Intents.FLAGS.GUILD_MESSAGE // Permissions?
        });
    }

    async run(message, args) {
        const avatar = this.client.user.displayAvatarURL({ dynamic: true });
        const embed = new MessageEmbed()
            .setColor('#3689ff')
            .setThumbnail(`${avatar}`)
            .addFields(
                { name: 'Thank you for using the bot!', value: 'If you like the bot, please consider supporting it by inviting it to your server!', inline: false },
                { name: 'Invite', value: `[Click Here](https://discord.com/oauth2/authorize?client_id=952100568615227412&scope=bot%20applications.commands&permissions=1077210184)`, inline: true },
                { name: 'Support Server', value: `[Click Here](https://discord.gg/P5f6vzfgQ2)`, inline: true }
            )
            .setFooter(`Requested by ${message.author.tag}`)
            .setTimestamp()
        return message.channel.send({ embeds: [embed] });
    }
};
