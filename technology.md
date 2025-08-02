---
proofedDate: none
title: doesn't get used by GitBook
content: the tech
todo: null
---

# Technology

## High-level overview

Pelagos provides a business rules execution engine built atop a robust, real-time, multichain data backbone: combining universal data availability with programmable, automatic execution. This empowers developers to build advanced cross-chain logic and automation, without the operational complexity of infrastructure management or the security risks of custom bridging.

Three key components support this, the: 

- Validator network operating the DAG consensus layer 
- Application logic layer
- Reactive smart contracts

### Pelagos validator network

Sequencing, validation, and multi-chain messaging are all handled within Pelagos by a decentralized set of validators, greatly reducing security risks and operational overhead.

Pelagos validators provide a universal data availability layer that ensures the integrity of the data that apps and appchains rely on. Pelagos validators operate nodes for all supported blockchains as well as the Pelagos DAG chain. This guarantees constant access to up-to-date, finalized data from multiple L1s and L2s.

As the head of an external, supported chain updates, validators submit and confirm it within Pelagos’ DAG consensus process. Once a sufficient quorum is reached, this external block and all its data (state, events, balances, transactions) become available to all Pelagos Appchains as a native, trust-minimized data source.

### Application logic layer

Leveraging this high-availablity external blockchain data is the programmable application layer that supports a full spectrum of business logic and can trigger automatic execution of predefined actions based on specified parameters.

This ensures authentic, timely, and verifiable data delivery, powering rich business logic and seamless cross-chain composability. Furthermore, the application logic layer offers significant deployment flexibility.

Appchain developers can define business rules, automations, or application-specific logic using any environment—including custom Docker containers, EVM, WebAssembly, MoveVM, and then deploy these as independent Appchains.

> Each app runs on on a dedicated, separate blockchain leveraging the Pelagos validator sets that offer security via restaking.

### Reactive smart contracts

To support native “event-driven” automation, Pelagos supports “reactive contracts”. Reactive contracts are smart contracts that automatically react to events or state changes on any connected blockchain.

For example, an app's business logic might:

- Trigger an action if there’s a large transfer on Ethereum
- Launch logic when a specific address on Bitcoin receives funds
- Execute swaps across multiple L1s automatically based on cross-chain events

Reactive contracts are secure and can operate with near-instant finality at the Appchain level.

The security of reactive events is enforced with threshold multi-sig logic. This ensures that outbound actions are only executed when a quorum of validators collectively sign the transaction using a Threshold Signature Scheme (TSS) based on DKG protocols, ensuring robust, distributed security without single points of failure.

### Key architectural elements

The validator network, application logic layer, and reactive smart contracts rely on the following architectural elements:

#### Leaderless DAG consensus

Transactions and external block confirmations are sequenced with minimal latency and high throughput via Lachesis-inspired DAG consensus. This enables fast finality and reliable ordering across all connected chains.

#### Erigon immutable databases

Erigon’s immutable database model provides a multichain, universal state. Both state and historical data are stored in Erigon’s highly optimized, incrementally updated, immutable databases. These are synchronized across validators via gossip protocols that support rapid read/write capabilities and seamless, verifiable state sync.

The core universal state cannot be altered retroactively, protecting against rollback and censorship attacks.

#### Horizontal and vertical scaling:

Both the core platform and individual Appchains can be sharded for scalability. Sequencing and execution can be split across multiple microservices, allowing the platform to scale to thousands of Appchains and up to 100,000+ TPS as needed.

#### Security via restaking:

To overcome the security bootstrapping challenges faced by each nascent Appchain, the validator set is secured not by a single native token, but via restaked collateral from multiple high-value ecosystems (e.g. ETH, BTC, SOL, TON, etc.), providing security guarantees that exceed most traditional blockchains.

## Pelagos as a developer empowerment environment

As a result of this innovation, data is always available, trustworthy, and native-level for any supported blockchain— removing the need for lending trust to oracles or relying on fragile bridges.

This leaves developers free to build logic, not infrastructure: All sequencing, validator management, state sync, security, and bridging are abstracted away by Pelagos. This creates an app execution environment that is:

- Automatic, deterministic, and trust-minimized: making cross-chain automation a first-class primitive.

- Scalable to any need: From single-app projects to massive, interconnected ecosystems.

- Truly multichain: Supporting any VM, custom logic, and real interoperability at both the data and execution levels.

Pelagos lets projects focus on what matters: their application logic, products, and user experience. While the platform becomes an invisible, rock-solid foundation for composable, cross-chain web3 innovation.

## The Pelagos DAG consensus network

Pelagos presents a purpose-designed Directed Acyclic Graph (DAG) consensus network. By substituting trusted third-party custodian or bridge operators with a decentralized collective validator set and a robust consensus protocol, Pelagos narrows trust assumptions to the distributed operator set, greatly reducing single points of failure and enhancing security.

DAG operators compose a distributed set of validators who observe events and transactions on external blockchains, reach consensus among themselves regarding these observations, and sequence them in the Pelagos DAG. These events then drive state changes in the relevant Appchains, which apply logic and execution according to their business logic.

