import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'
import { Keyring } from '@polkadot/api'

router.post('/', async (req, res) => {
  const keyring = new Keyring({ type: 'sr25519' })
  const treasury = keyring.addFromUri(req.body.treasury)
  const api = await apiProvider(req.params.network)
  const payouts = req.body.validators
  let payoutsTransactions = []
  console.log(payouts)
  console.log(typeof payouts)
  payouts.map((payout) => {
    payoutsTransactions.push(
      api.tx.staking.payoutStakers(payout.validator, payout.era)
    )
  })
  let hash = await api.tx.utility
    .batch(payoutsTransactions)
    .signAndSend(treasury)
  res.json({
    hash: hash,
    payouts: req.body.validators,
  })
})

export default router
