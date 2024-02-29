module.exports = (sequelize, Sequelize) => {
    const ImagesAlbumcamps = sequelize.define('ImagesAlbumcamps', {
        album_id: {
            type: Sequelize.INTEGER,
            allowNull: false,
        },
        image_url: {
            type: Sequelize.STRING,
            allowNull: false,
        },
    })
    return ImagesAlbumcamps
}