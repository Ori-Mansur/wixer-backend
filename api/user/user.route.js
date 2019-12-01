'use strict'
const userService = require('../services/user.service')

module.exports = (app) => {
    app.get('/api/users', (req, res) => {
        if (!req.session.user.isAdmin) return
        userService.query()
            .then(users => res.json(users))

    })
    app.post('/api/login', (req, res) => {
        const { username, pass } = req.body;

        userService.checkLogin(username, pass)
            .then(user => {
                if (user) {
                    req.session.user = user;
                    res.json(user)
                } else {
                    res.status(401).send('NO!')
                }
            })
    });
    app.post('/api/logout', (req, res) => {
        req.session.destroy();
        res.end();
    })
    app.delete('/api/user/:userId', (req, res) => {
        const userId = req.params.userId;
        console.log(userId);
        //    if(!req.session.user.isAdmin) return
        userService.remove(userId)
            .then(() => res.end())
    })
    app.get('/api/user/:userId', (req, res) => {
        const userId = req.params.userId;
        console.log(userId);
        userService.getById(userId)
            .then(user => res.json(user))
    })


    // REGISTER
    app.post('/api/register', (req, res) => {
        const user = req.body;
        console.log('registering', user);
        userService.register(user)
            .then(user => {
                res.json(user);
            })
    });
}