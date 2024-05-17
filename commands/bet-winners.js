const { SlashCommandBuilder } = require("discord.js");
const TeamBet = require("../models/team.js");
const UserBet = require("../models/bet.js");
const TeamCount = require("../models/count.js");
const UserDiscord = require("../models/user.js");

module.exports = {
    data: new SlashCommandBuilder()
        .setName("bet-winners")
        .setDescription("Distribute Wins and Losses")
        .addStringOption(option => option.setName("msgid")
            .setDescription("Message ID")
            .setRequired(true))
        .addIntegerOption(option => option.setName("round")
            .setDescription("Round")
            .setRequired(true))
        .addIntegerOption(option => option.setName("winner-team")
            .setDescription("1 or 2 where 1 for team1 and 2 for team2")
            .setMinValue(1)
            .setMaxValue(2)
            .setRequired(true))
        .addChannelOption(option => option.setName("channel")
            .setDescription("Channel to Send Message to")
            .setRequired(true)),
    
    async execute(interaction) {
        //get all variables
        const { options } = interaction;
        const channelSend = options.getChannel("channel");
        const winnerTeam = options.getInteger("winner-team");
        const messageId = options.getString("msgid");
        const matchNumber = options.getInteger("round");

        if (interaction.user.id !== "697822391971086406") {
            await interaction.reply({ content: `Locked command. This is a Kreacher-only-command, unless your lock-pick skills are as good as mine!`, ephemeral: true });
            return;
        };

        try {
            //calculate winpts and losepts
            const c = await TeamCount.findByPk(messageId);
            const c1 = c.team1count
            const c2 = c.team2count
            var winpts = 0;
            const losepts = 100;

            //winning team name
            var teamName = "";
            const t = await TeamBet.findByPk(messageId);
            if (winnerTeam === 1){
                teamName = t.team1;
            };
            if (winnerTeam === 2){
                teamName = t.team2;
            };

            if (winnerTeam === 1){
                //if team1 is winner
                winpts = Math.round(100*(c1+c2)/c1);

                //loop UserBet
                //if m1[round-1] === "1", +winpts, if "n", do nothing, if "2", -losepts
                const u = await UserBet.findAll();
                const x = JSON.stringify(u).split('"').filter(function(v, i) {return (i%2); });
                const idm1 = x.filter(function(v, i) { return (i%2); });
                //console.log(idm1);

                //idm1 = [id, m1, id, m1]
                for (let i = 0; i < idm1.length; i=i+2) {
                    const useri = await UserDiscord.findByPk(idm1[i]);
                    var v = 1000.0;

                    if (useri) {
                        v = useri.value;
                        await useri.destroy();
                    };

                    const user = await UserDiscord.create({ id: idm1[i], value: v });

                    if (parseInt(idm1[i+1][matchNumber-1]) === 1){
                        await user.update({ value: v+winpts });
                    };
                    if (parseInt(idm1[i+1][matchNumber-1]) === 2){
                        await user.update({ value: v-losepts });
                    };

                };
            };
            if (winnerTeam === 2){
                //if team2 is winner
                winpts = Math.round(100*(c1+c2)/c2);

                //loop UserBet
                //if m1[round-1] === "2", +winpts, if "n", do nothing, if "1", -losepts
                const u = await UserBet.findAll();
                const x = JSON.stringify(u).split('"').filter(function(v, i) {return (i%2); });
                const idm1 = x.filter(function(v, i) { return (i%2); });
                //console.log(idm1);

                //idm1 = [id, m1, id, m1]
                for (let i = 0; i < idm1.length; i=i+2) {
                    const useri = await UserDiscord.findByPk(idm1[i]);
                    var v = 1000.0;

                    if (useri) {
                        v = useri.value;
                        await useri.destroy();
                    };

                    const user = await UserDiscord.create({ id: idm1[i], value: v });

                    if (parseInt(idm1[i+1][matchNumber-1]) === 2){
                        await user.update({ value: v+winpts });
                    };
                    if (parseInt(idm1[i+1][matchNumber-1]) === 1){
                        await user.update({ value: v-losepts });
                    };

                };

                //
                // await interaction.reply({ content: `Match ${matchNumber} gains/losses have been updated.` });
                // return;
            };

            await interaction.client.channels.cache.get("1169123220557926420").send({ content: `msgId: ${messageId}, Match ${matchNumber}, ${teamName} win. Gains/Losses updated.` });

            await interaction.reply({ content: `He's cooking with helium! Well done, ${teamName}. Match ${matchNumber} gains/losses have been updated.` });
            return;

        } catch (err){
            console.log(err);
        }

        //create embed
        //get team names from TeamBet

        //send embed to channel
        
        //interaction.reply

    }
};
