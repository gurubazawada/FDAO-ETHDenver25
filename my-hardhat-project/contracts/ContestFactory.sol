// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import "./Contest.sol";

/**
 * @title ContestFactory
 * @notice This factory contract lets any user create a new Contest.
 *         It stores a list of all contests created.
 */
contract ContestFactory {
    // Array of contests created through the factory
    Contest[] public contests;
    
    // Event for logging new contest creation
    event ContestCreated(address contestAddress, string title, address owner);

    /**
     * @notice Creates a new contest with the provided parameters.
     * @param _title Contest title.
     * @param _datasetLink URL/link to the dataset.
     * @param _description Contest description/challenge details.
     * @param _deadline Contest deadline as a Unix timestamp (e.g., for 2025-12-31, use the appropriate Unix time).
     * @param _stakeRequired Stake required for each submission (in wei if using Ether).
     */
    function createContest(
        string memory _title,
        string memory _datasetLink,
        string memory _description,
        uint256 _deadline,
        uint256 _stakeRequired
    ) public {
        Contest newContest = new Contest(
            _title,
            _datasetLink,
            _description,
            _deadline,
            _stakeRequired,
            msg.sender
        );
        contests.push(newContest);
        emit ContestCreated(address(newContest), _title, msg.sender);
    }
    
    /**
     * @notice Returns the number of contests created.
     */
    function getContestsCount() public view returns (uint256) {
        return contests.length;
    }
}
