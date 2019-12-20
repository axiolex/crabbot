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

/*["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot)
});*/

["command"].forEach(handler => {
    require(`./handler/${handler}`)(bot);
});

bot.on("ready", () => {
    console.log(`${bot.user.username} is now online.`);
    bot.user.setPresence({
        status: "online",
        game: {
            name: "with bits.",
            type: "PLAYING"
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


    /*if(cmd === "ping") {
        const msg = await message.channel.send(`Ping...`)

        const roleColour = message.guild.me.hexColor === `#000000` ? `#ffffff` : message.guild.me.displayHexColor;

        const exampleEmbed = new Discord.MessageEmbed()
        .setColor('#0099ff')
        .setTitle('Some title')
        .setURL('https://discord.js.org/')
        .setAuthor('Some name', 'https://i.imgur.com/wSTFkRM.png', 'https://discord.js.org')
        .setDescription('Some description here')
        .setThumbnail('https://i.imgur.com/wSTFkRM.png')
        .addField('Regular field title', 'Some value here')
        .addBlankField()
        .addField('Inline field title', 'Some value here', true)
        .addField('Inline field title', 'Some value here', true)
        .addField('Inline field title', 'Some value here', true)
        .setImage('https://i.imgur.com/wSTFkRM.png')
        .setTimestamp()
        .setFooter('Some footer text here', 'https://i.imgur.com/wSTFkRM.png');

        message.channel.send(exampleEmbed);

        const embed = new RichEmbed()
            .setColor(roleColour)
            .setTitle(`Pong.`)
            .addField(`Latency:`, `${Math.floor(msg.createdAt-message.createdAt)}ms`)
            .addField(`API Latency:`, `${Math.round(bot.ping)}ms`)
            .setTimestamp()
            
        message.channel.send(embed);

        //msg.edit(`Results:\n    Latency is ${Math.floor(msg.createdAt-message.createdAt)}ms.\n  API Latency ${Math.round(bot.ping)}ms.`)
    }

    if(cmd === "say") {
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

    }*/

});

bot.login(process.env.TOKEN);