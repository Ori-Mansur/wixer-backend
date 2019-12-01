'use strict'

const dbService = require('../../services/db.service')
const accounts = []

const FILE_NAME = 'user'
const getById = (id) => {
    const account = accounts.find(account => account._id === id)
    return Promise.resolve(account)
}

const list = () => Promise.resolve(accounts)

async function findByEmail(email) {
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        const user = await collection.findOne({ "email": email })
        return user
    } catch (err) {
        console.log(`ERROR: cannot find ${email}`)
        throw err;
    }
}
async function register(user) {
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        user.isAdmin = false
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot register `)
        throw err;
    }
}
async function add(user) {
    console.log(user);
    
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        user.isAdmin = false
        console.log(user);
        
        await collection.insertOne(user);
        return user;
    } catch (err) {
        console.log(`ERROR: cannot insert user`)
        throw err;
    }
}

// assuming that email is unique
const findByEmail1 = (email) => {
    const res = accounts.find(account => account.email === email)
    return Promise.resolve(res)
}

module.exports = {
    getById,
    list,
    add,
    register,
    findByEmail,
}