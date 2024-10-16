"use client";

import React, { useEffect, useState } from "react";
import DataBox from "./DataBox";
import AmountBox from "./AmountBox";
import { useAppKitProvider } from "@reown/appkit/react";
import ChangeDataFormInputs from "./ChangeDataFormInputs";
import { interactWithContract } from "@/utils/interactWithContract";
import { ethers } from "ethers";
import { EventTableData } from "./EventTableData";

export default function BlockchainData() {
  const { walletProvider } = useAppKitProvider("eip155"); // Wallet provider from Reown

  // Create a state object to store all data
  const [blockData, setBlockData] = useState({
    value: "Sample Data Value",
    changer: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
    feePaid: "0.05", // ETH// The fee paid for the last change
  });

  // Function to fetch data from the contract

  // Example usage in a component or function

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
      <EventTableData />
    </div>
  );
}
