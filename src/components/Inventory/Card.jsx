import React from "react";

const Card = ({ item }) => {
  return (
    <div className="bg-white shadow-lg rounded-lg overflow-hidden min-w-[200px] flex-shrink-0 m-2">
      <div className="p-4">
        <h1 className="text-3xl font-bold p-2">{item.numberOfValues}</h1>
        <h2 className="text-xl font-semibold text-[#F59322]">#{item.title}</h2>
      </div>
    </div>
  );
}

export default Card;