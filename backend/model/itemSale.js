
module.exports = (sequelize, Sequelize) => {
    const ItemSale = sequelize.define('itemSales', {
        totalValue: {
            type: Sequelize.DECIMAL(10, 2)
        },
        amount: {
            type: Sequelize.INTEGER
        }
    });

    return ItemSale;
}