To achieve this, Pelagos integrates [Erigon's](https://erigon.tech/benefits-of-caplin-erigons-internal-cl-and-erigon-el-for-staking/) highly efficient database structure and modular client design delivering:

- Compact state management
- High throughput
- An ptimized resource consumption model

Erigon's immutable database model provides a multichain, universal state, ensuring efficient state synchronization. This enables Appchains to handle rapidly growing states across a multichain landscape without performance degradation.

### Directed Acyclic Graph for scale and speed

Blockchains typically organize data as a linear chain of blocks, where each block contains multiple transactions and links cryptographically to the previous block, forming a single, sequential, immutable history. DAGs (Directed Acyclic Graphs), by contrast, use a graph structure, allowing transactions to be processed independently and in parallel rather than sequentially. DAGs do not batch transactions into blocks but treat individual transactions as first-class entities that reference multiple prior transactions.

The Pelagos consensus layer allows dApp builders to rely on the strong finality and fundamental security of the asset-managing blockchain that users' funds are native to, while enjoying the scalability and speed offered by the DAG consensus mechanisms. By limiting execution to consensus-approved events ensures that token issuance or state changes are valid, preserving atomicity and preventing double-spends or fraudulent minting.

## Atomic cross-chain asset portability

Pelagos’ DAG operator consensus network embodies the same trust model principles as a decentralized blockchain, replacing custodial bridges with decentralized observation, agreement, and native token issuance. This is a key innovation addressing many of the security and composability issues caused by traditional wrapped tokens and bridge constructions.

Unlike bridges that lock assets on one chain and mint wrapped tokens on another — often relying on multi-signature wallets or centralized validators, Pelagos replaces these models with its DAG-based consensus network. This network consists of a distributed, decentralized set of operators, “DAG operators” who collectively observe and validate events such as asset locks or state changes on origin chains, then attest to those events within Pelagos’ own consensus process.

The consensus process is similar, in principle, to that achieved by a blockchain’s validator set. Upon consensus, the network issues a native token representation that is directly backed by locked real assets, enabling seamless, atomic, cross-Appchain mobility without re-wrapping or traditional bridging.

> Let’s say an app wishes to execute logic to enable Alice and Bob to swap collectibles stored on different blockchains. Typically, this would require wrapping the tokens to move them across chains.

> With Pelagos, validators can validate ownership (i.e. observe the finalized state on both chains) and agree to coordinate the swap. However, validators won’t sign off on the transaction unless all conditions are met, such as both assets being correctly escrowed. If one side fails to reach escrow finality, neither transfer is executed. This ensures the swap either happens completely or not at all: atomically, without bridging or wrapping.

> Furthermore, if a user Alice doesn’t already have a wallet address to accept the collectable on the host chain (e.g., Solana), the application layer's logic can include wallet generation during the process to receive the asset.





-------------------------------------

> Random word salad, needs to be authenticated or cut....



***

This section deep dives how Pelagos handles sequencing, scaling, security, and transaction submission to multichain APIs, and their validators.


1. Submission: The user submits a transaction through the dApp, which is routed to the Pelagos sequencing layer.

2. Sequencing: The sequencer identifies the destination chain, aggregates transactions, orders them, and batches them for validation and execution.

3. State update and execution: Transactions are executed against the current state on the destination chain in a compact, modular manner using Erigon’s optimized pipelines.

4. Consensus and validation: Validators verify transaction correctness and inclusion, ensuring finality and network security.

5. Finalization and synchronization: State changes are committed to the multichain universal state, and results can be queried via standardized multichain APIs.

Each step of the transaction lifecycle has been optimized.

#### Sequencing

#### Scaling

#### Security

It's vital that Pelagos offers better security guarantees than the existing compromised solutions offered such as those of 3rd-party bridges. To this end, the architectural design leverages immutability and the security-as-a-service model, Autonomous Verifiable Services (AVS).



Modular execution client: Each component—from transaction pool to execution layer—is strictly sandboxed, minimizing the attack surface.

{from source materials, not made up}

#### Security as a service

Pelagos inherits its security model from underlying L1s via restaking services. Restakers reuse staked L1 native tokens such as ETH, BTC, SOL, TON (or liquid staking tokens like stETH) to provide security for additional networks, middleware, and applications beyond L1 itself.

Restaking extends the security guarantees that arise from slashing. L1 stakers, those responsible for compiling the "at risk pot" required to offer validator services, can choose to "restake" their tokens to secure third-party services like rollups, oracles, or data availability layers.

This allows Pelagos to leverage the L1 validator sets for security, mitigating bootstrapping risks.

Pelagos security relies on robust tokens and substantial stakes rather than a single native token — removing the requirement to trust in a single chain’s token stability. By combining restaking from Ethereum, Bitcoin, Solana, and TON, Pelagos leverages an aggregate security stake far exceeding individual L1s.

#### Transaction handling

{multichain APIs, and respective validators)

### Conclusion

Pelagos’ architecture merges Erigon’s proven efficiency with cutting-edge appchain modularity. The results are fast, secure, scalable, and developer-friendly deployments that remove traditional pain points from both single-chain and multichain projects. By offering deterministic sequencing, rapid horizontal scaling, robust validator security, and seamless multichain APIs, Pelagos truly advances the next generation of decentralized application infrastructure.
