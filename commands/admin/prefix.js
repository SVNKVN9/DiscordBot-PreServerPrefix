const mongoose = require('mongoose')
const Prefix = mongoose.model('Prefix')
const { MessageEmbed } = require('discord.js')

module.exports = {
	name: 'prefix',
	category: "admin",
	aliases: [],
	async execute(message, args, client) {

		const guildId = message.guild.id
        const data = await Prefix.findOne({ guild: guildId })

        let Embed = new MessageEmbed()
        .setTimestamp()
        .setTitle('The prefix of this server is "**' + data.prefix + '**"')
        .setDescription(`You can change the prefix with **"${data.prefix}prefix set [ new Prefix ]"**`)

        if(!args[0])  return message.reply({ embeds: [Embed] })
        
        if(args[0] == 'set') {
            if(!args[1]) return message.reply({ embeds: [Embed] })

            if(args[1].length > 3 ) return message.reply({ content: 'Prefixes must not be more than 3 characters.'})

            const data = await Prefix.findOneAndUpdate({ guild: guildId }, { prefix: args[1] })
            
            let EmbedChange = new MessageEmbed()
            .setTimestamp()
            .setTitle('Change Prefix Succassfully.')

            return message.reply({ embeds: [EmbedChange] })
        }

	}
}