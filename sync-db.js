// initialize the database
// const sequelize = require("./database.js");

// sequelize.sync({ force: true });

const UserDiscord = require("./models/user.js");
//one dot to represent the same directory as sync-db.js

UserDiscord.sync({ force: true });

const TeamBet = require("./models/team.js");
//one dot to represent the same directory as sync-db.js

TeamBet.sync({ force: true });

const TeamCount = require("./models/count.js");
//one dot to represent the same directory as sync-db.js

TeamCount.sync({ force: true });

const UserBet = require("./models/bet.js");
//one dot to represent the same directory as sync-db.js

UserBet.sync({ force: true });

