import React, { useState } from "react";
import { ethers } from "ethers";
import credentialIssuerJson from "../artifacts/contracts/CredentialIssuer.sol/CredentialIssuer.json";

const CREDENTIAL_ISSUER_ADDRESS = "0x1E3D38b55B1110077ff66c6A4e6074B32Db34b3A";
const CREDENTIAL_ISSUER_ABI = credentialIssuerJson.abi;

interface StakeFormProps {
  stakeAmount: number;
  account: string; // We'll no longer rely solely on this value.
  contestOwner: string;
}

const StakeForm: React.FC<StakeFormProps> = ({ stakeAmount, account, contestOwner }) => {
  const [amount, setAmount] = useState(stakeAmount.toString());
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = async () => {
    try {
      setIsStaking(true);
      setTransactionStatus("Staking...");

      if (!window.ethereum) {
        throw new Error("Ethereum wallet not found");
      }

      // Request accounts and get provider and signer
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner(); // await the signer

      // Parse stake amount (assumed to be in ETH)
      const stakeValue = ethers.parseEther(amount);

      // 1. Send ETH to the contest owner
      const paymentTx = await signer.sendTransaction({
        to: contestOwner,
        value: stakeValue,
      });
      setTransactionStatus(`Payment transaction submitted: ${paymentTx.hash}`);
      await paymentTx.wait();
      setTransactionStatus("Payment successful! Issuing NFT...");

      // 2. Get the staker's address directly from the signer
      const staker = await signer.getAddress();

      // 3. Issue NFT credential to the staker via CredentialIssuer contract
      const nftContract = new ethers.Contract(CREDENTIAL_ISSUER_ADDRESS, CREDENTIAL_ISSUER_ABI, signer);
      // For the dataHash, we use a dummy hash here; in a real scenario you might hash file contents or other data.
      const dataHash = ethers.keccak256(ethers.toUtf8Bytes("Stake NFT Credential"));
      const nftTx = await nftContract.issueCredential(staker, dataHash);
      setTransactionStatus(`NFT transaction submitted: ${nftTx.hash}`);
      await nftTx.wait();
      setTransactionStatus("Staking and NFT issuance successful!");
    } catch (error: any) {
      console.error("Staking error:", error);
      setTransactionStatus("Staking failed: " + error.message);
    } finally {
      setIsStaking(false);
    }
  };

  return (
    <div className="mt-4 p-4 bg-gray-50 rounded shadow">
      <h3 className="text-lg font-semibold mb-2 text-gray-800">Stake Tokens</h3>
      <input
        type="number"
        value={amount}
        onChange={(e) => setAmount(e.target.value)}
        className="mb-3 p-2 border border-gray-300 rounded w-full focus:outline-none focus:ring-2 focus:ring-blue-300"
        placeholder="Enter amount (ETH)"
      />
      <button
        onClick={handleStake}
        disabled={isStaking}
        className="w-full px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition disabled:opacity-50"
      >
        {isStaking ? (
          <span className="flex items-center justify-center">
            <svg
              className="animate-spin mr-2 h-5 w-5 text-white"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                className="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                strokeWidth="4"
              ></circle>
              <path
                className="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8H4z"
              ></path>
            </svg>
            Staking...
          </span>
        ) : (
          "Stake"
        )}
      </button>
      {transactionStatus && (
        <p className="mt-2 text-sm text-gray-700">{transactionStatus}</p>
      )}
    </div>
  );
};

export default StakeForm;
