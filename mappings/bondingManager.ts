
// Respond to transcoder added events
export function transcoderUpdated(event: TranscoderUpdate): void {
  let bondingManager = BondingManager.bind(event.address, event.blockHash)
  let roundsManager = RoundsManager.bind(Address.fromString("511bc4556d823ae99630ae8de28b9b80df90ea2e"), event.blockHash)

  let currentRound = roundsManager.currentRound()
  let transcoderHash = event.params.transcoder.toHex()
  let transcoderAddress = event.params.transcoder
  let registered = event.params.registered
  let transcoderInfo = bondingManager.getTranscoder(transcoderAddress)
  let lastRewardRound = transcoderInfo.value0
  let rewardCut = transcoderInfo.value1
  let feeShare = transcoderInfo.value2
  let pricePerSegment = transcoderInfo.value3
  let pendingRewardCut = transcoderInfo.value4
  let pendingFeeShare = transcoderInfo.value5
  let pendingPricePerSegment = transcoderInfo.value6
  let totalStake = bondingManager.transcoderTotalStake(transcoderAddress)
  
  // Create transcoder entity
  let transcoder = new Entity()
  transcoder.setString('name', "Transcoder")
  transcoder.setString('id', transcoderHash)
  transcoder.setAddress('address', transcoderAddress)
  transcoder.setU256('pendingRewardCut', pendingRewardCut)
  transcoder.setU256('pendingFeeShare', pendingFeeShare)
  transcoder.setU256('pendingPricePerSegment', pendingPricePerSegment)
  transcoder.setU256('totalStake', totalStake)
  transcoder.setU256('lastRewardRound', lastRewardRound)
  transcoder.setU256('currentRound', currentRound)
  transcoder.setBoolean('registered', registered)
  

  // Apply store updates
  store.set('Transcoder', transcoderHash, transcoder)
}