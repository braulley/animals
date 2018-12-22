
module.exports = (sequelize, Sequelize) => {
    const Product = sequelize.define('products', {
        name: {
            type: Sequelize.STRING
        },
        value: {
            type: Sequelize.DECIMAL(10, 2) 
        },
        amount: {
            type: Sequelize.STRING
        }
    });

    return Product;
}