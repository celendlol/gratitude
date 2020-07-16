const db = require("../models");
const Gratitude = db.gratitude;

require('dotenv').config();

exports.addGratitude = (req, res) => {
    const username = req.body.username;
    const description = req.body.description;

    const newGratitude = new Gratitude({
        username,
        description,
    });

    newGratitude.save()
    .then(() => res.json('Gratitude added!'))
    .catch(err => res.status(400).json('Error: ' + err));
}