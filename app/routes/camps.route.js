const controller = require("../controllers/camps.controller");
const multer = require("multer");
const path = require("path");

module.exports = function (app) {



// Set up multer to handle multipart/form-data
    const storage = multer.diskStorage({
        destination: (req, file, callBack) => {
            callBack(null, './public/uploads/');
        },
        filename: (req, file, callBack) => {
            callBack(
                null,
                file.fieldname + '-' + Date.now() + path.extname(file.originalname)
            );
        },
    });

    const upload = multer({ storage: storage });
// Example route that uses multer to handle multipart/form-data
    app.post('/api/albumc/upload',upload.array('files' , 15) ,controller.createAlbumcamps);
    app.get('/api/albumc',controller.getAll);
    app.get('/api/albumc/:id',controller.getById);


}
