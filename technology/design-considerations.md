# Design considerations

The Pelagos DAG consensus was purpose‑built to meet a set of strict requirements for scalability, latency, security, and developer autonomy. This section explains the rationale behind its design choices and some of the trade‑offs involved.

## Separation of sequencing and execution

Pelagos assigns its consensus layer a single responsibility: sequencing &mdash; agreeing on the order of transactions and events.  

Any invariant checks, state verification, or heavy computation occur in the execution layer at the Appchain level. This separation:

- Eliminates execution‑linked bottlenecks in consensus.
- Keeps sequencing lightweight enough for near‑real‑time operation.
- Allows Appchain developers to apply custom validation logic without impacting network‑wide throughput.

## Data availability and consistency guarantees

The universal data layer is key to abstracting and unifing state management across heterogeneous blockchains. By exposing a rich, composable data interface and enabling dynamic, onchain analytics, and tokenomics, the data layer dramatically reduces development friction. However, this adds complexity in state management and validation, requiring sophisticated tooling and abstractions.

An alternative solution to the universal data layer is to leverage oracles. This solution was rejected because, while oracles can simplify data acquisition, they often introduce latency, potential inaccuracies, and limitations on data richness.

Pelagos's design prioritizes decentralization and resilience while minimizing validator costs and also delivering rich, real-time data. By using full blockchain nodes to source data, Pelagos provides the freshest, lowest latency, and richest data frames suitable for reactive contracts; accepting the associated operational overhead.

## Historical indexing as a native capability

A core capability of the Pelagos architecture is the efficient user historical index &mdash; a multi-source, developer-defined data layer available to every Appchain.

Historical indexes unify data from Appchains, external blockchains, or both, transforming static blockchain records into actionable intelligence. They underpin advanced smart contract functionality and data-driven tokenomics by making historical and real-time contract data queryable by default.

Traditionally, blockchains abstract away contract-level data, making it hard for UX developers to reuse it in new logic. Pelagos treats custom, multi-source indexes as first-class Appchain tooling.

Historical indexes leverage the superposition of immutable and real-time data for seamless state integration, facilitating:

- Data aggregation across sources: allowing Appchains to ingest data from other Appchains or external blockchains.
- Immutable “snapshots”: providing historical accuracy and “hot” storage for low-latency access.
- User-defined indexes: supporting application-specific indexes, e.g., tracking user behavior, market flows, or cross-chain liquidity.
- Fast and scalable queries: optimized for low-latency queries across highly fragmented chains.
- Minimization of computational overhead: optimizing for reactive contracts and dynamic tokenomics.

## No bottlenecks

While leaderless consensus reduces network overhead, improves decentralization, and avoids delays caused by leader failures, it may incur slightly higher latency (~80-100 ms) than leader-based alternatives.

The alternative, leader-based consensus can offer marginally lower latency but centralizes data updates and risks delay during leader failure or rotation. 

The decision to leverage a leaderless consensus again hinged on Pelagos's prioritization for decentralization and resilience. In leader‑based consensus models (e.g., Tendermint, Solana, Aptos), the leader can become the performance bottleneck. Furthermore, targeted attacks on a leader can threaten liveness. Pelagos adopts a leaderless, Lachesis‑inspired DAG approach to:

- Avoid single points of failure.
- Increase stability under validator churn or targeted disruption.
- Let any validator initiate and process transactions, enhancing censorship resistance.

## Instant finality and low latency

Pelagos' choice of leaderless DAG sequencing offers both decentralization and resilience without significantly sacrificing latency. The DAG achieves sequencing latency in the range of 250-450 ms, with deterministic, instant finality &mdash; crucial for reactive and cross‑chain contract logic.  

Contributing factors include:

- No block propagation; transactions are gossiped once during event creation.
- Minimal signature verification per event.
- Aggressive message pruning to lower network and storage overhead.

### Network throughput vs. CPU trade‑off

After optimising CPU and memory usage through an Erigon-like database model, the main scaling limit shifts to **network bandwidth**. Pelagos’ consensus is engineered to:

- Reduce duplicate transaction broadcasts.
- Optimise packet flow and message size.
- Enable horizontal scaling when network input/output becomes a bottleneck.

## Horizontal scaling of sequencing

