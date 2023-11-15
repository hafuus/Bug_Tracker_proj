import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css'

const Navbar = () => {
  // color palettes
  const colors = {
    primary: '#69ACC2',
    secondary: '#213E60',
    success: '#DDDBDA',
    danger: '#ffffff',
    another: '#F3F4F6'
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-light" style={{ backgroundColor: colors.another }}>
      <Link className="navbar-brand text-black custom-logo-link text-navy" style={{marginLeft:'30px'}} to="/admin">MyLOgO</Link>
      <div className="collapse navbar-collapse" id="navbarNav">
        <ul className="navbar-nav ml-auto">
          <li className="nav-item dropdown">
            <a className="nav-link dropdown-toggle text-navy" style={{paddingLeft: "1000px"}} href="/admin" id="profileDropdown" role="button" data-bs-toggle="dropdown" aria-expanded="false">
              Profile
            </a>

            <ul className="dropdown-menu dropdown-menu-end" aria-labelledby="profileDropdown">
              <li><a className="dropdown-item">my account</a></li>
              <li><hr className="dropdown-divider" /></li>
              <li><a className="dropdown-item" href="/">Logout</a></li>
            </ul>
          </li>
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
