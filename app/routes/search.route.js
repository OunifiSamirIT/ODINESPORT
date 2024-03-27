// Import your controller
const Controllercontact = require("../controllers/search.controller");

// Export your route setup function
module.exports = function (app) {
    // Define your route for saving contact info
    app.post("/api/addlien", Controllercontact.searchglobal);
    app.get("/api/AllTarget", Controllercontact.getAll);
};
