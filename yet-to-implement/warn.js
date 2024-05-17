const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('warn')
        .setDescription('warns a user')
        .addUserOption(
            option 
                .setName("name")
                .setDescription("choose user to warn")
                .setRequired(true))
        .addStringOption(
            option
                .setName("reason")
                .setDescription("details for the warning")
                .setRequired(true)
        ),

    async execute(interaction) {

        //check if user has ban permission/ mod role
        if (!interaction.member.roles.cache.has("1164149667504853045")){
            await interaction.reply({ content: "You have no permission to use this command, please approach Moderators for help.", ephemeral: true });
            return;
        };

        //check if channel is correct
        banChannelId = "1164400885506510848";
        if (!interaction.channelId === banChannelId) {
            await interaction.reply({ content: "Please use this command in the correct channel.", ephemeral: true });
            return;
        }

        const targetBan = interaction.options.getUser("name");
        const reasonBan = interaction.options.getString("reason");

        await interaction.guild.members.ban(targetBan, { reason: reasonBan });

        await interaction.reply(`${targetBan} has been warned for ${reasonBan}.`);
        return;
    }
};