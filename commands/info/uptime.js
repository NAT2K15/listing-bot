const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');
const ms = require('ms');

module.exports.run = async(client, message, args) => {
    await message.delete().catch(err => {
        if (err) {
            console.log(`\x1b[91m[DEBUG]\x1b[0m I encountered into an error trying to delete the users message in ${message.channel.name}. Command: ${module.exports.help.name} \x1b[0m`);
        }
    })
    const embed = new MessageEmbed()
        .setTimestamp()
        .setDescription(`I've been online for \`${ms(client.uptime, { long: true })}\``)
        .setColor(config.embed.color)
        .setFooter(config.embed.footer)
    message.channel.send(embed).catch(err => {
        if (err) {
            console.log(`\x1b[91m[DEBUG]\x1b[0m I encountered into an error with the embed. Command: ${module.exports.help.name} \x1b[0m`);
        }
    })
}

// Help Object
module.exports.help = {
    name: "uptime",
    description: "this command will tell you how long the bot has been up for",
    usage: "",
    category: "Info",
    aliases: []
};