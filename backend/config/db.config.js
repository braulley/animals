
const Sequelize = require('sequelize');
require('dotenv').config()

const sequelize = new Sequelize('sql9270537','sql9270537', 'LZf7enr4pa', {
  host: 'sql9.freemysqlhosting.net',
  dialect: 'mysql',
  operatorsAliases: false,
 
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
});
 
const db = {};
 
db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.Address = require('../model/address.js')(sequelize, Sequelize);
db.User = require('../model/user.js')(sequelize, Sequelize);
db.Pet = require('../model/pet.js')(sequelize, Sequelize);
db.Product = require('../model/product.js')(sequelize, Sequelize);
db.Amount = require('../model/amount.js')(sequelize, Sequelize);
db.Consultations = require('../model/consultation.js')(sequelize, Sequelize);
db.ItemSale = require('../model/itemSale.js')(sequelize, Sequelize);
db.Sale = require('../model/sales.js')(sequelize, Sequelize);

db.Address.hasOne(db.User, { foreignKey: 'address_id' });


db.Product.hasOne(db.ItemSale, { foreignKey: 'product_id' });
db.Sale.hasOne(db.ItemSale, { foreignKey: 'sale_id' });
db.Product.hasOne(db.Amount, { foreignKey: 'product_id' });


db.User.hasOne(db.Pet, { foreignKey: 'user_id' });
db.User.hasOne(db.Consultations, { foreignKey: 'user_id' });
db.Pet.hasOne(db.Consultations, { foreignKey: 'pet_id' });
db.User.hasOne(db.Consultations, { foreignKey: 'veterinary_id' });
db.User.hasOne(db.Consultations, { foreignKey: 'clerk_id' });

module.exports = db;