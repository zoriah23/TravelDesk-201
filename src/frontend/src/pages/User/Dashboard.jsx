import React from 'react'
import { Link } from 'react-router-dom';

import { login, logout } from "../../utils/auth";
import NavBar from '../../components/User/NavBar';

const UserDashboard = () => {
  return (
    <>
       <div className="min-h-screen bg-gray-100 text-gray-900">
      {login() ? (
        <>
          <NavBar />
          <div className="max-w-4xl mx-auto p-6 bg-white shadow-lg rounded-lg mt-10">
            <h1 className="text-3xl font-bold text-center mb-4">Welcome to Travel Desk</h1>
            <p className="text-center text-gray-600 mb-6">
              Travel Desk helps you book flights, hotels, and activities seamlessly.
            </p>
            
            <div className="space-y-6">
              <div>
                <h2 className="text-2xl font-semibold">Flights</h2>
                <p className="text-gray-600">Book flights to your favorite destinations.</p>
                <Link 
                  to="/flights?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" 
                  className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View Flights
                </Link>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold">Hotels</h2>
                <p className="text-gray-600">Book hotels in your favorite cities.</p>
                <Link 
                  to="/hotels?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" 
                  className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View Hotels
                </Link>
              </div>
              
              <div>
                <h2 className="text-2xl font-semibold">Activities</h2>
                <p className="text-gray-600">Book activities in your favorite cities.</p>
                <Link 
                  to="/activities?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai" 
                  className="inline-block mt-2 px-4 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600"
                >
                  View Activities
                </Link>
              </div>
            </div>
            
            <div className="mt-6">
              <h2 className="text-2xl font-semibold">Search</h2>
              <p className="text-gray-600">Search for flights, hotels, and activities.</p>
              <input 
                type="text" 
                className="w-full mt-2 p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400" 
                placeholder="Search"
              />
            </div>
          </div>
        </>
      ) : (
        <div className="flex flex-col items-center justify-center min-h-screen text-center">
          <h1 className="text-3xl font-bold mb-4">User Dashboard</h1>
          <button 
            onClick={login} 
            className="px-6 py-3 bg-blue-500 text-white rounded-lg hover:bg-blue-600 transition"
          >
            Login
          </button>
        </div>
      )}
    </div>
  
    </>
  );
}

export default UserDashboard