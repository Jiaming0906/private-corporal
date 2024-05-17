const { SlashCommandBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bet-speak")
        .setDescription("Send message into the channel")
        .addStringOption(option => option.setName("message")
            .setDescription("Message to Send"))
        .addStringOption(option => option.setName("channelid")
            .setDescription("Channel ID")),

    async execute(interaction) {
        //get all options
        const { options } = interaction;
        var msg = options.getString("message");
        var channelId = options.getString("channelid");

        if (interaction.user.id !== "697822391971086406") {
            await interaction.reply({ content: `Locked command. This is a Kreacher-only-command, unless your lock-pick skills are as good as mine!`, ephemeral: true });
            return;
        };

        if (!channelId) {
            channelId = "1071955339324440609";
        };

        if (!msg) {
            msg = "What a party! Good day to you, _tips hat_. Welcome to my Underground World Betting Hangout. Please make yourself comfortable. Bets will open 24 hours before the first game of the next tournament day. Want some ale? It's uh, afternoonified! (chuckles)\n\n**Rules**:\n1. No Skilamalink (means no cheating, great word isn't it)\n2. Betting for win/lose starts from top 8 teams onwards, bets will be released in this channel\n3. Join in a bet to be credited with 1000 betting fragments\n4. Use my command \`/bet\` to check your own fragments number, it is an only-visible-to-you command, so don't worry about spamming the server\n6. Do have fun here, I will release the top 5 leaderboards at the end of each tournament day\n\n🥂,\nCheers, my friend. May the odds be in your favour.";
        };

        await interaction.client.channels.cache.get(channelId).send(msg);
        await interaction.reply({ content: "Sent!", ephemeral: true });
        return;
    }
};
