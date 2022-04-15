import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/:era', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const eraRewards = await api.query.staking.erasValidatorReward(req.params.era)
  res.json({ era_rewards: eraRewards.toString() })
})
export default router
