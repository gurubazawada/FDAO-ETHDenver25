// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

contract DummyZKVerifier {
    // A dummy implementation that simply returns true if roi > 0
    function verifyProof(bytes calldata /*proof*/, uint256 roi) external pure returns (bool) {
        return roi > 0;
    }
}
