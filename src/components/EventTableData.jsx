// EventTableData.jsx
"use client";

import React from "react";

export const EventTableData = () => {
  // Static event data
  const eventData = [
    {
      changer: "0x5B38Da6a701c568545dCfcB03FcB875f56beddC4",
      newValue: "New Data Value 1",
      feePaid: "0.05",
      blockNumber: 123456,
    },
    {
      changer: "0xAb8483F64d9C6d1EcF9b849Ae677dD3315835cA2",
      newValue: "New Data Value 2",
      feePaid: "0.03",
      blockNumber: 123457,
    },
    {
      changer: "0x4B0897b0513fdc7C541B6d9D7E929C4e5364D2dB",
      newValue: "New Data Value 3",
      feePaid: "0.07",
      blockNumber: 123458,
    },
  ];

  // Pagination variables (optional, since data is static and small)
  const currentPage = 1;
  const eventsPerPage = 3;
  const totalPages = Math.ceil(eventData.length / eventsPerPage);

  // Slice the static data for pagination (optional)
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventData.slice(indexOfFirstEvent, indexOfLastEvent);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Data Change Events</h2>
      <table className="min-w-full text-sm bg-gray-800 rounded-md">
        <thead>
          <tr className="bg-gray-700 text-gray-200">
            <th className="py-3 px-6 text-left">Changer</th>
            <th className="py-3 px-6 text-left">Last Value</th>
            <th className="py-3 px-6 text-left">Fee Paid (ETH)</th>
            <th className="py-3 px-6 text-left">Block Number</th>
          </tr>
        </thead>
        <tbody>
          {currentEvents.length > 0 ? (
            currentEvents.map((event, index) => (
              <tr
                key={index}
                className={`${
                  index % 2 === 1 ? "bg-gray-700" : "bg-gray-800"
                } hover:bg-gray-600 transition-colors duration-200`}
              >
                <td className="py-3 px-6">{event.changer}</td>
                <td className="py-3 px-6">{event.newValue}</td>
                <td className="py-3 px-6">{event.feePaid} ETH</td>
                <td className="py-3 px-6">{event.blockNumber}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center py-6">
                No events found
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {/* Pagination Controls (Optional, since data is static and limited) */}
      {eventData.length > 0 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:bg-gray-500"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              className={`px-3 py-1 rounded ${
                currentPage === index + 1
                  ? "bg-blue-500 text-white"
                  : "bg-gray-700 text-gray-300 hover:bg-blue-500 hover:text-white"
              }`}
            >
              {index + 1}
            </button>
          ))}
          <button
            disabled={currentPage === totalPages}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:bg-gray-500"
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};
