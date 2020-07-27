const controller = require("../controllers/gratitude.controller");

module.exports = function(app) {
  app.use(function(req, res, next) {
      res.header(
        "Access-Control-Allow-Headers",
        "x-access-token, Origin, Content-Type, Accept"
      );
      next();
    });
  
  app.get("/api/gratitude/:username", controller.getGratitudes);

  app.get("/api/gratitude/retrieve/:id", controller.getGratitude);

  app.post("/api/gratitude/add", controller.addGratitude);

  app.delete("/api/gratitude/:id", controller.deleteGratitude);

  app.put("/api/gratitude/update/:id", controller.updateGratitude);
};