Because sequencing maintains no application state, it can be scaled out by adding more sequencing shards with minimal coordination overhead:

- Each shard is an independent service that can be started, merged, or reallocated without disrupting Appchains.
- Storage-per-shard is minimal: a few gigabytes to support up to ~10,000 Appchains.
- Shards can be provisioned to match Appchain growth, with validator revenues scaling via subscription fees rather than per‑transaction costs.

## Security model and decentralisation targets

Security of critical protocols like Distributed Key Generation (DKG) and Threshold Signature Schemes (TSS) requires a large, diverse validator set:

- Pelagos targets ~100+ PoS operators initially, scaling toward 500+ for long‑term resilience.
- Censorship resistance is reinforced by accepting transaction ingress from multiple connected blockchains, not only direct submissions.
- Participation in TSS/DKG is spread across the full validator set to avoid collusion risks.

## Comparison with other designs

While several technologically sound solutions have been developed that are designed to enable the deployment of Appchains, they introduce uneasy compromises.

Individual blockchain solutions create isolated ecosystems, imposing chain-specific requirements and opposing crosschain economic dynamics. These constraints include issues such as inflation control, limited consensus, and auction-based mechanisms tied to native tokens. 

Rollup technologies effectively address demands for high security and throughput &mdash; achieving transaction speeds up to around 1,000 TPS &mdash; however, their interoperability is often limited.

While optimistic rollups offer greater flexibility in virtual machine (VM) selection, allowing for some level of customization, the extreme length of the dispute period when exiting to back to Layer 1 (L1), significantly hinders seamless multichain experiences.

Validity-proof-based rollups (ZK rollups) provide enhanced security but are typically tied to specific VMs, limiting flexibility. 

Both types of rollups involve trade-offs among TPS, latency, and costs, often prioritizing higher TPS and lower costs at the expense of increased latency and decreased flexibility.

In short, none of the existing solutions truely offer a scalable, low cost, Appchain development layer that offers Ethereum-grade security.

### Consensus comparison

Pelagos’ consensus design choice reflects the need for a leaderless, sequencing‑only DAG that prioritises **network efficiency, stability under fault, and easy horizontal scaling** over minimising CPU load, as shown in Table 1.

Table 1: Consensus protocol comparison

| Protocol / Design | Leader‑based? | Latency / Finality | CPU Usage | Network Dependency | Validator Set Size | Fault Tolerance at Scale |
|-------------------|--------------|-------------------|-----------|--------------------|--------------------|--------------------------|
| **Pelagos (Lachesis‑style)** | No | ~150–250 ms / instant | Higher | Lower | 100–500+ | Minimal degradation |
| Tendermint         | Yes | 1–2 s+ / deterministic | Medium | Medium | 100s | Leader bottleneck |
| Solana             | Yes (rotating) | 5–12 s / deterministic | Medium | High | 1000+ | Leader/relay bottleneck |
| Mysticeti          | Multi‑slot leader | ~1–3 s / deterministic | Low | High | Smaller sets | Faster degradation |
| Bullshark/Tusk     | Yes | 2–3 s / deterministic | Medium | Medium | Small (~30) | Limited scalability |

Pelagos’ decision to implement leaderless DAG sequencing enables a range of advanced use cases &mdash; from optimizing token inflation and rewards based on historical usage trends, to tracking cross‑chain liquidity flows and arbitrage opportunities, to enriching smart contracts with both historical and real‑time data for governance, staking, or automated market making. Its instant finality, near‑real‑time sequencing (~150–250 ms), and multi‑source transaction ingress keep historical indexes complete, up‑to‑date, and censorship‑resistant.

### Built for scale

The Pelagos DAG is designed to support a growing number of users, transactions, peak loads, and an expanding state enabling the platform to scale. The DAG database structure is central Pelagos' ability to support the seamless, parallel operation of many Appchains as the platform grows.

Both state and historical data are stored in the Erigon-inspired, highly optimized, incrementally updated, immutable databases. These are synchronized across validators via gossip protocols that support rapid read/write capabilities and seamless, verifiable state sync.

Both the core platform and individual Appchains can be sharded for scalability. Sequencing and execution can be split across multiple microservices, allowing the platform to scale to thousands of Appchains and up to 100,000+ TPS as needed. Individual Appchains can also scale independently.

