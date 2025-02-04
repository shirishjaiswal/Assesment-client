import React, { useState } from "react";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";

const BarChartComponent= ({ data }) => {
  const [selectedCondition, setSelectedCondition] = useState("all");

  const conditions = ["all", "new", "used"];

  const filteredData = selectedCondition === "all" 
    ? data 
    : data.filter(item => item.condition === selectedCondition);

  const brandDataMap = filteredData.reduce((brandPrices, item) => {
    const price = parseFloat(item.price.replace(" USD", "").replace(",", ""));
    brandPrices[item.brand] = brandPrices[item.brand] || [];
    brandPrices[item.brand].push(price);
    return brandPrices;
  }, {});

  const chartData = Object.entries(brandDataMap).map(([brand, prices]) => ({
    brand,
    avgPrice: prices.reduce((sum, price) => sum + price, 0) / prices.length,
  }));

  return (
    <div className="w-full h-[500px] p-10">
      <h2 className="text-2xl font-semibold text-gray-700 mb-4">
        Brand Price Analysis by Condition
      </h2>

      <div className="flex gap-4 mb-6">
        {conditions.map(condition => (
          <label
            key={condition}
            className={`px-4 py-2 border rounded-2xl cursor-pointer ${
              selectedCondition === condition
                ? "bg-orange-500 text-white"
                : "bg-gray-200 hover:bg-gray-300"
            }`}
          >
            <input
              type="radio"
              name="condition"
              value={condition}
              checked={selectedCondition === condition}
              onChange={() => setSelectedCondition(condition)}
              className="hidden"
            />
            {condition.toUpperCase()}
          </label>
        ))}
      </div>

      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={chartData}>
          <CartesianGrid strokeDasharray="3 3" />
          <XAxis dataKey="brand" label={{ value: "Brand", position: "insideBottom", offset: -5 }} />
          <YAxis label={{ value: "Average Price (USD)", angle: -90, position: "insideLeft" }} />
          <Tooltip />
          <Legend />
          <Bar dataKey="avgPrice" fill="#F59322" name="Average Price" />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
};

export default BarChartComponent;
