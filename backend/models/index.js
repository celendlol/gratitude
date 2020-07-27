const mongoose = require('mongoose');
mongoose.Promise = global.Promise;

const db = {};

db.mongoose = mongoose;

db.user = require("./user.model");
db.role = require("./role.model");
db.gratitude = require("./gratitude.model");
db.email = require("./email.model");

db.ROLES = ["user", "admin"];

module.exports = db;