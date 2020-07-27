const controller = require("../controllers/email.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });

  app.post("/api/email/add", controller.addEmail);

  app.delete("/api/email/:id", controller.deleteEmail);

  app.put("/api/email/update/:id", controller.updateEmail);
};
