"use client";

import {
  useAppKit,
  useAppKitAccount,
  useAppKitProvider,
} from "@reown/appkit/react";
import { useEffect, useState } from "react";
import { BrowserProvider, formatEther } from "ethers";
import AmountBox from "./AmountBox";
import DataBox from "./DataBox";

export default function WalletConnectCard() {
  const { open } = useAppKit(); // Control the connect/disconnect actions
  const { address, isConnected } = useAppKitAccount(); // Wallet account info
  const { walletProvider } = useAppKitProvider("eip155"); // Wallet provider

  const [balance, setBalance] = useState(null); // Balance state
  const [NetworkId, setNetworkId] = useState(null); // Chain ID state

  // Fetch the balance and chain ID when the wallet is connected
  const fetchWalletDetails = async () => {
    if (isConnected && walletProvider) {
      try {
        const provider = new BrowserProvider(walletProvider);

        // Fetch the balance
        const balanceInWei = await provider.getBalance(address);
        const balanceInEth = formatEther(balanceInWei);
        setBalance(balanceInEth);

        // Fetch the chain ID
        const network = await provider.getNetwork();
        setNetworkId(network.name); // Store the chain ID
      } catch (error) {
        console.error("Error fetching wallet details:", error);
      }
    }
  };

  useEffect(() => {
    if (isConnected && address && walletProvider) {
      fetchWalletDetails(); // Fetch balance and chain ID
    }
  }, [isConnected, address, walletProvider]);

  // Function to handle wallet connect
  const handleConnect = async () => {
    try {
      await open(); // Open wallet connection modal
    } catch (error) {
      console.error("Failed to connect:", error);
    }
  };

  // Function to handle wallet disconnect
  const handleDisconnect = async () => {
    try {
      setBalance(null); // Clear balance on disconnect
      setNetworkId(null); // Clear chain ID on disconnect
      await open(); // Reopen the wallet connect modal
    } catch (error) {
      console.error("Failed to disconnect and reconnect:", error);
    }
  };

  return (
    <div className="relative max-w-md mx-auto p-6 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-2xl shadow-lg space-y-6 md:space-y-8 transform hover:scale-105 transition-transform duration-300">
      {/* Cocoon-like shapes in the background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-bl from-green-400 to-teal-400 rounded-full opacity-20 blur-2xl scale-150"></div>

      {/* Wallet Status and Address */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-xl font-bold text-lime-300">
          {isConnected ? "Connected" : "Not Connected"}
        </p>
        {isConnected && <DataBox title="User Account" description={address} />}
      </div>

      {/* Display Chain ID */}
      {isConnected && NetworkId && balance && (
        <div className="text-center">
          <AmountBox
            amount={`${
              typeof balance === "number"
                ? balance.toFixed(4)
                : Number(balance).toFixed(4)
            } ETH`}
            description={`${NetworkId} `}
          />
        </div>
      )}

      {/* Wallet Balance */}

      {/* Connect/Disconnect Buttons */}
      <div className="flex justify-center space-x-4">
        {!isConnected ? (
          <button
            onClick={handleConnect}
            className="w-full bg-gradient-to-r from-lime-500 to-green-500 text-white py-2 px-4 rounded-md hover:bg-lime-600 transition-all"
          >
            Connect Wallet
          </button>
        ) : (
          <button
            onClick={handleDisconnect}
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all"
          >
            Disconnect
          </button>
        )}
      </div>
    </div>
  );
}
