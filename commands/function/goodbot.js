module.exports = {
    name: "goodbot",
    category: "function",
    description: "gives the bot some love",
    run: async (client, message, args) => {
        message.channel.send(`Thanks ${message.member.displayName}!`)
    }
}