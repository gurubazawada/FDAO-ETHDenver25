// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/access/Ownable.sol";

library Counters {
    struct Counter {
        uint256 _value;
    }

    function current(Counter storage counter) internal view returns (uint256) {
        return counter._value;
    }

    function increment(Counter storage counter) internal {
        counter._value += 1;
    }

    function decrement(Counter storage counter) internal {
        require(counter._value > 0, "Counter: decrement overflow");
        counter._value -= 1;
    }

    function reset(Counter storage counter) internal {
        counter._value = 0;
    }
}

interface IEthStorage {
    function storeData(bytes calldata data) external returns (string memory);
}

contract DataMarket is Ownable {
    using Counters for Counters.Counter;
    Counters.Counter private _dataIdCounter;

    IEthStorage public ethStorage;

    struct DataEntry {
        string metadata;
        string ethStorageHash;
        address uploader;
    }

    mapping(uint256 => DataEntry) public dataEntries;

    event DataUploaded(uint256 indexed dataId, string ethStorageHash, string metadata, address indexed uploader);

    // ✅ Pass `_msgSender()` to `Ownable`
    constructor(address _ethStorage) Ownable(msg.sender) {
        require(_ethStorage != address(0), "Invalid EthStorage address");
        ethStorage = IEthStorage(_ethStorage);
    }

    function uploadData(bytes calldata data, string memory metadata) external {
        require(bytes(metadata).length > 0, "Metadata cannot be empty");

        string memory storedHash = ethStorage.storeData(data);
        uint256 dataId = _dataIdCounter.current();
        _dataIdCounter.increment();

        dataEntries[dataId] = DataEntry(metadata, storedHash, msg.sender);
        emit DataUploaded(dataId, storedHash, metadata, msg.sender);
    }

    function getData(uint256 dataId) external view returns (string memory metadata, string memory ethStorageHash) {
        DataEntry memory entry = dataEntries[dataId]; // ✅ Use `memory` instead of `storage`
        return (entry.metadata, entry.ethStorageHash);
    }
}