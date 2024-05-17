const { SlashCommandBuilder } = require("discord.js");
const TeamBet = require("../models/team.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bet-register")
        .setDescription("Register Bet")
        .addStringOption(option => option.setName("msgid")
            .setDescription("Message ID")
            .setRequired(true))
        .addIntegerOption(option => option.setName("round")
            .setDescription("Round Number")
            .setRequired(true))
        .addRoleOption(option => option.setName("team1")
            .setDescription("Team 1")
            .setRequired(true))
        .addRoleOption(option => option.setName("team2")
            .setDescription("Team 2")
            .setRequired(true)),

    async execute (interaction) {
        //get all variables
        const { options } = interaction;
        const msgId = options.getString("msgid");
        const team1 = options.getRole("team1").name;
        const team2 = options.getRole("team2").name;
        const round = options.getInteger("round");

        if (interaction.user.id !== "697822391971086406") {
            await interaction.reply({ content: `Locked command. This is a Kreacher-only-command, unless your lock-pick skills are as good as mine!`, ephemeral: true });
            return;
        };

        //teambet findbyprimarykey, 

        // we need to check

        try {
            //
            //sent to database
            const test = await TeamBet.findByPk(msgId);

            if(test){
                await test.destroy()
            };

            await TeamBet.create({ msgId: msgId, team1: team1, team2: team2, name: `Match ${round}` });

            await interaction.client.channels.cache.get("1169123220557926420").send({ content: `msgId: ${msgId}, Match ${round}, ${team1} vs ${team2}` });

            await interaction.reply({ content: `Successfully saved.`, ephemeral: true });
            return;
        } catch (err) {
            console.log(err);
        };

    }
};