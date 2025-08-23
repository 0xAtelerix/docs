TBD if this will be a Use Case

Need to address any perceived weaknesses introducted with the Pelogas orderbook abstraction layer:

- Costs introduced by architectural complexity
- Potentially higher:
	- costs
	- time: cross-chain latency,
- Requires reliable sequencer operations.

The success of such a system hinges on its ability to minimize these weaknesses while scaling cross-chain coordination securely and efficiently.


Strengths
Unified Cross-Chain Matching

The Pelagos orderbook sequences and matches orders coming from multiple chains (Ethereum, Solana, SUI). This reduces siloed liquidity by letting buyers and sellers from different blockchains interact in a common pool, increasing potential trading volume and liquidity.

Centralized Coordination, Decentralized Settlement

Orders are centralized in the Pelagos sequencer and Appchain for matching, but asset transfers (USDC, WBTC) settle natively on the originating or destination chains. This model can reduce slippage, improve price discovery, and unify fragmented books without requiring all liquidity to move to one chain.

Composable and Reactive

The Appchain reactively calls “match order” on every order event, continually seeking cross-chain matches. Such real-time reactive design helps prevent stale books and enables rapid arbitrage and efficient order execution.

Native Asset Support on Multiple Chains

By leveraging native pools (e.g., WBTC on Solana, SUI), users can trade without needing to bridge assets, minimizing bridging risks and costs.

Weaknesses
Complexity and Latency

Coordination across chains via sequencing and external transaction settlement introduces additional latency compared to single-chain orderbooks. Smart contract calls and cross-chain messaging may become bottlenecks, making the system less optimal for high-frequency trading or time-sensitive arbitrage.

Sequencer Trust/Reliability

The Pelagos sequencer becomes a critical point of coordination. If not properly decentralized or fault-tolerant, it could become a single point of failure or a vector for front-running and censorship.

Gas and Fee Overhead

Each trade execution involves gas fees on multiple chains (as shown in arrows: “- gas fee”), potentially making smaller trades uneconomical and putting the system at a cost disadvantage compared to single-chain DEXs.

Fragmented User Experience

Users still must interact with native asset pools on their chosen chain, which could require extra steps or separate liquidity management per chain. The cross-chain orderbook abstracts matching, but the user still faces the reality of chain-native settlements.

Order Finality and Settlement Assurance

Finalizing trades requires transactions to confirm on different blockchains. This can lead to complex rollback and dispute resolution logic if transactions fail or are reordered.

Summary Table
Strengths	Weaknesses
Unified cross-chain liquidity	Increased latency and complexity
Better price discovery	Potential sequencer trust/FME risk
Reduces need for bridges in most trades	Multiple gas fees per trade
Continuous, event-driven matching	Settlement finality spread across blockchains
Asset stays native to user’s preferred chain	Fragmented UX at settlement layer
Conclusion:
This orderbook design meaningfully addresses traditional liquidity fragmentation by creating a cross-chain orderbook and reactive matching layer, allowing trades across SUI, Ethereum, and Solana. Its main benefits are unified liquidity and better price discovery. However, these gains come at the cost of architectural complexity, potentially higher costs, cross-chain latency, and the need for reliable sequencer operation. The success of such a system hinges on its ability to minimize these weaknesses while scaling cross-chain coordination securely and efficiently.