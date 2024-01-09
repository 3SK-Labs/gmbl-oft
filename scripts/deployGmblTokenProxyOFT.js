const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")

const hre = require("hardhat")
const fs = require("fs")

async function main() {
  const contractName = "GmblTokenProxyOFT"
  const gmblTokenAddr = '0xE9A5aF50874c0ef2748b5DB70104B5ccb5557f6d';
  const GmblTokenProxyOFT = await hre.ethers.getContractFactory(contractName)
  const gmblTokenProxyOFT = await (await GmblTokenProxyOFT.deploy(gmblTokenAddr, LZ_ENDPOINTS[`${hre.network.name}`])).deployed()
  console.info("Deployed ${contractName}:", gmblTokenProxyOFT.address)
  const addressFile = `./deployedAddresses/${contractName}.${hre.network.name}`
  fs.mkdirSync('./deployedAddresses/', { recursive: true })
  fs.writeFileSync(addressFile, gmblTokenProxyOFT.address)
  console.info(`Saved address file to: ${addressFile}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
