const db = require("../models");
const Email = db.email;

exports.getEmailsForTheDay = (req) => {
    const [month, date, year] = req.toLocaleDateString().split("/");

    return Email.find({
        date: {"$gte": new Date(year, month-1, date), "$lt": new Date(year, month-1, date+1)}
    })
        .then(emails => {return emails})
        .catch(err => res.status(400).json('Error: ' + err));
    
}


exports.addEmail = (req, res) => {
    const username = req.body.username;
    const description = req.body.description;
    const destination = req.body.destination;
    const date = req.body.date;

    const newEmail = new Email({
        username,
        description,
        destination,
        date
    });

    newEmail.save()
        .then(() => res.json('Email added!'))
        .catch(err => res.status(400).json('Error: ' + err));
}

exports.deleteEmail = (req, res) => {
    Email.findByIdAndDelete(req)
        .then(() => res.json('Email deleted.'));
}

