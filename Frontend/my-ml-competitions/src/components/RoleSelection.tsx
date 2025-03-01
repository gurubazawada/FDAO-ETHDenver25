import React from "react";

interface RoleSelectionProps {
  onSelectRole: (role: "competitor" | "sponsor") => void;
  walletAddress: string;
}

const RoleSelection: React.FC<RoleSelectionProps> = ({ onSelectRole, walletAddress }) => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center space-y-4">
      <h1 className="text-3xl font-bold">Welcome!</h1>
      <p className="text-lg">Logged in as: {walletAddress}</p>
      <div className="flex space-x-6 mt-6">
        <button
          onClick={() => onSelectRole("competitor")}
          className="px-6 py-3 bg-green-500 text-white rounded hover:bg-green-600 transition"
        >
          Enter as Competitor
        </button>
        <button
          onClick={() => onSelectRole("sponsor")}
          className="px-6 py-3 bg-purple-500 text-white rounded hover:bg-purple-600 transition"
        >
          Enter as Sponsor
        </button>
      </div>
    </div>
  );
};

export default RoleSelection;
