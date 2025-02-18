# Type

## Type List
- [AbciContext](#abcicontext)
- [BigSint](#bigsint)
- [BigUint](#biguint)
- [BlockInfo](#blockinfo)
- [ChainInfo](#chaininfo)
- [CircularQueue](#circularqueue)
- [ConsensusParams](#consensusparams)
- [ForgeStatistics](#forgestatistics)
- [GenesisInfo](#genesisinfo)
- [GeoInfo](#geoinfo)
- [Multisig](#multisig)
- [NetInfo](#netinfo)
- [NodeInfo](#nodeinfo)
- [PeerInfo](#peerinfo)
- [StakeContext](#stakecontext)
- [StakeSummary](#stakesummary)
- [StateContext](#statecontext)
- [Transaction](#transaction)
- [TransactionInfo](#transactioninfo)
- [TxStatistics](#txstatistics)
- [TxStatus](#txstatus)
- [UnconfirmedTxs](#unconfirmedtxs)
- [UpgradeTask](#upgradetask)
- [UpgradeTasks](#upgradetasks)
- [Validator](#validator)
- [ValidatorInfo](#validatorinfo)
- [ValidatorsInfo](#validatorsinfo)
- [WalletType](#wallettype)
- [WalletInfo](#walletinfo)

### AbciContext

```protobuf
message AbciContext {
  // the hash of the transaction that being handled. Application can record this
  // in their state as a reference.
  string tx_hash = 1;
  // the height of the current block.
  uint64 block_height = 2;
  // the deterministic time of the current block.
  google.protobuf.Timestamp block_time = 3;
  // the total txs of the chain.
  uint64 total_txs = 4;
  // tx statistics
  TxStatistics tx_statistics = 5;
  uint32 tx_index = 6;
  // the deterministic time of the last block.
  google.protobuf.Timestamp last_block_time = 7;
}
```

### BigSint

```protobuf
message BigSint {
  bytes value = 1;
  bool minus = 2;
}
```

### BigUint

```protobuf
message BigUint { bytes value = 1; }
```

### BlockInfo

```protobuf
message BlockInfo {
  uint64 height = 1;
  uint32 num_txs = 2;
  google.protobuf.Timestamp time = 3;
  string app_hash = 4;
  string proposer = 5;
  repeated TransactionInfo txs = 6;
  uint64 total_txs = 7;
}
```

### ChainInfo

```protobuf
message ChainInfo {
  string id = 1;                // node id.
  string network = 2;           // which network the node belongs to.
  string moniker = 3;           // name of the node.
  string consensus_version = 4; // consensus engine version for this node.
  bool synced = 5;              // indicate if this node is fully synced.
  bytes app_hash = 6;           // current application hash.
  bytes block_hash = 7;         // current block hash.
  uint64 block_height = 8;      // latest block height, in integer.
  google.protobuf.Timestamp block_time = 9; // latest block time.
  string address = 10;                      // the address of the node.
  uint64 voting_power = 11; // the voting power of the node, in integer.
  uint64 total_txs = 12;    // total number of txs up to the latest block
  string version = 13;      // current forge version
  string data_version = 14; // current data version
  map<string, string> forge_apps_version = 15;
  repeated string supported_txs = 16;
}
```

### CircularQueue

```protobuf
message CircularQueue {
  // each item is the value of the Any
  repeated bytes items = 1;
  // data inserted into the queue shall have same type_url
  string type_url = 2;
  // if max_items is 0, meaning the queue has no size limit (use it cautious).
  // Otherwise when queue is full, we either will not be able to add item
  // (circular = false), or (circlar = true) replace an item (based on fifo).
  uint32 max_items = 3;
  bool circular = 4;
  // default is false, meaning LIFO (last in first out). new items are prepend
  // to the queue and when we drop items we drop the tail item. When it is true,
  // new items are append to the tail, and when we drop items we drop the head.
  bool fifo = 5;
}
```

### ConsensusParams

```protobuf
message ConsensusParams {
  uint64 max_bytes = 1;
  sint64 max_gas = 2;
  // we keep max_validators + max_candidates items in validator list, and only
  // use max_validators items for the validators.
  uint32 max_validators = 3;
  uint32 max_candidates = 4;
  repeated string pub_key_types = 5;
  repeated Validator validators = 6;
  bool validator_changed = 7;
  bool param_changed = 8;
}
```

### ForgeStatistics

```protobuf
message ForgeStatistics {
  repeated uint64 num_blocks = 1;
  repeated uint64 num_txs = 2;
  repeated BigUint num_stakes = 3;
  repeated uint32 num_validators = 4;
  repeated uint64 num_account_migrate_txs = 5;
  repeated uint64 num_create_asset_txs = 6;
  repeated uint32 num_consensus_upgrade_txs = 7;
  repeated uint64 num_declare_txs = 8;
  repeated uint64 num_declare_file_txs = 9;
  repeated uint64 num_exchange_txs = 10;
  repeated uint64 num_stake_txs = 11;
  repeated uint32 num_sys_upgrade_txs = 12;
  repeated uint64 num_transfer_txs = 13;
  repeated uint64 num_update_asset_txs = 14;
  repeated uint64 num_consume_asset_txs = 15;
}
```

### GenesisInfo

```protobuf
message GenesisInfo {
  string genesis_time = 1;
  string chain_id = 2;
  abci_vendor.ConsensusParams consensus_params = 3;
  repeated ValidatorInfo validators = 4;
  string app_hash = 5;
}
```

### GeoInfo

```protobuf
message GeoInfo {
  string city = 1;
  string country = 2;
  float latitude = 3;
  float longitude = 4;
}
```

### Multisig

```protobuf
message Multisig {
  string signer = 1;
  bytes signature = 2;
  google.protobuf.Any data = 3;
}
```

### NetInfo

```protobuf
message NetInfo {
  bool listening = 1;
  repeated string listeners = 2;
  uint32 n_peers = 3;
  repeated PeerInfo peers = 4;
}
```

### NodeInfo

```protobuf
message NodeInfo {
  string id = 1;                // node id.
  string network = 2;           // which network the node belongs to.
  string moniker = 3;           // name of the node.
  string consensus_version = 4; // consensus engine version for this node.
  bool synced = 5;              // indicate if this node is fully synced.
  bytes app_hash = 6;           // current application hash.
  bytes block_hash = 7;         // current block hash.
  uint64 block_height = 8;      // latest block height, in integer.
  google.protobuf.Timestamp block_time = 9; // latest block time.
  string address = 10;                      // the address of the node.
  uint64 voting_power = 11; // the voting power of the node, in integer.
  uint64 total_txs = 12;    // total number of txs up to the latest block
  string version = 13;      // current forge version
  string data_version = 14; // current data version
  map<string, string> forge_apps_version = 15;
  repeated string supported_txs = 16;
  string ip = 17;        // self node ip
  GeoInfo geo_info = 18; // self node geo info
}
```

### PeerInfo

```protobuf
message PeerInfo {
  string id = 1;
  string network = 2;
  string consensus_version = 3;
  string moniker = 4;
  string ip = 5;
  GeoInfo geo_info = 6;
}
```

### StakeContext

```protobuf
message StakeContext {
  // total tokens staked for others
  BigUint total_stakes = 1;
  BigUint total_unstakes = 2;
  // total tokens being staked
  BigUint total_received_stakes = 3;
  // keep a list of stake address. Only store recent N (e.g. 128) stakes.
  CircularQueue recent_stakes = 4;

  // keep a list of received stake address. Only store recent N (e.g. 128)
  // stakes.
  CircularQueue recent_received_stakes = 15;
}
```

### StakeSummary

```protobuf
message StakeSummary {
  BigUint total_stakes = 1;
  BigUint total_unstakes = 2;
  StateContext context = 3;
}
```

### StateContext

```protobuf
message StateContext {
  string genesis_tx = 1;
  string renaissance_tx = 2;
  google.protobuf.Timestamp genesis_time = 3;
  google.protobuf.Timestamp renaissance_time = 4;
}
```

### Transaction

```protobuf
message Transaction {
  string from = 1;
  uint64 nonce = 2;
  bytes signature = 3;
  // use DID for the chain. "did:" prefix is omitted
  string chain_id = 4;
  // we will support multiple signatures in case of certain tx need multiple
  // parties' signature.
  repeated Multisig signatures = 5;
  // at current version we don't have a VM to process byte
  // code so this should always be empty. Forge will reject
  // tx with non-empty byte_code
  // bytes byte_code = 6;

  google.protobuf.Any itx = 7;
}
```

### TransactionInfo

```protobuf
message TransactionInfo {
  Transaction tx = 1;
  uint64 height = 2;
  uint32 index = 3;
  string hash = 4;
  repeated abci_vendor.KVPair tags = 5;
  StatusCode code = 6;
}
```

### TxStatistics

```protobuf
message TxStatistics {
  uint64 num_account_migrate_txs = 1;
  uint64 num_create_asset_txs = 2;
  uint32 num_consensus_upgrade_txs = 3;
  uint64 num_declare_txs = 4;
  uint64 num_declare_file_txs = 5;
  uint64 num_exchange_txs = 6;
  uint64 num_stake_txs = 7;
  uint32 num_sys_upgrade_txs = 8;
  uint64 num_transfer_txs = 9;
  uint64 num_update_asset_txs = 10;
  uint64 num_consume_asset_txs = 11;
}
```

### TxStatus

```protobuf
message TxStatus {
  StatusCode code = 1;
  string hash = 2;
}
```

### UnconfirmedTxs

```protobuf
message UnconfirmedTxs {
  uint32 n_txs = 1;
  repeated Transaction txs = 2;
}
```

### UpgradeTask

```protobuf
message UpgradeTask {
  UpgradeType type = 1;
  string data_hash = 2;               // data shall be first put into IPFS
  repeated UpgradeAction actions = 4; // actions
}
```

### UpgradeTasks

```protobuf
message UpgradeTasks { repeated UpgradeTask item = 1; }
```

### Validator

```protobuf
message Validator {
  string address = 1;
  // setting power to 0 will remove existing address from validator
  uint64 power = 2;
}
```

### ValidatorInfo

```protobuf
message ValidatorInfo {
  string address = 1;
  abci_vendor.PubKey pub_key = 2;
  uint64 voting_power = 3;
  string proposer_priority = 4;
  string name = 5;
}
```

### ValidatorsInfo

```protobuf
message ValidatorsInfo {
  uint64 block_height = 1;
  repeated ValidatorInfo validators = 2;
}
```

### WalletType

```protobuf
message WalletType {
  KeyType pk = 1;
  HashType hash = 2;
  EncodingType address = 3;
  RoleType role = 4;
}
```

### WalletInfo

```protobuf
message WalletInfo {
  WalletType type = 1;
  bytes sk = 2;
  bytes pk = 3;
  string address = 4;
}
```
