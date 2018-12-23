
module.exports = (sequelize, Sequelize) => {
    const Amount = sequelize.define('amounts', {
        totalValuoldValue: {
            type: Sequelize.INTEGER
        },
        newValue: {
            type: Sequelize.INTEGER
        }
    });

    return Amount;
}