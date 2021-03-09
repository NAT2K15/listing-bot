const config = require('../config.json');
const { MessageEmbed } = require('discord.js');
const moment = require('moment');
module.exports = async(client, member) => {
    if (config.welcome.enable) {
        if (config.welcome.type == 1) {
            let cha = member.guild.channels.cache.get(config.welcome.channel);
            if (!cha) return console.log(`\x1b[91m[DEBUG]\x1b[0m You are missing a server id in config.json in welcome channel\x1b[0m`);
            cha.send(`<@${member.user.id}>, ${config.welcome.message}`).catch(e => {
                if (e) return console.log(`I was not able to send a message in the welcome channel. Welcome channel is "${cha.name}"`)
            })
        } else {
            if (config.welcome.type == 2) {
                let chan = member.guild.channels.cache.get(config.welcome.channel);
                if (!chan) return console.log(`\x1b[91m[DEBUG]\x1b[0m You are missing a cserver id in config.json in welcome channel\x1b[0m`);
                let e1 = new MessageEmbed()
                    .setTitle(`Welcome to ${member.guild.name}`)
                    .setDescription(`${config.welcome.message}`)
                    .addField(`Member`, member)
                    .setColor(config.embed.color)
                    .setFooter(config.embed.footer)
                    .setTimestamp()
                chan.send(e1).catch(e => {
                    if (e) return console.log(`I was not able to send a message in the welcome channel. Welcome channel is "${chan.name}"`)
                })
            }
        }
    }

    if (config.welcome.alt_detection) {
        let userjoin = moment(member.user.createdAt);
        let daysconfig = config.welcome.alt_days;
        if (isNaN(daysconfig)) daysconfig = 30;
        let days = moment().subtract(daysconfig, 'days')
        let isit = userjoin.isBefore(days);
        if (!isit) {
            let data = moment(member.user.createdAt).format("YYYY/MM/DD");
            let chann = member.guild.channels.cache.get(config.welcome.alt_channel)
            if (!chann) return;
            let altaccountembed = new MessageEmbed()
                .setTitle(`Alt account detected`)
                .setDescription(`${member.user.tag} || \`${member.user.id}\` has an account that is not older then ${daysconfig} days!`)
                .addField(`Data the account was created`, `${data}`)
                .addField(`Time the account was made`, `${member.user.createdAt}`)
                .setTimestamp()
                .setThumbnail(member.user.displayAvatarURL({ format: `png`, dynamic: true }))
                .setColor(config.embed.color)
                .setFooter(config.embed.footer)
            chann.send(`<@${member.user.id}>,`)
            chann.send(altaccountembed).catch(e => {
                if (e) return console.log(`I was not able to send a message in the atl account channel. alt account channel is "${chann.name}"`)
            })
        }
    }

    //this is for autor
    if (config.welcome.auto_role) {
        config.welcome.roles.forEach(rid => {
            member.roles.add(rid).catch(e => {
                if (e) return console.log(`I was not able to add a role to a user. "${rid}", Member "${member.user.tag}"`)
            })
        })
    }

}