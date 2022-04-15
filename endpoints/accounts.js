import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'
import fs from 'fs'
import processAccount from '../utils/process_account.js'

router.get('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const accounts = await api.query.system.account.entries()
  let accountsData = accounts.map(
    ([
      {
        args: [accountId],
      },
      accountData,
    ]) => {
      return processAccount(accountId, accountData)
    }
  )
  fs.writeFileSync(
    `../storage/app/${req.params.network}.json`,
    JSON.stringify(accountsData, null, 2)
  )
  res.json({ message: 'ok' })
})

router.get('/:account_id', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const account = await api.query.system.account(req.params.account_id)
  let accountData = processAccount(req.params.account_id, account)
  res.json(accountData)
})

export default router
