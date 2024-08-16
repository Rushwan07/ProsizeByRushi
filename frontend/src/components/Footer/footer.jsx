import React from "react";
import "./footer.scss";
const footer = () => {
  return (
    <div className="footer container d-flex justify-content-center align-items-center">
      <div className="parent text-center">
        <h1 className="">
          <b>ProsizeBy</b>
          <b className="Rushi">Rushi</b>
        </h1>
        <small className="">
          Lorem, ipsum dolor sit amet consectetur adipisicing elit. Unde, aut?
          Rem, adipisci ratione accusamus excepturi culpa quam laborum mollitia
          sint.
        </small>
        <div className="child d-flex align-items-center justify-content-center mt-3">
          <h4>
            <b>Follow Us</b>
          </h4>
          <h5><b>Instagram •</b></h5>
          <h5><b>Twiter</b></h5>
        </div>
        <small>Terms & Conditions• Privacy Policy• All Rights Reserved</small>
      </div>
    </div>
  );
};

export default footer;
