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
const Email = require("./models/email.model");
const { getEmailsForTheDay } = require("./controllers/email.controller");
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



// check and send emails every minute
// let scheduleEmail = new CronJob('1 * * * * *', function() {
//   getEmails().then(emails => sendEmails(emails));
// }, null, true, 'America/Los_Angeles');
getEmails().then(emails => sendEmails(emails));

// check and send emails at midnight
// let scheduleEmail = new CronJob('0 0 * * *', function() {
//   sendEmails();
// }, null, true, 'America/Los_Angeles');

// scheduleEmail.start();


const PORT = process.env.PORT || 8080;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});

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

async function getEmails() {
  todaysDate = new Date();
  return await getEmailsForTheDay(todaysDate);
}

function sendEmails(emails) {
  console.log(process.env.GMAIL_USERNAME, process.env.PASSWORD);
  let transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.GMAIL_USERNAME,
      pass: process.env.PASSWORD
    }
  });
  console.log(transporter);
  let mailOptions = {
    from: process.env.GMAIL_USERNAME+"@gmail.com",
    to: process.env.EMAIL+"@gmail.com",
    subject: `TEST`,
    text: `TEST`
  };
  transporter.sendMail(mailOptions, function(error, info) {
    if (error) {
      throw error;
    } else {
      console.log("Email successfully sent!");
    }
  });
  // if(emails.length === 0){
  //   // do nothing
  // } else {
  //   // send the emails
  // }
}
