---
proofedDate: none
title: doesn't get used by GitBook
content: the tech
todo: null
---

# Technology

## High-level overview

Pelagos provides a business rules execution engine built atop a robust, real-time, multichain data backbone: combining universal data availability with programmable, automatic execution. This empowers developers to build advanced cross-chain logic and automation, without the operational complexity of infrastructure management or the security risks of custom bridging.

Four key components support this, the: 

- Validator network operating the DAG consensus layer 
- Application logic layer
- Reactive smart contracts
- Dedicated tokenomics API

From the developer perspective, it feels like working with a standard
database rather than dealing with blocks or consensus directly.

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

Instead of manually polling for updates, an Appchain can trigger automatically, executing specified logic when certain conditions are met on- or off-chain {verify off chain too, this comes back to oracles}. This capability allows Appchains to implement near real-time responses to market changes, network events, or other external data sources, enabling a more seamless and efficient multichain user experience.

For example, an app's business logic might:

- Trigger an action if there’s a large transfer on Ethereum
- Launch logic when a specific address on Bitcoin receives funds
- Execute swaps across multiple L1s automatically based on cross-chain events

Reactive contracts are secure and can operate with near-instant finality at the Appchain level.

The security of reactive events is enforced with threshold multi-sig logic. This ensures that outbound actions are only executed when a quorum of validators collectively sign the transaction using a Threshold Signature Scheme (TSS) based on DKG protocols, ensuring robust, distributed security without single points of failure.

### Tokenomics as a first-class primitive

The Pelagos API model facilitates maximum tokenomics flexibility. Furthermore, Appchains built on Pelagos can design tokenomics that operate on a multichain level, rather than being confined to a single blockchain.

## Key architectural elements

The validator network, application logic layer, and reactive smart contracts rely on the following architectural elements:

### Leaderless DAG consensus

Transactions and external block confirmations are sequenced with minimal latency and high throughput via Lachesis-inspired DAG consensus. This enables fast finality and reliable ordering across all connected chains.

### Erigon immutable databases

Erigon’s immutable database model provides a multichain, universal state. Both state and historical data are stored in Erigon’s highly optimized, incrementally updated, immutable databases. These are synchronized across validators via gossip protocols that support rapid read/write capabilities and seamless, verifiable state sync.

The core universal state cannot be altered retroactively, protecting against rollback and censorship attacks.

### Horizontal and vertical scaling:

Both the core platform and individual Appchains can be sharded for scalability. Sequencing and execution can be split across multiple microservices, allowing the platform to scale to thousands of Appchains and up to 100,000+ TPS as needed.

### Security via restaking:

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
- An optimized resource consumption model

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

> Furthermore, if Alice doesn’t already have a wallet address to accept the collectable on the host chain (e.g., Solana), the application layer's logic can include wallet generation during the process to receive the asset.

## Extensible tokenomics support

Given that protocols are implementing tokenomics innovations, Pelagos provides a reactive-style API to support tokenomics designs. This allows Protocols to support complex tokenomics logic that drives ecosystem growth by combining incentivization and enhanced security.

The API supports six hooks: pre-epoch, post-epoch, pre-block, post-block, pre-transaction, and post-transaction. These hooks are leveraged via smart contracts. They execute at the relevant events, with their output manifesting as transactions inserted before or after the event (epoch, block, or transaction).

The tokenomics layer receives ordered transactions from the Sequencing layer, making it an optional layer that complements the Appchain's execution environment.

Pelagos provides extensive flexibility to implement these and other tokenomics ideas, empowering developers to create dynamic, ecosystem-wide economic models. While there is no way to predict future applications, designers can implement the widest possible logic, not limited to, but including:

- Token price adjustments based on user transaction data or external blockchain data.
- Transaction payments via NFTs or NFT subscriptions.
- Reward distribution for specific actions, such as governance participation.
- Recalculation of APY or inflation rates.
- MEV (Miner Extractable Value) optimizations.

These functions are clearly demarcated based on where in the lifecycle they occur, for example these events could trigger the following business logic:

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

## Security bootstrapping with restaking

Launching a new Appchain presents a well-known bootstrapping challenge: without an established validator set or strong stake base, the chain is vulnerable to centralization, security attacks, and validator coordination issues. This in turn makes it harder to attract new validators.

Pelagos inherits its security model from the underlying L1s. Restaking leverages capital already staked in large, established, and secure PoS (Proof of Stake) ecosystems (such as Ethereum, Bitcoin (via Babylon), Solana, TON, etc.). Validators can “restake” their locked assets to secure Pelagos Appchains, eliminating the need for each Appchain to bootstrap its own validator set or native token.

Restaking is cornerstone to the Pelagos architecture ensuring that critical validation and execution duties are undertaken by entities whose alignment is ensured. By putting their existing stake at risk of slashing for poor performance or malicious behavior, validators are economically aligned with the success and security of the Appchains they serve. This allows new Appchains to gain immediate access to a large, robust, and decentralized validator network: avoiding the overhead of launching their own staking tokens, designing complex validator incentive models, or managing permissioned validator sets.

