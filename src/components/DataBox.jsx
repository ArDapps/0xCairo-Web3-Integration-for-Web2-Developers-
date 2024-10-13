import React from "react";
import { AiOutlineDatabase } from "react-icons/ai";

export default function DataBox({ title, description }) {
  return (
    <div className="bg-blue-900 p-6 rounded-lg shadow-lg hover:bg-blue-800 transition-transform transform hover:scale-105 duration-300">
      <div className="flex items-center space-x-3">
        {/* Icon */}
        <div className="bg-green-500 p-2 rounded-full">
          <AiOutlineDatabase color="white" />
        </div>
        {/* Content */}
        <div>
          <h2 className="text-xl font-bold text-white">{title}</h2>
          <p className="text-sm text-gray-400">{description}</p>
        </div>
      </div>
    </div>
  );
}
