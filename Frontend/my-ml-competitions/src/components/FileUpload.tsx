import React, { useState } from "react";
import { ethers } from "ethers";
import FileUpload from "./FileUpload"; // Use the FileUpload component without submit buttons
import json from "../../../../my-hardhat-project/artifacts/contracts/CredentialIssuer.sol/CredentialIssuer.json"
// Replace with your deployed contract address
const CONTRACT_ADDRESS = "0x1E3D38b55B1110077ff66c6A4e6074B32Db34b3A";

// Minimal ABI for CredentialIssuer contract
const CONTRACT_ABI = json.abi

const NFTMinter: React.FC = () => {
  const [status, setStatus] = useState("");

  const handleFileSelect = async (files: File[]) => {
    if (files.length === 0) {
      setStatus("No file selected");
      return;
    }
    const file = files[0];

    try {
      // Read the file as an ArrayBuffer
      const fileBuffer = await file.arrayBuffer();

      // Compute a keccak256 hash of the file contents
      const fileHash = ethers.utils.keccak256(new Uint8Array(fileBuffer));
      setStatus(`File hashed: ${fileHash}`);

      // Check for MetaMask or another Ethereum provider
      if (!window.ethereum) {
        setStatus("MetaMask not detected");
        return;
      }

      // Request user accounts
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.providers.Web3Provider(window.ethereum);
      const signer = provider.getSigner();
      const userAddress = await signer.getAddress();

      // Connect to the CredentialIssuer contract
      const contract = new ethers.Contract(CONTRACT_ADDRESS, CONTRACT_ABI, signer);

      // Mint the NFT by calling issueCredential with the user's address and file hash
      setStatus("Submitting transaction...");
      const tx = await contract.issueCredential(userAddress, fileHash);
      setStatus(`Transaction submitted: ${tx.hash}`);

      // Wait for the transaction to be mined
      await tx.wait();
      setStatus("NFT minted successfully!");
    } catch (error: any) {
      console.error(error);
      setStatus("Error: " + error.message);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-xl font-bold mb-4">Mint Your NFT Credential</h1>
      <FileUpload
        text="Select File to Mint NFT"
        onFileSelect={(files) => handleFileSelect(files)}
        accept= ".ipynb,.txt,.json"
        multiple={false}
      />
      {status && <p className="mt-4 text-sm text-gray-700">{status}</p>}
    </div>
  );
};

export default NFTMinter;