Pelagos’ approach increases system resilience by pooling validators across multiple chains and staking models. While restaking introduces shared risks—like slashing exposure cascading across chains—it also significantly raises the cost of attacking any single Appchain, since attackers must overcome the economic weight of the entire restaked network.

Pelagos security relies on robust tokens and substantial stakes rather than a single native token — removing the requirement to trust in a single chain’s token stability. By combining restaking from Ethereum, Bitcoin, Solana, and TON, Pelagos leverages an aggregate security stake far exceeding individual L1s.

### Restaking-secured operations

Pelagos' Autonomous Verifiable Services (AVS) delegates tasks to restakers, such as:

- Sequencing consensus execution
- Performing TSS (Threshold Signature Scheme) for secure external transactions
- Multi-sig
- TEE (Trusted Execution Environment) validation
- Operating Appchain containers to ensure scalable and efficient execution
- Creating proofs and verification

## Developing an Appchain with Pelagos

Launching an Appchain with Pelagos is as simple as deploying a smart contract. The developer can execute a single transaction providing the:

- Hash of a Docker container
- (Optional) genesis data
- Info-hash (for immutable database distribution)

and run each Appchain exactly as one runs one, or multiple, microservices.

Normally, using gRPC in a distributed system requires developers to define services in Protocol Buffers (Protobuf), handle client and server pairing and stub generation, HTTP/2 multiplexing, and deal with stream or unary message handling, serialization, and error management. With Pelagos, these gRPC setup steps are hidden behind simple callback hooks and event subscriptions, allowing developers to focus on business logic.

Pelagos abstracts away the complexities of gRPC communication between execution, state, and sequencing layers. From the perspective of a developer, it feels like working with a standard database rather than dealing with blocks or consensus directly, while providing access to:

- Blockchain data availability in Appchain smart contracts.
- Blockchain data finality guarantees.
- Creation, signing, and submission of transactions to target blockchains.
- Support for both GG20 and FROST(ROAST) protocols for TSS

This ensures a seamless, scalable, and secure multichain interaction model.

### Select the desired execution environment

Pelagos puts the choice of which virtual machines (VMs) to use for transaction processing in the hands of the developer. Developers can deploy any Docker container as the execution environment, enabling flexible and custom transaction handling.

It's even possible for developers to build heterogeneous Appchains by combining EVM, SVM, and Move execution environments across different shards within the same Appchain.

The VMs are supported with predicable data flows, for example:

- Deterministically ordered transactions and L1 blocks from the sequencing layer
- Transactions and blocks are processed in batches, allowing the developer to define custom block formation rules.

Furthermore, Pelagos embraces migrations and hard forks as a natural part of Appchain evolution and supports this with mechanisms designed to handle safe data migration and execution updates.

### Choose or extend the RPC

The RPC (Remote Procedure Call) layer provides an external interface for Appchain nodes. Pelagos supports flexibility in RPC options for Appchains. This allows developers to choose one of the standard RPCs (e.g., Ethereum, Cosmos, Solana, etc.), or to create a custom RPC, potentially extending existing implementations to suit specific requirements.

This ensures that Appchains can integrate seamlessly with existing ecosystems or implement
unique solutions tailored to their needs.

### Leverage Appchain interoperability

Appchains deployed over Pelagos enjoy direct, native-level access to other blockchains for data retrieval and transaction submission. The multichain layer in Pelagos works like a universal L1SLOAD for any chain.

Combined with integrated TSS signing protocols for supported chains (secured by restaking and DKG {not discussed nor defined yet}), Appchains can send external transactions to other protocols or Appchains as a natural extension of their execution environment.

By enabling easy interoperability, Pelagos lets Appchains reuse and enhance existing protocols rather than competing for liquidity and users.

### Scale an Appchain with Pelagos

Pelagos brings Web2 scalability practices directly to Appchains. Pelagos employs the Erigon DB-inspired model For Appchain data storage. This model is optimized for blockchains with large or rapidly growing states, offering:

- Hot databases: Designed to handle real-time data writes with periodic conversion into immutable snapshots.
- Immutable databases: Read-only incremental state snapshots that represent historical blockchain states.

