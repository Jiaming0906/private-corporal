const { SlashCommandBuilder } = require('discord.js');

module.exports = {
    data: new SlashCommandBuilder()
        .setName('timeout')
        .setDescription('timeout a user'),
    async execute(interaction) {
        const n = Math.random();

        if (n < 0.5){
            return interaction.reply("Heads");
        } else {
            return interaction.reply("Tails");
        }
    }
};