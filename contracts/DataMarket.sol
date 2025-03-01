// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

interface IEthStorage {
    function putBlob(bytes32 key, uint256 blobIdx, uint256 length) external;
}

contract DataMarket is Ownable {
    struct DataEntry {
        string metadata;
        bytes32 ethStorageKey; // Key used to retrieve from EthStorage
        uint256 blobIndex; // Index of the blob within EthStorage
        uint256 dataLength; // Length of the stored data
        address uploader;
    }

    mapping(uint256 => DataEntry) public dataEntries;
    IEthStorage public ethStorage;
    uint256 public dataCounter;

    event DataUploaded(uint256 indexed dataId, bytes32 ethStorageKey, uint256 blobIndex, uint256 dataLength, address indexed uploader);

    constructor(address _ethStorage) Ownable(msg.sender) {
        require(_ethStorage != address(0), "Invalid EthStorage address");
        ethStorage = IEthStorage(_ethStorage);
    }

    function uploadData(bytes32 key, uint256 blobIdx, uint256 length, string memory metadata) external {
        require(bytes(metadata).length > 0, "Metadata cannot be empty");
        require(length <= 131072, "Exceeds max blob size");

        // Call EthStorage to store data
        ethStorage.putBlob(key, blobIdx, length);

        // Store metadata
        uint256 dataId = dataCounter++;
        dataEntries[dataId] = DataEntry(metadata, key, blobIdx, length, msg.sender);

        emit DataUploaded(dataId, key, blobIdx, length, msg.sender);
    }

    function getData(uint256 dataId) external view returns (string memory metadata, bytes32 key, uint256 blobIndex, uint256 dataLength) {
        DataEntry memory entry = dataEntries[dataId];
        return (entry.metadata, entry.ethStorageKey, entry.blobIndex, entry.dataLength);
    }
}