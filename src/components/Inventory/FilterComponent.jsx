import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

const brands = ["GMC", "Chevrolet", "Ram", "Cadillac", "Toyota", "Chrysler", "Buick", "Ford"];
const productTypes = ["SUV", "Truck", "Minivan"];

const FilterComponent = ({ filters, onFilterChange, onClose }) => {
  const [localFilters, setLocalFilters] = useState(filters);

  useEffect(() => {
    setLocalFilters(filters);
  }, [filters]);

  const handleCheckboxChange = (e) => {
    const { name, value, checked } = e.target;
    setLocalFilters((prev) => {
      const updatedList = checked
        ? [...prev[name], value]
        : prev[name].filter((item) => item !== value);

      return { ...prev, [name]: updatedList };
    });
  };

  const handleApplyFilters = () => {
    onFilterChange(localFilters);
  };

  const handleRemoveFilters = () => {
    const resetFilters = {
      brand: [],
      productType: [],
    };
    setLocalFilters(resetFilters);
    onFilterChange(resetFilters);
  };

  return (
    <motion.div
      initial={{ x: "100%" }}
      animate={{ x: 0 }}
      transition={{ duration: 0.3 }}
      className="fixed top-0 right-0 h-full w-80 bg-white shadow-lg p-6 space-y-6 overflow-y-auto z-50"
    >
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-xl font-bold text-gray-800">Filter</h2>
        <button
          onClick={onClose}
          className="px-4 py-2 bg-gray-200 rounded-lg hover:bg-gray-300 transition duration-200"
        >
          Close
        </button>
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Brand</label>
        {brands.map((brand) => (
          <div key={brand} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="brand"
              value={brand}
              onChange={handleCheckboxChange}
              checked={localFilters.brand.includes(brand)}
              className="h-4 w-4 text-[#F59322] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{brand}</span>
          </div>
        ))}
      </div>

      <div>
        <label className="block text-sm font-semibold text-gray-700">Product Type</label>
        {productTypes.map((type) => (
          <div key={type} className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="productType"
              value={type}
              onChange={handleCheckboxChange}
              checked={localFilters.productType.includes(type)}
              className="h-4 w-4 text-[#F59322] border-gray-300 rounded"
            />
            <span className="text-sm text-gray-700">{type}</span>
          </div>
        ))}
      </div>

      <div className="flex justify-between items-center mt-6">
        <button
          onClick={handleRemoveFilters}
          className="px-4 py-2 border border-gray-300 rounded-lg text-sm text-gray-700 hover:bg-gray-100 transition duration-200"
        >
          Remove Filters
        </button>
        <button
          onClick={handleApplyFilters}
          className="px-4 py-2 bg-[#F59322] text-white rounded-lg hover:bg-[#D87F1E] transition duration-200"
        >
          Apply Filters
        </button>
      </div>
    </motion.div>
  );
};

export default FilterComponent;
