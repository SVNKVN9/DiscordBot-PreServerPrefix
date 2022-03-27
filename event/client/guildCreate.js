const mongoose = require('mongoose')
const Prefix = mongoose.model('Prefix')

module.exports = async (client, guild) => {

    const prefix = new Prefix()
    prefix.guild = guild.id
    prefix.prefix = '!'
    prefix.save()

    console.log(`Join Guild ${guild.name} (${guild.id})`)
}