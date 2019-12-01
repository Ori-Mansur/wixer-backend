const express = require('express')
const {requireAuth, requireAdmin} = require('../../middlewares/requireAuth.middleware')
const {getUser, getUsers, deleteUser} = require('./user.controller')
const router = express.Router()

// console.log('xxxxxxxxxxxxxxxxxxxxxxxxxxxxxx', x);

// middleware that is specific to this router
// router.use(requireAuth)

// router.get('/', getUsers)
router.get('/', requireAuth, getUsers)
// router.get('/',  getUsers)
router.get('/:id', getUser)
// router.delete('/:id',  deleteUser)
router.delete('/:id',  requireAuth, requireAdmin, deleteUser)
// router.delete('/:id',  deleteUser)

module.exports = router