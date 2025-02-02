import React, { useState } from "react";
import Activities from "../../components/Services/Activities/Admin/Activities";

import { login, logout } from "../../utils/auth";
import Flights from "../../components/Services/Flight/Admin/Flights";
import Hotels from "../../components/Services/Hotel/Admin/Hotels";
import NavBar from "../../components/Admin/NavBar";
import Navbar from "../../components/Admin/NavBar";

const AdminDashBoard = () => {
  const [loading, setLoading] = useState(false);
  const [activeComponent, setActiveComponent] = useState(<Flights />);


  return (
    <>
      <Navbar
        setActiveComponent={setActiveComponent}
        login={login}
        logout={logout}
        loading={loading}
        activeComponent={activeComponent}
      />
    </>
  );
};

export default AdminDashBoard;
