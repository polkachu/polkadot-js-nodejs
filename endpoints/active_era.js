import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const activeEra = await api.query.staking.activeEra()
  res.json({ active_era: activeEra.toJSON().index })
})
export default router
