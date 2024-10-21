"use client";

import React, { useState, useEffect } from "react";
import { useRouter } from "next/navigation"; // For refreshing the router

export default function ChangeDataFormInputs({ lastData }) {
  const router = useRouter(); // Next.js router for page refresh

  // State to store the new data, ETH amount, network status, and loading state
  const [newValue, setNewValue] = useState(""); // New data to set
  const [ethAmount, setEthAmount] = useState(""); // ETH amount in ether (e.g., 0.0001)
  const [isSepolia, setIsSepolia] = useState(true); // Check if network is Sepolia
  const [loading, setLoading] = useState(false); // Loading state

  // Function to handle change data action
  const changeDataWithPayFees = async () => {};

  return (
    <div className="max-w-5xl mx-auto space-y-8">
      {/* Input for new data */}
      <div className="flex items-center space-x-4 bg-gray-800 p-12 rounded-lg shadow-lg">
        <input
          type="text"
          value={newValue}
          onChange={(e) => setNewValue(e.target.value)} // Update the newValue state
          placeholder="Add New Data"
          className="flex-grow bg-transparent text-white focus:outline-none"
        />
      </div>

      {/* Input for ETH amount */}
      <div className="flex items-center space-x-4 bg-gray-800 p-3 rounded-lg shadow-lg">
        <input
          type="number"
          value={ethAmount}
          onChange={(e) => setEthAmount(e.target.value)} // Update the ethAmount state
          placeholder="How Much to Pay in ETH (e.g., 0.0001 ETH)"
          className="flex-grow bg-transparent text-white focus:outline-none"
        />

        <button
          onClick={changeDataWithPayFees} // Trigger contract interaction on click
          className={`bg-green-500 hover:bg-green-600 transition-colors duration-300 px-4 py-2 rounded-lg text-white ${"opacity-50 cursor-not-allowed"}`}
          // Disable if not connected, wrong network, or loading
        >
          {loading ? "Processing..." : "Change Data"}
        </button>
      </div>

      {/* Show message if not connected or wrong network */}
    </div>
  );
}
