
module.exports = (sequelize, Sequelize) => {
    const Pet = sequelize.define('pets', {
        name: {
            type: Sequelize.STRING
        },
        breed: {
            type: Sequelize.STRING
        },
        weight: {
            type: Sequelize.STRING
        },
        height: {
            type: Sequelize.STRING
        },
        typeOfAnimal : {
            type: Sequelize.STRING
        },
        observation: {
            type: Sequelize.STRING
        }
    });

    return Pet;
}