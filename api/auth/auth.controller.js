const authService = require('./auth.service')
const logger = require('../../services/logger.service')

async function login(req, res) {
    const { email, password } = req.body
    try {
        const user = await authService.login(email, password)
        req.session.user = user
        res.json(user)
    } catch (err) {
        res.status(401).send({ error: err })
    }
}

async function register(req, res) {
    console.log(req.body);
    
    try {
        const { email, password, name } = req.body
        // logger.debug(email + ", " + username)
        const account = await authService.register(email, password, name)
        logger.debug(`auth.route - new account created: ` + JSON.stringify(account))
        const token = await authService.login(email, password)
        req.session.user = token
        console.log(req.session)
        res.status(200).send({ message: 'Register success!', token })
    } catch (err) {
        logger.error('[SIGNUP] ' + err)
        res.status(500).send({ error: 'could not signup, please try later' })
    }
}

async function logout(req, res){
    try {
        await authService.logout(req.token)
        req.session.destroy()
        res.send({ message: 'logged out successfully' })
    } catch (err) {
        res.status(500).send({ error: err })
    }
}

module.exports = {
    login,
    register,
    logout
}