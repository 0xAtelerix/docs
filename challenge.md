---
proofedDate: none
title: doesn't get used by GitBook
content: key problems this tech will solve
notes: >-
  Normally each challenge, pain point is addressed in the solution stage IF not
  solution, then remove or redefine the challenge
layout:
  width: default
  title:
    visible: true
  description:
    visible: true
  tableOfContents:
    visible: true
  outline:
    visible: true
  pagination:
    visible: true
  metadata:
    visible: true
---

# Challenge

## Introduction

There is a pressing need for platform-agnostic abstraction layers and developer tooling that enables smart contracts and dApps to scale across ecosystems without rewriting core logic for each new chain or runtime.

Multiplatform decentralized application (dApp) development is complex due to the tight coupling between smart contract logic and the underlying virtual machine or protocol. This fragmentation limits application portability. Currently, crafting a multiplatform app that functions across chains requires investing in complex and costly development.

While general-purpose L1s such as Solana, Aptos, Sui (vertically scaling), and TON (horizontal scaling) have demonstrated how to scale blockchain throughput across diverse workloads, none of these can be directly leveraged to scale a single dedicated Appchain. 

The two main challenges to a multiplatform app layer are the architectural differences between different protocols and liquidity fragmentation across ecosystems. The following sections present these challenges in further detail.

#### Architecture challenges

Different blockchain architectures represent state and determine finality differently, which in turn shapes how developers must structure applications. Such protocol-specific behaviors make code portability difficult, making cross-ecosystem development costly.

Consider the differences between just three of the popular L1s. Bitcoin’s UTXO model ensures probabilistic finality but limits expressiveness by requiring explicit input/output management. Ethereum’s account-based model enables rich smart contracts but adds complexity to handle state management and gas efficiency. Solana's high-performance Sealevel runtime enables parallelism but prevents simultaneous access to the same account.

Each blockchain model defines not only how finality is achieved, but also how application state must be conceptualized, managed, and stored. The result is a fragmented developer experience, where business logic cannot easily be written once and reused across chains.

#### Liquidity fragmentation

The current landscape of decentralized finance (DeFi) is fragmented, inefficient, and dysfunctional at scale. Liquidity fragmentation remains the most persistent and systemic inefficiency. It divides trading activity and capital across multiple, siloed blockchain environments and application-specific liquidity pools.

These silos between L1 blockchains, and their L2 ecosystems add inefficiencies to markets: increasing slippage, and necessitating the use of bridges or wrapped tokens to move assets. Bridging and wrapping introduces latency, trust dependencies, and operational risk.

Furthermore, this fragmentation forces protocols to engage with external power structures such as market makers to maintain liquidity, further undermining true market efficiency. This reintroduces centralizing forces, including:

* Preferential access and pricing for insiders.
* Liquidity extraction via arbitrage.

This has all resulted in an opaque, off-chain coordination structure tainting the promise offered by a decentralized system. This fragmentation issue intensifies as independent chains and Layer 2 networks proliferate.

As a result:

* Markets become thinner, with limited depth per pool or pair.
* Traders face increased slippage, especially on large trades.
* Capital efficiency deteriorates, as liquidity is duplicated or idled across ecosystems.

To overcome this fragmentation, protocols turn to bridges or wrapped tokens (e.g., wBTC, bridged USDC). However, these instruments:

* Introduce cross-chain trust assumptions, often relying on multisigs, validators, or relayers.
* Increase attack surface and systemic risk (as demonstrated by numerous bridge exploits).
* Obscure the origin and provenance of assets, complicating composability.

## A challenge demanding a solution

The stark reality is that today's DeFi architecture is neither fully composable, nor scalable, nor sovereign. Fragmentation in both execution environments and liquidity pools has stalled the promise of open finance and limited the scope of innovation to what is possible within isolated, siloed ecosystems.

To enable a scalable and interoperable future, we must deploy a common abstraction layer that decouples application logic from protocol-specific state mechanics, much like cross-platform mobile frameworks did for iOS and Android. Without this, developer productivity, composability, and cross-chain innovation will remain bottlenecked by the constraints of individual consensus and state models.

As decentralized ecosystems continue to expand across heterogeneous chains and execution environments, the cost of fragmentation becomes structural and systemic. A once-cohesive vision for finance as a globally composable, trustless system has fractured into a constellation of isolated platforms, each requiring bespoke logic, fragmented liquidity, and dependence on weakly trusted infrastructure.

The end state is clear: a dApp landscape that is functionally disjointed, operationally brittle, and increasingly reliant on centralized intermediaries to sustain basic functionality.

At its core, this fragmentation imposes critical limitations:

* Price discovery is undermined, as liquidity is dispersed across ecosystems with no unified market-clearing layer
* Composability is obstructed, erasing one of DeFi’s most powerful design primitives: modular, interoperable applications
* TradFi inefficiencies re-emerge — privileged access to liquidity, off-chain negotiations, and market segmentation reappear under a decentralized façade

These barriers are not just technical inconveniences — they are fundamental blockers to scale, security, and the full realization of open finance. These constraints hinder meaningful adoption of institutional capital and limit the design space for compliant, high-value dApps.

Without decoupling dApp business logic from infrastructure and establishing seamless liquidity coordination, DeFi will mirror the centralized paradigms it set out to replace.

To address these issues, Pelagos presents an abstraction layer that provides a unified execution and liquidity environment that reimagines how decentralized applications are developed, composed, and deployed across ecosystems.
