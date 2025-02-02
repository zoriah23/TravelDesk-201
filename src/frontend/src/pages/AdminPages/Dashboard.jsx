import React, { useState } from "react";
import Activities from "../../components/Services/Activities/Admin/Activities";

import { login, logout } from "../../utils/auth";
import Flights from "../../components/Services/Flight/Admin/Flights";
import Hotels from "../../components/Services/Hotel/Admin/Hotels";
import NavBar from "../../components/Admin/NavBar";

const AdminDashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<Flights />);


  return (
    <>
      {login() ? (
        <div className="relative">
          <NavBar />
          <h1 className="text-[14px]">Manage Services</h1>
          <div className=" flex flex-col items-center space-y-3">
            {loading ? (
              <h1>Loading...</h1>
            ) : (
              <div className=" flex space-x-2">
                <button className="" onClick={() => setActiveComponent(<Flights />)}>
                  Flights
                </button>
                <button onClick={() => setActiveComponent(<Hotels />)}>
                  Hotels
                </button>
                <button onClick={() => setActiveComponent(<Activities />)}>
                  Activities
                </button>
                <button onClick={logout}>Logout</button>
              </div>
            )}

            {activeComponent}
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
