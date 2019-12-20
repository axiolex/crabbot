module.exports = {
    name: "say",
    category: "function",
    description: "allows the user to get the bot to repeat their message",
    run: async (client, message, args) => {

        if(args.length < 1) 
            return message.reply("Nothing to say?").then(m => m.delete(5000));

            message.channel.send(args.join(` `))
    }
}