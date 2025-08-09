## Atomic cross-chain asset portability

Pelagos’ DAG operator consensus network embodies the same trust model principles as a decentralized blockchain, replacing custodial bridges with decentralized observation, agreement, and native token issuance. This is a key innovation addressing many of the security and composability issues caused by traditional wrapped tokens and bridge constructions.

Unlike bridges that lock assets on one chain and mint wrapped tokens on another — often relying on multi-signature wallets or centralized validators, Pelagos replaces these models with its DAG-based consensus network. This network consists of a distributed, decentralized set of operators, “DAG operators” who collectively observe and validate events such as asset locks or state changes on origin chains, then attest to those events within Pelagos’ own consensus process.

The consensus process is similar, in principle, to that achieved by a blockchain’s validator set. Upon consensus, the network issues a native token representation that is directly backed by locked real assets, enabling seamless, atomic, cross-Appchain mobility without re-wrapping or traditional bridging.

> Let’s say an app wishes to execute logic to enable Alice and Bob to swap collectibles stored on different blockchains. Typically, this would require wrapping the tokens to move them across chains.

> With Pelagos, validators can validate ownership (i.e. observe the finalized state on both chains) and agree to coordinate the swap. However, validators won’t sign off on the transaction unless all conditions are met, such as both assets being correctly escrowed. If one side fails to reach escrow finality, neither transfer is executed. This ensures the swap either happens completely or not at all: atomically, without bridging or wrapping.

> Furthermore, if Alice doesn’t already have a wallet address to accept the collectable on the host chain (e.g., Solana), the application layer's logic can include wallet generation during the process to receive the asset.
