"use client";

export default function WalletConnectCard() {
  return (
    <div className="relative max-w-md mx-auto p-6 bg-gradient-to-r from-blue-800 to-blue-900 text-white rounded-2xl shadow-lg space-y-6 md:space-y-8 transform hover:scale-105 transition-transform duration-300">
      {/* Cocoon-like shapes in the background */}
      <div className="absolute inset-0 -z-10 bg-gradient-to-br from-blue-600 to-blue-800 rounded-full opacity-30 blur-3xl"></div>
      <div className="absolute inset-0 -z-10 bg-gradient-to-bl from-green-400 to-teal-400 rounded-full opacity-20 blur-2xl scale-150"></div>

      {/* Wallet Status and Address */}
      <div className="flex flex-col items-center space-y-4">
        <p className="text-xl font-bold text-lime-300">Connected</p>
        <div className="bg-gray-800 p-2 rounded-md">
          <p className="text-sm">0x5B38Da6a701c568545dCfcB03FcB875f56beddC4</p>
        </div>
      </div>

      {/* Display Chain ID and Balance */}
      <div className="text-center">
        <div className="bg-gray-800 p-4 rounded-md">
          <p className="text-lg font-semibold">1.2345 ETH</p>
          <p className="text-sm text-gray-400">Ethereum Mainnet</p>
        </div>
      </div>

      {/* Connect/Disconnect Buttons */}
      <div className="flex justify-center space-x-4">
        <button className="w-full bg-gradient-to-r from-red-500 to-pink-500 text-white py-2 px-4 rounded-full hover:bg-red-600 transition-all">
          Disconnect
        </button>
      </div>
    </div>
  );
}