These immutable databases serve as a historical record of the blockchain {"off the blockchain" is the Appchain data (not really a blockchain more a DAG, or is a da layer of the supported blockchains??} offer several advantages:

- Snapshots can be shared with other nodes via BitTorrent-like protocols, enabling efficient data synchronization.
- Operators can verify and validate the integrity of immutable databases before downloading, ensuring tamper-proof data distribution.
- By adopting this model, Pelagos transitions from traditional sync protocols, which distribute blocks, transactions, and state pieces with proofs, to efficient, one-time event, large-database file downloads. This significantly improves scalability and operational efficiency by reducing the messaging load.

#### Horizontal scaling 

In Pelagos, each Appchain can decide when to scale horizontally by sharding. A single sequencing process will serve these shards, allowing the Appchain to grow and scale seamlessly.

Developers can request additional shards by prompting Pelagos to create new execution microservices and redirect transactions from sequencing into a custom sharding function.

> For example, `get_shard(tx)` -> `shard_id` 

This mechanism transparently scales the transaction load (TPS) by distributing it across multiple shards. Furthermore, this approach extends service offerings for restaking operators who can offer additional rewards from shards. 

It is the thesis of the Pelagos designers that this model will foster organic ecosystem growth by aligning incentives among Appchains, validators, and service providers.

#### Vertical scaling

Furthermore, Pelagos incorporates best-in-class optimizations to ensure that vertical scaling translates directly into greater efficiency once horizontal scaling is introduced.

This is supported at the database layer, thanks to Erigon's efficent DAG database. The immutable, incremental database design ensures optimal data locality and minimizes read amplification by including fast-access and presence/absence indexes from the outset. As a result, this database is inherently optimized for syncing and scaling.

To further enhance efficiency, these databases are distributed via BitTorrent-like protocols, enabling computation-free synchronization. This effective combination of database design and synchronization strategies mirrors the success of Erigon,the primary archive node solution applied by Ethereum and Polygon due to its exceptional optimization and sync capabilities.

### Define block times with Pelagos

Developers can determine the size of the blocks produced by their Appchains according to their own rules, independent of complex consensus steps at execution time. Like Rollups, Pelagos lets you “slice” transaction sequences into arbitrarily sized blocks, but without imposing heavy computational demand. Block times can be reduced by the developer to as low as 10–50 ms due to the deterministic and independent nature of transaction sequencing flow and block slicing functions.

### Leverage trigger event logic

Using the reactive smart contract, developers can leverage the unified data environment offered by Pelagos as a multichain data availability layer for in-app logic by setting up trigger events. 

Consider the following code sample that listens for events on data collected on an external, supported chain and triggers cross-chain transactions: 

```solidity
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// @title Example Pelagos Reactive Contract

bytes memory payload = abi.encodeWithSignature(
    "credit(address,uint256)",
    _event.to,
    _event.value
);
emit TelerixCommon.EthereumTransaction(1, targetAddress, payload);
```

The following sample is commented to detail the mechanism:

```
// SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

/// @title Example Pelagos Reactive Contract
/// @notice Listens to events on an external chain and triggers cross-chain transactions
contract HandleTransferEventContract {

    // Define a struct to mirror the Transfer event format from an external chain
    struct Transfer {
        address from;
        address to;
        uint256 value;
    }

    /// @notice This function is called automatically by Pelagos when the subscribed event is observed
    /// @param _event Contains decoded Transfer event data from the source chain
    function handleTransfer(Transfer calldata _event) public {
        // Trigger a cross-chain transaction using Pelagos' reactive infrastructure
        // chainID: 1 (could be Ethereum mainnet, for example)
        // msg.sender: the invoker (typically the Pelagos execution engine)
        // "0x01": placeholder for actual payload you'd construct based on _event
        emit TelerixCommon.EthereumTransaction(1, msg.sender, "0x01");

        // 🛠️ TODO: Insert your custom cross-chain logic here.
        // Use `_event.from`, `_event.to`, `_event.value` to determine logic.
        // You could trigger mints, burns, swaps, or messages on other blockchains.
    }

    /// @notice Constructor sets up the subscription to the external event
    constructor () {
        emit TelerixCommon.Subscribe(
            11155111, // ID of the source chain (e.g., Sepolia)
            0x007a005651dd6cD4831fF911F7A34fE75182D9ad, // Address of the external contract to watch
            "event Transfer(address indexed from, address indexed to, uint256 value)", // Event signature to listen for
            bytes4(keccak256("handleTransfer((address,address,uint256))")), // Method selector to call when event is observed
            false, // Don't include raw source transaction data
            0 // Use default finality
        );
    }
}

/// @notice Common interface used by Pelagos' reactive framework to route cross-chain events and transactions
library TelerixCommon {
    /// @notice Event to tell Pelagos to subscribe to an external event on a source chain
    event Subscribe(
        uint subscribeChainID,
        address subscribeContractAddress,
        string subscribeEventSignature,
        bytes4 methodSignature,
        bool useSourceChainTxData,
        uint32 additionalFinality
    );

    /// @notice Event that triggers an outbound transaction to another chain
    event EthereumTransaction(
        uint chainID,
        address to,
        bytes data
    );
}
```


{up to pg 27 of the wp}
#### Sequencing

#### Scaling

#### Security

It's vital that Pelagos offers better security guarantees than the existing compromised solutions offered such as those of 3rd-party bridges. To this end, the architectural design leverages immutability and the security-as-a-service model.

Modular execution client: Each component—from transaction pool to execution layer—is strictly sandboxed, minimizing the attack surface.


### Conclusion

Pelagos’ architecture merges Erigon’s proven efficiency with cutting-edge Appchain modularity. The results are fast, secure, scalable, developer-friendly deployments that remove traditional pain points from both single-chain and multichain projects. By offering deterministic sequencing, rapid horizontal scaling, robust validator security, and seamless multichain APIs, Pelagos truly advances the next generation of decentralized application infrastructure.
