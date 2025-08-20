## Pelagos: Consensus at scale

The Pelagos protocol and its validator network are able to offer a scalable application logic layer that supports reactive smart contracts while ensuring state integrity, ordering, and universal data consistency at scale, thanks to two principle architectural elements, a DAG consensus layer whose security is enforced through PoS and an extendible security bootstrapping option through restaking.

### Leaderless Directed Acyclic Graphs consensus

Blockchains typically organize data as a linear chain of blocks, where each block contains multiple transactions and links cryptographically to the previous block, forming a single, sequential, immutable history. DAGs, by contrast, use a graph structure to record individual transactions or events as nodes that reference multiple prior nodes. Rather than batching transactions into sequential blocks, DAGs treat each transaction as a first-class entity, producing a flexible, non-linear data structure that supports scalable ordering and verification.

Pelagos presents a purpose-designed DAG consensus network, inpired by Erigon’s immutable database model, to provide a multichain, universal state. Rather than relying on trusted third-party custodians or bridge operators, Pelagos' decentralized collective validator set enforces a robust consensus protocol, and narrows trust assumptions to the distributed operator set &mdash; greatly reducing single points of failure and enhancing security.

DAG operators compose a distributed set of validators who observe events and transactions on external blockchains, reach consensus among themselves regarding these observations, and sequence them in the Pelagos DAG. These events then drive state changes in the relevant Appchains, which execute according to their business logic.

To achieve this, Pelagos integrates an [Erigon-inspired](https://erigon.tech/benefits-of-caplin-erigons-internal-cl-and-erigon-el-for-staking/) highly efficient database structure and modular client design delivering:

- Compact state management
- High throughput
- An optimized resource consumption model

This DAG database ensures that the core universal state cannot be altered retroactively, protecting against rollback and censorship attacks. The DAG structure organizes and sequences events &mdash; such as transactions and state transitions &mdash; efficiently across all participating validators and Appchains, without forcing everything to pass through a single chain of blocks.

The immutable database model provides a multichain, universal state, ensuring efficient state synchronization. This enables Appchains to handle rapidly growing states across a multichain landscape without performance degradation.

The DAG database achieves this through its key attributes: 
-  Immutable state snapshots providing tamper-evident, incremental snapshots of blockchain states. 
> These snapshots enable seamless synchronization and verifiable data integrity across Appchains, reinforced by restaking confirmations through Pelagos checkpoints.
- Incremental database design enabling rapid synchronization by processing
only relevant components, making it highly adaptable for diverse Appchain architectures.
- Advanced historical indexing enabling users to define comprehensive historical indexes across Appchains and external blockchains. 
> This functionality supports enhanced tokenomics, reactive contracts, and rich, data-driven innovations.
- Graduality: Transaction-based graduality allos for efficient,
optimistic execution of EVM-like chains.
> Rolling back changes from a single transaction costs nearly nothing via Erigon-like databases.

### Predictable data flows and custom block formation

On top of this resilient consensus foundation, Pelagos provides VMs with predictable data flows that optimize execution flexibility for Appchains. Transactions and external L1 blocks are ingested as a deterministic, ordered stream directly from the sequencing layer. Applications have the power to define custom rules for slicing this stream into blocks — enabling custom batching logic and block construction strategies best suited to their needs.

Processing transactions and blocks in batches drives high throughput at the DAG level, allowing Appchains to both maximize performance and fine-tune state transitions in accordance with their unique application requirements.

### Extendable security bootstrapping with restaking

Launching a new Appchain presents a well-known bootstrapping challenge: without an established validator set or strong stake base, the chain is vulnerable to centralization, security attacks, and validator coordination issues. This in turn makes it harder to attract new validators.

Beyond the baseline Proof of Stake (PoS) security provided by the Pelagos Protocol, Appchains can choose to assign critical validation and execution duties to restaking validators. This allows them to leverage validators whose alignment is reinforced by additional restaking commitments.

This means that validators can “restake” locked assets to further secure Pelagos Appchains, eliminating the need for each Appchain to bootstrap its own validator set or native token. 

Restaking works by leveraging the capital already staked in large, established, and secure PoS (Proof of Stake) ecosystems (such as Ethereum, Bitcoin (via Babylon), Solana, TON, etc.). By combining restaking, Pelagos leverages an aggregate security stake far exceeding the individual L1s.

Restaking allows appchains to determine which critical validation and execution duties are undertaken by entities whose alignment is ensured. By putting their existing stake at risk of slashing for poor performance or malicious behavior, validators are economically aligned with the success and security of the Appchains they serve. This allows new Appchains to gain immediate access to a large, robust, and decentralized validator network: avoiding the overhead of launching their own staking tokens, designing complex validator incentive models, or managing permissioned validator sets.

Pelagos’ approach increases system resilience by pooling validators across multiple chains and staking models. While restaking introduces shared risks &mdash; like slashing exposure cascading across chains &mdash; it also significantly raises the cost of attacking any single Appchain, since attackers must overcome the economic weight of the entire restaked network.

Pelagos' Autonomous Verifiable Services (AVS) delegates tasks to restakers, such as:

- Sequencing consensus execution
- Performing TSS (Threshold Signature Scheme) for secure external transactions
- Multisig
- TEE (Trusted Execution Environment) validation
- Operating Appchain containers to ensure scalable and efficient execution
- Creating proofs and verification

> See more on the [validator role](./validating-appchain.md#validating-appchains-with-pelagos)

