var userDao = require('../dao/userDao');


async function _insert(params) {
    return await userDao._create(params);
}

async function _update(params) {
    return await userDao._update(params);
}

async function _get() {
    return await userDao._get();
}

async function _delete(id) {
    return await userDao._delete(id);
}


module.exports = {
    _insert,
    _update,
    _get,
    _delete
};