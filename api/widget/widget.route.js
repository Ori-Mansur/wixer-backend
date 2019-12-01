'use strict'
const express = require('express')
const router = express.Router()
const widgetControl = require('./widget.controller')

console.log('got');

// LIST use GET
router.get('/', widgetControl.query)
// READ use GET
router.get('/:wapId', widgetControl.getById)
// UPDATE use PUT
router.put('/:wapId', widgetControl.update)
// REMOVE use DELETE
router.delete('/:wapId', widgetControl.remove)
// CREATE use POST
router.post('/', widgetControl.add)

module.exports = router