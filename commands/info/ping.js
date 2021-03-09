const config = require('../../config.json');
const { MessageEmbed } = require('discord.js')

module.exports.run = async(client, message, args) => {
    await message.delete().catch(err => {
        if (err) {
            console.log(`\x1b[91m[DEBUG]\x1b[0m I encountered into an error trying to delete the users message in ${message.channel.name}. Command: ${module.exports.help.name} \x1b[0m`);
        }
    })
    var ping = Date.now() - message.createdTimestamp + " ms";
    const embed = new MessageEmbed()
        .setDescription(`📶 Latency ${ping}`)
        .setColor(config.embed.color)
        .setFooter(config.embed.footer)
    message.channel.send(embed)



};

// Help Object
module.exports.help = {
    name: "ping",
    description: "this command will tell the Latency the bot currently has",
    usage: "",
    category: "Info",
    aliases: []
};