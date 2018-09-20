// Respond to transcoder added events
 export function transcoderUpdated(event: TranscoderUpdate): void {
  let bondingManager = BondingManager.bind(event.address, event.blockHash)
  let roundsManager = RoundsManager.bind(Address.fromString("3984fc4ceeef1739135476f625d36d6c35c40dc3"), event.blockHash)
  let currentRound = roundsManager.currentRound()
  let transcoderAddress = event.params.transcoder
  let active = bondingManager.isActiveTranscoder(transcoderAddress, currentRound)
  let transcoderInfo = bondingManager.getTranscoder(transcoderAddress)
  let registered = event.params.registered
  let pendingRewardCut = event.params.pendingRewardCut
  let pendingFeeShare = event.params.pendingFeeShare
  let pendingPricePerSegment = event.params.pendingPricePerSegment
  let lastRewardRound = transcoderInfo.value0
  let rewardCut = transcoderInfo.value1
  let feeShare = transcoderInfo.value2
  let pricePerSegment = transcoderInfo.value3

  // Create transcoder entity
  let transcoder = new Entity()
  transcoder.setString('id', transcoderAddress.toHex())
  transcoder.setU256('pendingRewardCut', pendingRewardCut)
  transcoder.setU256('pendingFeeShare', pendingFeeShare)
  transcoder.setU256('pendingPricePerSegment', pendingPricePerSegment)
  transcoder.setU256('rewardCut', rewardCut)
  transcoder.setU256('feeShare', feeShare)
  transcoder.setU256('pricePerSegment', pricePerSegment)
  transcoder.setU256('lastRewardRound', lastRewardRound)
  transcoder.setBoolean('active', active)
  transcoder.setBoolean('registered', registered)
  transcoder.setString('status', registered ? 'Registered' : 'NotRegistered')
  
  // Apply store updates
  store.set('Transcoder', transcoderAddress.toHex(), transcoder)
}

export function transcoderResigned(event: TranscoderResigned): void {
  let transcoderAddress = event.params.transcoder
  store.remove('Transcoder', transcoderAddress.toHex())
}

export function transcoderEvicted(event: TranscoderEvicted): void {
  let transcoderAddress = event.params.transcoder
  let transcoder = new Entity()
  transcoder.setBoolean('active', false)
  store.set('Transcoder', transcoderAddress.toHex(), transcoder)
}

export function transcoderSlashed(event: TranscoderSlashed): void {
  let transcoderAddress = event.params.transcoder
  let bondingManager = BondingManager.bind(event.address, event.blockHash)
  let totalStake = bondingManager.transcoderTotalStake(transcoderAddress)
  let transcoder = new Entity()
  transcoder.setU256('totalStake', totalStake)
  store.set('Transcoder', transcoderAddress.toHex(), transcoder)
}

export function bond(event: Bond): void {
  let bondingManager = BondingManager.bind(event.address, event.blockHash)
  let newDelegateAddress = event.params.newDelegate
  let newDelegateTotalStake = bondingManager.transcoderTotalStake(newDelegateAddress)
  let newDelegate = new Entity()
  let oldDelegateAddress = event.params.oldDelegate
  let oldDelegateTotalStake = bondingManager.transcoderTotalStake(oldDelegateAddress)
  let oldDelegate = new Entity()
  
  newDelegate.setU256('totalStake', newDelegateTotalStake)
  store.set('Transcoder', newDelegateAddress.toHex(), newDelegate)
  
  oldDelegate.setU256('totalStake', oldDelegateTotalStake)
  store.set('Transcoder', oldDelegateAddress.toHex(), oldDelegate)
}

export function unbond(event: Unbond): void {
  let bondingManager = BondingManager.bind(event.address, event.blockHash)
  let delegateAddress = event.params.delegate
  let totalStake = bondingManager.transcoderTotalStake(delegateAddress)
  let delegate = new Entity()
  delegate.setU256('totalStake', totalStake)
  store.set('Transcoder', delegateAddress.toHex(), delegate)
}

export function rebond(event: Rebond): void {
  let bondingManager = BondingManager.bind(event.address, event.blockHash)
  let delegateAddress = event.params.delegate
  let totalStake = bondingManager.transcoderTotalStake(delegateAddress)
  let delegate = new Entity()
  delegate.setU256('totalStake', totalStake)
  store.set('Transcoder', delegateAddress.toHex(), delegate)
}

export function reward(event: Reward): void {
  let bondingManager = BondingManager.bind(event.address, event.blockHash)
  let transcoderAddress = event.params.transcoder
  let totalStake = bondingManager.transcoderTotalStake(transcoderAddress)
  let transcoder = new Entity()
  transcoder.setU256('totalStake', totalStake)
  store.set('Transcoder', transcoderAddress.toHex(), transcoder)
}
