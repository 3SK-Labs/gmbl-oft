const hre = require("hardhat")
const fs = require("fs")

async function main() {
  const GmblTokenProxyOFT = await hre.ethers.getContractFactory("GmblTokenProxyOFT")
  const gmblTokenProxyOFT = await (await GmblTokenProxyOFT.deploy()).deployed()
  console.info("Deployed GmblTokenProxyOFT:", gmblTokenProxyOFT.address)
  const addressFile = `./deployedAddresses/GmblTokenProxyOft.${hre.network.name}`
  fs.mkdirSync('./deployedAddresses/', { recursive: true })
  fs.writeFileSync(addressFile, gmblTokenProxyOFT.address)
  console.info(`Saved address file to: ${addressFile}`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
