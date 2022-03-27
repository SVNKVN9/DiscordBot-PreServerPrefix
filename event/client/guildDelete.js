const mongoose = require('mongoose')
const Prefix = mongoose.model('Prefix')

module.exports = async (client, guild) => {
    await Prefix.deleteOne({ guild: guild.id })

    console.log(`Leave Guild ${guild.name} (${guild.id})`)
}