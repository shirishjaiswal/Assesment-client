import React, { useEffect, useState } from "react";
import FilterComponent from "./FilterComponent";
import Table from "./Table";
import Card from "./Card";
import BarChartComponent from "./BarChartComponent";

const defaultCardData = [
  { numberOfValues: 0, title: "total" },
  { numberOfValues: 0, title: "new" },
  { numberOfValues: 0, title: "used" },
  { numberOfValues: 0, title: "cpo" },
];

const DataComponent = () => {
  const [data, setData] = useState([]);
  const [filteredData, setFilteredData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [filters, setFilters] = useState({
    brand: [],
    productType: [],
  });
  const [showFilter, setShowFilter] = useState(false);
  const [cardData, setCardData] = useState(defaultCardData);

  useEffect(() => {
    const savedFilters = JSON.parse(localStorage.getItem("filters"));
    if (savedFilters) {
      setFilters(savedFilters);
      filterData(savedFilters);
    }

    const fetchData = async () => {
      try {
        const response = await fetch("http://localhost:5000/api/inventory");
        if (!response.ok) {
          throw new Error("Network response was not ok");
        }
        const result = await response.json();
        setData(result);
        setFilteredData(result);
        const cardValues = [...defaultCardData];
        result.forEach((item) => {
          if (item.condition === "new") {
            cardValues[1].numberOfValues += 1;
          } else if (item.condition === "used") {
            cardValues[2].numberOfValues += 1;
          } else if (item.condition === "cpo") {
            cardValues[3].numberOfValues += 1;
          }
          cardValues[0].numberOfValues += 1;
        });

        setCardData(cardValues);
      } catch (error) {
        setError("Failed to fetch data");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const filterData = (filters) => {
    let filtered = [...data];

    if (filters.brand.length > 0) {
      filtered = filtered.filter((item) => filters.brand.includes(item.brand));
    }

    if (filters.productType.length > 0) {
      filtered = filtered.filter((item) => filters.productType.includes(item.product_type));
    }

    setFilteredData(filtered);
    const cardValues = [...defaultCardData];
    filtered.forEach((item) => {
      if (item.condition === "new") {
        cardValues[1].numberOfValues += 1;
      } else if (item.condition === "used") {
        cardValues[2].numberOfValues += 1;
      } else if (item.condition === "cpo") {
        cardValues[3].numberOfValues += 1;
      }
      cardValues[0].numberOfValues += 1;
    });

    setCardData(cardValues);
  };

  const handleFilterChange = (newFilters) => {
    setFilters(newFilters);
    localStorage.setItem("filters", JSON.stringify(newFilters)); // Save filters to localStorage
    filterData(newFilters);
  };

  const handleFilterClose = () => {
    setShowFilter(false);
  };

  if (loading) return <div>Loading...</div>;
  if (error) return <div>{error}</div>;
  return (
    <div className="p-8 max-w-full mx-auto">
      <h1 className="text-3xl font-semibold text-gray-800 mb-6">
        Data from Server
      </h1>
  
      <button
        onClick={() => setShowFilter(true)}
        className="px-6 py-2 bg-[#F59322] text-white rounded-lg shadow-md hover:bg-[#D87F1E] transition duration-200 mb-6"
      >
        Filter Data
      </button>
  
      {showFilter && (
        <FilterComponent
          filters={filters}
          onFilterChange={handleFilterChange}
          onClose={handleFilterClose}
        />
      )}
  
      {/* Cards Section */}
      <div className="flex flex-row  overflow-x-auto min-w-[200px] mb-10">
        {cardData.map((item, index) => (
          <Card key={index} item={item} />
        ))}
      </div>
  
      {/* Chart Section */}
      <div className="mb-20">
        <BarChartComponent data={filteredData} />
      </div>
  
      {/* Table Section */}
      <div className="overflow-x-auto">
        <Table filteredData={filteredData} />
      </div>
    </div>
  );
  
};

export default DataComponent;
