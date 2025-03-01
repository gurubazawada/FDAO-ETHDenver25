// SPDX-License-Identifier: MIT
pragma solidity ^0.8.19;

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/access/Ownable.sol";

contract CredentialIssuer is ERC721URIStorage, Ownable {
    uint256 private _tokenIdCounter;

    event CredentialIssued(address indexed provider, uint256 indexed tokenId);

    // Explicitly passing name and symbol to ERC721
    constructor() ERC721("DataSwarm Credentials", "DSCRED") Ownable(_msgSender()) {
        _tokenIdCounter = 1; // Start token IDs from 1
    }

    function issueCredential(address provider, string memory dataHash) external onlyOwner {
        uint256 newTokenId = _tokenIdCounter;
        _tokenIdCounter++;

        _mint(provider, newTokenId);
        _setTokenURI(newTokenId, dataHash);

        emit CredentialIssued(provider, newTokenId);
    }
}