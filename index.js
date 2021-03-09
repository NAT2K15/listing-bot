const { Client, Collection } = require('discord.js');
const client = new Client();
const { success, error, warning } = require("log-symbols");
const config = require("./config.json");
client.config = config;


//command handler
const glob = require('glob')
client.prefix = config.prefix;
["commands", "aliases"].forEach(x => client[x] = new Collection());
var comman = 0;
var events = 0;

const cmds = glob.sync("./commands/**/*.js")
const load = () => {
    for (const file of cmds) {
        const pull = require(file)
        if (pull.help && typeof(pull.help.name) === "string" && typeof(pull.help.category) === "string") {
            if (client.commands.get(pull.help.name)) return console.warn(`${warning} Two or more commands have the same name ${pull.help.name}.`);
            client.commands.set(pull.help.name, pull);
            comman++
        } else {
            console.log(`${error} Error loading command in ${file} you have a missing help.name or help.name is not a string. or you have a missing help.category or help.category is not a string`);
            continue;
        }
        if (pull.help.aliases && typeof(pull.help.aliases) === "object") {
            pull.help.aliases.forEach(alias => {
                if (client.aliases.get(alias)) return console.warn(`${warning} Two commands or more commands have the same aliases ${alias}`);
                client.aliases.set(alias, pull.help.name);
            });
        }
        client.commandsnum = comman;
    }
}
load()
    //event handler
const eventList = glob.sync("./events/**/*.js")
for (const file of eventList) {
    try {
        const event = require(file);
        let eventName = file.split("/").pop().split(".").shift()
        events++
        client.eventsnum = events;
        client.on(eventName, event.bind(null, client));
        delete require.cache[require.resolve(file)];
    } catch (err) {
        console.log(`${error} Error loading event in ${file} you have an error for some reason`);
        console.error(err)
        continue;
    }
}

client.login(config.token)