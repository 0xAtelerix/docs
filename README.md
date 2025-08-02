---
description: Root readme for support
---

The .gitbook.yaml is overriding the use of the root readme now.

[This repo](https://github.com/0xAtelerix/docs) is synced with GitBook in the Pelogas domain with the title Whitepaper BUT the space is what must be updated to add content.

There is no current public URL.


## Structure for the whitepaper tbd

Overview
Challenge
Solution
Features
Use Cases
Tokenomics
Technology
Competitive positioning
Roadmap
CTA/contacts


## Style

- American English
- Oxford comma

Google developer style guide: [developers.google.com/style](https://developers.google.com/style)

Highlights from guide

- Sentence case (including headings)
- Be woke-ish: Allowlist 
- Concatenate
	- onchain not on-chain

### Acronyms

AMM: Automated Market Maker
AVS: 

## Terminology

Refer to it as the Pelagos DAG consensus network, or simply Pelagos consensus layer. Reserve “Appchain” for the individual chains or runtimes that run user applications and smart contracts, which operate on top of or alongside the DAG consensus network.

## Concepts

AMM: 
  - Anyone can provide liquidity and earn a share of the trading fees, becoming a "liquidity provider."
  - Trades happen directly between users and the smart contract pool, not between buyers and sellers paired off by orderbooks.

  - Benefits:
    - Continuous, 24/7 liquidity for a wide range of tokens—even those rarely traded.
    - Fully decentralized and accessible without centralized intermediaries.
    - Lower barriers to participation and usually lower fees.

  - Weaknesses:
    - Price slippage increases with large trades relative to pool size.
    - "Impermanent loss": liquidity providers can lose value when prices change significantly.
    - AMMs may be less efficient for very large trades compared to centralized exchanges or on-chain orderbooks

should this image explain https://drive.google.com/file/d/1DFVub4BoIt1q_bFAPRfZcq9YnTqjwF5s/view
Evgenii Danilenko

https://drive.google.com/file/d/1siEto9mlIDgLtGrQPCxlnFkvVjZbJqhK/view?usp=drive_link


Reactive transaction flow

Application can specify own tx
or
reactive tx

Receive tx from RPC


for reactive tx they can specify conditions for automated execution once conditions met (eg liquidation events, aggregated data ... event could be as simple as tx Alice to Bob locking tokens in a contract)


Consider new block on Ethereum then DAG operators are taking the data off the L1 (acting as an instant DA layer to assist with execution confirmation etc)

DAG operators confirm the block and then Appchains can undertake executions based on those declared states.

All the blocks from different L1s and L2s are treated as tx inputs (whose data reflects finality states on the various chains)

The tx event can be executed to change state of this upchain set, or to bundle txs, 
Threshold sig must be met to achieve state change


Txs and swaps are on Appchain itself and then the external tx is done on the chain

Appchain -- lets do this tx
DAG Ops -- validate that the funds exist on // 
Application logic must be the entitiy if you want to lock of those funds until such time as finalization BUT Pelagos is not doing this logic layer




## Styling in GitBook

### Callouts:

{% hint style="info" %}
Your hint text here
{% endhint %}


### Embed video:
{% embed url="https:{your video}" %}

### Dash

emdash: &mdash;

endash: &ndash;

## Failed attempts at styling

Does NOT work

layout:
  tableOfContents:
    visible: true


## Competitor orderbook unification designs

Unified cross-chain orderbooks ([zkLink](#zklink), Vertex, [Blitz](#blitz)): Have demonstrated significant improvement in liquidity depth and trading efficiency, especially for professional trading and large volume transactions. However, complexity, latency, and sequencer trust/centralization remain challenges. Most have seen growing usage but still face adoption barriers due to technical overhead and interoperability risks.

Decentralized aggregators (Chainge, [Clip](#clip): Generally enjoy strong user adoption for retail traders given their simple interfaces and ability to always get "best execution" across chains and DEXs. Their success has popularized cross-chain swaps, though they often rely on trusted third-party validators/bridges or advanced routing tech.

Intent-centric models: Still early days, working on abstracting complexity and maximizing user outcomes. Security and trustless settlement of user assets across intent-based protocols are wip, e.g. [Owlto Finance](https://www.chaincatcher.com/en/article/2150834).

### zkLink

- [zkLink](://blog.zk.link/comparing-order-book-designs-zkex-zklink-vs-dydx-cosmos-208791b1f1b8_)
> On ZKEX.com, traders will use an aggregated ‘USD’ token which is merged from fully reserve-backed stables, such as USDC, BUSD, TUSD, and USDP.

### dYdX

- dYdX is leaving Ethereum and StarkEx for Cosmos

dYdX chain will have to give up the security benefits from StarkEx’s ZK-Rollup design and Ethereum’s default security.

As a PoS chain, its security level will be a function of the number/decentralization of validators and the market cap of $DYDX, and it could be a long process for the dYdX chain to build its own decentralized validator network. Moreover, using third-party bridges also adds to its security concern.

> BUT they could overcome these centralization risks with AVS

### Blitz

Hybrid orderbook-AMM model (Blitz, Vertex).

[Blitz design](https://docs.blitz.exchange/basics/dex-architecture-and-design)

### Clip Finance

[Coin telegraph intro](https://cointelegraph.com/news/decentralized-solver-pools-offer-a-solution-to-liquidity-fragmentation-in-defi).

- Decentralized solver pools: nodes that monitor, propose and validate transactions across chains.
- These pools enable cross-chain transactions: users stake their assets into pools which helps bridge liquidity across different blockchains.


Blurb: reducing the technical overhead and streamlining asset movement, Clip Finance integrates directly with DeFi protocols and offers a software development kit (SDK) that enables other platforms to incorporate this one-click solution.

- Tokenomics: dynamic mint, Clip Finance ties token unlocks to the platform’s total value locked (TVL) growth.


## Cutting room floor


### {Alt — reduce and move into section below --> potentially keep but move to a conclusion/intro type area} A challenge demanding a response

The cumulative result of liquidity fragmentation and architectural silos is a dApp landscape that is functionally disjointed, operationally constrained, and increasingly dependent on centralized intermediaries.

At its core, this fragmented environment:

* Undermines price discovery by dispersing liquidity across isolated ecosystems with no unified market clearing
* Obstructs composability — the foundational principle of DeFi, where applications should be able to interoperate seamlessly like Lego bricks
* Reintroduces traditional finance inefficiencies, with privileged access to liquidity, offchain coordination, and market segmentation

This whitepaper presents Pelogas, a solution that addresses the root causes that create these concrete limitations:

#### 1. Complex infrastructure for developers

Building across multiple chains demands proficiency in heterogeneous technology stacks, security models, and consensus mechanisms. Developers must integrate and maintain bridges, oracles, relayers, and manage disjointed settlement environments. This infrastructure burden siphons resources away from innovation, product development, and user experience, locking teams into endless low-level plumbing work.

#### 2. High friction cross-chain execution

Today’s cross-chain tools are slow, brittle, and non-composable. Atomic, trust-minimized transactions across chains are virtually impossible. As a result:

* Arbitrage is inefficient or infeasible
* Real-time portfolio rebalancing is impractical

Cross-protocol trades must rely on centralized intermediaries or take on significant delay and risk.

3. Scalability and security trade-offs

Monolithic chains suffer from congestion and high fees. While Layer 2s alleviate throughput and cost issues, they introduce new composability barriers and security assumptions. Protocol designers must compromise between:

* Scalability (via rollups or app-specific chains)
* Security (via settlement and consensus complexity)
* Composability (sacrificed across execution layers)

There is no simple path to scalable, secure, and interoperable DeFi in the current design paradigm.

4. Onboarding Real-World Assets (RWA)

Bringing real-world assets onchain requires hybrid settlement models that respect offchain legal structures while interacting with onchain liquidity. Current platforms cannot:

* Atomically settle both tokenized assets and fiat cash legs
* Enforce permissioned execution within a decentralized context
* Support real-time liquidation for asset-backed loans at scale
* {end}
    