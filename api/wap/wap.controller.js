'use strict'

const wapService = require('./wap.service')

async function query(req, res) {
    const filterBy = req.query
    const waps = await wapService.query(filterBy)
    res.send(waps)
}
async function getById(req, res) {
    const wapId = req.params.wapId;
    const wap = await wapService.getById(wapId)
    res.send(wap)
}
async function update(req, res) {
    const wap = req.body;
    const editedWap = await wapService.update(wap)
    res.send(editedWap)

}
async function remove(req, res) {
    const wapId = req.params.wapId;
    const wap = await wapService.remove(wapId)
    res.end()
}
async function add(req, res) {
    const wap = req.body;
    const addedWap = await wapService.add(wap)
    res.send(addedWap)
}


module.exports = {
    query,
    getById,
    update,
    remove,
    add
}