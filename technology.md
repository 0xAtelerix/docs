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

Pelagos leverages Erigon’s immutable database model which provides a multichain, universal state. Both state and historical data are stored in Erigon’s highly optimized, incrementally updated, immutable databases. These are synchronized across validators via gossip protocols that support rapid read/write capabilities and seamless, verifiable state sync.

The core universal state cannot be altered retroactively, protecting against rollback and censorship attacks. The DAG structure organizes and sequences events—such as transactions and state transitions—efficiently across all participating validators and Appchains, without forcing everything to pass through a single chain of blocks.

### Built for scale

Pelagos is designed to support a growing number of users, transactions, peak loads, and an expanding state enabling the platform to scale. The DAG database structure is central Pelagos' ability to support the seamless, parallel operation of many Appchains as the platform grows.

Both the core platform and individual Appchains can be sharded for scalability. Sequencing and execution can be split across multiple microservices, allowing the platform to scale to thousands of Appchains and up to 100,000+ TPS as needed.

Individual Appchains can also scale independently; both [horizontally and vertically](#scale-an-appchain-with-pelagos). This scaling is fully controlled by the user and can be adjusted as the Appchain evolves.

#### Appchain sequencing and parallel scaling

Pelagos ensures the seamless operation of Appchains, even as the number of Appchains and connected blockchains grows. 

Pelagos uses a highly flexible approach to sequencing transactions and events across Appchains, allowing both parallelism and resilience at scale. Rather than forcing all traffic through a single sequencer, Pelagos supports a many-to-many (N:M) model: multiple independent sequencing processes. Each is represented by its own DAG consensus allowing the platform to serve a growing number of Appchains, all coordinated by a unified validator set.

This modular sequencing design ensures that high transaction volumes or temporary congestion on one Appchain do not adversely affect others. Each Appchain proceeds through its own consensus cycles independently, with all chains synchronized to complete an epoch at the same universal median time. 

For example, if Appchain epochs are set to end every day at 00:00, all Appchains finalize their state at precisely that moment, coordinated via consensus across validators. At each epoch's close, a checkpoint is created,a cryptographic snapshot of state, the validators collectively sign this checkpoint using threshold signature schemes (TSS), ensuring shared trust and immutability of state transitions.

As network demand shifts and certain Appchains start to require more sequencing resources, Pelagos offers seamless vertical scaling. If an Appchain begins to consume disproportionate amounts of bandwidth or computation, it can be migrated, without data loss or break in continuity, to its own dedicated sequencing DAG. This migration is elegantly handled at the epoch boundary: after the Appchain’s checkpoint is committed. The Appchain is then shifted out of the shared sequencer onto a standalone path, with its state and event history preserved.

{needs some work, but starts the visual}

```mermaid
graph TD
  %% Validators root
  subgraph Validators["Validators"]
    V[Validator Set]
  end

  %% Horizontal Scaling DAGs
  subgraph HorizontalScaling["Horizontal Scaling: Multiple Sequencing DAGs"]
    direction TB
    DAG1[Sequencing DAG 1]
    DAG2[Sequencing DAG 2]
    DAG3[Sequencing DAG 3]
    V --> DAG1
    V --> DAG2
    V --> DAG3
  end

  %% Ordered Transaction Layer above Appchains
  subgraph OrderedTx1["Ordered Transaction Layer"]
    direction TB
    OT1[Ordered Transactions 1]
    OT2[Ordered Transactions 2]
    OT3[Ordered Transactions 3]
    DAG1 --> OT1
    DAG2 --> OT2
    DAG3 --> OT3
  end

  %% Appchain 2
  subgraph Appchain1["Containerized Appchain 2 sharded"]
    direction TB
    shardA1[Shard A]
    shardB1[Shard B]
    OT1 --> shardA1
    OT1 --> shardB1
  end

  %% Appchain 3 single shard example
  subgraph Appchain2["Appchain 3"]
    OT2 --> AC2[Single Shard Execution]
  end

  %% Appchain 1 with vertical scaling
  subgraph VerticalScaling["Appchain 1 Dedicated Sequencing DAG"]
    direction TB
    DAG_Dedicated[Dedicated Sequencing DAG]
    OT_Dedicated[Ordered Transactions Dedicated]
    DAG_Dedicated --> OT_Dedicated
    OT_Dedicated --> AC_Special[Appchain Isolated, High Demand]
    V --> DAG_Dedicated
  end

  %% Epoch checkpoint coordination
  subgraph EpochCheckpoints["Epoch Checkpoints & Finality"]
    direction TB
    Checkpoint[Checkpoint & TSS Voting]
    Appchain1 --> Checkpoint
    Appchain2 --> Checkpoint
    AC_Special --> Checkpoint
    Checkpoint --> V
  end
  ```

These features together ensure Pelagos scales horizontally by parallelizing sequencing across many DAGs—and vertically, by promoting individual Appchains into powerful standalone flows whenever necessary. This many-to-many sequencing model underpins both day-one performance and long-term flexibility for every user and developer on the Pelagos platform.

### Security via restaking:

To overcome the security bootstrapping challenges faced by each nascent Appchain, the validator set is secured not by a single native token, but via restaked collateral from multiple high-value ecosystems (e.g. ETH, BTC, SOL, TON, etc.), providing security guarantees that exceed most traditional blockchains.

## Pelagos as a developer empowerment environment

As a result of this innovation, data is always available, trustworthy, and native-level for any supported blockchain— removing the need for lending trust to oracles or relying on fragile bridges.

This leaves developers free to build logic, not infrastructure: All sequencing, validator management, state sync, security, and bridging are abstracted away by Pelagos. This creates an app execution environment that is:

- Automatic, deterministic, and trust-minimized: making cross-chain automation a first-class primitive.

- Scalable to any need: From single-app projects to massive, interconnected ecosystems.

- Truly multichain: Supporting any VM, custom logic, and real interoperability at both the data and execution levels.

Pelagos lets projects focus on what matters: their application logic, products, and user experience. While the platform becomes an invisible, rock-solid foundation for composable, cross-chain web3 innovation.

## The Pelagos Directed Acyclic Graph consensus network

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

Combined with integrated TSS signing protocols for supported chains (secured by restaking and Distributed Key Generation (DKG)), Appchains can send external transactions to other protocols or Appchains as a natural extension of their execution environment.

By enabling easy interoperability, Pelagos lets Appchains reuse and enhance existing protocols rather than competing for liquidity and users.

### Scale an Appchain with Pelagos

Pelagos brings Web2 scalability practices directly to Appchains; employing the Erigon DB-inspired model For Appchain data storage. This model is optimized for blockchains with large or rapidly growing states, offering:

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

Vertical scaling is supported supported at the database layer, thanks to Erigon's efficent DAG database. The immutable, incremental database design ensures optimal data locality and minimizes read amplification by including fast-access and presence/absence indexes from the outset. As a result, this database is inherently optimized for syncing and scaling.

To further enhance efficiency, these databases are distributed via BitTorrent-like protocols, enabling computation-free synchronization. This effective combination of database design and synchronization strategies mirrors the success of Erigon,the primary archive node solution applied by Ethereum and Polygon due to its exceptional optimization and sync capabilities.

Furthermore, any Appchain can "subscribe" to dedicated sequencing should it outgrow the shared infrastructure and require dedicated, larger-scale infrastructure for improved performance. Each dedicated sequencing service runs its own DAG consensus. This provides maximum throughput &mdash; with independent epochs and checkpoint proofs to ensure auditability and data integrity.

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

## Validating Appchains with Pelagos

As presented in the section [Security bootstrapping with restaking](#security-bootstrapping-with-restaking), Pelagos relies on restakers, aka validators, to secure Appchains by performing consensus, signing external transactions, running execution nodes, and more. Their responsibilities set is paired with strict mechanisms to enforce good behavior and penalize misconduct.

### Validator incentivization

Validators earn proportional rewards based on the number of confirmed DAG events they produce. These rewards are distributed onchain, tracked, and managed by the Pelagos reactive contract.

Validators earn by correctly signing checkpoints, participating in TSS signing, seeding immutable Appchain databases, and participating in scaling operations (shards). While, [penalties](#validator-enforcement-mechanisms) reduce rewards and, in the event of serious misconduct, the reactive contract can slash staked tokens.

### Key responsibilities of a Pelagos validator

Pelagos validators are responsible for:

- [Maintaining full nodes](#validator-node-operation) to reach consensus on finalized L1/L2 blocks
- Event signing
- External transaction signing with Threshold Signatures (TSS)
> Validators apply secure multi-party TSS protocols (e.g., GG20, FROST/ROAST) for signing external chain transactions triggered by Appchain execution.
- Validate and order Appchain transactions using DAG consensus
- Key rotation: validators participate in regular Distributed Key Generation (DKG) and mandatory key rotations to maintain key security
- Executing Appchain logic promptly after each epoch
- [Maintaining validator sets](#validator-set-management)

The following sections go deeper into a subset of these responsibilities.

#### Validator node operation

To operate as a validator requires participants to run Appchain execution nodes by downloading the Docker container and syncing the latest Appchain state via torrent-based immutable databases.

To fulfill their role of reaching consensus on supported L1 and L2 states, validators must maintain full L1 and L2 client nodes. This ensures correct state retrieval and external chain integration.

{Is this just because they can't stake and become validators without full nodes in the first place, cause I can't imagine you need full chain history to achieve consensus}

#### Validator set management

Existing validators are responsible for managing the validator set. This requires them to submit restaking applications with stake, public key, chain info, and service ID on L1 contracts. The existing set will receive and track validator set updates via the Pelagos reactive contract to ensure synchronized state and readiness.

#### Validator Appchain lifecycle management

Validators vote to confirm Appchain readiness for start, stop, or halt events based on user subscription status and consensus. They also participate in checkpoint formation and commit aggregate Appchain epoch results and immutable DB info-hashes on the supported L1/L2.

By maintaining consistent checkpoints, the validators are also essential in the support of migrations and hard-forks.

#### Resource management and stability enforcement

Each validator is responsible for operating Appchain containers with resource isolation. Furthermore, the validator role includes a DevOps role and validators are expected to monitor and react to excessive resource consumption with container restarts or by disabling unstable Appchains to protect network health. This ensures the overall health of the network by stabilizing resource consumption and maintaining stability of Appchain execution environments to avoid forced shutdowns.

### Validator enforcement mechanisms

Pelagos protocol enforces strict penalties on validators to maintain network safety, liveness, and data integrity. For example, fraud-proofs are created and submitted to the AVS contract if the protocol identifies:

- Conflicting/double-signing DAG events
- Double-signing: Validators must never sign two conflicting DAG events with the same epoch and sequence number
- Signing unauthorized transactions: Validators must only sign transactions that originate from the sequenced DAG external transaction list; signing unauthorized transactions leads to fraud proofs.
- Failure to execute Appchain logic
- Failure to synchronize new validator sets
- Voting on non-final blocks

#### Liveliness monitoring and penalties

Validators are the backbone of the protocol and, as such, must remain active by participating in consensus events, checkpoint signing, and TSS signing each epoch. Non-participation results in losing rewards for that epoch.

Furthermore, prolonged inactivity leads to removal from the validator set and further economic penalties.

#### DKG abuse control

Frequent requests for DKG re-runs require justification; spamming leads to withholding of rewards or removal from the validator set.

#### Checkpoint Consistency

Validators producing inconsistent checkpoints relative to the consensus lose rewards and risk slashing.


{up to pg 38 -- need to see how to handle granular detail on scaling}

#### Sequencing

#### Scaling

#### Security

It's vital that Pelagos offers better security guarantees than the existing compromised solutions offered such as those of 3rd-party bridges. To this end, the architectural design leverages immutability and the security-as-a-service model.

Modular execution client: Each component—from transaction pool to execution layer—is strictly sandboxed, minimizing the attack surface.


### Conclusion

Pelagos’ architecture merges Erigon’s proven efficiency with cutting-edge Appchain modularity. The results are fast, secure, scalable, developer-friendly deployments that remove traditional pain points from both single-chain and multichain projects. By offering deterministic sequencing, rapid horizontal scaling, robust validator security, and seamless multichain APIs, Pelagos truly advances the next generation of decentralized application infrastructure.
