import React from 'react';


const Leaderboard = () => {
  // Dummy data for leaderboard entries.
  // Replace this with real data and logic as needed.
  const leaderboardData = [
    { address: '0x123...abc', score: 95 },
    { address: '0x456...def', score: 90 },
    { address: '0x789...ghi', score: 85 },
  ];

  return (
    <div>
      <h1 className="text-2xl font-bold mb-4 text-center">Leaderboard</h1>
      <ul className="max-w-md mx-auto">
        {leaderboardData.map((entry, index) => (
          <li
            key={index}
            className="flex justify-between border-b border-gray-300 py-2"
          >
            <span>{entry.address}</span>
            <span>{entry.score}</span>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Leaderboard;
