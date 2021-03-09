const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => {
    await message.delete().catch(err => {
        if (err) {
            console.log(`\x1b[91m[DEBUG]\x1b[0m I encountered into an error trying to delete the users message in ${message.channel.name}. Command: ${module.exports.help.name} \x1b[0m`);
        }
    })
    let member = await message.mentions.members.first() || message.guild.members.cache.get(args[0]) || message.guild.members.cache.find(r => r.user.username.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.guild.members.cache.find(r => r.displayName.toLowerCase() === args.join(' ').toLocaleLowerCase()) || message.member;
    const joined = member.joinedAt;
    const roles = member.roles.cache
        .filter(r => r.id !== message.guild.id)
        .map(r => r.name).join(", ") || 'none';
    const highest = member.roles.highest.name || "*None*";
    const created = member.user.createdAt;

    const embed = new MessageEmbed()
        .setTitle("User Info")
        .setThumbnail(member.user.displayAvatarURL({ dynamic: true }))
        .addField("**User information**", `\`${member.displayName}\``)
        .addField("**ID**", `\`${member.user.id}\``)
        .addField("**Username**", `\`${member.user.username}\``)
        .addField("**Tag**", `\`${member.user.tag}\``)
        .addField("**Created at**", `\`${created}\``)
        .addField("**Joined at**", `\`${joined}\``)
        .addField(`**Highest Role**`, `\`${highest}\``)
        .addField(`**Roles**`, `\`${roles}\``)
        .setColor(config.embed.color)
        .setFooter(config.embed.footer)

    member.presence.activities.forEach((activity) => {
        if (activity.type === 'PLAYING') {
            embed.addField('Currently playing', `\n\`${activity.name}\``)
        }
    })
    message.channel.send(embed)
}

// Help Object
module.exports.help = {
    name: "whois",
    description: "this command will tell you info about a user",
    usage: "",
    category: "Info",
    aliases: []
};