import React from 'react'

const NavBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Admin Dashboard</a>
            <button className="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarNav" aria-controls="navbarNav" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
            </button>
            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="/activityDetails">Activities</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/hotelDetails">Hotels</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="/flightDetails">Flights</a>
                    </li>
                </ul>
                </div>
                </nav>
    </div>
  )
}

export default NavBar