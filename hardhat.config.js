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
  }
};
