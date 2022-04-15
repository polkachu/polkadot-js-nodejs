import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  let response = await api.query.identity.identityOf.entries()
  let result = []

  response.forEach(([key, item]) => {
    result.push({
      account_id: key.args[0].toHuman(),
      data: item.toHuman(),
    })
  })
  res.json(result)
})

router.get('/sub', async (req, res) => {
  const api = await apiProvider(req.params.network)
  let response = await api.query.identity.superOf.entries()
  let result = []

  response.forEach(([key, item]) => {
    result.push({
      account_id: key.args[0].toHuman(),
      data: item.toHuman(),
    })
  })
  res.json(result)
})

export default router
