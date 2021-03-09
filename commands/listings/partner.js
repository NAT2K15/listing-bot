const config = require('../../config.json');
const { MessageEmbed } = require('discord.js');

module.exports.run = async(client, message, args) => {
    message.delete().catch(e => {
        if (e) return console.log(`\x1b[91m[ALERT]\x1b[0m I was not able to delete a message in ${message.channel.name}\x1b[0m`)
    })
    if (config.listings.enable == true) {
        if (!message.member.roles.cache.has(config.listings.allowes_role)) {
            let e1 = new MessageEmbed()
                .setDescription(`You cannot use this command.`)
                .setColor(config.embed.color)
                .setFooter(config.embed.footer)
            message.channel.send(e1).then(msg => msg.delete({ timeout: 10000 }));
        } else {
            message.channel.send(`what is the server name you are partnering with`)
            message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(servername => {
                let name = servername.first().content.toLowerCase()
                message.channel.send(`What is their advertisement message?`)
                message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(atmesg => {
                    let atoklol = atmesg.first().content.toLowerCase()
                    message.channel.send(`What is their discord invite?. Note it must start with \`https://\` Example: https://discord.gg/invite-here If not please type **none**`)
                    message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(thirdmsg => {
                        let discordin = thirdmsg.first().content.toLowerCase()
                        if (!discordin.startsWith("https://")) discordin = 'none';
                        let e1 = new MessageEmbed();
                        e1.setTitle(`${name}`)
                        e1.setDescription(`${atoklol}`)
                        e1.setThumbnail(message.guild.iconURL({ format: `png`, dynamic: true }))
                        e1.setTimestamp()
                        if (discordin.toLowerCase() !== 'none') e1.addField(`Discord:`, `[Click Here](${discordin})`)
                        e1.setColor(config.embed.color)
                        e1.setFooter(config.embed.footer)
                        message.channel.bulkDelete(6)
                        message.channel.send(e1)
                    })
                })
            })
        }
    } else {
        if (!message.member.roles.cache.has(config.listings.allowes_role)) {
            let e1 = new MessageEmbed()
                .setDescription(`You cannot use this command.`)
                .setColor(config.embed.color)
                .setFooter(config.embed.footer)
            message.channel.send(e1).then(msg => msg.delete({ timeout: 10000 }));
        } else {
            let am = new MessageEmbed()
                .setDescription(`Listing is disabled. Please contact the bot owner to enable it`)
                .setColor(config.embed.color)
                .setFooter(config.embed.footer)
            message.channel.send(am)
        }
    }
}

// Help Object
module.exports.help = {
    name: "partner",
    description: "partner embed",
    usage: "",
    category: "Info",
    aliases: []
};