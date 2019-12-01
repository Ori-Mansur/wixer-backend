'use strict'
const fs = require('fs') 
module.exports = {
    makeId,
    saveUsersToFile
}

function makeId(length=3) {
    var txt = '';
    var possible = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (var i = 0; i < length; i++) {
        txt += possible.charAt(Math.floor(Math.random() * possible.length));
    }
    return txt;
}

function saveUsersToFile(objs,fillName) {
    fs.writeFileSync(`data/${fillName}.json`, JSON.stringify(objs, null, 2));
}