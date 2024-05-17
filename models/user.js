const { Sequelize, DataTypes } = require("sequelize");
const sequelize = require("../database.js");
//two dots to represent out of this directory to the next directory

const UserDiscord = sequelize.define("UserDiscord", {
    id: {
        type: DataTypes.STRING,
        allowNull: false,
        primaryKey: true
    },
    value: {
        type: DataTypes.FLOAT,
        defaultValue: 1000.0
    }
}, {
    //model options here
});

module.exports = UserDiscord;