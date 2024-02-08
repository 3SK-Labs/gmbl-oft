const hre = require("hardhat")
const CHAIN_ID = require("../constants/chainIds.json")

async function main() {
    const address = '0xFbf1a6a5b0758Db15A7AaAe403DbbE7A9cc8670A'
    const contract = await hre.ethers.getContractAt("GmblTokenOFT", address);
    const dstChainId = CHAIN_ID['arbitrum']
    const tx = await contract.setMinDstGas(dstChainId, 0, 100000)

    console.log(`[${hre.network.name}] setMinDstGas tx hash ${tx.hash}`)
    await tx.wait()
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
