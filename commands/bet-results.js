const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");
const TeamCount = require("../models/count.js");
const TeamBet = require("../models/team.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bet-results")
        .setDescription("Results of a bet Message")
        .addChannelOption(option => option.setName("channel")
            .setDescription("Channel the Bet Message was sent to")
            .setRequired(true))
        .addStringOption(option => option.setName("messageid")
            .setDescription("Message ID of Bet Message")
            .setRequired(true))
        .addIntegerOption(option => option.setName("round")
            .setDescription("Round Number")
            .setRequired(true))
        .addIntegerOption(option => option.setName("team1-count")
            .setDescription("Team 1 Emoji Count")
            .setRequired(true))
        .addIntegerOption(option => option.setName("team2-count")
            .setDescription("Team 2 Emoji Count")
            .setRequired(true)),

    async execute(interaction) {
        //get all variables 

        const { options } = interaction;
        const channelBet = options.getChannel("channel");
        const messageId = options.getString("messageid");
        const team1count = options.getInteger("team1-count");
        const team2count = options.getInteger("team2-count");
        const round = options.getInteger("round");

        if (interaction.user.id !== "697822391971086406") {
            await interaction.reply({ content: `Locked command. This is a Kreacher-only-command, unless your lock-pick skills are as good as mine!`, ephemeral: true });
            return;
        };

        try {
            
            //retrieve count of two bets

            // await interaction.guild.channels.fetch(channelBet.id);
            // await interaction.guild.channels.cache.get(channelBet.id).messages.fetch(messageId);
            // const messageBet = await interaction.guild.channels.cache.get(channelBet.id).messages.get(messageId);
            // const team1count = await messageBet.reactions.cache.get("☀️").count();
            // const team2count = await messageBet.reactions.cache.get("⭐").count();

            //delete message from channel 
            await interaction.guild.channels.fetch(channelBet.id);
            await interaction.guild.channels.cache.get(channelBet.id).messages.delete(messageId);
            
            //results in percentage
            const team1results = Math.round((team1count)/(team1count + team2count)*100);
            const team2results = Math.round((team2count)/(team2count + team1count)*100);

            //get team 1 name and 2 name from database
            const msgData = await TeamBet.findOne({ where: { msgId: messageId } });
            if (!msgData){
                await interaction.reply({ content: `Please register bet message first.`, ephemeral: true });
                return;
            };
            const team1Name = msgData.team1;
            const team2Name = msgData.team2;

            //create teamcount to database
            const test = await TeamCount.findByPk(messageId);

            if(test){
                await test.destroy()
            };

            await TeamCount.create({ msgId: messageId, team1count: team1count, team2count: team2count });

            //create embed 
            const embed = new EmbedBuilder()
                .setColor("#f2d0b8")
                .setTitle(`Match ${round} Betting Prediction Results`)
                .setDescription(`**${team1Name}** vs **${team2Name}**\n${"<:torch:1169139619221221397>"} ${team1Name}: ${team1results}%\n${"<:thiefcartoon:1169143073276698725>"} ${team2Name}: ${team2results}%`)
                .setFooter({ text: "The truth about this world is money is everything. May the odds be in your favour." })

            //send message to bet channel
            await interaction.guild.channels.cache.get(channelBet.id).send({ embeds: [embed] });
            await interaction.client.channels.cache.get("1169123220557926420").send({ content: `[Deleted] msgId: ${messageId}, Match ${round}, ${team1Name} vs ${team2Name}` });

            //reply
            await interaction.reply({ content: "Synced.", ephemeral: true });
            return;
        } catch (err) {
            console.log(err);
        };
    }
};
