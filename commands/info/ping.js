const { RichEmbed } = require("discord.js");

module.exports = {
    name: "ping",
    category: "info",
    description: "returns latency and API ping",
    run: async (bot, message, args) => {
        const msg = await message.channel.send(`Ping...`)

        const roleColour = message.guild.me.hexColor === `#000000` ? `#ffffff` : message.guild.me.displayHexColor;

        const embed = new RichEmbed()
            .setColor(roleColour)
            .setTitle(`Pong.`)
            .addField(`Latency:`, `${Math.floor(msg.createdAt-message.createdAt)}ms`)
            .addField(`API Latency:`, `${Math.round(bot.ping)}ms`)
            .setTimestamp()
            
        message.channel.send(embed);
    }
}