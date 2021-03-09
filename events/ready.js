const config = require('../config.json');
module.exports = async(client) => {
    console.log(`\x1b[1m[MADE BY NAT2K15] Logged in as ${client.user.tag}. My current prefix is "${config.prefix}"\x1b[0m`)
    setInterval(() => {
        let act = config.presence.activity;
        if (!act) act = 'Listings'
        client.user.setActivity(`${act}`, { type: "WATCHING" })
    }, 5000)

    let status = config.presence.status;
    if (!status) status = 'online'
    client.user.setStatus(status)

    if (config.server_count.enable) {
        setInterval(() => {
            if (config.server_count.enable_client) {
                let server = client.guilds.cache.get(config.server_count.server_id);
                if (!server) return console.log(`\x1b[91m[DEBUG]\x1b[0m You are missing a cserver id in config.json in server_id\x1b[0m`);
                server.roles.fetch(config.server_count.client_role).then(roleid => {
                    let chan = client.channels.cache.get(config.server_count.client_channel);
                    if (!chan) console.log(`\x1b[91m[DEBUG]\x1b[0m You are missing a channel in config.json in client_channel\x1b[0m`);
                    let size = roleid.members.size;
                    chan.setName(`Clients: ${size.toLocaleString()}`)
                })
            }
            let everyonechannel = client.channels.cache.get(config.server_count.everyone_channel);
            if (!everyonechannel) console.log(`\x1b[91m[DEBUG]\x1b[0m You are missing a channel in config.json in everyone_channel\x1b[0m`);
            let count = everyonechannel.guild.memberCount;
            everyonechannel.setName(`Total Members: ${count.toLocaleString()}`);
        }, 1000)
    }
}