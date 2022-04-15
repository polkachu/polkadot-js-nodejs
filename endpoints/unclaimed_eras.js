import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.post('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  let activeEra = await api.query.staking.activeEra()
  activeEra = activeEra.toJSON().index
  const validators = req.body.validators
  const results = []

  for (const [key, validator] of Object.entries(validators)) {
    console.log(key)
    let era = activeEra - 10
    const stakingInfo = await api.derive.staking.account(validator)
    const claimedRewards = stakingInfo.stakingLedger.claimedRewards
    for (era; era < activeEra; era++) {
      const eraPoints = await api.query.staking.erasRewardPoints(era)
      const eraValidators = Object.keys(eraPoints.individual.toHuman())
      if (eraValidators.includes(validator) && !claimedRewards.includes(era)) {
        results.push({
          validator: validator,
          era: era,
        })
      }
    }
  }
  return res.json(results)
})

export default router
