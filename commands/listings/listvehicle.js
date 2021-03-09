const { MessageEmbed } = require('discord.js');
const config = require('../../config.json');
const ms = require('ms')

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
            message.channel.send(`What is the vehicle car name/pack you are wishing to list?`)
            message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(firstmsg => {
                let vehiclename = firstmsg.first().content.toLowerCase()
                message.channel.send(`How much is the product going to cost (Do not include the $)`)
                message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(secondmsg => {
                    let price = secondmsg.first().content.toLowerCase()
                    message.channel.send(`What is the pack/car going to be coming with/included`)
                    message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(thirdmsg => {
                        let extrathings = thirdmsg.first().content.toLowerCase()
                        message.channel.send(`Would you like to add any Important Information the user will need to know. If not please type **none**`)
                        message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(fourthmsg => {
                            let importantinfo = fourthmsg.first().content.toLowerCase()
                            if (importantinfo.toLowerCase() == 'none') importantinfo = 'none'
                            message.channel.send(`Please include the showcase of the product if none please type **none**`)
                            message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(forget => {
                                let shwocase = forget.first().content.toLowerCase()
                                message.channel.send(`Could you please input a vaild photo that will be displayed in the embed (note it must start with https://). If not please type **none**`)
                                message.channel.awaitMessages(m => m.author.id == message.author.id, { max: 1 }).then(fivemsg => {
                                    let photo = fivemsg.first().content.toLowerCase()
                                    if (!photo.startsWith("https://")) photo = 'none';
                                    message.channel.send(`Are you sure you would like to list this product?`).then(msg => {
                                        msg.react('❌').then(() => msg.react('✅'));
                                        const filterE = (reaction, user) => {
                                            return ['❌', '✅'].includes(reaction.emoji.name) && user.bot == false;
                                        };
                                        msg.awaitReactions(filterE, { max: 1, time: ms("20m"), errors: ['time'] }).then(collected => {
                                            const reaction = collected.first();
                                            if (reaction.emoji.name === '❌') {
                                                message.channel.bulkDelete(13)
                                                message.channel.send(`Vehicle listing canceled`)
                                            }
                                            if (reaction.emoji.name === '✅') {
                                                let e1 = new MessageEmbed();
                                                e1.setTitle(`${vehiclename}`)
                                                e1.addField(`Price`, `$${price}`)
                                                e1.addField(`Items included`, extrathings)
                                                if (shwocase.toLowerCase() !== 'none') e1.addField(`Showcase`, shwocase)
                                                if (importantinfo.toLowerCase() !== 'none') e1.addField(`Important Information`, importantinfo)
                                                if (photo.toLowerCase() !== 'none') e1.setImage(photo)
                                                e1.setTimestamp()
                                                e1.setColor(config.embed.color)
                                                e1.setFooter(config.embed.footer)
                                                e1.setThumbnail(message.guild.iconURL({ format: `png`, dynamic: true }))
                                                message.channel.bulkDelete(13)
                                                message.channel.send(e1)
                                            }
                                        })
                                    })
                                })
                            })
                        })
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
module.exports.help = {
    name: "listvehicle",
    description: "This command will list a vehicle item for you",
    usage: "",
    category: "Info",
    aliases: []
};