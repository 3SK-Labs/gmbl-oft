# gmbl-oft

LayerZero OFT contracts for:

1. wrapping original GMBL token on arbitrum in a ProxyOFT
2. deploying an GMBL OFT contract to AVAX so the GMBL token can be bridged their

## arbitrum verification

```bash
$ npx hardhat verify --constructor-args constants/arb_arguments.js --contract "contracts/GmblTokenProxyOFT.sol:GmblTokenProxyOFT" --network arbitrum 0x236626887687bf6a102269207f8f0A08549Ae4f4
```
