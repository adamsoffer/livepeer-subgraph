import 'allocator/arena'
export { allocate_memory }

import { Entity, store, Address } from '@graphprotocol/graph-ts'
import { NewRound } from '../types/RoundsManager/RoundsManager'
import { BondingManager } from '../types/BondingManager/BondingManager'

export function newRound(event: NewRound): void {
  let bondingManager = BondingManager.bind(
    Address.fromString('511bc4556d823ae99630ae8de28b9b80df90ea2e')
  )
  //let totalTranscoders = bondingManager.getTranscoderPoolSize()
  let currentTranscoder = bondingManager.getFirstTranscoderInPool()
  let transcoder = new Entity()

  // Updates all active transcoders total stake. TODO: replace hardcoded
  // transcoders total with getTranscoderPoolSize() when graph-ts supports
  // BigInt to numeric primitive conversion
  for (let i: i32 = 0; i < 20; i++) {
    let totalStake = bondingManager.transcoderTotalStake(currentTranscoder)
    transcoder.setU256('totalStake', totalStake)
    store.set('Transcoder', currentTranscoder.toHex(), transcoder)
    currentTranscoder = bondingManager.getNextTranscoderInPool(
      currentTranscoder
    )
  }

  let roundNumber = event.params.round
  let round = new Entity()
  round.setString('id', roundNumber.toHex())
  round.setU256('round', roundNumber)

  // // Apply store updates
  store.set('Round', roundNumber.toHex(), round)
}
