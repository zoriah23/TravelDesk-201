import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div className=" flex flex-col items-center justify-center space-y-5">
      <h1 className="text-center">Welcome to Travel Desk</h1>
      <p>
        Travel Desk is a travel agency that helps you book flights, hotels, and
        activities.
      </p>

      <div className="flex space-x-3">
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
          <Link to="/admin?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai">
            Admin Dashboard
          </Link>
        </button>
        <button className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded'>
        <Link to="/user?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai">
          User Dashboard
        </Link>
        </button>
      </div>
    </div>
  );
}

export default Home