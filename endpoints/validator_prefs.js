import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/:era', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const erasValidatorPrefs = await api.query.staking.erasValidatorPrefs.entries(
    req.params.era
  )
  let data = []
  erasValidatorPrefs.map(
    ([
      {
        args: [era, accountId],
      },
      prefs,
    ]) => {
      data.push({
        era: era.toNumber(),
        validator_id: accountId,
        commission: prefs.commission,
        blocked: prefs.blocked,
      })
    }
  )
  res.json(data)
})

export default router
