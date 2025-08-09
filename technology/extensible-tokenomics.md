## Extensible tokenomics support

Given that protocols are implementing tokenomics innovations, Pelagos provides a reactive-style API to support tokenomics designs. This allows Protocols to support complex tokenomics logic that drives ecosystem growth by combining incentivization and enhanced security.

The API supports six hooks: pre-epoch, post-epoch, pre-block, post-block, pre-transaction, and post-transaction. These hooks are leveraged via smart contracts. They execute at the relevant events, with their output manifesting as transactions inserted before or after the event (epoch, block, or transaction).

The tokenomics layer receives ordered transactions from the Sequencing layer, making it an optional layer that complements the Appchain's execution environment.

### Event-based logic

Pelagos provides extensive flexibility to implement these and other tokenomics ideas, empowering developers to create dynamic, ecosystem-wide economic models. While there is no way to predict future applications, designers can implement the widest possible logic, not limited to, but including:

- Token price adjustments based on user transaction data or external blockchain data.
- Transaction payments via NFTs or NFT subscriptions.
- Reward distribution for specific actions, such as governance participation.
- Recalculation of APY or inflation rates.
- MEV (Miner Extractable Value) optimizations.

The above functions are clearly demarcated based on where in the lifecycle they occur, for example these events could trigger the following business logic:

- Before Epoch
    - Collect user fees
    - Pay fees for restaking L1 tokens to subscribe for the next Epoch

- Before Block
    - Validate oracle-provided rates
    - Regulate stablecoin value

- Before Transaction
    - Pay for transaction using an NFT 
    - Delegate payment to a paymaster

- After Transaction
    - Mint locked tokens as rewards for governance voting
    - Adjust APY or inflation rates based on liquidity, activity, and oracle data
    - Perform MEV backrunning as part of the Appchain
    - Calculate rate changes and introduce value-gathering transactions without third-party block builders

- After Block
    - Update future airdrop index based on user activity

- After Epoch
    - Distribute rewards on the Appchain or L1 according to pre-defined metrics
    - Initiate auction to sell collected tokens (injective)
    - Mint tokens based on the calculated APY

> See how [developers leverage event-based logic](./developing-appchain.md#leverage-trigger-event-logic)