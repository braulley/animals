
module.exports = (sequelize, Sequelize) => {
    const Client = sequelize.define('client', {
        name: {
            type: Sequelize.STRING
        },
        registerCode: {
            type: Sequelize.STRING, unique: true
        },
        dateBirth: {
            type: Sequelize.DATE
        },
        sex: {
            type: Sequelize.STRING
        },
        phone: {
            type: Sequelize.STRING
        },
        phone1: {
            type: Sequelize.STRING
        },
        email: {
            type: Sequelize.STRING,unique: true
        },
        officer: {
            type:
                Sequelize.ENUM('C', 'S', 'V', 'A')
        }
    });

    return Client;
}