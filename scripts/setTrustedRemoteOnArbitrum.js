const hre = require("hardhat")
const fs = require("fs")
const CHAIN_ID = require("../constants/chainIds.json")

async function main() {
  // get deployed remote contract address
  const localAddress = '0x236626887687bf6a102269207f8f0A08549Ae4f4'
  const remoteAddress = '0x236626887687bf6a102269207f8f0A08549Ae4f4'

  // get local contract
  const localContractInstance = await hre.ethers.getContractAt("GmblTokenProxyOFT", localAddress);

  // get remote chain id
  const remoteChainId = CHAIN_ID["avalanche"]

  // concat remote and local address
  let remoteAndLocal = hre.ethers.utils.solidityPack(["address", "address"], [remoteAddress, localAddress])

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
