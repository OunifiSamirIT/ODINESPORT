// Import necessary modules
const db = require("../models");
const Search = db.search;
const nodemailer = require("nodemailer");

exports.searchglobal  = async (req, res) => {
    try {
        // Create a new contact using data from the request body
        const search = await Search.create({
            lien: req.body.lien,
            titre: req.body.titre,
            icon: req.body.icon
        });




        
        // Respond with the created contact
        res.status(201).json({ message: 'Contact form submitted successfully', search });
    } catch (error) {
        console.error("Error submitting contact form:", error);
        res.status(500).json({ error: 'Failed to submit contact form' });
    }
};





exports.getAll = async (req, res) => {
    try {
        const search = await Search.findAll();
  
      res.status(200).json(search);
    } catch (error) {
      console.error("Error getting :", error);
      res.status(500).json({ error: "Server Error" });
    }
  };
  