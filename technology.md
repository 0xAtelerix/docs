---
proofedDate: none
title: doesn't get used by GitBook
content: the tech
todo: null
description: >-
  {reminder this section promises to describe: architecture, protocol mechanics,
  security model, and developer tools (an SDK).}
---

# Technology

Pelagos technology

> Content NOT ready for review pass. Structure could use a feedback pass.

Pelagos is transformative appchain framework that accelerates project launches and significantly reduces development timelines.

To achieve this, Pelagos integrates Erigon's highly efficient database structure and modular client design bringing Appchains:

* Compact state management
* High throughput
* Optimized resource consumption model

[Erigon's](https://erigon.tech/benefits-of-caplin-erigons-internal-cl-and-erigon-el-for-staking/) immutable database model provides a multichain, universal state, ensuring efficient state synchronization. This enables Appchains to handle rapidly growing states across a multichain landscape without performance degradation.

This section deep dives how Pelagos handles sequencing, scaling, security, and transaction submission to multichain APIs, and their validators.

### Lifecycle of a transaction

{consider breaking down a tx as a high level explainer — making this up, if retained, needs building out}

1. Submission: The user submits a transaction through the dApp, which is routed to the Pelagos sequencing layer.
2. Sequencing: The sequencer identifies the destination chain, aggregates transactions, orders them, and batches them for validation and execution.

{totally confused by 3 — is Erigon a da compiler of all the supported L1 and L2 states, or is it a mirror and state change happens there before occuring onchain??}

3. State update and execution: Transactions are executed against the current state on the destination chain in a compact, modular manner using Erigon’s optimized pipelines.

{does Pelagos run its own validators on supported chains? does it use service providers such as Infura?}

4. Consensus and validation: Validators verify transaction correctness and inclusion, ensuring finality and network security.

{Much like for 3, totally confused by 5— is Erigon a da compiler of all the supported L1 and L2 states, so as finalization occurs on L1/2, the da update reflects and this == finalization from dApp perspective?}

{this framing suggest that there is da layer "multichain universal state"}

5. Finalization and synchronization: State changes are committed to the multichain universal state, and results can be queried via standardized multichain APIs.

Each step of the transaction lifecycle has been optimized.

#### Sequencing

#### Scaling

#### Security

It's vital that Pelagos offers better security guarantees than the existing compromised solutions offered such as those of 3rd-party bridges. To this end, the architectural design leverages immutability and the security-as-a-service model, Autonomous Verifiable Services (AVS).

{making this up needs building out}

Erigon’s immutable database model provides a multichain, universal state. The core universal state cannot be altered retroactively, protecting against rollback and censorship attacks.

Modular execution client: Each component—from transaction pool to execution layer—is strictly sandboxed, minimizing the attack surface.

{from source materials, not made up}

#### Security as a service

Ahead of the Pelagos Protocol passing the minimum security threshold required, in the bootstapping phase it inherits its security model from underlying L1s via restaking services. Restakers reuse staked L1 native tokens such as ETH, BTC, SOL, TON (or liquid staking tokens like stETH) to provide security for additional networks, middleware, and applications beyond L1 itself.

Restaking extends the security guarantees that arise from slashing. L1 stakers, those responsible for compiling the "at risk pot" required to offer validator services, can choose to "restake" their tokens to secure third-party services like rollups, oracles, or data availability layers.

This allows Pelagos to leverage the L1 validator sets for security, mitigating bootstrapping risks.

Pelagos security relies on robust tokens and substantial stakes rather than a single native token — removing the requirement to trust in a single chain’s token stability. By combining restaking from Ethereum, Bitcoin, Solana, and TON, Pelagos leverages an aggregate security stake far exceeding individual L1s.

#### Transaction handling

{multichain APIs, and respective validators)

### Conclusion

Pelagos’ architecture merges Erigon’s proven efficiency with cutting-edge appchain modularity. The results are fast, secure, scalable, and developer-friendly deployments that remove traditional pain points from both single-chain and multichain projects. By offering deterministic sequencing, rapid horizontal scaling, robust validator security, and seamless multichain APIs, Pelagos truly advances the next generation of decentralized application infrastructure.
