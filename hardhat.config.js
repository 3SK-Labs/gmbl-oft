require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

module.exports = {
  solidity: {
    version: "0.8.23",
    settings: {
      optimizer: {
        enabled: true,
        runs: 200
      }
    }
  },
  networks: {
    ethereum: {
      url: process.env.ETH_RPC,
      accounts: [process.env.DEPLOYER_PK]
    },
    arbitrum: {
      url: process.env.ARBITRUM_RPC,
      accounts: [process.env.DEPLOYER_PK]
    },
    avalanche: {
      url: process.env.AVAX_RPC,
      accounts: [process.env.DEPLOYER_PK]
    },
    snowtrace: {
      url: 'https://api.avax.network/ext/bc/C/rpc',
      accounts: [process.env.DEPLOYER_PK]
    }
  },
  etherscan: {
      apiKey: {
          arbitrum: process.env.ARBISCAN_API_KEY,
          snowtrace: "snowtrace",
          ethereum: process.env.ETHEREUM_API_KEY,
      },
      customChains: [
        {
            network: "ethereum",
            chainId: 1,
            urls: {
                apiURL: "https://api.etherscan.io/api",
                browserURL: "https://etherscan.io/",
            },
        },
        {
            network: "arbitrum",
            chainId: 42161,
            urls: {
                apiURL: "https://api.arbiscan.io/api",
                browserURL: "https:/arbiscan.io/",
            },
        },
        {
          network: "snowtrace",
          chainId: 43114,
          urls: {
            apiURL: "https://api.routescan.io/v2/network/mainnet/evm/43114/etherscan",
            browserURL: "https://avalanche.routescan.io"
          }
        }
      ]
  },
  sourcify: {
      enabled: true,
  }
};
