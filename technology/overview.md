## High-level overview

Pelagos provides a business rules execution engine built atop a robust, real-time, multichain data backbone: combining universal data availability with programmable, automatic execution. This empowers developers to build advanced cross-chain logic and automation, without the operational complexity of infrastructure management or the security risks of custom bridging.

From the developer perspective, it feels like working with a standard database rather than dealing with blocks or consensus directly.

At the core of the Pelagos protocol is the DAG consensus layer that writes to immutable incremental Erigon databases, which enable unmatched efficiency and developer flexibility, and leverages several key innovations:

- Removes traditional transport layers between sequencing and execution, allowing direct database-to-execution communication
> This results in real-time processing of Appchain-specific logic, significantly boosting performance and reducing latency. 
- Distributed synchronization using BitTorrent-like protocols to share immutable snapshots globally
> This approach ensures efficient, verifiable data synchronization and maintains consistency across validators and Appchains. 
- Enables reactive smart contracts that respond in near real-time to external events and data, fostering a dynamic and responsive execution environment for Appchains

These innovations support efficient developer workflows by providing real-time data access and rapid synchronization.

The following sections present four key technical layers that allow developers to focus on innovation without the burden of managing complex infrastructure: 

- [Validator network](#pelagos-validator-network) operating the Directed Acyclic Graph (DAG) consensus layer 
- [Application logic layer](#application-logic-layer)
- [Reactive smart contracts](#reactive-smart-contracts)
- Dedicated [tokenomics API](#tokenomics-as-a-firstclass-primitive)

### Pelagos validator network

Sequencing, validation, and multi-chain messaging are all handled within Pelagos by a decentralized set of validators, greatly reducing security risks and operational overhead.

Pelagos validators provide a universal data availability layer that ensures the integrity of the data that apps and appchains rely on. Pelagos validators operate nodes for all supported blockchains as well as the Pelagos DAG chain. This guarantees constant access to up-to-date, finalized data from multiple L1s and L2s.

As the head of a supported external chain updates, validators submit and confirm it within Pelagos’ DAG consensus process. Once a sufficient quorum is reached, this external block and all its data (state, events, balances, transactions) become available to all Pelagos Appchains as a native, trust-minimized data source.

The Pelagos consensus layer allows dApp builders to rely on the strong finality and fundamental security of the asset-managing blockchain that users' funds are native to, while enjoying the scalability and speed offered by the DAG consensus mechanisms. By limiting execution to consensus-approved events ensures that token issuance or state changes are valid, preserving atomicity and preventing double-spends or fraudulent minting.

> See more on the [validator role and responsibilities](./validating-appchain.md#validating-appchains-with-pelagos)

### Application logic layer

The programmable application layer then leverages this high-availablity external blockchain data &mdash; supporting a full spectrum of business logic that can trigger automatic execution of predefined actions based on specified parameters.

This ensures authentic, timely, and verifiable data delivery, powering rich business logic and seamless cross-chain composability. Furthermore, the application logic layer offers significant deployment flexibility.

Appchain developers can define business rules, automations, or application-specific logic using any environment &mdash; including custom Docker containers, EVM, WebAssembly, MoveVM, and then deploy these as independent Appchains.

Each Appchain runs as an independent DAG-based chain instance, leveraging the Pelagos validator sets that offer security via restaking.

> See more on the [developing on Pelagos](#developing-an-appchain-with-pelagos)

### Reactive smart contracts

To support native “event-driven” automation, Pelagos supports “reactive contracts”. Reactive contracts are smart contracts that automatically react to events or state changes on any connected blockchain.

Instead of manually polling for updates, an Appchain can trigger automatically, executing specified logic when certain conditions are met on- or off-chain {verify off chain too, this comes back to oracles}. This capability allows Appchains to implement near real-time responses to market changes, network events, or other external data sources, enabling a more seamless and efficient multichain user experience.

For example, an app's business logic might:

- Trigger an action if there’s a large transfer on Ethereum
- Launch logic when a specific address on Bitcoin receives funds
- Execute swaps across multiple L1s automatically based on cross-chain events

Reactive contracts are secure and can operate with near-instant finality at the Appchain level.

The security of reactive events is enforced with threshold multi-sig logic. This ensures that outbound actions are only executed when a quorum of validators collectively sign the transaction using a Threshold Signature Scheme (TSS) based on Distributed Key Generation (DKG) protocols, ensuring robust, distributed security without single points of failure.

> See more on [event-based triggers](./extensible-tokenomics.md#event-based-logic).

### Tokenomics as a first-class primitive

The Pelagos API model facilitates maximum tokenomics flexibility. Furthermore, Appchains built on Pelagos can design tokenomics that operate on a multichain level, rather than being confined to a single blockchain.

> See more on [tokenomics support](./extensible-tokenomics.md#extensible-tokenomics-support).