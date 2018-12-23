
module.exports = (sequelize, Sequelize) => {
    const Consultation = sequelize.define('consultations', {
        totalValue: {
            type: Sequelize.DECIMAL(10, 2)
        },
        dateSale: {
            type: Sequelize.DATE
        }
    });

    return Consultation;
}