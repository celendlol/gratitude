const db = require("../models");
const { gratitude } = require("../models");
const Gratitude = db.gratitude;

require('dotenv').config();

exports.getGratitudes = (req, res) => {
    Gratitude.find({
        username: req.params.username
    })
        .then(gratitudes => res.json(gratitudes))
        .catch(err => res.status(400).json('Error: ' + err));
    
}

exports.getGratitude = (req, res) => {
    Gratitude.findById(req.params.id)
        .then(gratitude => res.json(gratitude))
        .catch(err => res.status(400).json('Error: ' + err));
    
}

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

exports.deleteGratitude = (req, res) => {
    Gratitude.findByIdAndDelete(req.params.id)
        .then(() => res.json('Gratitude deleted.'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.updateGratitude = (req, res) => {
    Gratitude.findById(req.params.id)
        .then(gratitude => {
            gratitude.username = req.body.username;
            gratitude.description = req.body.description;

            gratitude.save()
                .then(() => res.json('Gratitude updated!'))
                .catch(err => res.status(400).json('Error: ' + err));
        })
        .catch(err => res.status(400).json('Error: ' + err));
}
