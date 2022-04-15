const processAccount = (accountId, accountData) => {
  return {
    account_id: accountId,
    nonce: accountData.nonce.toString(),
    consumers: accountData.consumers.toString(),
    providers: accountData.providers.toString(),
    sufficients: accountData.sufficients.toString(),
    free: accountData.data.free.toString(),
    reserved: accountData.data.reserved.toString(),
    misc_frozen:
      accountData.data.miscFrozen.toHuman() === 'everything'
        ? accountData.data.free.toString()
        : accountData.data.miscFrozen.toString(),
    fee_frozen:
      accountData.data.feeFrozen.toHuman() === 'everything'
        ? accountData.data.free.toString()
        : accountData.data.feeFrozen.toString(),
  }
}

export default processAccount
