import express from 'express'
var router = express.Router({ mergeParams: true })
import apiProvider from '../utils/api_provider.js'

router.get('/', async (req, res) => {
  const api = await apiProvider(req.params.network)
  const unsub = await api.queryMulti(
    [
      api.query.staking.counterForNominators,
      api.query.staking.counterForValidators,
      api.query.staking.maxNominatorsCount,
      api.query.staking.maxValidatorsCount,
      api.query.staking.minimumValidatorCount,
      api.query.staking.minNominatorBond,
      api.query.staking.minValidatorBond,
      api.query.staking.activeEra,
      api.query.balances.totalIssuance,
      api.query.staking.historyDepth,
      api.query.staking.validatorCount,
    ],
    ([
      counterForNominators,
      counterForValidators,
      maxNominatorsCount,
      maxValidatorsCount,
      minimumValidatorCount,
      minNominatorBond,
      minValidatorBond,
      activeEra,
      totalIssuance,
      historyDepth,
      validatorCount,
    ]) => {
      let data = {
        counter_for_nominators: counterForNominators.toString(),
        counter_for_validators: counterForValidators.toString(),
        max_nominators_count: maxNominatorsCount.toString(),
        max_validators_count: maxValidatorsCount.toString(),
        minimum_validator_count: minimumValidatorCount.toString(),
        min_nominator_bond: minNominatorBond.toString(),
        min_validator_bond: minValidatorBond.toString(),
        active_era: activeEra.toJSON().index,
        total_issurance: totalIssuance.toString(),
        history_depth: historyDepth.toString(),
        validator_count: validatorCount.toString(),
      }
      res.json(data)
      unsub()
    }
  )
})

export default router

// active_validator_count,
// waiting_validator_count,
// active_moninator_count,
// waiting_validator_count,
// ideal_staked,
// staked,
// inflation = (last_rewards / total_issurance) x 4 x 365,
// some kind of indication for epoch duration,
// total_issuance,
// total_staked,
// returns = (last_rewards / total_staked) x 4 x 365,
// lowest_staked,
// average_staked,
// min_nnomiated, computed
// threshold_nomiated,
// last_reward,
