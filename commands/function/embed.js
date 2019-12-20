const { RichEmbed } = require("discord.js");

module.exports = {
    name: "embed",
    category: "function",
    description: "allows the user to get the bot to embed their message",
    run: async (client, message, args) => {

        if(args.length < 1) 
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColour = message.guild.me.hexColor === `#000000` ? `#ffffff` : message.guild.me.displayHexColor;

        const embed = new RichEmbed()
            .setColor(roleColour)
            .setDescription(args.slice(0).join(` `))

        message.channel.send(embed);

    }
}