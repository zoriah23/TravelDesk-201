import React, { useState } from "react";
import Activities from "../../components/Services/Activities/Admin/Activities";


import { login, logout } from "../../utils/auth";
import Flights from "../../components/Services/Flight/Admin/Flights";
import Hotels from "../../components/Services/Hotel/Admin/Hotels";
import NavBar from "../../components/Admin/NavBar";

const AdminDashBoard = () => {
const [loading, setLoading] = useState(false);

  const [activities, setActivities] = useState({});
  return (
    <>
      {login() ? (
        <div>
          <NavBar />
          <h1>Manage Services provided</h1>
          <div className="flex flex-column">
         
       <Flights />

           
          </div>
        </div>
      ) : (
        <div>
          <h1>Admin Dashboard</h1>
          <button onClick={login}>Login</button>
        </div>
      )}
    </>
  );
};

export default AdminDashBoard;
