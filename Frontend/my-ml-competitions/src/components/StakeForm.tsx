import React, { useState } from "react";

interface StakeFormProps {
  stakeAmount: number;
  account: string;
}

const StakeForm: React.FC<StakeFormProps> = ({ stakeAmount, account }) => {
  const [amount, setAmount] = useState(stakeAmount.toString());
  const [transactionStatus, setTransactionStatus] = useState("");
  const [isStaking, setIsStaking] = useState(false);

  const handleStake = async () => {
    try {
      setIsStaking(true);
      setTransactionStatus("Staking...");
      // Simulate staking process
      await new Promise((resolve) => setTimeout(resolve, 2000));
      setTransactionStatus("Staking successful!");
    } catch (error) {
      console.error("Staking error:", error);
      setTransactionStatus("Staking failed!");
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
        placeholder="Enter amount"
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
