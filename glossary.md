# Glossary

Providing acronyms and definitions.

## A  

### Appchain
Application-specific chain. A dedicated blockchain or DAG chain instance focused on a single application or
project. Appchains allow developers to tailor consensus parameters, tokenomics, and execution logic to
the specific needs of their application, rather than relying on a general-purpose L1 or L2.

### Appchain transaction
A transaction signed by a user and submitted to a specific Appchain’s RPC endpoint to modify or interact with that Appchain’s state.

### AVS

Autonomous Verifiable Services. A “Validator Service” or “Validation-as-a-Service” model where specialized entities run validator nodes or manage complex blockchain infrastructure. They ensure network security, uptime, and reliability, often on behalf of token holders or protocols.

### AVS operators

Individuals or organizations that operate and maintain Validator Services. They handle tasks like node setup, infrastructure management, software updates, and governance participation, typically in return for fees or additional rewards.

## B -->

## C  

### Checkpoint

A finalized snapshot of Appchain states. At the end of each Pelagos epoch, validators agree on the current state root of every Appchain, bundle these into a single checkpoint, and commit it (along with its proofs) to one or more L1 restaking contracts.

### Checkpoint Merkle root

A single Merkle root combines every Appchain’s state root at the end of an epoch. This root is used to prove that a given Appchain’s state is included in the overall Pelagos checkpoint without having to store or verify all states individually.

### Consensus layer

The protocol layer responsible for ordering transactions and achieving agreement among validators on the state of the network. In Pelagos, this is implemented as a Directed Acyclic Graph (DAG) consensus.

## D  

### DAG (Directed Acyclic Graph)

A data structure used to represent transactions or blocks that are linked but do not form a linear chain. DAG allows multiple events to be processed in parallel, increasing throughput and scalability.

### DKG (Distributed Key Generation)

A protocol by which a group of validators generates the private key shares used for TSS. No single validator knows the complete private key; each holds only a partial share. DKG is periodically re-run for security (e.g., when validator membership changes).

### Docker image

A Docker image is a **pre-packaged environment** containing everything needed to run an application, including code, dependencies, and system libraries.

## E  

### Encryption

Encryption is the process of converting information or data into a code; it's essential to prevent unauthorized access. Encryption is fundamental to securing data in transit and at rest across networks and systems. 

### External transaction

Any final outcome/transaction produced via TSS is then sent out to external L1/L2 networks.

### Epoch

A fixed period of time (or a number of blocks) in which Appchains execute transactions, produce blocks and
generate a checkpoint. Once an epoch concludes, validators finalize the resulting checkpoint before moving on to the next epoch.

### Epoch finalization

The process by which validators reach consensus on and commit the state checkpoint for a given epoch, making it immutable and agreed upon by the network.

## F

### Failover

Failover is the capability to automatically switch to a redundant or standby system in the event of a failure, ensuring high availability and business continuity.


## G

### Gas sponsorships

Gas sponsorships will be enabled with [EIP-7702](https://eip7702.io), allowing services to be accessed and claims to be made without the connected wallet paying the gas fee for writing data onchain.


<!-- ## H -->

## I

### Info-hash
A cryptographic hash (similar to a BitTorrent “magnet” link) that identifies a chunk of immutable, incremental database (DB) data. It ensures data integrity—any node can fetch a specific DB file from peers, verify it against the hash, and trust that the file has not been tampered with.

### Immutable Appchain DB

A data storage model (inspired by Erigon) where new Appchain states and transaction histories are periodically “sealed” into immutable snapshots. Each snapshot is identified by an info-hash and can be shared over BitTorrent-like protocols. Only the most recent “hot” DB accepts writes; older snapshots remain read-only and unalterable.

<!-- ## J -->

<!-- ## K -->

<!-- ## L

## M

### Microservice

A modular, self-contained service that runs a specific part of Pelagos (e.g., execution engine for an Appchain, TSS signing module, or database service). This microservice architecture allows individual components to scale, upgrade, or be replaced independently.


<!-- ## N  -->

<!-- ## O  -->

## P  

### Proof of Stake

Under [Poof-of-Stake blockchains](https://en.wikipedia.org/wiki/Proof_of_stake) (POS), staking is the locking of a token to support the blockchain operations. In return for staking your crypto, you may earn more cryptocurrency.

To validate POS blockchains, validator Nodes must first “stake” set amounts of the native token for the chain to be in a position to validate new transactions and add new blocks.

The stake will be slashed (forefit) if the validator fails to build legitimate blocks. This ensures that only valid data and transactions are added to a blockchain. Validators are rewarded with the native token when they successfully add new blocks.

<!-- ## Q -->

## R

### Reactive transaction

A transaction triggered by a control (or governance) contract in response to new data received from external L1/L2 networks.

### Restaking

A method of “reusing” an already staked asset (such as ETH in Ethereum) to secure additional services or protocols. Popularized by projects like EigenLayer, restaking allows stakers to extend their existing security deposit for multiple networks, thereby providing extra services and earning added rewards.

## S  

### Shard

A subdivided portion of a single Appchain’s state or execution workload. Sharding enables horizontal scaling: each shard processes only the transactions or data relevant to that shard, increasing overall throughput and reducing state bloat on individual nodes.

### Sybil

A Sybil is essentially a copy. While each human individual is unique, Sybils are attempts to create multiple identities. 

## T

### Tokenomics API

An interface that exposes data and functions related to the economic and incentive mechanisms within Pelagos or its Appchains, facilitating programmatic interaction with token-related operations.

### TSS

A cryptographic signing process where multiple validators collectively generate a single signature without revealing their individual secret keys. Pelagos uses TSS to sign external transactions on various L1s, ensuring security through distributed key control and slashing for any malicious usage.

<!-- ## U -->

## V

### Validator

A Pelagos open-source node that includes L1/L2 oracles, sequencing consensus, Appchain executions, and TSS signing. A single node consists of a list of L1/L2 clients for DAG events, a DAG node for sequencing, Appchain execution nodes and a TSS signing operator. It can be physically on a single server or distributed as microservices.

### Validator set

The pool of validators authorized to participate in Pelagos' DAG consensus and TSS signing. It's dynamically updated based on restaking commitments from various L1 networks. A majority (⅔+1 by stake) must sign blocks, checkpoints, and external transactions.

<!-- ## W  -->

<!-- ## X -->

<!-- ## Y -->

<!-- ## Z -->


