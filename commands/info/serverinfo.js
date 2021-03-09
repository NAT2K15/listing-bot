const { MessageEmbed } = require(`discord.js`)
const config = require('../../config.json');


module.exports.run = async(client, message, args) => {
    const roles = message.guild.roles.cache.size;
    const channels = message.guild.channels.cache.size;
    var creation = message.guild.createdAt;
    var creation = creation.getMonth() + `/` + creation.getDay() + `/` + creation.getFullYear() + ` at ` + creation.getHours() + `:` + creation.getMinutes() + `:` + creation.getSeconds();
    var whenUjoin = message.member.joinedAt;
    var whenUjoin = whenUjoin.getMonth() + `/` + whenUjoin.getDay() + `/` + whenUjoin.getFullYear() + ` at ` + whenUjoin.getHours() + `:` + whenUjoin.getMinutes() + `:` + whenUjoin.getSeconds();
    var users = message.guild.members.cache.filter(m => !m.user.bot).size;
    var bots = message.guild.members.cache.filter(m => m.user.bot).size;
    const boosts = message.guild.premiumSubscriptionCount;
    const oof = message.guild.bannerURL({ format: 'png', dynamic: true });
    const embed = new MessageEmbed()
        .setAuthor(message.guild.name + " (" + message.guild.id + ")")
        .setColor(config.embed.color)
        .setFooter(config.embed.footer)
        .setDescription(`**Owner:** ${message.guild.owner}\n**Total Roles:** ${roles}\n**Total Channels:** ${channels}\n**Total Users:** ${users}\n**Total Bots:** ${bots}\n**Stats**\n**Creation Date:** ${creation}\n**Your join date:** ${whenUjoin}`)
        .setFooter(`${message.guild.name} has been boosted ${boosts} times`)
        .setThumbnail(message.guild.iconURL())
        .setImage(oof);
    message.channel.send(embed).catch(err => {
        if (err) console.log(client.evente4 + ` Guild: ${message.guild.id} Guild Name: ${message.guild.name} Guild Owner: ${message.guild.owner.user.username}\x1b[0m`)
    })
}

module.exports.help = {
    name: "serverinfo",
    description: "shows the info of the whole server",
    usage: "",
    category: "Info",
    aliases: []
};