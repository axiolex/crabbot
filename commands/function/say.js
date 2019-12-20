const { RichEmbed } = require("discord.js");

module.exports = {
    name: "say",
    category: "function",
    description: "allows the user to get the bot to repeat or embed their message",
    run: async (client, message, args) => {
        //if(message.deletable) 
        message.delete;

        if(args.length < 1) 
            return message.reply("Nothing to say?").then(m => m.delete(5000));

        const roleColour = message.guild.me.hexColor === `#000000` ? `#ffffff` : message.guild.me.displayHexColor;

        console.log(args[0].toLowerCase())

        if(args[0].toLowerCase() === "embed") {

            console.log(`embed requested`)

            const embed = new RichEmbed()
                .setColor(roleColour)
                .setDescription(args.slice(1).join(` `))

                message.channel.send(embed);

        }
        else {
            message.channel.send(args.join(` `))
        }
    }
}