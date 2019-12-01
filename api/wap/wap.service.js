'use strict'

const dbService = require('../../services/db.service')
const utils = require('../../services/utils.server.service')

const FILE_NAME = 'wap'

const ObjectId = require('mongodb').ObjectId

module.exports = {
    query,
    getById,
    remove,
    update,
    add
}

async function query(filterBy = {}) {
    const criteria = {};
    if (filterBy.txt) {
        criteria.name = filterBy.txt
    }
    if (filterBy.minBalance) {
        criteria.balance = { $gte: filterBy.minBalance }
    }
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        const waps = await collection.find(criteria).toArray();
        return waps
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err;
    }
}

async function getById(id) {
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        const wap = await collection.findOne({ "_id": ObjectId(id) })
        return wap
    } catch (err) {
        console.log(`ERROR: cannot find ${Id}`)
        throw err;
    }
}

async function remove(id) {
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        return await collection.deleteOne({ "_id": ObjectId(id) })
    } catch (err) {
        console.log(`ERROR: cannot remove customer ${toyId}`)
        throw err;
    }
}

async function update(wap) {
    wap._id=ObjectId(wap._id)
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        await collection.updateOne({ "_id": wap._id }, { $set: wap })
        return wap
    } catch (err) {
        console.log(`ERROR: cannot update toy ${wap._id}`)
        throw err;
    }
}

async function add(wap) {
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        wap.createdAt = new Date()
        await collection.insertOne(wap);
        return wap;
    } catch (err) {
        console.log(`ERROR: cannot insert wap`)
        throw err;
    }
}

