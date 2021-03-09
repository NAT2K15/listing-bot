const config = require('../config.json');
const { MessageEmbed } = require('discord.js');

module.exports = async(client, member, args) => {
    if (config.goodbye.enable) {
        if (config.goodbye.type == 1) {
            let cha = member.guild.channels.cache.get(config.goodbye.channel);
            if (!cha) return console.log(`\x1b[91m[DEBUG]\x1b[0m You are missing a server id in config.json in goodbye channel\x1b[0m`);
            cha.send(`<@${member.user.id}>, ${config.goodbye.message}`).catch(e => {
                if (e) return console.log(`I was not able to send a message in the goodbye channel. goodbye channel is "${cha.name}"`)
            })
        } else {
            if (config.goodbye.type == 2) {
                let chan = member.guild.channels.cache.get(config.goodbye.channel);
                if (!chan) return console.log(`\x1b[91m[DEBUG]\x1b[0m You are missing a cserver id in config.json in goodbye channel\x1b[0m`);
                let e1 = new MessageEmbed()
                    .setTitle(`${member.user.tag} has left the discord`)
                    .setDescription(`${config.goodbye.message}`)
                    .setThumbnail(member.user.displayAvatarURL({ format: `png`, dynamic: true }))
                    .setTimestamp()
                    .setColor(config.embed.color)
                    .setFooter(config.embed.footer)
                chan.send(e1).catch(e => {
                    if (e) return console.log(`I was not able to send a message in the Goodbye channel. Goodbye channel is "${chan.name}"`)
                })
            }
        }
    }
}