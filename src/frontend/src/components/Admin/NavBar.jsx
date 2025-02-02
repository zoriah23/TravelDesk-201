import React from "react";
import Flight from "../Services/Flight/Admin/Flights";
import Hotels from "../Services/Hotel/Admin/Hotels";
import Activities from "../Services/Activities/Admin/Activities";


const Navbar = ({
  setActiveComponent,
  login,
  logout,
  loading,
  activeComponent,
}) => {
  return (
    <nav className=" text-blue-700 text-[1rem] p-4 shadow-md">
      <div className="container mx-auto flex justify-between items-center">
        <h1 className="text-lg font-bold">Manage Services</h1>

        {login() ? (
          <div className="flex items-center space-x-4">
            {loading ? (
              <span className="text-gray-200">Loading...</span>
            ) : (
              <>
                <button
                  className="px-4 py-2 hover:bg-blue-500 hover:text-white rounded-md"
                  onClick={() => setActiveComponent(<Flight />)}
                >
                  Flights
                </button>
                <button
                  className="px-4 py-2 hover:bg-blue-500 hover:text-white rounded-md"
                  onClick={() => setActiveComponent(<Hotels />)}
                >
                  Hotels
                </button>
                <button
                  className="px-4 py-2 hover:bg-blue-500 hover:text-white rounded-md"
                  onClick={() => setActiveComponent(<Activities />)}
                >
                  Activities
                </button>
                <button
                  className="px-4 py-2 bg-blue-500 hover:bg-red-700 text-white rounded-md"
                  onClick={logout}
                >
                  Logout
                </button>
              </>
            )}
          </div>
        ) : (
          <button
            className="px-4 py-2 bg-green-500 hover:bg-green-700 rounded-md"
            onClick={login}
          >
            Login
          </button>
        )}
      </div>

      {/* Active Component Rendered Below */}
      <div className="p-6">{activeComponent}</div>
    </nav>
  );
};

export default Navbar;
