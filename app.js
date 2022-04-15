import express from 'express'
import dotenv from 'dotenv'

import era_summaries from './endpoints/era_summaries.js'
import accounts from './endpoints/accounts.js'
import era_validators from './endpoints/era_validators.js'
import validator_prefs from './endpoints/validator_prefs.js'
import ledgers from './endpoints/ledgers.js'
import nominators from './endpoints/nominators.js'
import active_era from './endpoints/active_era.js'
import era_points from './endpoints/era_points.js'
import era_rewards from './endpoints/era_rewards.js'
import all_validators from './endpoints/all_validators.js'
import balances from './endpoints/balances.js'
import unclaimed_eras from './endpoints/unclaimed_eras.js'
import identities from './endpoints/identities.js'
import test from './endpoints/test.js'
import payout from './transactions/payout.js'
import kick from './transactions/kick.js'
import set_commission from './transactions/set_commission.js'
import apiProvider from './utils/api_provider.js'

const app = express()
app.use(express.json({ limit: '300mb' }))
dotenv.config({ path: '../.env' })
const port = 3002

app.use('/:network/active_era', active_era)
app.use('/:network/era_summaries', era_summaries)
app.use('/:network/era_points', era_points)
app.use('/:network/era_rewards', era_rewards)
app.use('/:network/era_validators', era_validators)
app.use('/:network/all_validators', all_validators)
app.use('/:network/balances', balances)
app.use('/:network/nominators', nominators)
app.use('/:network/validator_prefs', validator_prefs)
app.use('/:network/ledgers', ledgers)
app.use('/:network/accounts', accounts)
app.use('/:network/unclaimed_eras', unclaimed_eras)
app.use('/:network/identities', identities)

app.use('/:network/test', test)
app.use('/:network/payout', payout)
app.use('/:network/kick', kick)
app.use('/:network/set_commission', set_commission)

app.get('/', async (req, res) => {
  const polkadotApi = await apiProvider('polkadot')
  const kusamaApi = await apiProvider('kusama')
  const polkadexApi = await apiProvider('polkadex')
  res.json({
    kusama: kusamaApi.genesisHash.toHex(),
    polkadot: polkadotApi.genesisHash.toHex(),
    polkadex: polkadexApi.genesisHash.toHex(),
  })
})

app.listen(port, () => {
  console.log(`Listening at http://localhost:${port}`)
})
