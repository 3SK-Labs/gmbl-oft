const hre = require("hardhat")
const CHAIN_ID = require("../constants/chainIds.json")

async function main() {
    const address = '0x236626887687bf6a102269207f8f0A08549Ae4f4'
    const contract = await hre.ethers.getContractAt("GmblTokenProxyOFT", address);
    const dstChainId = CHAIN_ID['avalanche']
    const tx = await contract.setMinDstGas(dstChainId, 0, 100000)

    console.log(`[${hre.network.name}] setMinDstGas tx hash ${tx.hash}`)
    await tx.wait()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
