/* You cannot remove this file/commands You cannot change the command name. Check ToS for more info */

const { MessageEmbed } = require("discord.js");
const config = require('../../config.json');

module.exports.run = async(client, message, args) => {
    message.delete()

    const embed = new MessageEmbed()
        .setTitle("Bot Information")
        .setColor(config.information.color)
        .setDescription(`This bot was made for ${config.embed.footer} by NAT2K15#2951. If you would like a bot simuler to this one make sure to contact NAT2K15#2951`)
        .addField("Bot Name:", `${client.user.tag}`, true)
        .addField("Creator:", 'This bot was made by NAT2K15#2951 (576971985108860929)', true)
        .addField(`More info`, `More info on this bot you come to my discord and ask questions`)
        .addField(`Discord`, `https://discord.gg/RquDVTfDwu`)
        .setThumbnail('https://images-ext-1.discordapp.net/external/aw3qXVh9faGunEp43t2Rpuvra-qopyzCBbgqQRaZhhI/%3Fsize%3D1024/https/cdn.discordapp.com/avatars/576971985108860929/516ddf719e9743b7fde8a2c39e277dd4.png')
        .setTimestamp()
        .setFooter(`Made by NAT2K15#2951`);
    message.channel.send(embed);
};

// Help Object
module.exports.help = {
    name: "botmaker",
    description: "shows who made the bot!",
    usage: "",
    category: "info",
    aliases: []
};