### Appchain sequencing and parallel scaling

Transactions and external block confirmations are sequenced with minimal latency and high throughput via the Lachesis-inspired DAG consensus. This enables fast finality and reliable ordering across all connected chains. 

By implementing a highly flexible approach to sequencing transactions and events across Appchains, Pelagos supports both parallelism and resilience at scale. 

Rather than forcing all traffic through a single sequencer, Pelagos applies a many-to-many (N:M) model: facilitating multiple independent sequencing processes. Each is represented by its own DAG consensus allowing the platform to serve a growing number of Appchains, all coordinated by a unified validator set.

This modular sequencing design ensures that high transaction volumes or temporary congestion on one Appchain do not adversely affect others. Each Appchain proceeds through its own consensus cycles independently, with all chains synchronized to complete an epoch at the same universal median time. 

> For example, if Appchain epochs are set to end every day at 00:00, all Appchains finalize their state at precisely that moment, coordinated via consensus across validators. At each epoch's close, a checkpoint is created,a cryptographic snapshot of state, the validators collectively sign this checkpoint using threshold signature schemes (TSS), ensuring shared trust and immutability of state transitions.

As network demand shifts and certain Appchains start to require more sequencing resources, Pelagos offers seamless vertical scaling. If an Appchain begins to consume disproportionate amounts of bandwidth or computation, it can be migrated, without data loss or break in continuity, to its own dedicated sequencing DAG. This migration is elegantly handled at the epoch boundary: after the Appchain’s checkpoint is committed. The Appchain is then shifted out of the shared sequencer onto a standalone path, with its state and event history preserved.

##### Figure 1. Scaling within Pelagos

```mermaid
flowchart TD
  %% Styling classes for nodes
  classDef horiz fill:#d0e7f9,stroke:#000,stroke-width:1px,color:#000;
  classDef vert  fill:#fce5cd,stroke:#000,stroke-width:1px,color:#000;
  classDef process fill:#e2e2e2,stroke:#000,stroke-width:1px,color:#000;
  classDef source fill:#fff2cc,stroke:#000,stroke-width:1px,color:#000;

  %% External sources and validators
  L1L2["L1/L2 Blockchain data and Appchain requests"]:::source
  VAL["Pelagos Validators: Data availability, sequencing, multi-chain messaging"]:::process

  %% Horizontal Scaling
  subgraph H["Consensus Scaling"]
    direction TB

    %% Appchain 1 & 2 (separate DAGs)
    DAG1[DAG 1 Sequencer]:::process
    OT1[Ordered Transactions]:::process
    AC1[Appchain 1]:::horiz
    AC2[Appchain 2]:::horiz

    DAG1 --> OT1
    OT1 --> AC1
    OT1 --> AC2

    %% Appchain 3 (Vertical Scaling from single DAG)
    subgraph VS3["Performanace Scaling: Appchain 3"]
      direction TB
      DAG3[DAG 2 Sequencer]:::process
      OT3a[Ordered Transactions: Shard A]:::process
      OT3b[Ordered Transactions: Shard B]:::process
      AC3a[Appchain 3: Shard A]:::vert
      AC3b[Appchain 3: Shard B]:::vert

      DAG3 --> OT3a --> AC3a
      DAG3 --> OT3b --> AC3b
    end

    %% Appchain N
    DAGN[DAG N - Sequencer]:::process
    OTN[Ordered Transactions]:::process
    ACN[Appchain N]:::horiz

    DAGN --> OTN --> ACN
  end

  %% Epoch & Validator Connections
  EC[Epoch Checkpoint and Validator Finality]:::process

  L1L2 --> VAL
  VAL --> DAG1
  VAL --> DAG3
  VAL --> DAGN

    AC1 --> EC
  AC2 --> EC
  AC3a --> EC
  AC3b --> EC
  ACN --> EC

  style VS3 fill:#fce5cd,stroke:#333,stroke-width:2px
```

These features ensure Pelagos supports consensus scaling by parallelizing sequencing across many DAGs, and by promoting individual Appchains into powerful standalone flows whenever necessary. This many-to-many sequencing model underpins both day-one performance and long-term flexibility for every user and developer on the Pelagos platform.

> See more on [scaling with Pelagos](./developing-appchain.md#scale-an-appchain-with-pelagos).
