// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract Governance {
    string public metric = "ROI > 5%";

    function getMetric() external view returns (string memory) {
        return metric;
    }
}