const { SlashCommandBuilder, EmbedBuilder, AttachmentBuilder } = require("discord.js");
const { createCanvas, Image, loadImage } = require("canvas");

//
module.exports = {
    data: new SlashCommandBuilder()
        .setName("canvas")
        .setDescription("Draws an image"),

    async execute(interaction) {
        //
        const canvas = createCanvas(2000, 800);
        const ctx = canvas.getContext("2d");

        ctx.fillStyle = "blue";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        const image = new Image();
        image.onload = () => ctx.drawImage(image, 0, 0)
        image.onerror = err => { throw err }
        image.src = "./images/cheese.jpg"

        ctx.fillStyle = "black";
        ctx.font = "100px Impact";
        ctx.fillText("Say cheese", 700, 600);

        const buffer = canvas.toBuffer("image/png");
        const attachment = new AttachmentBuilder(buffer, { name: "cheese.jpg" });

        const embed = new EmbedBuilder()
            .setColor("Navy")
            .setImage("attachment://cheese.jpg")

        await interaction.reply({ embeds: [embed], files: [attachment] });

        // image.onload = async function() {
            
        //     ctx.drawImage(image, 650, 300, 600, 600);

        //     ctx.fillStyle = "black";
        //     ctx.font = "100px Impact";
        //     ctx.fillText("Say cheese", 700, 600);

        //     const buffer = canvas.toBuffer("image/png");
        //     const attachment = new AttachmentBuilder(buffer, { name: "cheese.jpg" });

        //     console.log(attachment)

        //     const embed = new EmbedBuilder()
        //         .setColor("Navy")
        //         .setImage("attachment://cheese.jpg")

        //     console.log(embed)
        //     await interaction.reply({ embeds: [embed], files: [attachment] });
        // };

        // image.onerror = function() {
        //     console.log("failed to load image")
        // }


    }
}