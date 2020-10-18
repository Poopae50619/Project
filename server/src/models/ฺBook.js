module.exports = (sequelize, DataTypes) => {
    const Blog = sequelize.define('Bookborrow', {
        Name: DataTypes.STRING,
        Lastname: DataTypes.STRING,
        email: DataTypes.STRING,
        Booktitle: DataTypes.TEXT,
        Borrowingday: DataTypes.STRING,
        Daynight: DataTypes.STRING,
    })
    return Blog
}