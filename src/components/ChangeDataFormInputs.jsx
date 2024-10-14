"use client";

import React, { useState, useEffect } from "react";
import { ethers } from "ethers";
import { useAppKitProvider, useAppKitAccount } from "@reown/appkit/react";
import { interactWithContractWithETH } from "@/utils/changeDataInContract";
import { useRouter } from "next/navigation"; // For refreshing the router

export default function ChangeDataFormInputs({ lastData }) {
  const { walletProvider } = useAppKitProvider("eip155"); // Wallet provider from Reown
  const { address, isConnected } = useAppKitAccount(); // Get wallet connection status
  const router = useRouter(); // Next.js router for page refresh

  // State to store the new data, ETH amount, network status, and loading state
  const [newValue, setNewValue] = useState(""); // New data to set
  const [ethAmount, setEthAmount] = useState(""); // ETH amount in ether (e.g., 0.0001)
  const [isSepolia, setIsSepolia] = useState(false); // Check if network is Sepolia
  const [loading, setLoading] = useState(false); // Loading state

  // Function to check the network chain ID
  const checkNetwork = async () => {
    if (walletProvider) {
      const provider = new ethers.BrowserProvider(walletProvider);
      const network = await provider.getNetwork();

      console.log(network, "network");
      if (network.name === "sepolia") {
        setIsSepolia(true); // Sepolia network detected
      } else {
        setIsSepolia(false); // Not Sepolia network
      }
    }
  };

  // Check wallet connection and network on component mount
  useEffect(() => {
    if (isConnected && walletProvider) {
      checkNetwork(); // Check network if wallet is connected
    }
  }, [isConnected, walletProvider]);

  // Function to handle change data action
  const changeDataWithPayFees = async () => {
    if (isConnected && isSepolia) {
      setLoading(true); // Set loading state to true when transaction starts
      try {
        const provider = new ethers.BrowserProvider(walletProvider);
        const signer = await provider.getSigner();

        // Call the function to interact with the contract
        const { receipt, error } = await interactWithContractWithETH(
          "changeData",
          [newValue], // Params to pass to changeData
          ethAmount, // ETH amount to send
          signer // Signer to sign the transaction
        );

        if (error) {
          console.error("Error interacting with contract:", error);
        } else {
          console.log("Transaction successful:", receipt);
          // Clear the input fields after success
          setNewValue("");
          setEthAmount("");
          // Refresh the page after the transaction is successful
          router.push("/"); // This will reload the current page
        }
      } catch (error) {
        console.error("Error changing data:", error);
      } finally {
        setLoading(false); // Set loading state to false after transaction completes
      }
    }
  };

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
          disabled={!isConnected || !isSepolia || loading} // Disable if not connected, wrong network, or loading
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
          disabled={!isConnected || !isSepolia || loading} // Disable if not connected, wrong network, or loading
        />

        <button
          onClick={changeDataWithPayFees} // Trigger contract interaction on click
          className={`bg-green-500 hover:bg-green-600 transition-colors duration-300 px-4 py-2 rounded-lg text-white ${
            (!isConnected || !isSepolia || loading) &&
            "opacity-50 cursor-not-allowed"
          }`}
          disabled={!isConnected || !isSepolia || loading} // Disable if not connected, wrong network, or loading
        >
          {loading ? "Processing..." : "Change Data"}
        </button>
      </div>

      {/* Show message if not connected or wrong network */}
      {!isConnected && (
        <p className="text-red-500 text-center">Please connect your wallet.</p>
      )}
      {isConnected && !isSepolia && (
        <p className="text-red-500 text-center">
          Please switch to the Sepolia network.
        </p>
      )}
    </div>
  );
}
