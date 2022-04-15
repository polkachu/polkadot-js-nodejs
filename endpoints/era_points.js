import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/:era', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const eraPoints = await api.query.staking.erasRewardPoints(req.params.era)
  res.json(eraPoints)
})
export default router
