const db = require('./dbConfig');

module.exports = {
    insert,
    findByName,
    find
}

function insert(user){
    return db('users')
        .insert(user);
}

function findByName(username){
    return db('users')
        .where(username);
}

function find(){
    return db('users');
}