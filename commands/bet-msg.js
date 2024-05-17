const { SlashCommandBuilder, EmbedBuilder } = require("discord.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bet-message")
        .setDescription("Creates a Bet Message")
        .addChannelOption(option => option.setName("channel")
            .setDescription("Choose the Channel to Send Bet Message to")
            .setRequired(true))
        .addIntegerOption(option => option.setName("number")
            .setDescription("Round Number")
            .setRequired(true))
        .addRoleOption(option => option.setName("team-1")
            .setDescription("Choose Team 1")
            .setRequired(true))
        .addRoleOption(option => option.setName("team-2")
            .setDescription("Choose Team 2")
            .setRequired(true)),
    
    async execute(interaction) {
        //send a betting message to the channel

        //get all variables 
        const { options } = interaction;
        const name = options.getInteger("number");
        const team1 = options.getRole("team-1");
        const team2 = options.getRole("team-2");
        const channelBet = options.getChannel("channel");

        if (interaction.user.id !== "697822391971086406") {
            await interaction.reply({ content: `Locked command. This is a Kreacher-only-command, unless your lock-pick skills are as good as mine!`, ephemeral: true });
            return;
        };

        try {
            //create betting message 
            const msgBet = `Team **${team1.name}** vs Team **${team2.name}**\n${"<:torch:1169139619221221397>"}: ${team1.name}\n${"<:thiefcartoon:1169143073276698725>"}: ${team2.name}`;
            
            const embed = new EmbedBuilder()
                .setColor("#b8d2f2")
                .setTitle(`Match ${name}`)
                .setDescription(msgBet)
                .setFooter({ text: "Bets are NOT retractable. If you made multiple bets, only the last will be taken into account."})
            
            //send to channel
            await interaction.guild.channels.cache.get(channelBet.id).send({ content: `React to Bet **100** Fragments.`, embeds: [embed] });

            //reply
            await interaction.reply({ content: "Bet created successfully.", ephemeral: true });

        } catch (err) {
            console.log(err);
        };

    }
};