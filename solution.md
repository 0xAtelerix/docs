---
proofedDate: none
title: doesn't get used by GitBook
content: key problems this tech will solve
todo: >-
  Go back to each challenge, ensure pain point is addressed in the solution IF
  not then remove or redefine the challenge
---

# Solution

### Solution: A multiplatform execution and liquidity layer

Pelagos presents a multichain primitive that redefines execution, liquidity, and interoperability: making it a first-class design primitive, not an afterthought patched through bridges and wrappers.

This solution is designed to deliver four critical features:

1. A trust-minimized protocol ensuring a robust consensus mechanism enforced by economic incentives and penalties.
2. Complete flexibility for Appchains to customize their architecture (including VM choice, coding language, and tokenomics).
3. Seamless, low-latency bidirectional communication with any blockchain.
4. Supports fast and cheap dApp and Appchain development.

Using available technologies, Pelagos removes the need for custodial bridges, wrapped tokens or protocol-specific rewrites; allowing user funds to remain native on the L1, with Pelagos-backed receipts on the appchain. 

Pelagos' cross-protocol execution layer abstracts away differences in blockchain architectures, while allowing dApps to access a shared liquidity layer. It achieves this through three key innovations, detailed below.

#### 1. Portable execution layer

Pelagos decouples the application logic from any specific blockchain runtime through a platform-agnostic execution environment, designed to interoperate across UTXO-, EVM-, Solana-style, and other execution models.

It achieves this through:

* An abstract state model: Contracts are written against a unified state interface that compiles down to protocol-specific primitives at execution time.
* Deterministic finality translation: Pelagos maps finality semantics across chains, enabling consistent behavior whether deployed on probabilistic or instant-finality chains.
* Developer simplicity: Instead of writing for a specific virtual machine, developers can target a single framework and deploy logic that composes natively across protocols.

Outcome: Write once, transact anywhere — enabling true cross-chain logic portability and drastically reducing time to market.

#### 2. Unified liquidity fabric

Pelagos embeds a cross-chain liquidity coordination layer that routes capital and execution through a common settlement plane, eliminating the need for bridges and wrapped tokens.

It achieves this through:

* Shared liquidity pools: Capital is pooled in protocol-agnostic vaults that span multiple chains, enabling unified price discovery and deep liquidity access.
* Atomic multichain execution: Transactions can atomically span chains and dApps, with guaranteed all‑or‑nothing finality, coordinated by a trust‑minimized consensus layer to ensure correctness.
* Cross-protocol order settlement: Traders and dApps declare their required orders (e.g., "swap Token A for Token B at best execution"), which Pelagos routes through the most efficient path across ecosystems.

Outcome: A DeFi environment where liquidity is not fragmented by chain, but intelligently coordinated across them — reducing slippage, arbitrage leakage, and trust dependencies.

#### 3. Native cross-chain composability

Beyond execution and liquidity, Pelagos enables protocol-level composability between apps on different chains — turning isolated smart contracts into networked components of a single, borderless application layer.

It achieves this through:

* Composable calls across runtimes: One contract can natively call functions in another deployed on a different chain or runtime, with state guarantees.
* Shared interfaces and schemas: Standardized interaction models allow applications to plug into one another regardless of underlying architecture.
* Secure settlement coordination: Transactions are resolved through a shared sequencing and verification layer that ensures deterministic outcomes across chains.
* Low latency: Efficient cross-appchain communications that don't rely on Inter-Blockchain Communication (IBC)-like protocols.

Outcome: Pelagos delivers on the original promise of composability — not just within ecosystems but between them.

### Solution design principles

Pelagos is built with three foundational principles:

1. Protocol neutrality: No single chain dominates execution. Pelagos is designed to coordinate across the major L1s and their L2 peers.
2. Sovereignty-preserving: Chains retain full control over consensus and state; Pelagos does not require enshrined integration or governance over host chains.
3. Trust-minimized interoperability: Cross-chain execution and liquidity are settled via cryptographic guarantees, not off-chain relayers or custodial bridges.

### Solution positioning

Pelagos doesn't compete with rollups or shared security ecosystems. In fact, Pelagos is more than a bridge, more than a rollup, and more than a multichain app framework. It's a shared execution and liquidity layer that solves the root cause of fragmentation in Web3 infrastructure that:

* Unifies development across heterogeneous blockchain architectures
* Coordinates liquidity without compromising decentralization
* Enables composability that crosses protocol boundaries

This foundational layer unlocks a new design space for developers: permissionless, high-performance, scalable dApps that can operate across chains with the same simplicity they do within one.

In the following section, we detail how Pelagos achieves this through its architecture, protocol mechanics, security model, and developer tools.
