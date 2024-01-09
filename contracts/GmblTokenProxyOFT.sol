pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/ProxyOFTV2.sol";

contract GmblTokenProxyOFT is ProxyOFTV2 {
    constructor(address _token, address _lzEndpoint) ProxyOFTV2(_token, 8, _lzEndpoint){}
}
