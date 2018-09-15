// Respond to transcoder added events
export function transcoderUpdated(event: TranscoderUpdate): void {
  let bondingManager = BondingManager.bind(event.address, event.blockHash)
  let roundsManager = RoundsManager.bind(Address.fromString("3984fc4ceeef1739135476f625d36d6c35c40dc3"), event.blockHash)

  let currentRound = roundsManager.currentRound()
  let transcoderHash = event.params.transcoder.toHex()
  let transcoderAddress = event.params.transcoder
  let active = bondingManager.isActiveTranscoder(transcoderAddress, currentRound)
  let transcoderInfo = bondingManager.getTranscoder(transcoderAddress)
  let totalStake = bondingManager.transcoderTotalStake(transcoderAddress)
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
  transcoder.setString('name', "Transcoder")
  transcoder.setString('id', transcoderHash)
  transcoder.setAddress('address', transcoderAddress)
  transcoder.setU256('pendingRewardCut', pendingRewardCut)
  transcoder.setU256('pendingFeeShare', pendingFeeShare)
  transcoder.setU256('pendingPricePerSegment', pendingPricePerSegment)
  transcoder.setU256('rewardCut', rewardCut)
  transcoder.setU256('feeShare', feeShare)
  transcoder.setU256('pricePerSegment', pricePerSegment)
  transcoder.setU256('totalStake', totalStake)
  transcoder.setU256('lastRewardRound', lastRewardRound)
  transcoder.setBoolean('active', active)
  transcoder.setBoolean('registered', registered)
  transcoder.setString('status', registered ? 'Registered' : 'NotRegistered')
  
  // Apply store updates
  store.set('Transcoder', transcoderHash, transcoder)
}