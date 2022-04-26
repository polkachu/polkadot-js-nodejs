import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.post('/', async (req, res) => {
  const validators = req.body.validators
  const api = await apiProvider(req.params.network)
  const stakingInfo = await api.derive.staking.accounts(validators)
  let results = []
  stakingInfo.forEach((info) => {
    results.push({
      stash: info.accountId.toHuman(),
      controller: info.controllerId.toHuman(),
      claimed_eras: info.stakingLedger.claimedRewards.toHuman(),
    })
  })
  res.json(results)
})

export default router
