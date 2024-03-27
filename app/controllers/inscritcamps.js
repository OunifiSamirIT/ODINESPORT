const { response } = require("express");
const db = require("../models");
const Campsinscrit = db.campsinscrit;
const Op = db.Sequelize.Op;
const sql = db.sequelize;

// Inside your Express controller
exports.createinscritcamps = async (req, res) => {
    try {
      const {
        emailsecondaire,
        passport,
        date_validation,
        fraisinscrit,
        status= "Encours",
        champsoptionnel,
        campsId,
        userId,
      } = req.body;
  
      const newInscription = await Campsinscrit.create({
        emailsecondaire,
        passport,
        date_validation,
        fraisinscrit,
        status,
        champsoptionnel,
        campsId,
        userId,
      });
  
      res.status(201).json({ success: true, data: newInscription });
    } catch (error) {
      console.error("Error creating inscription:", error);
      res.status(500).json({ success: false, error: "Server Error" });
    }
  };
       
  exports.getAllInscriptions = async (req, res) => {
    try {
      const inscriptions = await Campsinscrit.findAll();
  
      res.status(200).json(inscriptions);
    } catch (error) {
      console.error("Error getting inscriptions:", error);
      res.status(500).json({ error: "Server Error" });
    }
  };
  