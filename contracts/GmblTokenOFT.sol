pragma solidity ^0.8.0;

import "@layerzerolabs/solidity-examples/contracts/token/oft/v2/OFTV2.sol";

contract GmblTokenOFT is OFTV2 {
    constructor(address _lzEndpoint) OFTV2("GMBL COMPUTER CHiP", "GMBL", 8, _lzEndpoint){}
}
