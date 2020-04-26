import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

import GoogleAuth from "./GoogleAuth";

const NavBar = () => {


  let navDown = () => {
    $(".nav").toggleClass("nav-down");
    $(".bars-icon").toggleClass("bars-icon-down");
  }

  return(
    <div className="navBar">
      <span id="writeEdit-indicator">Write</span>
      <div className="nav-flex">
        <div className="brand">
          <h3>Medium</h3>
          <i className="big medium icon"></i>
        </div>
        <div className="bars-icon" onClick ={navDown}><i className="large bars icon"></i></div>
      </div>
      <div className="nav">
        <ul>
          <li>
            <Link to="#">
              <GoogleAuth />
            </Link>
          </li>
          <li>
            <Link to="/articles">
              Read
            </Link>
          </li>
          <li>
            {/* change ( if signed in  ) */}
            <Link to="/articles/create">
              Write
            </Link>
          </li>
          <li>
            <Link to="/">
              Home
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

}


export default NavBar;