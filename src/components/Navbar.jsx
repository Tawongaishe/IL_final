import React from "react";
import { Link } from "react-router-dom";


const Navbar = () => {
  return (
    <nav className="bg-emerald-600 text-white p-4 shadow-md">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <h1 className="text-2xl font-bold">
          <Link to="/" className="hover:underline">
            Income Explorer
          </Link>
        </h1>
        <ul className="flex space-x-6">
          <li>
            <Link
              to="/"
              className="hover:underline text-white font-medium"
            >
              Calculator
            </Link>
          </li>
          <li>
            <Link
              to="/authors"
              className="hover:underline text-white font-medium"
            >
              About Us
            </Link>
          </li>
          <li>
            <Link
              to="/methodology"
              className="hover:underline text-white font-medium"
            >
              Methodology
            </Link>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
