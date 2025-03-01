import React from "react";
import { competitions } from "../data/competitions";
import { useNavigate } from "react-router-dom";

const CompetitionList: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="max-w-4xl mx-auto p-4">
      <h2 className="text-3xl font-bold text-center mb-8">Active Competitions</h2>
      <div className="grid gap-6">
        {competitions.map((comp) => (
          <div key={comp.id} className="bg-white rounded-lg shadow p-6 hover:shadow-lg transition">
            <h3 className="text-2xl font-semibold mb-2">{comp.title}</h3>
            <p className="mb-2">{comp.description}</p>
            <p className="mb-2">
              <span className="font-semibold">Deadline:</span> {comp.deadline}
            </p>
            <p className="mb-4">
              <span className="font-semibold">Stake:</span> {comp.stakeAmount} Tokens
            </p>
            <button
              onClick={() => navigate(`/competition/${comp.id}`)}
              className="px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 transition"
            >
              View Details
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default CompetitionList;
