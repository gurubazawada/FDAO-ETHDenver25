import React, { useState } from "react";
import { competitions as initialCompetitions, Competition } from "../data/competitions";
import { useNavigate } from "react-router-dom";

const SponsorDashboard: React.FC<{ walletAddress: string }> = ({ walletAddress }) => {
  const [contests, setContests] = useState<Competition[]>(initialCompetitions);
  const [title, setTitle] = useState("");
  const [datasetLink, setDatasetLink] = useState("");
  const [description, setDescription] = useState("");
  const [deadline, setDeadline] = useState("");
  const [stakeAmount, setStakeAmount] = useState("");
  const navigate = useNavigate();

  const handleCreateContest = (e: React.FormEvent) => {
    e.preventDefault();
    const newContest: Competition = {
      id: (contests.length + 1).toString(),
      title,
      datasetLink,
      description,
      deadline,
      stakeAmount: parseInt(stakeAmount),
      leaderboard: []
    };
    setContests([...contests, newContest]);
    // Reset form
    setTitle("");
    setDatasetLink("");
    setDescription("");
    setDeadline("");
    setStakeAmount("");
  };

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Sponsor Dashboard</h2>
      <div className="bg-white rounded-lg shadow p-6 mb-8">
        <h3 className="text-2xl font-semibold mb-4">Create a Contest</h3>
        <form onSubmit={handleCreateContest} className="space-y-4">
          <div>
            <label className="block font-semibold mb-1">Title</label>
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Dataset Link</label>
            <input type="url" value={datasetLink} onChange={(e) => setDatasetLink(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Description</label>
            <textarea value={description} onChange={(e) => setDescription(e.target.value)} className="w-full p-2 border border-gray-300 rounded" rows={3} required></textarea>
          </div>
          <div>
            <label className="block font-semibold mb-1">Deadline</label>
            <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <div>
            <label className="block font-semibold mb-1">Stake Amount (Tokens)</label>
            <input type="number" value={stakeAmount} onChange={(e) => setStakeAmount(e.target.value)} className="w-full p-2 border border-gray-300 rounded" required />
          </div>
          <button type="submit" className="px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 transition">
            Create Contest
          </button>
        </form>
      </div>

      <div className="bg-white rounded-lg shadow p-6">
        <h3 className="text-2xl font-bold mb-4">Contests Created</h3>
        {contests.length > 0 ? (
          <ul className="space-y-4">
            {contests.map((contest) => (
              <li key={contest.id} className="p-4 border rounded hover:shadow transition">
                <h4 className="text-xl font-semibold">{contest.title}</h4>
                <p>{contest.description}</p>
                <p>
                  <span className="font-semibold">Deadline:</span> {contest.deadline}
                </p>
                <p>
                  <span className="font-semibold">Stake:</span> {contest.stakeAmount} Tokens
                </p>
                <button
                  onClick={() => navigate(`/competition/${contest.id}`)}
                  className="mt-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
                >
                  View Contest
                </button>
              </li>
            ))}
          </ul>
        ) : (
          <p>No contests created yet.</p>
        )}
      </div>
    </div>
  );
};

export default SponsorDashboard;
