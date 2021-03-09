const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
module.exports.run = async(client, message, args) => {
    await message.delete().catch(err => {
        if (err) {
            console.log(`\x1b[91m[DEBUG]\x1b[0m I encountered into an error trying to delete the users message in ${message.channel.name}. Command: ${module.exports.help.name} \x1b[0m`);
        }
    })
    let member = message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.member;
    const embed = new MessageEmbed()
        .setDescription(`**${member.user.tag}**'s Avatar`)
        .setImage(member.user.displayAvatarURL({ format: `png`, dynamic: true, size: 1024 }))
        .setColor(config.embed.color)
        .setFooter(config.embed.footer)
    message.channel.send(embed).catch(err => {
        if (err) {
            console.log(`\x1b[91m[DEBUG]\x1b[0m I encountered into an error with the embed. Command: ${module.exports.help.name} \x1b[0m`);
        }
    })
};

module.exports.help = {
    name: "avatar",
    description: "This will show a photo of a user in the guild",
    usage: "",
    category: "Info",
    aliases: []
};