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

Does not work

layout:
  tableOfContents:
    visible: true


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
    