
module.exports = (sequelize, Sequelize) => {
    const User = sequelize.define('users', {
        name: {
            type: Sequelize.STRING
        },
        username: {
            type: Sequelize.STRING,unique: true
        },
        registerCode: {
            type: Sequelize.STRING, unique: true
        },
        nacionality: {
            type: Sequelize.STRING
        },
        dateBirth: {
            type: Sequelize.DATE
        },
        maritalStatus: {
            type: Sequelize.STRING
        },
        sex: {
            type: Sequelize.STRING
        },
        crmv: {
            type: Sequelize.STRING
        },
        comission: {
            type: Sequelize.DOUBLE
        },
        salary: {
            type: Sequelize.DECIMAL(10, 2)
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
        password: {
            type: Sequelize.STRING
        },
        officer: {
            type:
                Sequelize.ENUM('C', 'S', 'V', 'A')
        }
    });

    return User;
}