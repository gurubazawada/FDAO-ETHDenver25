import React, { useState } from "react";
import { ethers } from "ethers";
import { useNavigate } from "react-router-dom";
import contestFactoryJson from "../artifacts/contracts/contestFactory.sol/ContestFactory.json";

const contestFactoryAddress = "0x23c8748F0c69076bf915e7203F4F7e732d60C46D";
const contestFactoryAbi = contestFactoryJson.abi;

const SponsorDashboard: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
  const [title, setTitle] = useState("");
  const [datasetLink, setDatasetLink] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const [creating, setCreating] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  const navigate = useNavigate();

  const handleCreateContest = async (e: React.FormEvent) => {
    e.preventDefault();
    setErrorMessage("");
    try {
      if (!window.ethereum) {
        setErrorMessage("MetaMask not detected. Please install MetaMask to create a contest.");
        return;
      }
      
      setCreating(true);

      // Request access to the user's MetaMask accounts.
      await window.ethereum.request({ method: "eth_requestAccounts" });
      const provider = new ethers.BrowserProvider(window.ethereum);
      const signer = await provider.getSigner();

      // Create a contract instance for ContestFactory.
      const contestFactoryContract = new ethers.Contract(
        contestFactoryAddress,
        contestFactoryAbi,
        signer
      );

      // Convert the deadline to a Unix timestamp.
      const deadlineTimestamp = Math.floor(new Date(deadline).getTime() / 1000);

      // Convert stake amount from tokens to wei.
      const stakeRequired = ethers.parseEther(stakeAmount);

      // Call the createContest function on the factory contract.
      const tx = await contestFactoryContract.createContest(
        title,
        datasetLink,
        description,
        deadlineTimestamp,
        stakeRequired
      );
      console.log("Transaction submitted:", tx.hash);

      // Wait for the transaction to be mined.
      await tx.wait();
      alert("Contest created successfully!");

      // Reset the form fields.
      setTitle("");
      setDatasetLink("");
      setDescription("");
      setDeadline("");
      setStakeAmount("");
    } catch (error: any) {
      console.error("Error creating contest:", error);
      setErrorMessage(error?.message || "An unknown error occurred while creating the contest.");
    } finally {
      setCreating(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Sponsor Dashboard</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Create a Contest</h3>
        {errorMessage && (
          <div className="mb-4 p-2 bg-red-200 text-red-800 rounded">
            {errorMessage}
          </div>
        )}
        <form onSubmit={handleCreateContest} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Dataset Link</label>
            <input
              type="url"
              value={datasetLink}
              onChange={(e) => setDatasetLink(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              rows={3}
              required
            ></textarea>
          </div>
          <div>
            <label className="block font-semibold mb-1">Deadline</label>
            <input
              type="date"
              value={deadline}
              onChange={(e) => setDeadline(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <div>
            <label className="block font-semibold mb-1">Stake Amount (Tokens)</label>
            <input
              type="number"
              step="any"
              value={stakeAmount}
              onChange={(e) => setStakeAmount(e.target.value)}
              className="w-full p-2 border border-gray-300 rounded"
              required
            />
          </div>
          <button
            type="submit"
            disabled={creating}
            className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition"
          >
            {creating ? "Creating Contest..." : "Create Contest"}
          </button>
        </form>
      </div>
    </div>
  );
};

export default SponsorDashboard;
