import React from 'react';
import ReactDOM from 'react-dom';
import $ from "jquery";

import "./Styles.css";

const Modal = (props) => {

  let closeModal = () => {
    $(".modal").css("display", "none");
  }

  let signIn = () => {
    props.signIn();
  } 
  
  return ReactDOM.createPortal(
    <div id="myModal" className="modal">
      <div className="modal-content">
        <span className="close" onClick={closeModal}>&times;</span>
        <div className="google-auth" onClick={signIn}>
          <i className="large google icon"></i>
          <span>Google SignIn</span>
        </div>
        <form className="modal-form">
          <input type="email" placeholder="Email" />
          <input type="password" placeholder="Password" />
          <button type="submit" value="Submit">Submit</button>
        </form>
      </div>
    </div>,
    document.querySelector("#modal"));

}


export default Modal;