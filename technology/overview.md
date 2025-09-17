## High-level overview

Pelagos provides a business rules execution engine built atop a robust, real-time, multichain data backbone: combining universal data availability with programmable, automatic execution. This empowers developers to build advanced crosschain logic and automation, without the operational complexity of infrastructure management or the security risks of custom bridging.

From the developer perspective, it feels like working with a standard database rather than dealing with blocks or consensus directly.

At the core of the Pelagos protocol is the Directed Acyclic Graph (DAG) consensus layer that writes to immutable incremental Erigon-like databases, which enable unmatched efficiency and developer flexibility, and leverage several key innovations:

- Removes traditional transport layers between sequencing and execution: allowing direct database-to-execution communication.
> This results in real-time processing of Appchain-specific logic: significantly boosting performance and reducing latency. 
- Distributed synchronization using BitTorrent-like protocols to share immutable snapshots globally: a persistent "data lake" providing access to the state of all included blockchains.
- Enables reactive smart contracts that respond in near real-time to external events and data: fostering a dynamic and responsive execution environment for Appchains.

These innovations support efficient developer workflows by providing real-time data access and rapid synchronization.

The following sections present four key technical layers that allow developers to focus on innovation without the burden of managing complex infrastructure: 

- [Validator network](#pelagos-validator-network) operating the DAG consensus layer 
- [Application logic layer](#application-logic-layer)
- [Reactive smart contracts](#reactive-smart-contracts)
- Dedicated [tokenomics API](#tokenomics-as-a-firstclass-primitive)

### Pelagos validator network

Sequencing, validation, and multichain messaging are all handled within Pelagos by a decentralized set of validators, greatly reducing security risks and operational overhead.

Pelagos validators provide a crosschain data access layer that cryptographically ensures the integrity of the data that appchains rely on. Pelagos validators operate nodes for all supported blockchains as well as the Pelagos DAG chain. This guarantees constant access to up-to-date, data from multiple L1s and L2s.

As the head of a supported external chain updates, validators submit and confirm it within Pelagos’ DAG consensus process. Once a sufficient quorum is reached, this external block and all its data (state, events, balances, transactions) become available to all Pelagos Appchains as a native, trust-minimized data source available for querying or data aggregation.

The Pelagos consensus layer enables dApp builders to leverage the strong finality and fundamental security assurances of the asset-managing blockchain that users' funds are native to, while enjoying the scalability and speed offered by the DAG consensus mechanisms. 

By restricting execution to only those events that have been validated and agreed upon through the trust‑minimized consensus layer, Pelagos ensures that all token issuance and state changes are cryptographically verified and consensus‑approved. This strict validation prevents invalid or conflicting operations such as double‑spends or fraudulent minting. The consensus layer’s role in establishing a canonical, finalized order of events is essential for maintaining consistency and correctness. This finalized ordering can then be leveraged by higher‑level protocols to coordinate all‑or‑nothing execution across chains and state changes, enabling true atomic multichain transactions.

> See more on the [validator role and responsibilities](./validating-appchain.md#validating-appchains-with-pelagos).

### Application logic layer

At the core of Pelagos’ value proposition is the programmable application logic layer, which harnesses reliable, high-availability blockchain data from across multiple chains. This layer enables developers to implement a full spectrum of sophisticated business logic that can automatically trigger actions based on real-time onchain events and predefined conditions.

By delivering authentic, timely, and verifiable data, the application logic layer powers rich, complex workflows that seamlessly interact across diverse blockchain ecosystems. This capability is essential for enabling advanced use cases like scalable Appchain execution, multichain liquidity management, and rapid Appchain launches &mdash; each reliant on accurate crosschain information and responsive contract behavior.

<!-- can this stand as is without the restaking? -->

Moreover, this layer provides significant deployment flexibility, allowing teams to customize their logic and integrate new chains efficiently without compromising security or performance. It transforms raw blockchain data into actionable intelligence, driving innovation and interoperability across the decentralized landscape. Appchain developers can define business rules, automations, or application-specific logic using any environment and then deploy these as independent Appchains. The Appchain execution model allows developers to implement their state transition logic in any language (e.g., Rust, Go) by providing a custom Docker container (e.g., EVM, WebAssembly, MoveVM). This grants full control over transaction processing, virtual machine choice, and block production rules, enabling highly specialized application logic and seamless horizontal scaling.

Each Appchain runs as an independent DAG-based chain instance, leveraging the Pelagos validator sets that offer Proof of Stake (PoS) security .

> See more on the [developing on Pelagos](#developing-an-appchain-with-pelagos)

### Reactive smart contracts

To support native “event-driven” automation, Pelagos supports “reactive contracts”. Reactive contracts are smart contracts that automatically react to events or state changes on any connected blockchain.

<!--  verify off chain too in p below, this comes back to oracles, no? -->

Instead of manually polling for updates, an Appchain can trigger automatically, executing specified logic when certain conditions are met on or offchain. This capability allows Appchains to implement near real-time responses to market changes, network events, or other external data sources, enabling a more seamless and efficient multichain user experience.

For example, an app's business logic might:

- Trigger an action if there’s a large transfer on Ethereum
- Launch logic when a specific address on Bitcoin receives funds
- Execute swaps across multiple L1s automatically based on crosschain events

Reactive contracts are secure and can operate with near-instant finality at the Appchain level.

> See more on [event-based triggers](./reactive-logic.md).

### Tokenomics as a first-class primitive

The Pelagos API model facilitates maximum tokenomics flexibility. Furthermore, Appchains built on Pelagos can design tokenomics that operate on a multichain level, rather than being confined to a single blockchain.

> See more on [tokenomics support](./reactive-logic.md#extensible-tokenomics-support).