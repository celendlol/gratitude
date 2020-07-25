const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");

let CronJob = require('cron').CronJob;

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
let scheduleEmail = new CronJob('1 * * * * *', function() {
  getEmails(new Date());
}, null, true, 'America/Los_Angeles');

// check and send emails at midnight
// let scheduleEmail = new CronJob('0 0 * * *', function() {
//   sendEmails();
// }, null, true, 'America/Los_Angeles');


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

async function getEmails(req) {
  console.log(await getEmailsForTheDay(req));
}

