const LZ_ENDPOINTS = require("../constants/layerzeroEndpoints.json")

const hre = require("hardhat")
const fs = require("fs")

async function main() {
  const GmblTokenOFT = await hre.ethers.getContractFactory("GmblTokenOFT")
  const gmblTokenOFT = await (await GmblTokenOFT.deploy(LZ_ENDPOINTS['avalanche'])).deployed()
  console.info("Deployed GmblTokenOFT:", gmblTokenOFT.address)
  const addressFile = `./deployedAddresses/GmblTokenOft.${hre.network.name}`
  fs.mkdirSync('./deployedAddresses/', { recursive: true })
  fs.writeFileSync(addressFile, gmblTokenOFT.address)
  console.info(`Saved address file to: ${addressFile}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
