'use strict'
const express = require('express')
const router = express.Router()
const wapControl = require('./wap.controller')

console.log('got');

// LIST use GET
router.get('/', wapControl.query)
// READ use GET
router.get('/:wapId', wapControl.getById)
// UPDATE use PUT
router.put('/:wapId', wapControl.update)
// REMOVE use DELETE
router.delete('/:wapId', wapControl.remove)
// CREATE use POST
router.post('/', wapControl.add)

module.exports = router