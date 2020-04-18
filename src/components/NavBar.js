import React from "react";
import { Link } from "react-router-dom";
import $ from "jquery";

import "./Styles.css";
import GoogleAuth from "./GoogleAuth";

const NavBar = () => {


  let navDown = () => {
    $(".nav").toggleClass("nav-down");
  }

  return(
    <div className="navBar">
      <div className="nav-flex">
        <div className="brand">
          <h3>Medium</h3>
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
            <Link to="#" className="">
              lorem
            </Link>
          </li>
          <li>
            <Link to="#">
              lorem
            </Link>
          </li>
          <li>
            <Link to="#">
              lorem
            </Link>
          </li>
        </ul>
      </div>
    </div>
  );

}


export default NavBar;