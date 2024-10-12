// components/WalletConnectButton.js
'use client';

import { useState, useEffect } from 'react';
import { useAppKitAccount, useAppKitProvider, useAppKit } from '@reown/appkit/react';
import { BrowserProvider, ethers } from 'ethers';

export default function WalletConnectButton() {
  const { open } = useAppKit(); // Control the modal (connect/disconnect)
  const { address, isConnected, caipAddress, status } = useAppKitAccount(); // Get wallet account info
  const { walletProvider } = useAppKitProvider(); // Get wallet provider

  const [balance, setBalance] = useState(null);

  // Fetch the balance using ethers.js and Reown's wallet provider
  const fetchBalance = async () => {
    if (isConnected && walletProvider) {
      try {
        const provider = new BrowserProvider(walletProvider); // Use the wallet provider from Reown AppKit
        const balanceInWei = await provider.getBalance(address);
        const balanceInEth = ethers.formatEther(balanceInWei);
        setBalance(balanceInEth);
      } catch (error) {
        console.error('Error fetching balance:', error);
      }
    }
  };

  // Fetch the balance when the wallet is connected
  useEffect(() => {
    if (isConnected && address) {
      fetchBalance();
    }
  }, [isConnected, address]);

  // Function to open the wallet connect modal
  const handleOpenModal = async () => {
    try {
      await open(); // Await the modal open process
    } catch (error) {
      console.error('Error opening modal:', error);
    }
  };

  return (
    <div>
      {!isConnected ? (
        <button onClick={handleOpenModal}>Connect Wallet</button>
      ) : (
        <div>
          <p>Address: {address}</p>
          <p>Balance: {balance ? `${balance} ETH` : 'Loading...'}</p>
        </div>
      )}
    </div>
  );
}
