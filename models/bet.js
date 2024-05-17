const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
//two dots to represent out of this directory to the next directory

const UserBet = sequelize.define("UserBet", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    m1: {
        type: DataTypes.STRING,
        defaultValue: "nnnnnnnnnnnnnn",
    },
}, {
    //model options here
    timestamps: false,
});

module.exports = UserBet;