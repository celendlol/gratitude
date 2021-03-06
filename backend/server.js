const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let CronJob = require('cron').CronJob;
let nodemailer = require("nodemailer");

require('dotenv').config();

const app = express();

var corsOptions = {
  origin: "http://localhost:3000"
};

app.use(cors(corsOptions));

app.use(bodyParser.json());

app.use(bodyParser.urlencoded({ extended: true }));

const db = require("./models");
const { getEmailsForTheDay, deleteEmail } = require("./controllers/email.controller");
const Role = db.role;

const uri = process.env.ATLAS_URI;
db.mongoose
  .connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true
  })
  .then(() => {
    console.log("Successfully connect to MongoDB.");
    initial();
  })
  .catch(err => {
    console.error("Connection error", err);
    process.exit();
  });

app.get("/", (req, res) => {
  res.json({ message: "Welcome to gratitude application." });
});

require("./routes/auth.routes")(app);
require("./routes/user.routes")(app);
require("./routes/gratitude.routes")(app);
require("./routes/email.routes")(app);

// grab emails waiting to be sent, send those emails, and then delete those emails everyday at Midnight
let scheduleEmail = new CronJob('0 0 * * *', function() {
  getEmailsForToday().then(emails => sendAndDeleteEmails(emails));
}, null, true, 'America/Los_Angeles');

scheduleEmail.start();

const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

async function getEmailsForToday() {
  todaysDate = new Date();
  return await getEmailsForTheDay(todaysDate);
}

function sendAndDeleteEmails(emails) {

  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com',
    port: 465,
    secure: true,
    auth: {
        type: 'OAuth2',
        clientId: process.env.CLIENT_ID,
        clientSecret: process.env.CLIENT_SECRET
    }
  });

  for(i=0; i<emails.length; i++){

    let description = emails[i].description;
    let destination = emails[i].destination;
    let dateCreatedOn = emails[i].createdAt;

    transporter.sendMail({
      from: process.env.GMAIL,
      to: destination,
      subject: 'Gratitude Journal',
      text: 'On ' + dateCreatedOn + ', you were grateful for ' + description,
      auth: {
          user: process.env.GMAIL,
          refreshToken: process.env.REFRESH_TOKEN,
          accessToken: process.env.ACCESS_TOKEN,
          expires: 1484314697598
      }
    }); 
  }

  deleteSentEmails(emails);
}

function deleteSentEmails(emails) {
  for(i=0; i<emails.length; i++){
    let id = emails[i].id;
    deleteEmail(id);
  }
}

function initial() {
  Role.estimatedDocumentCount((err, count) => {
    if (!err && count === 0) {
      new Role({
        name: "user"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'user' to roles collection");
      });

      new Role({
        name: "admin"
      }).save(err => {
        if (err) {
          console.log("error", err);
        }

        console.log("added 'admin' to roles collection");
      });
    }
  });
}
