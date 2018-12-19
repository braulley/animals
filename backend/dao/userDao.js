const bcrypt = require('bcryptjs');
const con = require('../connect/connection');

function _create(params) {
    let address = params.address;

    //con.connect();


    con.query('SELECT 1 + 1 AS solution', function (err, rows, fields) {
        if (err) throw err

        console.log('The solution is: ', rows[0].solution)
    });



    var sql = `INSERT INTO address (street, number,zipCode,complement,neighborhood,city,states) VALUES (?,?,?,?,?,?,?)`;
    let addressInsert = [address.street, parseInt(address.number), address.zipCode, address.complement, address.neighborhood,
    address.city, address.states];

    con.query(sql, addressInsert, function (err, result) {
        if (err) throw console.log('address', err);

        let user = params.contact;
        console.log('aasasasa', user);
        let addressId = parseInt(result.insertId);
        console.log("1 record inserted, ID: " + result.insertId);
        let hash = bcrypt.hashSync(user.email, 10);

        var sqlI = `INSERT INTO user (name,username,registerCode,date_birth,hash,password,email,telephone1,telephone2,
             crmv,commission,nacionality,marital_status,sex,ocupation,type,address_id) VALUES (
                 ?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?) `;

        let userInsert = [user.name, user.userName, user.registerCode, user.dateBirth,
            hash, user.password, user.email, user.phone, user.phone1, user.crmv, user.commission,
        user.nacionality, user.marital_status, user.sex, user.ocupation, user.type, addressId];

        con.query(sqlI, userInsert, function (err, result) {
            if (err) throw console.log('user', err);

            console.log("1 record inserted");
        });

    });
    //con.end();


}

function _update(params) {
    con.query(
        'UPDATE address SET location = ? Where ID = ?',
        ['South Africa', 5],
        (err, result) => {
            if (err) throw err;

            return result.changedRows;
            console.log(`Changed ${result.changedRows} row(s)`);

        }
    );
}

function _delete(id) {

    con.query(
        'DELETE FROM address WHERE id = ?', [5], (err, result) => {
            if (err) throw err;

            console.log(`Deleted ${result.affectedRows} row(s)`);
            return result.affectedRows;
        }
    );
}

function _get() {

    con.query('SELECT * FROM user', (err, rows) => {
        if (err) throw err;

        console.log('Data received from Db:\n');
        console.log(rows);
        return rows;
    });
}

module.exports = {
    _create,
    _update,
    _get,
    _delete
}