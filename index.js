const { Client, RichEmbed, Collection } = require('discord.js');
const { config } = require("dotenv");


const bot = new Client({
    disableEveryone: true
});

bot.commands = new Collection();
bot.aliases = new Collection();

config({
    path:__dirname + "/.env"
});

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.on("ready", () => {
    console.log(`${bot.user.username} is now online.`);
    bot.user.setPresence({
        status: "online",
        game: {
            name: "crabbing.",
            type: "WATCHING"
        }
    })
});

bot.on("message", async message => {
    //console.log(`${message.author.username} said: ${message.content}`)

    const prefix = "!"

    if(message.author.bot) return;
    if(!message.guild) return;
    if(!message.content.startsWith(prefix)) return;
    if(!message.member) message.member = await message.guild.fetchMember(message);

    const args = message.content.slice(prefix.length).trim().split(/ +/g);
    const cmd = args.shift().toLowerCase();
    
    if (cmd.length === 0) return;

    let command = bot.commands.get(cmd);
    if(!command) command = bot.commands.get(bot.aliases.get(cmd));
    
    if(command) 
        command.run(bot, message, args);


});

bot.login(process.env.TOKEN);