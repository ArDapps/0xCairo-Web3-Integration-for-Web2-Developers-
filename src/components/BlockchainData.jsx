"use client";

import React, { useEffect, useState } from "react";
import DataBox from "./DataBox";
import AmountBox from "./AmountBox";
import { useAppKitProvider } from "@reown/appkit/react";
import ChangeDataFormInputs from "./ChangeDataFormInputs";
import { interactWithContract } from "@/utils/interactWithContract";
import { ethers } from "ethers";

export default function BlockchainData() {
  const { walletProvider } = useAppKitProvider("eip155"); // Wallet provider from Reown

  // Create a state object to store all data
  const [blockData, setBlockData] = useState({
    value: "", // The data stored in the contract
    changer: "", // The address of the last person who changed the data
    feePaid: "", // The fee paid for the last change
  });

  // Function to fetch data from the contract

  // Example usage in a component or function
  const fetchData = async () => {
    const { data, error } = await interactWithContract("data", []);
    setBlockData({
      value: data.value,
      changer: data.changer,
      feePaid: ethers.formatEther(data.feePaid), // Format fee from wei to ETH
    });

    if (error) {
      console.error("Error fetching contract data:", error);
    } else {
      console.log("Contract data:", data);
    }
  };

  // Fetch data when the component is mounted and walletProvider is available
  useEffect(() => {
    fetchData(); // Fetch the data when walletProvider is available
  }, []);

  return (
    <div className="max-w-5xl mx-auto p-6 space-y-8">
      {/* Title */}
      <h1 className="text-3xl font-bold text-white">Data at Blockchain</h1>

      {/* Input Box */}
      <ChangeDataFormInputs lastData={blockData} />
      {/* Content Boxes */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {/* Left Content - Display the fetched data */}
        <DataBox
          title={blockData.value ? blockData.value : "Loading data..."}
          description="Web3 Data Avaliable Now" // Show stored value
        />

        {/* Right Content - Display the last fee paid */}
        <AmountBox
          amount={
            blockData.feePaid
              ? ` Pay More Than ${blockData.feePaid} ETH`
              : "Loading..."
          } // Show fee paid
          description={`Last Changed By: ${blockData.changer}`} // Show last changer's address
        />
      </div>
    </div>
  );
}
