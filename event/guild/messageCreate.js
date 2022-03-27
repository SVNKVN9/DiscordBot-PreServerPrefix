const mongoose = require('mongoose')
const Prefix = mongoose.model('Prefix')

module.exports = async (client, message) => {
    if(message.author.bot)  return
    if(!message.guild) return

    let prefix = await Prefix.findOne({ guild: message.guild.id })

    if (!prefix) {
        prefix = new Prefix()
        prefix.guild = message.guild.id
        prefix.prefix = client.config.prefix
        await prefix.save()
    }

    if(!message.content.startsWith(prefix.prefix)) return
    
    const args = message.content.slice(prefix.prefix.length).trim().split(/ +/);
    const commandName = args.shift().toLowerCase();

    const command = 
        client.commands.get(commandName) || 
        client.commands.find(cmd => cmd.aliases && cmd.aliases.includes(commandName))

    if(!command) return

    if (command.category == 'developer') {
        if (!client.config.ownerID.includes(message.author.id)) return
    }

    if (command.category == 'admin') {
        if (!message.member.permissions.has('ADMINISTRATOR')) return
    }

    try {
        command.execute(message, args, client)
    }catch(err) {
        console.error(err)
    }
}