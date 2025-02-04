import React from "react";
import { ChevronDown, HelpCircle, Shield } from "lucide-react";

const AdminNavbar = () => {
  return (
    <nav className="flex justify-between items-center bg-gray-800 px-4 py-2 sticky top-0 z-50">
      <div className="flex items-center space-x-2">
        <Shield className="text-orange-500 w-6 h-6" />
        <span className="text-white font-semibold text-lg">Admin Console</span>
        <button  className="px-4 py-2 rounded bg-gray-700 text-white hover:bg-gray-600">
          ADMIN VIEW
        </button>
      </div>

      <div className="flex items-center space-x-4">
        <HelpCircle className="text-orange-500 w-5 h-5 cursor-pointer" />
        <div className="flex items-center space-x-2">
          <div className="relative w-8 h-8">
            <img
              className="w-full h-full rounded-full"
              src="#"
              alt="User Profile"
            />
            <span className="absolute top-0 right-0 text-xs bg-gray-500 text-white rounded-full px-1">
              J
            </span>
          </div>
          <span className="text-white">Jane</span>
          <ChevronDown className="text-white w-4 h-4 cursor-pointer" />
        </div>
      </div>
    </nav>
  );
};

export default AdminNavbar;
