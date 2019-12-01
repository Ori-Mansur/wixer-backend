'use strict'

const dbService = require('../../services/db.service')
const utils = require('../../services/utils.server.service')

const FILE_NAME = 'widget'

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
        const widgets = await collection.find(criteria).toArray();
        return widgets
    } catch (err) {
        console.log('ERROR: cannot find toys')
        throw err;
    }
}

async function getById(id) {
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        const widget = await collection.findOne({ "_id": ObjectId(id) })
        return widget
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

async function update(widget) {
    widget._id=ObjectId(widget._id)
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        await collection.updateOne({ "_id": widget._id }, { $set: widget })
        return widget
    } catch (err) {
        console.log(`ERROR: cannot update toy ${widget._id}`)
        throw err;
    }
}

async function add(widget) {
    const collection = await dbService.getCollection(FILE_NAME)
    try {
        widget.createdAt = new Date()
        await collection.insertOne(widget);
        return widget;
    } catch (err) {
        console.log(`ERROR: cannot insert widget`)
        throw err;
    }
}

