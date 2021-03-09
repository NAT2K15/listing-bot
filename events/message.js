const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
module.exports = async(client, message) => {
    if (message.author.bot) return;
    if (message.channel.type === "dm" && message.content.length < 2028) {
        let dmlog = client.channels.cache.get(config.discord_logging.dm_logs);
        if (!dmlog) return console.log(`\x1b[91m[DEBUG]\x1b[0m You are missing a cserver id in config.json in dm_logs\x1b[0m`);
        const embed = new MessageEmbed()
            .setAuthor(message.author.tag, message.author.avatarURL())
            .setDescription(`**New DM:**\n${message.content}`)
            .setTimestamp()
            .setColor(config.embed.color)
        dmlog.send(embed)
    }
    let prefix = config.prefix;
    let messageArray = message.content.split(" ");
    let cmd = messageArray[0].toLowerCase();
    let args = messageArray.slice(1);
    if (!message.content.startsWith(prefix)) return;
    const commandfile = client.commands.get(cmd.slice(prefix.length));
    if (commandfile) commandfile.run(client, message, args);
}