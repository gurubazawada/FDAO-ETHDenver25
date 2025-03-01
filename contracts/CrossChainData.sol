// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IChainlinkCCIP {
    function requestData(bytes calldata requestParams) external returns (bytes memory);
}

contract CrossChainData {
    IChainlinkCCIP public chainlinkCCIP;
    address public dataMarket;

    event DataReceived(bytes data);

    constructor(address _ccip, address _dataMarket) {
        chainlinkCCIP = IChainlinkCCIP(_ccip);
        dataMarket = _dataMarket;
    }

    function fetchData(bytes calldata requestParams) external {
        bytes memory data = chainlinkCCIP.requestData(requestParams);
        emit DataReceived(data);
    }
}