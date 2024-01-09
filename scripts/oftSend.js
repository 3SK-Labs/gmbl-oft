const hre = require("hardhat")
const CHAIN_ID = require("../constants/chainIds.json")

async function main() {
    const sender = (await hre.ethers.getSigners())[0]
    let toAddress = sender.address
    let qty = hre.ethers.utils.parseEther('1')

    const localAddress = '0x236626887687bf6a102269207f8f0A08549Ae4f4'
    const remoteAddress = '0x236626887687bf6a102269207f8f0A08549Ae4f4'

    let toAddressBytes = ethers.utils.defaultAbiCoder.encode(["address"], [toAddress])

    // get remote chain id
    const remoteChainId = CHAIN_ID['avalanche']

    // get local contract
    const localContractInstance = await hre.ethers.getContractAt("GmblTokenProxyOFT", localAddress);

    // quote fee with default adapterParams
    let adapterParams = hre.ethers.utils.solidityPack(["uint16", "uint256"], [1, 200000]) // default adapterParams example

    let fees = await localContractInstance.estimateSendFee(remoteChainId, toAddressBytes, qty, false, adapterParams)
    console.log(`fees[0] (wei): ${fees[0]} / (eth): ${hre.ethers.utils.formatEther(fees[0])}`)

    let tx = await (
        await localContractInstance.sendFrom(
            sender.address, // 'from' address to send tokens
            remoteChainId, // remote LayerZero chainId
            toAddressBytes, // 'to' address to send tokens
            qty, // amount of tokens to send (in wei)
            {
                refundAddress: sender.address,
                zroPaymentAddress: hre.ethers.constants.AddressZero,
                adapterParams,
            },
            { value: fees[0] }
        )
    ).wait()
    console.log(`✅ Message Sent [${hre.network.name}] sendTokens() to OFT @ LZ chainId[${remoteChainId}] token:[${toAddress}]`)
    console.log(` tx: ${tx.transactionHash}`)
    console.log(`* check your address [${sender.address}] on the destination chain, in the ERC20 transaction tab !"`)
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
