const { Client, Intents, Collection } = require('discord.js')
require('./model/index')

const client = new Client({
    intents: [
        Intents.FLAGS.GUILDS,
        Intents.FLAGS.GUILD_MESSAGES
    ]
})

client.commands = new Collection()
client.config = require('./config.json')
client.login(client.config.token);

["command", "event"].forEach(file => require(`./handlers/${file}`)(client))