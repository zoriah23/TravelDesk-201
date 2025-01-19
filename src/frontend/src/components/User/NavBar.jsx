import React from 'react'

const NavBar = () => {
  return (
    <div>
        <nav className="navbar navbar-expand-lg navbar-light bg-light">
            <a className="navbar-brand" href="#">Navbar</a>

            <div className="collapse navbar-collapse" id="navbarNav">
                <ul className="navbar-nav">
                    <li className="nav-item active">
                        <a className="nav-link" href="#">Home <span className="sr-only">(current)</span></a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Flights</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Hotels</a>
                    </li>
                    <li className="nav-item">
                        <a className="nav-link" href="#">Activities</a>
                    </li>
                    <li className="nav-item">
                        <input type="text" className="form-control" placeholder="Search" />
                    </li>
                </ul>
                </div>
                </nav>
    </div>
  )
}

export default NavBar