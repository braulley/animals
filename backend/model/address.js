
module.exports = (sequelize, Sequelize) => {
    const Address = sequelize.define('addresses', {
        street: {
            type: Sequelize.STRING
        },
        number: {
            type: Sequelize.INTEGER
        },
        zipCode: {
            type: Sequelize.STRING
        },
        complement: {
            type: Sequelize.STRING
        },
        neighborhood: {
            type: Sequelize.STRING
        },
        city: {
            type: Sequelize.STRING
        },
        state: {
            type: Sequelize.STRING
        },
        local: {
            type: Sequelize.STRING
        }
    });

    return Address;
}