import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const nominators = await api.query.staking.nominators.entries()

  const data = nominators.map(
    ([
      {
        args: [nominatorId],
      },
      result,
    ]) => {
      return {
        nominator_id: nominatorId,
        validator_selection: result,
      }
    }
  )
  res.json(data)
})

export default router
