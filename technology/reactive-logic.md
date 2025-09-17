# Reactive logic layer

Pelagos offers unparalleled flexibility for implementing advanced business logic by providing a reactive-style API, that goes far beyond simple event-based triggers. 

Pelagos introduces a powerful data-centric approach for the next generation of economic logic: providing a reactive-style API to support the full range of possible tokenomics and business logic designs. Developers can not only respond to onchain events, but can  also leverage access to the holistic state and aggregated data from across multiple blockchains. This allows Protocols to support complex logic that, for instance, automatically adjust to the most profitable liquidity pools, predict price fluctuations, or dynamically allocate rewards based on comprehensive ecosystem health indicators, rather than just isolated events.

While event triggers are fully supported via standardized smart contract hooks, executing at meaningful points throughout the chain’s lifecycle, Pelagos stands apart in enabling:

- Aggregated state analysis from multiple networks, not limited to just events or transactions on a single chain.

- Data-driven logic, such as predicting token prices from a basket of cross-chain assets or optimizing exchange routing for profitability in real time.

- Composable economic mechanisms fueled by continuous monitoring, comparison, and adjustment based on the combined state of many networks.

The security of such reactive events is enforced with threshold multi-sig logic. This ensures that outbound actions are only executed when a quorum of validators collectively sign the transaction using a Threshold Signature Scheme (TSS) based on Distributed Key Generation (DKG) protocols. This ensures robust, distributed security without single points of failure.

## Extensible tokenomics support

This reactive logic layer receives ordered transactions from the sequencing layer, making it an optional tokenomics layer that complements the Appchain's execution environment. In this way, Pelagos provides extensive flexibility to implement these, and other tokenomics logical constructs, empowering developers to create dynamic, ecosystem-wide economic models. While there is no way to predict future applications, designers are supported to implement the widest possible logic. Using data signal such as liquidity, user activity, or even cross-chain arbitrage signals, protocols can respond to complex, evolving market conditions to provide:

- Real-time token price adjustments based on user transaction data or external blockchain data.
- NFT-powered transaction payments and dynamic subscription models.
- Intelligent, programmatically managed distribution of rewards for specific actions, such as governance participation.
- Recalculation of APY or inflation rates.
- MEV (Miner Extractable Value) optimizations.

and more.

### Event-based logic

The API supports six event hooks: pre-epoch, post-epoch, pre-block, post-block, pre-transaction, and post-transaction, all leveraged via smart contracts. They execute at the relevant events, with their output manifesting as transactions inserted before or after the event (epoch, block, or transaction).

The above functions are clearly demarcated based on where in the lifecycle they occur, for example these events could trigger the following business logic:

- Before Epoch
    - Collect user fees.

- Before Block:
    - Validate oracle-provided rates.
    - Regulate stablecoin value.

- Before Transaction:
    - Pay for transaction using an NFT. 
    - Delegate payment to a paymaster.

- After Transaction:
    - Mint locked tokens as rewards for governance voting.
    - Adjust APY or inflation rates based on liquidity, activity, and oracle data.
    - Perform MEV backrunning as part of the Appchain.
    - Calculate rate changes and introduce value-gathering transactions without third-party block builders.

- After Block:
    - Update future airdrop index based on user activity.

- After Epoch:
    - Distribute rewards on the Appchain or L1 according to pre-defined metrics.
    - Initiate auction to sell collected tokens (injective).
    - Mint tokens based on the calculated APY.

> See how [developers leverage event-based logic](./developing-appchain.md#leverage-trigger-event-logic).