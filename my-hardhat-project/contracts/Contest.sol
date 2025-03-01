// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

/**
 * @title Contest
 * @notice This contract represents a single contest where the owner creates a challenge
 *         (with title, dataset link, description, deadline, and stake required). Participants
 *         can submit their work by providing file references (e.g. IPFS hashes for an ipynb file,
 *         training data, and CSV file) and staking the required tokens (here using payable Ether).
 */
contract Contest {
    // Contest details
    string public title;
    string public datasetLink;
    string public description;
    uint256 public deadline;      // Unix timestamp for contest deadline
    uint256 public stakeRequired; // Amount required to submit (in wei if using Ether)
    address public owner;
    bool public contestClosed;

    // Submission structure
    struct Submission {
        address submitter;
        string ipynbFile;      // e.g., IPFS hash for the .ipynb file
        string trainingData;   // e.g., link or hash for training data
        string csvFile;        // e.g., link or hash for CSV file
        uint256 timestamp;
    }
    
    // Array of submissions
    Submission[] public submissions;
    
    // Events for logging
    event NewSubmission(address indexed submitter, uint256 timestamp);
    event ContestClosed();

    /**
     * @notice Constructor to initialize a contest.
     * @param _title The contest title.
     * @param _datasetLink URL/link to the dataset.
     * @param _description Contest description/challenge details.
     * @param _deadline Contest deadline as a Unix timestamp.
     * @param _stakeRequired The stake required for each submission.
     * @param _owner The contest creator's address.
     */
    constructor(
        string memory _title,
        string memory _datasetLink,
        string memory _description,
        uint256 _deadline,
        uint256 _stakeRequired,
        address _owner
    ) {
        title = _title;
        datasetLink = _datasetLink;
        description = _description;
        deadline = _deadline;
        stakeRequired = _stakeRequired;
        owner = _owner;
        contestClosed = false;
    }
    
    /**
     * @notice Allows a participant to submit their entry.
     * @param ipynbFile A reference (e.g. IPFS hash) to the ipynb file.
     * @param trainingData A reference (e.g. IPFS hash) to the training data.
     * @param csvFile A reference (e.g. IPFS hash) to the CSV file.
     */
    function submit(
        string memory ipynbFile,
        string memory trainingData,
        string memory csvFile
    ) external payable {
        require(block.timestamp < deadline, "Contest deadline passed");
        require(!contestClosed, "Contest is closed");
        require(msg.value == stakeRequired, "Incorrect stake amount");

        // Record the submission
        submissions.push(Submission({
            submitter: msg.sender,
            ipynbFile: ipynbFile,
            trainingData: trainingData,
            csvFile: csvFile,
            timestamp: block.timestamp
        }));

        emit NewSubmission(msg.sender, block.timestamp);
    }
    
    /**
     * @notice Returns the total number of submissions.
     */
    function getSubmissionsCount() external view returns (uint256) {
        return submissions.length;
    }
    
    /**
     * @notice Allows the contest owner to close the contest.
     */
    function closeContest() external {
        require(msg.sender == owner, "Only owner can close contest");
        contestClosed = true;
        emit ContestClosed();
    }
    
    /**
     * @notice Allows the contest owner to withdraw all staked funds.
     */
    function withdrawFunds() external {
        require(msg.sender == owner, "Only owner can withdraw funds");
        payable(owner).transfer(address(this).balance);
    }
}
