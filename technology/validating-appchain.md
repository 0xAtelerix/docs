## Validating Appchains with Pelagos

As presented in the section [Security bootstrapping with restaking](./security-at-scale.md#security-bootstrapping-with-restaking), Pelagos relies on restakers, aka validators, to secure Appchains by performing consensus, signing external transactions, running execution nodes, and more. Their responsibilities set is paired with strict mechanisms to enforce good behavior and penalize misconduct.

### Validator incentivization

Validators earn proportional rewards based on the number of confirmed DAG events they produce. These rewards are distributed onchain, tracked, and managed by the Pelagos reactive contract.

Validators earn by correctly signing checkpoints, participating in TSS signing, seeding immutable Appchain databases, and participating in scaling operations (shards). While, [penalties](#validator-enforcement-mechanisms) reduce rewards and, in the event of serious misconduct, the reactive contract can slash staked tokens.

### Key responsibilities of a Pelagos validator

Pelagos validators are responsible for:

- [Maintaining full nodes](validator-node-operation) to reach consensus on finalized L1/L2 blocks
- Event signing
- External transaction signing with Threshold Signatures (TSS)
> Validators apply secure multi-party TSS protocols (e.g., GG20, FROST/ROAST) for signing external chain transactions triggered by Appchain execution.
- Validate and order Appchain transactions using DAG consensus
- Key rotation: validators participate in regular Distributed Key Generation (DKG) and mandatory key rotations to maintain key security
- Executing Appchain logic promptly after each epoch
- [Maintaining validator sets](#validator-set-management)

The following sections go deeper into a subset of these responsibilities.

#### Validator node operation

To operate as a validator requires participants to run Appchain execution nodes by downloading the Docker container and syncing the latest Appchain state via torrent-based immutable databases.

To fulfill their role of reaching consensus on supported L1 and L2 states, validators must maintain full L1 and L2 client nodes. This ensures correct state retrieval and external chain integration.

{Is this just because they can't stake and become validators without full nodes in the first place, cause I can't imagine you need full chain history to achieve consensus}

#### Validator set management

Existing validators are responsible for managing the validator set. This requires them to submit restaking applications with stake, public key, chain info, and service ID on L1 contracts. The existing set will receive and track validator set updates via the Pelagos reactive contract to ensure synchronized state and readiness.

#### Validator Appchain lifecycle management

Validators vote to confirm Appchain readiness for start, stop, or halt events based on user subscription status and consensus. They also participate in checkpoint formation and commit aggregate Appchain epoch results and immutable DB info-hashes on the supported L1/L2.

By maintaining consistent checkpoints, the validators are also essential in the support of migrations and hard-forks.

#### Resource management and stability enforcement

Each validator is responsible for operating Appchain containers with resource isolation. Furthermore, the validator role includes a DevOps role and validators are expected to monitor and react to excessive resource consumption with container restarts or by disabling unstable Appchains to protect network health. This ensures the overall health of the network by stabilizing resource consumption and maintaining stability of Appchain execution environments to avoid forced shutdowns.

### Validator enforcement mechanisms

Pelagos protocol enforces strict penalties on validators to maintain network safety, liveness, and data integrity. For example, fraud-proofs are created and submitted to the AVS contract if the protocol identifies:

- Conflicting/double-signing DAG events
- Double-signing: Validators must never sign two conflicting DAG events with the same epoch and sequence number
- Signing unauthorized transactions: Validators must only sign transactions that originate from the sequenced DAG external transaction list; signing unauthorized transactions leads to fraud proofs.
- Failure to execute Appchain logic
- Failure to synchronize new validator sets
- Voting on non-final blocks

#### Liveliness monitoring and penalties

Validators are the backbone of the protocol and, as such, must remain active by participating in consensus events, checkpoint signing, and TSS signing each epoch. Non-participation results in losing rewards for that epoch.

Furthermore, prolonged inactivity leads to removal from the validator set and further economic penalties.

#### DKG abuse control

Frequent requests for DKG re-runs require justification; spamming leads to withholding of rewards or removal from the validator set.

#### Checkpoint Consistency

Validators producing inconsistent checkpoints relative to the consensus lose rewards and risk slashing.