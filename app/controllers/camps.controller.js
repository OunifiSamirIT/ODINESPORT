const { response } = require("express");
const db = require("../models");
const Camps = db.camps;
const Imagescamps = db.imageAlbumcamps;
const Op = db.Sequelize.Op;
const sql = db.sequelize;

exports.createAlbumcamps = async (req, res) => {
     // Handle the uploaded file if needed
        const data = req.body;
        try{
            if (!data.userId) {
                return res.status(400).send({
                    error : "please authenticate to be able to create an event"
                })
            }
            if (!data.AlbumName || !req.files.length > 0) {
                return res.status(401).send({
                    error : "All field required "
                })
            }







            const camps = await Camps.create({
                album_name: req.body.AlbumName,
                description: req.body. Description,
                userId: req.body.userId,
                Duree: req.body.Duree,
                payscamps: req.body.payscamps,
                prix: req.body.prix,
                date_debut: req.body.date_debut,
                date_fin: req.body.date_fin
            })

            console.log(camps.albums)
            const imagescamps = req.files.map(file => {
                return({
                    album_id: camps.dataValues.id,
                    image_url: "/uploads/" + file.filename,
                })
            });

            try {
                // Bulk create the images
                await Imagescamps.bulkCreate(imagescamps).then(() => {
                   console.log('done')
                   return res.status(200).send({
                    error : "ok "
                })                });
            } catch (error) {
                console.error("Error creating images:", error);
                // Handle the error as needed
            }
        }catch(e) {
           console.log(e)
        }

}

exports.getAll = async (req, res) => {

    const albumWithImages = await Camps.findAll({
        include: { model: Imagescamps },
    });
    return res.status(200).send({
        message : 'done' ,
        data : albumWithImages,
    })
}
    exports.getById = async (req, res) => {
        const { id } = req.params;
        console.log(id)
        const singleAlbumWithImages = await Camps.findOne({
            where  : { id : id},
            include: { model: Imagescamps },
        })

    return res.status(200).send({
        message : 'done' ,
        data : singleAlbumWithImages,
    })
}