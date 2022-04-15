import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const allEntries = await api.derive.staking.accounts([
    'CsKvJ4fdesaRALc5swo5iknFDpop7YUwKPJHdmUvBsUcMGb',
    'Gve4JFfF5YkZJNwKTbRVTQCkLXJJhzjJszJjxPvHLb9fho5',
  ])
  res.json(allEntries[1])
})

export default router
