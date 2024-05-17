// things to do on discord.com/developers/applications
// 1. create an application
// 2. avatar
// 3. bot, then add bot
// 4. reset token, add token to .env
// 5. message content intent turn on 
// 6. OAuth2, custom URL
//https://discord.com/oauth2/authorize?scope=bot&permissions=8&client_id=1071980540837765320

//create a discord bot
require('dotenv').config();
//npm i dotenv
//npm i discord.js

//define
const dotenv = require("dotenv");
const fs = require('node:fs');
const path = require('node:path');
const { Client, Collection, Events, GatewayIntentBits, Partials, ActivityType } = require('discord.js');

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.GuildMessages,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.GuildMembers,
        GatewayIntentBits.GuildVoiceStates,
        GatewayIntentBits.DirectMessages,
        GatewayIntentBits.GuildMessageReactions
    ],
    partials: [
        Partials.Channel,
        Partials.Message,
        Partials.User
    ]
});

//commands path
client.commands = new Collection();
const commandsPath = path.join(__dirname, 'commands');
const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

for (const file of commandFiles){
    const filePath = path.join(commandsPath, file);
    const command = require(filePath);
    client.commands.set(command.data.name, command);
};

//react to bet message
client.on("messageCreate", async (message) => {

    //console.log(message);
    
    if(message.author.bot) {
        //check if bot is bet bot
        if (message.author.id === "1164074384919625768"){
            //check contents
            if (message.content.includes("React to Bet")){
                //react to message
                message.react("<:torch:1169139619221221397>");
                message.react("<:thiefcartoon:1169143073276698725>");
            }
        }
    }
});

const UserBet = require("./models/bet.js");

//store reactions in UserBet
client.on(Events.MessageReactionAdd, async (reaction, user) => {

    if (reaction.message.partial) {
        try {
            await reaction.message.fetch();
        } catch (err) {
            console.log("index.js, add roles, message partial");
            console.log("error message below".padEnd(50, "-"));
            console.log(err);
            console.log("-".padEnd(50, "-"));
        };
    };

    try {

        //check if reaction is either of the two bet emoji
        if (reaction._emoji.id === "1169139619221221397"){
            //if user reacted to team1

            //get title of embed
            const titleEmbed = reaction.message.embeds[0].title;
            const titleNumber = titleEmbed.slice(6, titleEmbed.length);
            const titleInt = parseInt(titleNumber, 10);

            //store in UserBet
            const test = await UserBet.findByPk(user.id);

            if(test){
                const oldm1 = test.m1;
                const newm1 = oldm1.substring(0, titleInt-1) + "1" + oldm1.substring(titleInt, oldm1.length);
                //console.log(newm1);

                await test.update({ m1: newm1 });
                await client.channels.cache.get("1169153486802391051").send(`${user.username} (${user.id}) reacted for team1 for ${titleEmbed}`);
                return;
                
            };
            const t = "nnnnnnnnnnnnnn"
            const t1 = t.substring(0, titleInt-1) + "1" + t.substring(titleInt, t.length);

            await UserBet.create({ id: user.id, m1: t1 });

            //send to betting logs channel, id = "1169153486802391051"
            await client.channels.cache.get("1169153486802391051").send(`${user.username} (${user.id}) reacted for team1 for ${titleEmbed}`);

        };
        if (reaction._emoji.id === "1169143073276698725"){
            //if user reacted to team2

            //get title of embed
            const titleEmbed = reaction.message.embeds[0].title;
            const titleNumber = titleEmbed.slice(6, titleEmbed.length);
            const titleInt = parseInt(titleNumber, 10);

            //store in UserBet
            const test = await UserBet.findByPk(user.id);

            if(test){
                const oldm1 = test.m1;
                const newm1 = oldm1.substring(0, titleInt-1) + "2" + oldm1.substring(titleInt, oldm1.length);
                //console.log(newm1);

                await test.update({ m1: newm1 });
                await client.channels.cache.get("1169153486802391051").send(`${user.username} (${user.id}) reacted for team2 for ${titleEmbed}`);
                return;
                
            };
            const t = "nnnnnnnnnnnnnn"
            const t1 = t.substring(0, titleInt-1) + "2" + t.substring(titleInt, t.length);
            await UserBet.create({ id: user.id, m1: t1 });

            //send to betting logs channel, id = "1169153486802391051"
            await client.channels.cache.get("1169153486802391051").send(`${user.username} (${user.id}) reacted for team2 for ${titleEmbed}`);

        };
    } catch (err) {
        console.log(err);
    };

});

//commands interaction
client.once(Events.ClientReady, () => {
    console.log("Ready to accept commands!")
});

//commands interaction
client.on(Events.InteractionCreate, async interaction => {
    if (!interaction.isChatInputCommand()) return;

    const command = client.commands.get(interaction.commandName);

    if (!command) return;

    try {
        await command.execute(interaction);
    } catch (err){
        console.log(err);
        await interaction.reply({
            content: "There was an error while executing this command!"
        })
    }
});

// log bot onto discord
client.on('ready', (c) => {
    console.log("Private Corporal is Online on Discord");

    client.user.setActivity({
        name: "for steals",
        type: ActivityType.Watching
    });
});

client.login(process.env.DISCORD_TOKEN);

//node .\index.js
//"start": "node bot.js"
//