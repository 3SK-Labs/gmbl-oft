const hre = require("hardhat")
const fs = require("fs")
const CHAIN_ID = require("../constants/chainIds.json")
const { getDeploymentAddresses } = require("../utils/readStatic")

async function main() {
  // get local contract
  const localContractInstance = await hre.ethers.getContract("GmblTokenOFT")

  // get deployed remote contract address
  const remoteAddress = getDeploymentAddresses()["GmblTokenProxyOFT"]

  // get remote chain id
  const remoteChainId = CHAIN_ID["avalanche"]

  // concat remote and local address
  let remoteAndLocal = hre.ethers.utils.solidityPack(["address", "address"], [remoteAddress, localContractInstance.address])

  // check if pathway is already set
  const isTrustedRemoteSet = await localContractInstance.isTrustedRemote(remoteChainId, remoteAndLocal)

  if (!isTrustedRemoteSet) {
      try {
          let tx = await (await localContractInstance.setTrustedRemote(remoteChainId, remoteAndLocal)).wait()
          console.log(`✅ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
          console.log(` tx: ${tx.transactionHash}`)
      } catch (e) {
          if (e.error.message.includes("The chainId + address is already trusted")) {
              console.log("*source already set*")
          } else {
              console.log(`❌ [${hre.network.name}] setTrustedRemote(${remoteChainId}, ${remoteAndLocal})`)
          }
      }
  } else {
      console.log("*source already set*")
  }
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
