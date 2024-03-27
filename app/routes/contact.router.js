// Import your controller
const Controllercontact = require("../controllers/contact.controller");

// Export your route setup function
module.exports = function (app) {
    // Define your route for saving contact info
    app.post("/api/contact", Controllercontact.saveContactInfo);
};
