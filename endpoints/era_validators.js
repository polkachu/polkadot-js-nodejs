import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/:era', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const exposures = await api.query.staking.erasStakers.entries(req.params.era)
  let data = exposures.map(([key, exposure]) => {
    let accountId = key.args.map((k) => k.toHuman())[1]
    let nominators = exposure.others.map((nominator) => {
      let stash = nominator.who
      let stake = nominator.value.toString()
      return {
        stash,
        stake,
      }
    })
    return {
      validator: accountId,
      total: exposure.total.toString(),
      own: exposure.own.toString(),
      nominators: nominators,
    }
  })
  res.json(data)
})

export default router
