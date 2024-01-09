require("@nomicfoundation/hardhat-toolbox");
require("dotenv").config()

module.exports = {
  solidity: "0.8.22",
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
