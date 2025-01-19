import React from 'react'
import { Link } from 'react-router-dom'

const Home = () => {
  return (
    <div>
      <h1>Welcome to Travel Desk</h1>
      <p>
        Travel Desk is a travel agency that helps you book flights, hotels, and
        activities.
      </p>

      <Link to="/admin?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai">Admin</Link>
      <Link to="/user?canisterId=bd3sg-teaaa-aaaaa-qaaba-cai">User</Link>
    </div>
  );
}

export default Home