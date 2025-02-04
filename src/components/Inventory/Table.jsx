import React, { useState } from "react";

const Table = ({ filteredData }) => {
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 5;

  const totalPages = Math.ceil(filteredData.length / itemsPerPage);

  const currentData = filteredData.slice(
    (currentPage - 1) * itemsPerPage,
    currentPage * itemsPerPage
  );

  const handlePageChange = (page) => {
    if (page >= 1 && page <= totalPages) {
      setCurrentPage(page);
    }
  };

  return (
    <div className="overflow-x-auto bg-white shadow-lg rounded-lg">
      <table className="min-w-full table-auto">
        <thead className="bg-[#F59322] text-white text-sm">
          <tr>
            <th className="px-4 py-2 text-left">Product Type</th>
            <th className="px-4 py-2 text-left">Condition</th>
            <th className="px-4 py-2 text-left">Description</th>
            <th className="px-4 py-2 text-left">Title</th>
            <th className="px-4 py-2 text-left">Brand</th>
            <th className="px-4 py-2 text-left">Price</th>
          </tr>
        </thead>
        <tbody className="text-sm text-gray-700">
          {currentData.length > 0 ? (
            currentData.map((item, index) => (
              <tr
                key={index}
                className="bg-white hover:bg-gray-100 transition-all duration-200 ease-in-out"
              >
                <td className="px-4 py-2">{item.product_type}</td>
                <td className="px-4 py-2">{item.condition}</td>
                <td className="px-4 py-2">{item.description}</td>
                <td className="px-4 py-2">{item.title}</td>
                <td className="px-4 py-2">{item.brand}</td>
                <td className="px-4 py-2">${item.price}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="6" className="px-4 py-2 text-center text-gray-500">
                No data available
              </td>
            </tr>
          )}
        </tbody>
      </table>

      {totalPages > 1 && (
        <div className="flex justify-center items-center mt-4 space-x-4">
          <button
            className={`px-4 py-2 bg-gray-300 text-sm font-semibold rounded-md transition-colors duration-300 hover:bg-gray-400 ${
              currentPage === 1 ? "text-gray-400 cursor-not-allowed" : "text-gray-700"
            }`}
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
          >
            Previous
          </button>

          <span className="text-sm font-semibold text-gray-700">
            Page {currentPage} of {totalPages}
          </span>

          <button
            className={`px-4 py-2 bg-gray-300 text-sm font-semibold rounded-md transition-colors duration-300 hover:bg-gray-400 ${
              currentPage === totalPages
                ? "text-gray-400 cursor-not-allowed"
                : "text-gray-700"
            }`}
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      )}
    </div>
  );
};

export default Table;
