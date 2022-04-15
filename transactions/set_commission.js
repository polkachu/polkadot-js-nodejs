import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'
import { Keyring } from '@polkadot/api'

router.post('/', async (req, res) => {
  const keyring = new Keyring({ type: 'sr25519' })
  const controller = keyring.addFromUri(req.body.controller)
  const api = await apiProvider(req.params.network)
  const setCommissionTransaction = api.tx.staking.validate({
    commission: req.body.commission,
    blocked: false,
  })
  const hash = await setCommissionTransaction.signAndSend(controller)
  res.json(hash.toString())
})

export default router
