import { contractProvider } from "@/utils/contract_provider";
import { useAppKitAccount } from "@reown/appkit/react";
import { ethers, formatUnits } from "ethers";
import React, { useEffect, useState } from "react";

export const EventTableData = () => {
  const { address, isConnected } = useAppKitAccount();
  const [eventData, setEventData] = useState([]);
  const [errorMessage, setErrorMessage] = useState("");
  const [currentPage, setCurrentPage] = useState(1); // Track current page
  const eventsPerPage = 3; // Number of events per page

  const getChangeDataEvents = async () => {
    try {
      const { contract } = await contractProvider();
      const dataChangedFilter = contract.filters.DataChanged();
      const eventData = await contract.queryFilter(dataChangedFilter);
      const allEvents = [...eventData].sort(
        (a, b) => a.blockNumber - b.blockNumber
      );
      setEventData(allEvents);
    } catch (error) {
      console.error("Error fetching dataChangedFilter events:", error);
      setErrorMessage("Failed to fetch dataChangedFilter events.");
    }
  };

  useEffect(() => {
    getChangeDataEvents();
  }, []);

  // Calculate the index range for current page
  const indexOfLastEvent = currentPage * eventsPerPage;
  const indexOfFirstEvent = indexOfLastEvent - eventsPerPage;
  const currentEvents = eventData.slice(indexOfFirstEvent, indexOfLastEvent); // Events for current page

  // Calculate total pages
  const totalPages = Math.ceil(eventData.length / eventsPerPage);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  return (
    <div className="p-6 bg-gray-900 text-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Data Change Events</h2>
      {errorMessage && <p className="text-red-500">{errorMessage}</p>}
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
                <td className="py-3 px-6">{event.args.changer}</td>
                <td className="py-3 px-6">{event.args.newValue}</td>
                <td className="py-3 px-6">
                  {formatUnits(event.args.feePaid, 18)} ETH
                </td>
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

      {/* Pagination Controls */}
      {eventData.length > 0 && (
        <div className="mt-4 flex justify-center space-x-2">
          <button
            onClick={() => paginate(currentPage - 1)}
            disabled={currentPage === 1}
            className="px-3 py-1 bg-gray-700 text-white rounded disabled:bg-gray-500"
          >
            Prev
          </button>
          {Array.from({ length: totalPages }, (_, index) => (
            <button
              key={index}
              onClick={() => paginate(index + 1)}
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
            onClick={() => paginate(currentPage + 1)}
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
