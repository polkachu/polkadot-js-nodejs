import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'
import processAccount from '../utils/process_account.js'

router.post('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  let validators = req.body.accounts
  let data = []
  const unsub = await api.query.system.account.multi(validators, (balances) => {
    balances.map((balance, index) => {
      data.push(processAccount(validators[index], balance))
    })
    res.json(data)
    unsub()
  })
})

export default router
