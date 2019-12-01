const accountService = require('./account.service')

async function getAccount(req, res)  {
    const account = await accountService.getById(req.params.id)
    res.send(account)
}
  
async function getAccounts (req, res) {
    const accounts = await accountService.list()
    res.send(accounts)
}

module.exports = {
    getAccount,
    getAccounts
}