---
proofedDate: none
title: Challenge
content: key problems this tech will solve
notes: Normally each challenge, pain point is addressed in the solution stage IF not solution, then remove or redefine the challenge
---

## Challenge

Multiplatform dApp development is complex due to the tight coupling between smart contract logic and the underlying virtual machine or protocol. This fragmentation increases development complexity and costs, and limits application portability across chains.

There is a pressing need for platform-agnostic abstraction layers and developer tooling that enables smart contracts and decentralized apps (dApps) to scale across ecosystems without rewriting core logic for each new chain or runtime.

The two main challenges to such a multiplatform app layer are the arcitectural differences between different protocols and liquidity fragmentation across ecosystems.

### Architecture challenges

Different blockchain architectures represent state and determine finality differently, which in turn shapes how developers must structure applications. Such protocol-specific behaviors make code portability difficult, making cross-ecosystem development costly.

Consider the differences between just three of the popular L1s:

Bitcoin, through its UTXO (Unspent Transaction Output) model, treats each transaction as consuming and creating discrete outputs. This model ensures deterministic finality through cryptographic chaining, focing developers to manage transaction inputs and outputs explicitly -- making higher-order application logic cumbersome and less expressive.

Ethereum uses an account-based model with a Merkle Patricia Trie to represent global state. While this supports more expressive, Turing-complete smart contracts, it couples application logic tightly with the complexity of state root management, gas efficiency concerns, and the nuances of contract storage layout which, in turn, determined by the EVM execution model.

Solana's account-based model leverages a stateless, high-performance parallelizable runtime which requires developers to predefine accounts and pass them explicitly to transactions. 

Each blockchain model defines not only how finality is achieved—but also how application state must be conceptualized, managed, and stored. The result is a fragmented developer experience, where business logic cannot easily be written once and reused across chains.

### Liquidity fragmentation

In the current landscape of decentralized finance (DeFi), one of the most persistent and systemic inefficiencies is liquidity fragmentation — the division of trading activity and capital across multiple, siloed blockchain environments and application-specific liquidity pools.

These silos between L1 blockchains, and their L2 ecosystems, add inefficiencies to markets: increasing slippage, and necessitating the use of bridges or wrapped tokens to move assets. Bridging and wrapping introduces latency, trust dependencies, and operational risk. 

Furthermore, this fragmentation forces protocols to engage with external power structures such as market makers to maintain liquidity, further undermining true market efficiency. This reintroduces centralizing forces, including:

- Preferential access and pricing for insiders
- Liquidity extraction via arbitrage

This has all resulted in an opaque, off-chain coordination structure tainting the promise offered by a decentralized system. This liquidity fragmentation issue continues to deepen as independent chains and Layer 2 networks proliferate.

As a result:

- Markets become thinner, with limited depth per pool or pair

- Traders face increased slippage, especially on large trades

- Capital efficiency deteriorates, as liquidity is duplicated or idled across ecosystems

To overcome this fragmentation, protocols turn to bridges or wrapped tokens (e.g., wBTC, bridged USDC). However, these instruments:

- Introduce cross-chain trust assumptions, often relying on multisigs, validators, or relayers

- Increase attack surface and systemic risk (as demonstrated by numerous bridge exploits)

- Obscure the origin and provenance of assets, complicating composability


## A Challenge demanding a response

The cumulative result of liquidity fragmentation and architectural silos is a decentralized application (dApp) landscape that is functionally disjointed, operationally constrained, and increasingly dependent on centralized intermediaries.

At its core, this fragmented environment:

- Undermines price discovery by dispersing liquidity across isolated ecosystems with no unified market clearing

- Obstructs composability -- the foundational principle of DeFi, where applications should be able to interoperate seamlessly like Lego bricks

- Reintroduces traditional finance inefficiencies, with privileged access to liquidity, off-chain coordination, and market segmentation

This whitepaper presents Pelogas, a solution that addresses the root causes that create these concrete limitations:

### 1. Complex infrastructure for developers

Building across multiple chains demands proficiency in heterogeneous technology stacks, security models, and consensus mechanisms. Developers must integrate and maintain bridges, oracles, relayers, and manage disjointed settlement environments. This infrastructure burden siphons resources away from innovation, product development, and user experience, locking teams into endless low-level plumbing work.

### 2. High friction cross-chain execution

Today’s cross-chain tools are slow, brittle, and non-composable. Atomic, trust-minimized transactions across chains are virtually impossible. As a result:

- Arbitrage is inefficient or infeasible
- Real-time portfolio rebalancing is impractical

Cross-protocol trades must rely on centralized intermediaries or take on significant delay and risk.

3. Scalability and security trade-offs

Monolithic chains suffer from congestion and high fees. Layer 2s alleviate throughput issues but introduce new composability barriers and security assumptions. Protocol designers must compromise between:

- Scalability (via rollups or app-specific chains)
- Security (via settlement and consensus complexity)
- Composability (sacrificed across execution layers)

There is no simple path to scalable, secure, and interoperable DeFi in the current design paradigm.

4. Onboarding Real-World Assets (RWA)

Bringing real-world assets onchain requires hybrid settlement models that respect offchain legal structures while interacting with onchain liquidity. Current platforms cannot:

- Atomically settle both tokenized assets and fiat cash legs
- Enforce permissioned execution within a decentralized context
- Support real-time liquidation for asset-backed loans at scale

These constraints hinder meaningful adoption of institutional capital and limit the design space for compliant, high-value dApps.

## Solving for these challenges

Together, these issues paint a stark reality: today's DeFi architecture is neither fully composable, nor scalable, nor sovereign. Fragmentation in both execution environments and liquidity pools has stalled the promise of open finance and limited the scope of innovation to what is possible within isolated, siloed ecosystems.

To enable a scalable and interoperable future, we must move toward a common abstraction layer that decouples application logic from protocol-specific state mechanics, much like cross-platform mobile frameworks did for iOS and Android. Without this, developer productivity, composability, and cross-chain innovation will remain bottlenecked by the constraints of individual consensus and state models.

Solving these challenges demands a multi-chain primitive that redefines execution, liquidity, and interoperability: making it a first-class design primitive, not an afterthought patched through bridges and wrappers.

The future of decentralized systems will depend on shared execution layers, unified liquidity environments, and native cross-domain composability—infrastructure that enables dApps to operate across environments as seamlessly as they do within them today.

In this paper, Pelogas presents such a solution: reclaiming the original vision of DeFi: permissionless innovation, efficient markets, and universal accessibility.