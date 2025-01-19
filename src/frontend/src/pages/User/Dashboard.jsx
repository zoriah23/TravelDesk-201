import React from 'react'
import { Link } from 'react-router-dom';

import { login, logout } from "../../utils/auth";
import NavBar from '../../components/User/NavBar';

const UserDashboard = () => {
  return (
    <>
      {login() ? (
        <div>
          <NavBar />
          <h1>Welcome to Travel Desk</h1>
          <p>
            Travel Desk is a travel agency that helps you book flights, hotels,
            and activities.
          </p>

          <h2>Flights</h2>
          <p>Book flights to your favorite destinations.</p>
          <Link to="/flights?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai">
            View Flights
          </Link>

          <h2>Hotels</h2>
          <p>Book hotels in your favorite cities.</p>
          <Link to="/hotels?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai">
            View Hotels
          </Link>

          <h2>Activities</h2>
          <p>Book activities in your favorite cities.</p>
          <Link to="/activities?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai">
            View Activities
          </Link>

          <h2>Search</h2>
          <p>Search for flights, hotels, and activities.</p>
          <input type="text" className="form-control" placeholder="Search" />
        </div>
      ) : (
        <div>
          <h1>User Dashboard</h1>
          <button onClick={login}>Login</button>
        </div>
      )}
    </>
  );
}

export default UserDashboard