import React, { useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { competitions } from "../data/competitions";
import FileUpload from "./FileUpload";
import StakeForm from "./StakeForm";

interface CompetitionDetailProps {
  walletAddress: string;
}

const CompetitionDetail: React.FC<CompetitionDetailProps> = ({ walletAddress }) => {
  const { id } = useParams();
  const navigate = useNavigate();
  const competition = competitions.find((comp) => comp.id === id);
  const [uploadedFile, setUploadedFile] = useState<File | null>(null);
  const [trainingData, setTrainingData] = useState<string>("");

  if (!competition) {
    return (
      <div className="max-w-3xl mx-auto p-4">
        <h2 className="text-xl font-semibold">Competition not found</h2>
      </div>
    );
  }

  return (
    <div className="max-w-3xl mx-auto p-4 space-y-6">
      <button
        onClick={() => navigate(-1)}
        className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
      >
        &larr; Back
      </button>
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

        <div className="mb-4">
          <label className="block font-semibold mb-1">Upload File (ipynb)</label>
          <FileUpload onFileSelect={(file) => setUploadedFile(file)} />
        </div>

        <div className="mb-4">
          <label className="block font-semibold mb-1">Provide Training Data</label>
          <textarea
            value={trainingData}
            onChange={(e) => setTrainingData(e.target.value)}
            placeholder="Enter data or a link to your training data"
            className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-300"
            rows={4}
          />
        </div>

        <StakeForm stakeAmount={competition.stakeAmount} account={walletAddress} />
      </div>

      {/* Leaderboard */}
      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-bold mb-4">Leaderboard</h3>
        {competition.leaderboard && competition.leaderboard.length > 0 ? (
          <table className="w-full text-left">
            <thead>
              <tr className="border-b">
                <th className="py-2">Rank</th>
                <th className="py-2">Model Name</th>
                <th className="py-2">Accuracy (%)</th>
              </tr>
            </thead>
            <tbody>
              {competition.leaderboard.map((entry) => (
                <tr key={entry.rank} className="odd:bg-gray-100">
                  <td className="py-2 border-b">{entry.rank}</td>
                  <td className="py-2 border-b">{entry.modelName}</td>
                  <td className="py-2 border-b">{entry.accuracy.toFixed(2)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        ) : (
          <p>No leaderboard data available.</p>
        )}
      </div>
    </div>
  );
};

export default CompetitionDetail;
