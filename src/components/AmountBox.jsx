import React from "react";
import { FaEthereum } from "react-icons/fa";

export default function AmountBox({ amount, description }) {
  return (
    <div className="bg-blue-900 p-6 rounded-lg shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-105 duration-300">
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <div className="bg-green-500 p-2 rounded-full">
          <FaEthereum color="white" />
        </div>
        {/* Content */}
        <div>
          <h2 className="text-2xl font-bold text-white glow-animation">
            {amount}
          </h2>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
