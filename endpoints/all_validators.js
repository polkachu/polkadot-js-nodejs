import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const validators = await api.query.staking.validators.entries()
  let data = []
  validators.map(
    ([
      {
        args: [validatorId],
      },
      result,
    ]) => {
      data.push({
        validator: validatorId,
        commission: result.commission,
        blocked: result.blocked,
      })
    }
  )
  res.json(data)
})
export default router
