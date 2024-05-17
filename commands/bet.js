const { SlashCommandBuilder } = require("discord.js");
const UserDiscord = require("../models/user.js");
const UserBet = require("../models/bet.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bet")
        .setDescription("Shows your Fragment Count"),

    async execute(interaction) {
        //
        try {
            //
            const test = await UserDiscord.findByPk(interaction.user.id);
            const test1 = await UserBet.findByPk(interaction.user.id);

            if(!test){
                if (test1){
                    //
                    await interaction.reply({ content: `You have **1000** fragments in your account, please wait for the gains/losses to be distributed.`, ephemeral: true });
                    return;
                }
                await interaction.reply({ content: `You have **1000** fragments in your account. Do participate in a bet to join in the leaderboards.`, ephemeral: true })
                return;
            };

            const bot = await UserDiscord.findByPk(interaction.client.application.id);
            if (bot.value > test.value){
                await interaction.reply({ content: `You have **${test.value}** fragments in your account, that's ${bot.value-test.value} fragments fewer than me!(>ω<)`, ephemeral: true });
                return;
            };
            //

            await interaction.reply({ content: `You have **${test.value}** fragments in your account.`, ephemeral: true });
            return;

        } catch(err) {
            console.log(err);
            await interaction.reply({ content: `Oops, something went wrong, please let sneaky know, I'm really sorry about this`, ephemeral: true });
            return;
        };
        
    }
};
