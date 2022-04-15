import { ApiPromise, WsProvider } from '@polkadot/api'
import { polkadexTypes } from './custom_types.js'

export default async (network) => {
  let api
  if (network === 'kusama') {
    const provider = new WsProvider(process.env.KUSAMA_NODE)
    api = await ApiPromise.create({ provider: provider })
  } else if (network === 'polkadot') {
    const provider = new WsProvider(process.env.POLKADOT_NODE)
    api = await ApiPromise.create({ provider: provider })
  } else if (network === 'polkadex') {
    const provider = new WsProvider(process.env.POLKADEX_NODE)
    api = await ApiPromise.create({
      provider: provider,
      types: polkadexTypes,
    })
  }

  return api
}
