const bcrypt = require('bcrypt')
const accountService = require('../account/account.service')
const logger = require('../../services/logger.service')

const saltRounds = 10

const login = async (email, password) => {
    logger.debug(`auth.service - login with email: ${email}`)
    if (!email || !password) return Promise.reject('email and password are required!')

    const account = await accountService.findByEmail(email)
    if (!account) return Promise.reject('Invalid email or password')
    const match = await bcrypt.compare(password, account.password)
    if (!match) return Promise.reject('Invalid email or password')

    return { email, username: account.username, accountId: account._id }
}

const register = async (email, password, username) => {
    logger.debug(`auth.service - signup with email: ${email}, username: ${username}`)
    if (!email || !password || !username) return Promise.reject('email, username and password are required!')
    const hash = await bcrypt.hash(password, saltRounds)
    return accountService.add({ email, password: hash, username })
}


const logout = (token) => Promise.resolve(true) // need to add the token to blocked list

module.exports = {
    register,
    login,
    logout
}