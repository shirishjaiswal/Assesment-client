import React from "react";

const Table = ({ filteredData }) => {
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
          {filteredData.length > 0 ? (
            filteredData.map((item, index) => (
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
              <td colSpan="6" className="px-4 py-2 text-center text-gray-500">No data available</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
