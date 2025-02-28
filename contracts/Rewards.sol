// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC20/ERC20.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

interface ISilo {
    function boostReward(uint256 amount) external returns (uint256);
}

contract Rewards is ERC20, Ownable {
    ISilo public silo;
    address public agentContract;

    event RewardsDistributed(address indexed developer, address indexed dataProvider, uint256 devReward, uint256 providerReward);

    // ✅ Explicitly calling ERC20 and Ownable with owner argument
    constructor(address _silo, address _owner) ERC20("DataSwarm Token", "DSWARM") Ownable(_owner) {
        require(_silo != address(0), "Invalid Silo address");
        require(_owner != address(0), "Invalid owner address");

        _mint(_owner, 1_000_000 * 10 ** decimals()); // Initial supply
        silo = ISilo(_silo);
    }

    function setAgentContract(address _agentContract) external onlyOwner {
        require(_agentContract != address(0), "Invalid address");
        agentContract = _agentContract;
    }

    function distributeRewards(address developer, address dataProvider, uint256 baseReward) external {
        require(msg.sender == agentContract, "Unauthorized");

        uint256 boostedReward = silo.boostReward(baseReward);
        uint256 devReward = (boostedReward * 70) / 100;
        uint256 providerReward = boostedReward - devReward;

        _mint(developer, devReward);
        _mint(dataProvider, providerReward);

        emit RewardsDistributed(developer, dataProvider, devReward, providerReward);
    }
}