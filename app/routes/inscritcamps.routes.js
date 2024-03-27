const controller = require("../controllers/inscritcamps");
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
    app.post('/api/inscrit/upload' ,controller.createinscritcamps);
     app.get('/api/inscritinfo',controller.getAllInscriptions);
    // app.get('/api/inscrit/:id',controller.getById);


}
