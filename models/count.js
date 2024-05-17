const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
//two dots to represent out of this directory to the next directory

const TeamCount = sequelize.define("TeamCount", {
    msgId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    team1count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
    team2count: {
        type: DataTypes.INTEGER,
        defaultValue: 0,
    },
}, {
    //model options here
});

module.exports = TeamCount;