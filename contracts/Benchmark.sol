// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

interface IZKVerifier {
    function verifyProof(bytes calldata proof, uint256 roi) external view returns (bool);
}

interface IRewards {
    function distributeRewards(address developer, address dataProvider, uint256 baseReward) external;
}

contract Benchmark {
    IZKVerifier public zkVerifier;
    IRewards public rewardsContract;

    event ProofVerified(address indexed agent, uint256 roi, bool success);

    constructor(address _zkVerifier, address _rewardsContract) {
        require(_zkVerifier != address(0), "Invalid zkVerifier address");
        require(_rewardsContract != address(0), "Invalid Rewards address");

        zkVerifier = IZKVerifier(_zkVerifier);
        rewardsContract = IRewards(_rewardsContract);
    }

    function verifyAndReward(bytes calldata proof, uint256 roi, address agent, address dataProvider) external {
        bool success = zkVerifier.verifyProof(proof, roi);
        emit ProofVerified(agent, roi, success);

        if (success) {
            rewardsContract.distributeRewards(agent, dataProvider, 100 * 10**18); // 100 tokens as base reward
        }
    }
}