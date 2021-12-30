import React from "react";
import { NavLink } from "react-router-dom";


export const NavBar: React.FC = () => {
  return (
    <nav>
      <div className="nav-wrapper blue lighten-3">
        <a href="/" className="brand-logo">
          <i className="large material-icons">announcement</i>
        </a>
        <ul className="right hide-on-med-and-down">
          
           <li>
            <NavLink to="/">Login</NavLink>
          </li>
          <li>
            <NavLink to="/system">Add New User</NavLink>
          </li>
          <li>
            <NavLink to="/results">Users Results</NavLink>
          </li>
          <li>
            <NavLink to="/my-api">My API</NavLink>
          </li>
          <li>
            <NavLink to="/information">Information</NavLink>
          </li>
          <li>
            <NavLink to="/about">About</NavLink>
          </li>
          
          
        </ul>
      </div>
    </nav>
  );
};
