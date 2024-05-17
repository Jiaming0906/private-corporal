const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
//two dots to represent out of this directory to the next directory

const TeamBet = sequelize.define("TeamBet", {
    msgId: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    team1: {
        type: DataTypes.STRING,
    },
    team2: {
        type: DataTypes.STRING,
    },
    name: {
        type: DataTypes.STRING,
    },
}, {
    //model options here
});

module.exports = TeamBet;