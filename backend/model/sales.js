
module.exports = (sequelize, Sequelize) => {
    const Sale = sequelize.define('sales', {
        totalValue: {
            type: Sequelize.DECIMAL(10, 2)
        },
        dateSale: {
            type: Sequelize.DATE
        }
    });

    return Sale;
}