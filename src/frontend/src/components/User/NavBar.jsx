import React from 'react'
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <div>
      <nav className="bg-blue-600 text-white shadow-md">
        <div className="container mx-auto flex justify-between items-center p-4">
          <Link
            to="/user?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai"
            className="text-lg font-bold tracking-wide"
          >
            Travel Desk
          </Link>

          {/* Navigation Links */}
          <div className="space-x-6 hidden md:flex">
            <Link
              to="/flights?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai"
              className="hover:text-gray-300"
            >
              Flights
            </Link>
            <Link
              to="/hotels?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai"
              className="hover:text-gray-300"
            >
              Hotels
            </Link>
            <Link
              to="/activities?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai"
              className="hover:text-gray-300"
            >
              Activities
            </Link>
          </div>

          {/* Login/Logout Button */}
        </div>
      </nav>
    </div>
  );
}

export default NavBar