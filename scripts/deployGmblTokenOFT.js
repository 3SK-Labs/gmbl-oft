const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")

const hre = require("hardhat")
const fs = require("fs")

async function main() {
  const contractName = "GmblTokenOFT"
  console.log(`Deploying ${contractName} to ${hre.network.name}...`)
  const GmblTokenOFT = await hre.ethers.getContractFactory(contractName)
  const gmblTokenOFT = await (await GmblTokenOFT.deploy(LZ_ENDPOINTS[`${hre.network.name}`])).deployed()
  console.info(`Deployed ${contractName}:`, gmblTokenOFT.address)
  const addressFile = `./deployedAddresses/${contractName}.${hre.network.name}`
  fs.mkdirSync('./deployedAddresses/', { recursive: true })
  fs.writeFileSync(addressFile, gmblTokenOFT.address)
  console.info(`Saved address file to: ${addressFile}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
