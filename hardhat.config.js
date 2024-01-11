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
    arbitrum: {
      url: `${process.env.ARBITRUM_RPC}`,
      accounts: [`${process.env.DEPLOYER_PK}`]
    },
    avalanche: {
      url: `${process.env.AVAX_RPC}`,
      accounts: [`${process.env.DEPLOYER_PK}`]
    }
  },
  etherscan: {
      apiKey: {
          arbitrum: `${process.env.ARBISCAN_API_KEY}`,
      },
      customChains: [
          {
              network: "arbitrum",
              chainId: 42161,
              urls: {
                  apiURL: "https://api.arbiscan.io/api",
                  browserURL: "https:/arbiscan.io/",
              },
          },
      ],
  },
  sourcify: {
      enabled: true,
  }
};
