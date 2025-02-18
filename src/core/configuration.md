# Forge Configuration Guide

When Forge starts, it also starts some other applications, such as `tendermint` and `ipfs`. Each appliation has its own configuration file, so does Forge.

We use toml file for Forge's configuration. If you don't know what toml is, please refer to [toml-lang/toml](https://github.com/toml-lang/toml).

One thing we like about toml file is we can have configurations seperate by sections. Forge only use one config file, with different sections for different part of system. Right now we have the following sections:

```toml
[app]
[forge]
[tendermint]
[ipfs]
[cache]
[geolix]
```

Normally the developer doesn't need to provide configuration for everything, she can just provide the things she needs to modify. Then Forge will merge the provided config with default config to produce a final config for Forge to use.

```
FORGE_CONFIG + forge_default.toml = forge.toml
```

The developer will pass her custom config to Forge via system env `FORGE_CONFIG`.

If you install Forge with `forge-cli`, a default configuration is generated for you in `~/.forge_cli/forge_release.toml`.

The generated configuration looks like this:

```toml
[app]
name = ""
version = ""
path = ""
executable = ""
sock_tcp = ""

[forge]
proto_version = 1
path = "~/.forge_release/core"
logpath = "logs"
sock_grpc = "tcp://127.0.0.1:28210"
pub_sub_key = "ABTTOTHEMOON"

  [forge.stake.timeout]
  # for general stake, we do 10s
  general = 10
  # for node stake, we do 60s
  stake_for_node = 60

  [forge.web]
  enabled = true

[tendermint]
moniker = "forge"
path = "~/.forge_release/tendermint"
keypath = "~/.forge_cli/keys"
logpath = "logs"
# socket to proxy app
sock_proxy_app = "tcp://127.0.0.1:28220"

# socket for tendermint json rpc
sock_rpc = "tcp://127.0.0.1:28221"

# socket for tendermint grpc (right now just use it for send tx and commit immediately)
sock_grpc = "tcp://127.0.0.1:28222"

# socket for tendermint p2p. Normally this shall be opened to the public network
sock_p2p = "tcp://0.0.0.0:26656"

# socket for performance metrics
sock_prof = ""

# persistent peers
persistent_peers = ""

# seed peers
seed_peers = ""

# timeout for commiting a new block
timeout_commit = "5s"

# create empty blocks in 5s interval
create_empty_blocks = true

# set if this node runs in a seed mode
seed_mode = false

recheck = false

  [tendermint.genesis]
  genesis_time = "2018-11-05T19:22:08.938749Z"
  chain_id = "forge"
  max_bytes = 150000
  max_gas = -1
  app_hash = ""

  ### begin validators
  [[tendermint.genesis.validators]]
  ### end validators

[ipfs]
path = "~/.forge_release/ipfs"
logpath = "logs"

[cache]
path = "~/.forge_release/cache/mnesia_data_dir"
```

It only contains part of full configuration, upon forge start, it will merge with forge default configuration to generate a full configuration. If you'd like to know all the parameters in a forge configuration, you can grab a `forge_default.toml`, either from our github repo, or from a release (e.g. `cat ~/.forge_cli/release/forge/0.18.2/lib/forge_sdk-0.18.2/priv/forge_default.toml`):

```toml
# ------------------------------------------------------------------
# forge app configuration
# ------------------------------------------------------------------

[app]

# name of your application
name = ""

# version of your application
version = ""

# home path of your application
path = ""

# the path of your application's executable file
executable = ""

# the log file path
logpath = "logs"

# the ABI connection between app and forge under TCP mode
sock_tcp = ""

# the ABI connection between app and forge under gRPC mode
sock_grpc = ""

# the backoff time (in milliseconds) if the ABI connection is cutoff
sock_backoff = 500

# ------------------------------------------------------------------
# forge configuration
# ------------------------------------------------------------------

[forge]

# protobuf version
proto_version = 1

# home path of forge
path = "~/.forge/core"

# the state db path
db = "data"

# the index db path
# sqlite://index/index.sqlite3 or postgres://postgres:postgres@localhost:5432/index
index_db = "sqlite://index/index.sqlite3"

# bitmap path
bitmap = "bitmap"

# the keystore path
keystore = "keystore"

# the log path
logpath = "logs"

# index db is nondeterministic, it won't affect statesdb
enable_index = true

# the gRPC connection between forge and client sdk
sock_grpc = "tcp://127.0.0.1:27210"

# consensus engine name
consensus_engine = "tendermint"

# storage engine name
storage_engine = "ipfs"

# max number of validator nodes for forge
max_validators = 64

# max number of candidate nodes for forge
max_candidates = 256

# pub sub key
pub_sub_key = "ABTTOTHEMOON"

# compression algorithm
compression = "zstd"

  [forge.transaction]

  # max asset size
  max_asset_size = 65536

  # max list size
  max_list_size = 8

  # max number of multi signature
  max_multisig = 4

  # minimum stake value
  minimum_stake = 10000000000000000

  [forge.web]

  # wether to enable forge web interface
  enabled = false

  # the port for forge web
  port = 8210

  [forge.stake.timeout]

  # for general stake, we do T+1
  general = 86400

  # for node stake, we do T+7
  stake_for_node = 604800

  [forge.rpc]

  # white list of forge rpc call
  whitelist = "*"

  [forge.release]

  # url for forge release
  url = "http://releases.arcblock.io/forge"

  [forge.token]

  # token name
  name = "ArcBlock"

  # token symbol
  symbol = "ABT"

  # smallest token unit
  unit = "arc"

  # token description
  description = "Forge token ABT"

  # token icon
  icon = "data:image/png;base64,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"

  # token decimal
  decimal = 16

  # token initial supply
  initial_supply = 93000000

  # token total supply
  total_supply = 186000000

  # inflation rate
  inflation_rate = 0

  [forge.poke]

  # the address for poke tx
  address = "zzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzzz"

  # the balance of account
  balance = 3750000000

  # daily limit for poke
  daily_limit = 2500000

  # the amount account get with poke tx
  amount = 25

# ------------------------------------------------------------------
# tendermint configuration
# ------------------------------------------------------------------

[tendermint]

# a custom human readable name for this node
moniker = "forge"

# path of tendermint
path = "~/.forge/tendermint"

# path of tendermint configuration
keypath = "config"

# log path
logpath = "logs"

# socket to proxy app
sock_proxy_app = "tcp://127.0.0.1:27220"

# socket for tendermint json rpc
sock_rpc = "tcp://127.0.0.1:27221"

# socket for tendermint grpc (right now just use it for send tx and commit immediately)
sock_grpc = "tcp://127.0.0.1:27222"

# socket for tendermint p2p, normally this shall be opened to the public network
sock_p2p = "tcp://0.0.0.0:26656"

# socket for performance metrics
sock_prof = ""

# persistent peers
persistent_peers = ""

# seed peers
seed_peers = ""

# timeout for commiting a new block
timeout_commit = "5s"

# create empty blocks in 5s interval
create_empty_blocks = true
create_empty_blocks_interval = "0s"

# set if this node runs in a seed mode
seed_mode = false

# output level for logging, including package level options
log_level = "consensus:info,main:info,state:info,*:error"

# maximum number of inbound peers
max_num_inbound_peers = 40

# maximum number of outbound peers to connect to, excluding persistent peers
max_num_outbound_peers = 10

# UPNP port forwarding
upnp = false

# wether to recheck unconfirmed transactions in mempool
recheck = false

  [tendermint.genesis]

  # genesis time
  genesis_time = "2018-11-05T19:22:08.938749Z"

  # blockchain id
  chain_id = "forge"

  # max bytes
  max_bytes = 1200000

  # max gas
  max_gas = -1

  # application hash
  app_hash = ""

  # note that if you don't give this information we will use self as validator
  [[tendermint.genesis.validators]]

# ------------------------------------------------------------------
# ipfs configuration
# ------------------------------------------------------------------

[ipfs]

# path of ipfs
path = "~/.forge/ipfs"

# log path
logpath = "logs"

# max amount for storage
storage_max = "10GB"

# bootstrap ipfs node list
bootstrap = []

# ipfs swarm port
swarm_port = 24001

# ipfs api port
api_port = 25001

# ipfs gateway port
gateway_port = 28080

# max file size for admin/account
max_file_size.admin = "100M"
max_file_size.account = "1M"

# ------------------------------------------------------------------
# cache configuration
# ------------------------------------------------------------------

[cache]

# path for mnesia
path = "~/.forge/cache/mnesia_data_dir"

# cache dump limit
dc_dump_limit = 50

# cache dump log write threshold
dump_log_write_threshold = 50_000

# mnesia table timeout
cache_mnesia_table_timeout = 15_000

# ------------------------------------------------------------------
# geolix configuration
# ------------------------------------------------------------------

[geolix]

# mmdb url
mmdb_url = "https://geolite.maxmind.com/download/geoip/database/GeoLite2-City.tar.gz"

# path for mmdb
mmdb_path = "~/.mmdb/GeoLite2-City.tar.gz"
```
