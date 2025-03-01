import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { ethers } from "ethers";
import contestJson from "../artifacts/contracts/contest.sol/Contest.json";

import FileUpload from "./FileUpload";
import StakeForm from "./StakeForm";

interface CompetitionDetailProps {
  walletAddress: string;
}

interface Competition {
  id: string;
  title: string;
  description: string;
  datasetLink: string;
  deadline: string;
  stakeAmount: string;
  owner: string;
}

const contestAbi = contestJson.abi;

const CompetitionDetail: React.FC<CompetitionDetailProps> = ({ walletAddress }) => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [competition, setCompetition] = useState<Competition | null>(null);
  const [loading, setLoading] = useState(true);

  // File upload states (adjust as needed)
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [trainingFile, setTrainingFile] = useState<File | null>(null);

  useEffect(() => {
    const fetchContestDetails = async () => {
      try {
        if (!id) {
          throw new Error("No contest address (id) found in URL.");
        }
        if (!window.ethereum) {
          throw new Error("No Ethereum wallet found. Please install MetaMask.");
        }

        await window.ethereum.request({ method: "eth_requestAccounts" });
        const provider = new ethers.BrowserProvider(window.ethereum);
        const contract = new ethers.Contract(id, contestAbi, provider);

        // Fetch contest details from the contract.
        const title = await contract.title();
        const description = await contract.description();
        const datasetLink = await contract.datasetLink();
        const deadlineBN = await contract.deadline();
        const stakeRequiredBN = await contract.stakeRequired();
        // Fetch contest owner (make sure your contest contract has an owner() function)
        const owner = await contract.owner();

        const deadline = new Date(Number(deadlineBN) * 1000).toLocaleString();
        const stakeAmount = ethers.formatUnits(stakeRequiredBN, "ether");

        setCompetition({
          id,
          title,
          description,
          datasetLink,
          deadline,
          stakeAmount,
          owner,
        });
      } catch (err) {
        console.error("Error loading contest details:", err);
      } finally {
        setLoading(false);
      }
    };
    fetchContestDetails();
  }, [id]);

  if (loading || !competition) {
    return <div>Loading competition...</div>;
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      {/* Back Button */}
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        &larr; Back
      </button>

      {/* Competition Details */}
      <div className="bg-white rounded-lg shadow p-6">
        <h2 className="text-3xl font-bold mb-4">{competition.title}</h2>
        <p className="mb-4">{competition.description}</p>
        <p className="mb-2">
          <span className="font-semibold">Deadline:</span> {competition.deadline}
        </p>
        <p className="mb-2">
          <span className="font-semibold">Dataset:</span>{" "}
          <a
            href={competition.datasetLink}
            target="_blank"
            rel="noopener noreferrer"
            className="text-blue-600 hover:underline"
          >
            {competition.datasetLink}
          </a>
        </p>
        <p className="mb-4">
          <span className="font-semibold">Stake Required:</span> {competition.stakeAmount} Tokens
        </p>
        <p className="mb-4">
          <span className="font-semibold">Contest Owner:</span> {competition.owner}
        </p>

        {/* Upload File (ipynb) */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Upload File (ipynb)</label>
          <FileUpload
            text="Upload ipynb File"
            onFileSelect={(files) => {
              console.log("Uploaded ipynb:", files);
              setUploadedFile(files[0]);
            }}
          />
        </div>

        {/* Upload Training Data (CSV) */}
        <div className="mb-4">
          <label className="block font-semibold mb-1">Upload Training Data</label>
          <FileUpload
            text="Upload csv File"
            onFileSelect={(files) => {
              console.log("Training data file:", files);
              setTrainingFile(files[0]);
            }}
          />
        </div>

        {/* StakeForm: includes contestOwner so that the payment is sent to them, and NFT is issued */}
        <StakeForm
          stakeAmount={parseFloat(competition.stakeAmount)}
          account={walletAddress}
          contestOwner={competition.owner}
        />
      </div>

      {/* Leaderboard section - placeholder */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-bold mb-4">Leaderboard</h3>
        <p>No leaderboard data available.</p>
      </div>
    </div>
  );
};

export default CompetitionDetail;
