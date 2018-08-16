# Livepeer
### Livepeer subgraph manifest for The Graph

The [Graph Node](https://github.com/graphprotocol/graph-node) repo contains instructions for running everything. Additionally see the [Getting Started Guide](https://github.com/graphprotocol/graph-node/blob/master/docs/getting-started.md) for a detailed walkthrough of how the pieces fit together.

Once you've built the subgraph and started a Graph Node you may open a GraphiQL browser at 127.0.0.1:8000.

Here's an example query for fetching Livepeer transcoders:

```
query {
  transcoders {
    address
    rewardCut
    feeShare
    pricePerSegment
    pendingRewardCut
    pendingFeeShare
    pendingPricePerSegment
    registered
    totalStake
    lastRewardRound
    isActive
  }
}
```

